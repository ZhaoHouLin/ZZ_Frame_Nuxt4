import { jwtVerify } from 'jose'

export async function verifyAuth(event) {
  const token = getCookie(event, 'ad_session')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: '未登入' })
  }

  const config = useRuntimeConfig()
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(config.JWT_SECRET)
    )
  } catch (err) {
    console.error('JWT 驗證失敗：', err)
    throw createError({ statusCode: 401, statusMessage: 'JWT 無效或過期' })
  }
}
