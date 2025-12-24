<script setup>
import { NCard, NInput, NButton } from "naive-ui"

definePageMeta({
  middleware: "guest",
})

const username = ref("")
const password = ref("")
const message = ref("")

const login = async () => {
  message.value = "登入中..."
  try {
    const res = await $fetch("/api/login", {
      method: "POST",
      body: { username: username.value, password: password.value },
      credentials: "include", // ✅ 確保 cookie 帶進來
    })
    if (res.success) {
      console.log("✅ 登入成功，導向首頁")
      await navigateTo("/") // 🔹 這一步很重要
    } else {
      // error.value = res.message || "登入失敗"
      console.error("❌ 登入失敗:", res.message)
    }
  } catch (err) {
    message.value = "登入錯誤"
    console.error(err)
  }
}
</script>

<template lang="pug">
.login-container

  NCard(title="使用者登入")
    NInput( v-model:value="username" placeholder="帳號" style="margin-bottom: 10px;" )
    NInput( v-model:value="password" placeholder="密碼" type="password" style="margin-bottom: 10px;" )
    NButton(type="primary" @click="login" block) 登入
  //- form(@submit.prevent="login")
    input( v-model="username" placeholder="帳號" )
    input( v-model="password" placeholder="密碼" type="password")
    button(type="submit") 登入
    p {{ message }}

</template>

<style lang="stylus" scoped>
.login-container
  flex()
  size(300px)
  // border 1px solid #000
</style>
