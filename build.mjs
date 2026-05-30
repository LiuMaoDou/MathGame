import { readFile, writeFile } from "node:fs/promises";

const BABEL_URL = "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js";
const SOURCES = [
  "ui.jsx",
  "mascots.jsx",
  "map.jsx",
  "chapter1.jsx",
  "chapter2.jsx",
  "chapter3.jsx",
  "chapter4.jsx",
  "chapter5.jsx",
  "app.jsx",
];

async function loadBabel() {
  const response = await fetch(BABEL_URL);
  if (!response.ok) {
    throw new Error(`Failed to download Babel: ${response.status} ${response.statusText}`);
  }

  const source = await response.text();
  const module = { exports: {} };
  new Function("module", "exports", source)(module, module.exports);
  return module.exports;
}

const Babel = await loadBabel();

for (const filename of SOURCES) {
  const source = await readFile(filename, "utf8");
  const { code } = Babel.transform(source, {
    filename,
    presets: ["react"],
    sourceMaps: false,
    comments: true,
  });
  await writeFile(filename.replace(/\.jsx$/, ".js"), `${code}\n`);
}
