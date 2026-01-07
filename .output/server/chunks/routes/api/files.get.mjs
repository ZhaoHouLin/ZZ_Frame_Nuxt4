import { d as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import fs from 'fs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const files_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const uploadDir = config.UPLOAD_DIR;
  if (!fs.existsSync(uploadDir)) return [];
  const files = fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : [];
  return files;
});

export { files_get as default };
//# sourceMappingURL=files.get.mjs.map
