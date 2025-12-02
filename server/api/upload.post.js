import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { verifyAuth } from '../utils/auth'  // 引入驗證函式

export default defineEventHandler(async (event) => {
  // ✅ 執行 JWT 驗證
  await verifyAuth(event) // ✅ 手動驗證 JWT
  // const uploadDir = path.join(process.cwd(), 'uploads')
  const config = useRuntimeConfig()
  // 🔹 指定上傳目的地
  const uploadDir = config.UPLOAD_DIR // 若伺服器是 Windows
  // const uploadDir = '/tools' // 若伺服器是 Linux

  // 若資料夾不存在就建立
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  })

  const [fields, files] = await form.parse(event.node.req)
  // ✅ 通用處理：不管欄位名叫什麼
  const allFiles = Object.values(files).flat()
  const uploaded = []
  // files.files 可能是陣列或單一物件
  // const fileArray = Array.isArray(files.files) ? files.files : [files.files]


  for (const file of allFiles) {
    if (!file?.originalFilename) continue
    const newPath = path.join(uploadDir, file.originalFilename)
    fs.renameSync(file.filepath, newPath)
    uploaded.push({
      name: file.originalFilename,
      status: 'finished',
      url: `/api/download?name=${encodeURIComponent(file.originalFilename)}`
    })
  }

  return { success: true, uploaded }
})
