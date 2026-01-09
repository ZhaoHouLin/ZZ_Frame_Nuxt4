import fs from 'fs'
import path from 'path'
import { verifyAuth } from '../utils/auth'  // 引入驗證函式

export default defineEventHandler(async (event) => {
  await verifyAuth(event) // ✅ 手動驗證 JWT

  const query = getQuery(event)
  const filename = query.name
  // const filePath = path.join(process.cwd(), 'uploads', filename)
  const config = useRuntimeConfig()
  const uploadDir = config.UPLOAD_DIR
  const filePath = path.join(uploadDir, filename)

  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: '檔案不存在' })
  }

  // --- 修正部分開始 ---
  // 1. 先對中文檔名進行 URL 編碼
  const encodedName = encodeURIComponent(filename)

  // 2. 使用符合標準的 Header 設定方式
  // filename* 是為了告訴瀏覽器這串字元是用 UTF-8 編碼的
  setHeader(event, 'Content-Disposition', `attachment; filename="${encodedName}"; filename*=UTF-8''${encodedName}`)
  // --- 修正部分結束 ---

  return fs.createReadStream(filePath)
})
