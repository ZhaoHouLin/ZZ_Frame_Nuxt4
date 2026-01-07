import { d as defineEventHandler, r as readBody, c as createError, a as sendStream } from '../../nitro/nitro.mjs';
import { promises, createReadStream } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const downloadFile = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const fileName = body.unit;
    if (!fileName) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "File name is required"
      });
    }
    const filePath = join(process.cwd(), "public", "downloads", fileName);
    await promises.access(filePath);
    return sendStream(event, createReadStream(filePath), {
      headers: {
        // 'Content-Disposition': 'attachment; filename=your-file.exe',
        // 'Content-Type': 'application/octet-stream'
        "Content-Disposition": "attachment; filename=printerInstall.bat",
        "Content-Type": "text/plain"
      }
    });
  } catch (error) {
    console.error("File read error:", error);
    if (error.code === "ENOENT") {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "File not found"
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "An unexpected error occurred"
    });
  }
});

export { downloadFile as default };
//# sourceMappingURL=downloadFile.mjs.map
