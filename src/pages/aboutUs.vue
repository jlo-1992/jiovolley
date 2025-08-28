<template>
  <firstSection />
  <footerSection />
</template>

<script setup>
import firstSection from '@/views/auFirstSection.vue'
import footerSection from '@/views/hpFooter.vue'
</script>

<route lang="yaml">
meta:
  title: '關於我們'
  # 訪客也可以看
  login: ''
  # 不是管理員也可以看
  admin: false
</route>
