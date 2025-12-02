import fs from 'fs'
import path from 'path'
import { verifyAuth } from '../utils/auth'  // 引入驗證函式

export default defineEventHandler(async (event) => {
  await verifyAuth(event) // ✅ 手動驗證 JWT

  const query = getQuery(event)
  const filename = query.name
  // const filePath = path.join(process.cwd(), 'uploads', filename)
  const config = useRuntimeConfig()
  // 🔹 一樣指定路徑
  const uploadDir = config.UPLOAD_DIR  // Windows
  // const uploadDir = '/tools' // Linux
  const filePath = path.join(uploadDir, filename)

  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: '檔案不存在' })
  }

  setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)
  return fs.createReadStream(filePath)
})
