import { d as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import formidable from 'formidable';
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

const upload_post = defineEventHandler(async (event) => {
  await verifyAuth(event);
  const config = useRuntimeConfig();
  const uploadDir = config.UPLOAD_DIR;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true
  });
  const [fields, files] = await form.parse(event.node.req);
  const allFiles = Object.values(files).flat();
  const uploaded = [];
  for (const file of allFiles) {
    if (!(file == null ? void 0 : file.originalFilename)) continue;
    const newPath = path.join(uploadDir, file.originalFilename);
    fs.renameSync(file.filepath, newPath);
    uploaded.push({
      name: file.originalFilename,
      status: "finished",
      url: `/api/download?name=${encodeURIComponent(file.originalFilename)}`
    });
  }
  return { success: true, uploaded };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
