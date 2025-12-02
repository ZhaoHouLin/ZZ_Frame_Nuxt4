import fs from 'fs'

export default defineEventHandler(async () => {
  // const uploadDir = path.join(process.cwd(), 'uploads')

  const config = useRuntimeConfig()
  const uploadDir = config.UPLOAD_DIR

  if (!fs.existsSync(uploadDir)) return []

  const files = fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : []
  return files
})
