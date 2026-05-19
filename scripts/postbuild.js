import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "dist", "client", "index.html");
if (fs.existsSync(file)) {
  fs.unlinkSync(file);
  console.log("Successfully removed dist/client/index.html to enable SSR routing on Vercel.");
} else {
  console.log("dist/client/index.html not found, skipping removal.");
}
