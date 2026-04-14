import fs from "fs";
import path from "path";

export function getMarkdownContent(fileName: string) {
    const filePath = path.join(process.cwd(), "docs/about", fileName);
    return fs.readFileSync(filePath, "utf-8");
}