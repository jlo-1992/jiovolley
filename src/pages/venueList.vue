<template>
  <div>
    <venueSearchSection />
    <createVenueSection />
    <footerSection />
  </div>
</template>

<script setup>
import venueSearchSection from '@/views/vnlVenueSearch.vue'
import createVenueSection from '@/views/vnlCreateVenue.vue'
import footerSection from '@/views/hpFooter.vue'
</script>

<style scoped lang="scss"></style>

<route lang="yaml">
meta:
  title: '球場列表'
  # 訪客也可以看
  login: ''
  # 不是管理員也可以看
  admin: false
</route>
