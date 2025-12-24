import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const loggedIn = ref(false)

  const fetchMe = async () => {
    const data = await $fetch('/api/me')
    loggedIn.value = !!data.loggedIn
  }

  const logout = async () => {
    await $fetch('/api/logout', { method: 'POST' })
    loggedIn.value = false
    await navigateTo('/login')
  }

  return {
    loggedIn,
    fetchMe,
    logout
  }

})
