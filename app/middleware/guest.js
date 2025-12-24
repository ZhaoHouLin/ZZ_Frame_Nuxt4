export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch('/api/me')

  if (data.value?.loggedIn) {
    return navigateTo('/')
  }
})
