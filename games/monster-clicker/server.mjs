import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { networkInterfaces } from "node:os";
import { randomUUID } from "node:crypto";
import { basename, extname, join, normalize, resolve } from "node:path";

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";
const root = resolve(".");
const dataRoot = join(root, "admin-data");
const uploadRoot = join(dataRoot, "uploads");
const catalogPath = join(dataRoot, "catalog.json");
const maxBodySize = 16 * 1024 * 1024;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function resolveRequestPath(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  const route = parsed.pathname === "/admin" ? "/admin.html" : parsed.pathname;
  const pathname = route === "/" ? "/index.html" : decodeURIComponent(route);
  const fullPath = normalize(join(root, pathname));

  if (!fullPath.startsWith(root)) return null;
  return fullPath;
}

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  response.end(JSON.stringify(data, null, 2));
}

function readBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBodySize) {
        rejectBody(new Error("Request body too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolveBody(Buffer.concat(chunks)));
    request.on("error", rejectBody);
  });
}

async function loadCatalog() {
  try {
    return JSON.parse(await readFile(catalogPath, "utf8"));
  } catch {
    return { records: [] };
  }
}

async function saveCatalog(catalog) {
  await mkdir(dataRoot, { recursive: true });
  await writeFile(catalogPath, JSON.stringify(catalog, null, 2));
}

function parseMultipart(buffer, boundary) {
  const body = buffer.toString("latin1");
  const parts = body.split(`--${boundary}`).slice(1, -1);
  const fields = {};
  const files = [];

  for (const rawPart of parts) {
    const part = rawPart.replace(/^\r\n/, "").replace(/\r\n$/, "");
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;

    const headerText = part.slice(0, headerEnd);
    const content = part.slice(headerEnd + 4);
    const disposition = headerText.match(/content-disposition:\s*form-data;([^\r\n]+)/i)?.[1] || "";
    const name = disposition.match(/name="([^"]+)"/)?.[1];
    const filename = disposition.match(/filename="([^"]*)"/)?.[1];
    const type = headerText.match(/content-type:\s*([^\r\n]+)/i)?.[1] || "application/octet-stream";

    if (!name) continue;
    if (filename) {
      files.push({
        fieldName: name,
        filename,
        type,
        data: Buffer.from(content, "latin1"),
      });
    } else {
      fields[name] = content;
    }
  }

  return { fields, files };
}

function safeUploadName(filename) {
  const extension = extname(filename).toLowerCase();
  const base = basename(filename, extension).replace(/[^\w.-]+/g, "-").slice(0, 48) || "asset";
  return `${Date.now()}-${randomUUID().slice(0, 8)}-${base}${extension}`;
}

async function handleApi(request, response, parsedUrl) {
  if (request.method === "GET" && parsedUrl.pathname === "/api/catalog") {
    sendJson(response, 200, await loadCatalog());
    return true;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/catalog") {
    const body = await readBody(request);
    const catalog = JSON.parse(body.toString("utf8") || "{}");
    const nextCatalog = {
      records: Array.isArray(catalog.records) ? catalog.records : [],
      updatedAt: new Date().toISOString(),
    };
    await saveCatalog(nextCatalog);
    sendJson(response, 200, nextCatalog);
    return true;
  }

  if (request.method === "POST" && parsedUrl.pathname === "/api/upload") {
    const contentType = request.headers["content-type"] || "";
    const boundary = contentType.match(/boundary=(.+)$/)?.[1];
    if (!boundary) {
      sendJson(response, 400, { error: "Missing multipart boundary" });
      return true;
    }

    const { fields, files } = parseMultipart(await readBody(request), boundary);
    const file = files[0];
    if (!file) {
      sendJson(response, 400, { error: "No file uploaded" });
      return true;
    }

    const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);
    const extension = extname(file.filename).toLowerCase();
    if (!allowed.has(extension)) {
      sendJson(response, 400, { error: "Only png, jpg, webp, gif, svg files are allowed" });
      return true;
    }

    const entity = String(fields.entity || "misc").replace(/[^\w-]+/g, "-").slice(0, 32) || "misc";
    const slot = String(fields.slot || file.fieldName || "asset");
    const filename = safeUploadName(file.filename);
    const directory = join(uploadRoot, entity);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, filename), file.data);

    sendJson(response, 200, {
      url: `/admin-data/uploads/${entity}/${filename}`,
      name: file.filename,
      type: file.type,
      size: file.data.length,
      slot,
    });
    return true;
  }

  return false;
}

const server = createServer(async (request, response) => {
  try {
    const parsedUrl = new URL(request.url || "/", `http://localhost:${port}`);
    if (parsedUrl.pathname.startsWith("/api/") && (await handleApi(request, response, parsedUrl))) return;

    const filePath = resolveRequestPath(request.url || "/");

    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const data = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    response.end(data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.on("clientError", (_error, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

function localAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((entry) => entry && entry.family === "IPv4" && !entry.internal)
    .map((entry) => entry.address);
}

server.listen(port, host, () => {
  console.log(`副本刷装录正在运行：http://localhost:${port}`);
  for (const address of localAddresses()) {
    console.log(`手机同 Wi-Fi 可访问：http://${address}:${port}`);
  }
});
