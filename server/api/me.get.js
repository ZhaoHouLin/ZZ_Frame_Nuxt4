// server/api/me.get.ts
export default defineEventHandler((event) => {
  const token = getCookie(event, 'ad_session')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthenticated'
    })
  }

  return { loggedIn: true }
})
