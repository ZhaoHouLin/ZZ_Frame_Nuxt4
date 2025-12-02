<script setup>
import {
  NCard,
  NSpace,
  NButton,
  NUpload,
  NProgress,
  NList,
  NListItem,
  NH3,
  useNotification,
  NUploadDragger,
  NIcon,
} from "naive-ui"
import { Upload } from "@vicons/tabler"

const uploadUrl = "/api/upload"
const files = ref([])
const uploadProgress = ref(0)
const uploadRef = ref(null)
const notification = useNotification()

// 📁 拖曳檔案進入區域
const handleDrop = (event) => {
  const fileList = Array.from(event.dataTransfer.files)
  if (fileList.length > 0) {
    uploadRef.value?.submit(fileList)
  }
}

// 📁 點擊開啟檔案選擇器
const openFileDialog = () => {
  const input = uploadRef.value?.$el.querySelector('input[type="file"]')
  if (input) input.click()
}

// 上傳進度
const onProgress = ({ percent }) => {
  uploadProgress.value = Math.round(percent)
}

// 上傳完成
const onUploadFinish = async ({ file }) => {
  uploadProgress.value = 0
  notification.success({
    title: "上傳成功",
    content: `${file.name} 已上傳完成`,
    duration: 3000,
  })
  await loadFiles()
}

// 上傳錯誤
const onUploadError = ({ file, event }) => {
  uploadProgress.value = 0
  notification.error({
    title: "上傳失敗",
    content: `${file.name} 上傳過程發生錯誤`,
    duration: 4000,
  })
}

// 超出限制
const onExceed = () => {
  notification.warning({
    title: "上傳限制",
    content: "最多同時上傳 10 個檔案，每個不得超過 20MB。",
    duration: 4000,
  })
}

// 載入檔案清單
const loadFiles = async () => {
  try {
    files.value = await $fetch("/api/files", { credentials: "include" })
  } catch (err) {
    console.error("載入檔案清單失敗:", err)
  }
}

// 下載檔案
const downloadFile = (filename) => {
  window.open(`/api/download?name=${encodeURIComponent(filename)}`, "_blank")
}

// 登出
const logout = () => {
  document.cookie = "ad_session=; Path=/; Max-Age=0;"
  navigateTo("/login")
}

onMounted(loadFiles)
</script>

<template lang="pug">
  NCard(title="檔案管理")
    NSpace(vertical size="large")
    div
      NH3 上傳檔案
      NUpload(
          ref="uploadRef"
          name="files"
          multiple
          :max="10",
          directory-dnd
          :action="uploadUrl"
          :with-credentials="true"
          response-type="json"
          @finish="onUploadFinish"
          @progress="onProgress"
          @error="onUploadError"
          @exceed="onExceed"
        )
        NUploadDragger  
          NIcon(size="40" color="#555")
            Upload
          p 拖曳檔案到這裡，或點擊選擇檔案上傳 
        //- NButton(type="primary") 選擇或拖曳檔案上傳
      NProgress(v-if="uploadProgress > 0 && uploadProgress < 100"
          :percentage="uploadProgress"
          type="line"
          indicator-placement="outside"
          processing)
    div
      NH3 已上傳檔案
      NList(bordered)
        NListItem(v-for="file in files" :key="file")
          NSpace( justify="space-between" align="center")
            span {{ file }}
            NButton(size="small" tertiary @click="downloadFile(file)") 下載
    .text-right
      NButton(type="error" @click="logout") 登出
</template>

<style lang="stylus" scoped></style>
