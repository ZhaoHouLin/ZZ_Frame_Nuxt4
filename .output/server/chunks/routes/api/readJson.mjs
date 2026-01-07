import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import * as fs from 'node:fs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import 'node:crypto';
import 'node:url';

const readJson = defineEventHandler(async (event) => {
  const filePath = "@/../Data/example.json";
  let json = fs.readFileSync(filePath, "utf8", (err, data) => {
    if (err) throw err;
    const info = data.toString();
    return info;
  });
  json = JSON.parse(json);
  return json;
});

export { readJson as default };
//# sourceMappingURL=readJson.mjs.map
