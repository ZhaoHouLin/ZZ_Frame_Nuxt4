import { useAuthStore } from '../../stores/auth.js'

export default defineNuxtRouteMiddleware(async (to) => {

  // // ✅ 已登入 → 正常放行
  const auth = useAuthStore()

  if (to.path === '/login') return
  const { data } = await useFetch('/api/me', { credentials: 'include' })

  if (!data.value?.loggedIn) {
    return navigateTo('/login') // ✅ SSR 或 CSR 都會導向
  }

  // if (!auth.loggedIn) {
  //   await auth.fetchMe()
  // }

  // if (!auth.loggedIn) {
  //   return navigateTo('/login')
  // }
})
