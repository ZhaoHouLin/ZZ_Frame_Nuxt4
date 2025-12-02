<script setup>
import { NUpload, NUploadDragger, NIcon, NText, NButton } from "naive-ui"

const config = useRuntimeConfig()
const cookie = useCookie("ad_session")
const user = ref("")

const getJson = async () => {
  const data = await $fetch("/api/readJson", {
    method: "get",
  })
  console.log(data)
}

const getXLSX = async () => {
  const data = await $fetch("/api/readXLSX", {
    method: "get",
  })
  console.log(data)
}

const username = ref("")
const password = ref("")

const login = async () => {
  const res = await $fetch("/api/login", {
    method: "POST",
    body: { username: username.value, password: password.value },
  })
  alert(res.success)
}
const logout = () => {
  // 用 useCookie 刪除 cookie
  const cookie = useCookie("ad_session")
  cookie.value = null

  // 導回登入頁
  navigateTo("/login")
}
</script>

<template lang="pug">
FileManager 

</template>

<style lang="stylus">
@font-face
  font-family 'ROGFonts-Regular'
  src url(@/assets/fonts/ROGFonts-Regular.woff) format('woff')

.homepage
  size()
  flex()
  background-color colorGray
  button
    font-family ROGFonts-Regular
  h1
    color #fff

  .logout
    position absolute
    top 20px
    right 20px

.info
  background-color #fff
  size(300px,50vh)
  flex(,flex-start,column)
  .upload
    size(auto)
    border 1px solid #000
    #file-upload-button
      font-size 1rem
      background-color #fff
</style>
