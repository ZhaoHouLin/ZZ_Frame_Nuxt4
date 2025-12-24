// server/api/logout.post.ts
import { setCookie } from 'h3'

export default defineEventHandler((event) => {
  // setCookie(event, 'ad_session', '', {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   path: '/',
  //   maxAge: 0,          // 👈 關鍵
  //   sameSite: 'lax',
  // })
  deleteCookie(event, 'ad_session', {
    path: '/'
  })
  return { success: true }
})
