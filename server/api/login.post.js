import ldap from "ldapjs"
import { SignJWT } from 'jose'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  const token = getCookie(event, 'ad_session')
  if (token) {
    // 已登入狀態下又想登入其他帳號
    // 可以選擇直接拒絕或覆蓋
    return { success: false, message: '您已登入，請先登出再嘗試' }
  }

  // const client = ldap.createClient({ url: "ldap://cdc.gov.tw" })
  if (!username || !password) {
    return { success: false, message: '請輸入帳號與密碼' }
  }

  const LDAP_URL = process.env.LDAP_URL
  const DOMAIN = process.env.LDAP_DOMAIN
  const client = ldap.createClient({ url: LDAP_URL })
  const userDN = `${username}@${DOMAIN}`

  return new Promise((resolve) => {
    client.bind(userDN, password, async (err) => {
      if (err) {
        resolve({ success: false, message: '帳號或密碼錯誤' })
      } else {
        // 登入成功 → 產生 JWT token
        const token = await new SignJWT({ user: username })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('2h') // 兩小時有效
          .sign(new TextEncoder().encode(process.env.JWT_SECRET))

        // 設定 cookie
        setCookie(event, 'ad_session', token, {
          // httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 2,
          // sameSite: 'lax',
        })

        resolve({ success: true, message: '登入成功' })
      }
      client.unbind()
    })
  })


})
