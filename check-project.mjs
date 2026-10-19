import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import vm from 'node:vm';
const root = new URL('../', import.meta.url).pathname;
const apiDir = join(root, 'api');
const files = (await readdir(apiDir)).filter(x => x.endsWith('.js'));
for (const f of files) {
  const r = spawnSync(process.execPath, ['--check', join(apiDir, f)], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${f}: ${r.stderr}`);
}
for (const f of ['vercel.json','manifest.webmanifest','package.json']) JSON.parse(await readFile(join(root,f),'utf8'));
const html = await readFile(join(root,'index.html'),'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(x=>x.trim() && !x.trim().startsWith('import '));
for (const [i, script] of scripts.entries()) new vm.Script(script, {filename:`index-inline-${i}.js`});
console.log(`OK: ${files.length} API functions, JSON configs and ${scripts.length} inline script(s) passed syntax checks.`);
