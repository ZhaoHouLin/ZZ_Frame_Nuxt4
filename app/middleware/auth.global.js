import { jwtVerify } from "jose"

export default defineNuxtRouteMiddleware(async (to) => {
  const cookie = useCookie('ad_session')
  // 🟢 如果已登入
  if (cookie.value) {
    // 若使用者想去登入頁，直接導回首頁
    if (to.path === '/login') {
      return navigateTo('/')
    }
  } else {
    // 🔴 若沒登入但想進非登入頁 → 擋掉
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
  }

})
