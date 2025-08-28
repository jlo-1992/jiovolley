<template>
  <videoSection class="section" />
  <newCourtSection class="section" />
  <socialInpiraUI class="section" />
  <productSection />
  <footerSection />
</template>

<script setup>
import videoSection from '@/views/hpVideo.vue'
import socialInpiraUI from '@/views/hpSocial-inpiraUI.vue'
import newCourtSection from '@/views/hpCourt_new.vue'
import productSection from '@/views/hpProducts.vue'
import footerSection from '@/views/hpFooter.vue'
</script>

<style scoped lang="scss">
.section {
  padding: 80px 0;
}

@media (min-width: 768px) {
  .section {
    padding: 100px 0;
  }
}
</style>

<!-- 因為安裝了 unplugin-vue-router 套件，所以可以使用 route 標籤，不然需要像番茄鐘一樣，用陣列的寫法 -->
<route lang="yaml">
meta:
  title: '首頁'
  # 訪客也可以看
  login: ''
  # 不是管理員也可以看
  admin: false
</route>
