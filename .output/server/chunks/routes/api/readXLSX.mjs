import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import * as fs from 'node:fs';
import * as XLSX from 'xlsx';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:path';
import 'node:crypto';
import 'node:url';

XLSX.set_fs(fs);
const readXLSX = defineEventHandler(async (event) => {
  const XLSXfilePath = "Data/example.xlsx";
  const workbook = XLSX.readFile(XLSXfilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  return jsonData;
});

export { readXLSX as default };
//# sourceMappingURL=readXLSX.mjs.map
