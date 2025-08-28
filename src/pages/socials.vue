<template>
  <bookSocialSection />
  <createSocialSection />
  <footerSection />
</template>

<script setup>
import bookSocialSection from '@/views/ssBookSocial.vue'
import createSocialSection from '@/views/ssCreateSocial.vue'
import footerSection from '@/views/hpFooter.vue'
</script>

<style>
html,
body {
  overflow-x: hidden !important;
}
</style>

<route lang="yaml">
meta:
  title: '報名場次'
  # 訪客也可以看
  login: ''
  # 不是管理員也可以看
  admin: false
</route>
