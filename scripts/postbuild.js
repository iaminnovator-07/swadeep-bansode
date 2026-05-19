import fs from "fs";
import path from "path";

const distDir = path.join(process.cwd(), "dist");
const clientDir = path.join(distDir, "client");
const indexHtml = path.join(clientDir, "index.html");

// 1. Delete index.html
if (fs.existsSync(indexHtml)) {
  fs.unlinkSync(indexHtml);
  console.log("Successfully removed dist/client/index.html");
} else {
  console.log("dist/client/index.html not found, skipping removal.");
}

// 2. Move contents of dist/client to dist
if (fs.existsSync(clientDir)) {
  const files = fs.readdirSync(clientDir);
  for (const file of files) {
    const src = path.join(clientDir, file);
    const dest = path.join(distDir, file);
    
    if (fs.statSync(src).isDirectory()) {
      if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
      }
      fs.renameSync(src, dest);
    } else {
      fs.renameSync(src, dest);
    }
  }
  fs.rmdirSync(clientDir);
  console.log("Moved dist/client contents to dist/ and removed dist/client folder.");
} else {
  console.log("dist/client directory not found, skipping contents move.");
}

// 3. Create Netlify _redirects file in dist/
const redirectsFile = path.join(distDir, "_redirects");
fs.writeFileSync(redirectsFile, "/*  /.netlify/functions/server  200\n");
console.log("Created dist/_redirects file for Netlify routing.");
