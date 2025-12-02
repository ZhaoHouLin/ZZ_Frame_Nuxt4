import { deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'ad_session', { path: '/' })
  return { success: true, message: '已登出' }
})
