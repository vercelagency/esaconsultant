import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
const PORT = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".mp3": "audio/mpeg",
  ".pdf": "application/pdf",
};

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (clean.includes("..")) return null;
  const candidate = path.join(ROOT, clean);

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }
  const indexCandidate = path.join(candidate, "index.html");
  if (fs.existsSync(indexCandidate) && fs.statSync(indexCandidate).isFile()) {
    return indexCandidate;
  }
  if (!clean.endsWith(".html")) {
    const htmlCandidate = candidate + ".html";
    if (fs.existsSync(htmlCandidate) && fs.statSync(htmlCandidate).isFile()) {
      return htmlCandidate;
    }
  }
  return null;
}

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url || "/", "http://127.0.0.1");

  // Mirrors vercel.json rewrite for Revolution Slider lazy-loaded slides
  if (reqUrl.pathname === "/wp-json/sliderrevolution/sliders/1") {
    const slideId = reqUrl.searchParams.get("slideid");
    if (slideId) {
      const slideFile = path.join(
        ROOT,
        "wp-json",
        "sliderrevolution",
        "sliders",
        `1-slide-${slideId}.json`
      );
      if (fs.existsSync(slideFile)) {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        fs.createReadStream(slideFile).pipe(res);
        return;
      }
    }
  }

  const filePath = resolveFile(req.url || "/");
  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`ESAC local server running at http://127.0.0.1:${PORT}/`);
});
