import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const assetsDir = path.join(root, 'assets');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const textFiles = [...htmlFiles, path.join('css','style.css')].filter(f => fs.existsSync(path.join(root,f)));

const converted = [];
for (const name of fs.readdirSync(assetsDir)) {
  if (!name.endsWith('.svg')) continue;
  const full = path.join(assetsDir, name);
  const text = fs.readFileSync(full, 'utf8');
  const m = text.match(/data:image\/webp;base64,([^"']+)/);
  if (!m) continue;
  const outName = name.replace(/\.svg$/i, '.webp');
  fs.writeFileSync(path.join(assetsDir, outName), Buffer.from(m[1], 'base64'));
  converted.push([name, outName]);
}

for (const rel of textFiles) {
  const full = path.join(root, rel);
  let text = fs.readFileSync(full, 'utf8');
  for (const [from, to] of converted) {
    text = text.replaceAll(`assets/${from}`, `assets/${to}`);
  }
  // force a fresh asset URL after extraction
  text = text.replace(/v=202608(?:23|24)-[0-9]+/g, 'v=20260824-1920');
  fs.writeFileSync(full, text);
}

console.log(`Extracted ${converted.length} original WebP assets:`);
for (const pair of converted) console.log(`  ${pair[0]} -> ${pair[1]}`);
if (converted.length === 0) process.exitCode = 2;
