import { d as defineEventHandler, g as getQuery, u as useRuntimeConfig, c as createError, s as setHeader } from '../../nitro/nitro.mjs';
import fs from 'fs';
import path from 'path';
import { v as verifyAuth } from '../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jose';

const download_get = defineEventHandler(async (event) => {
  await verifyAuth(event);
  const query = getQuery(event);
  const filename = query.name;
  const config = useRuntimeConfig();
  const uploadDir = config.UPLOAD_DIR;
  const filePath = path.join(uploadDir, filename);
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: "\u6A94\u6848\u4E0D\u5B58\u5728" });
  }
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);
  return fs.createReadStream(filePath);
});

export { download_get as default };
//# sourceMappingURL=download.get.mjs.map
