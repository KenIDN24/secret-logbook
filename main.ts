import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  'Day 41: He said "quick sync" and then talked for 38 minutes about his sourdough starter. I have logged 14 of these. The starter has a name. I have a name too.';

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  fail(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  fail("entry must not contain control characters");
}
if (LINE.trim() !== LINE || LINE.trim().length === 0) {
  fail("entry must not be only whitespace or have leading/trailing whitespace");
}
if (LINE.includes("\n")) {
  fail("entry must be a single line");
}

const outDir = "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back check: what is on disk must be exactly the line + newline.
const onDisk = fs.readFileSync(outPath, "utf8");
if (onDisk !== LINE + "\n") {
  fail("read-back mismatch: file on disk does not match the entry");
}
