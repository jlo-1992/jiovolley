<template>
  <div v-if="isLoading" class="lottie-overlay">
    <DotLottieVue
      style="height: 500px; width: 500px"
      autoplay
      loop
      src="https://lottie.host/4583ad3e-73e1-4f3a-83d5-048a1943aaa7/gPKIV1O45e.lottie"
    />
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const router = useRouter()

// 註冊導航守衛來控制載入狀態
router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(() => {
  // 延遲一點點時間，確保新頁面內容已經渲染完成
  setTimeout(() => {
    isLoading.value = false
  }, 300) // 延遲 300 毫秒，可以根據實際情況調整
})
</script>

<style scoped>
.lottie-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
</style>
