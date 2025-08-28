<template>
  <v-app>
    <router-view />
    <GlobalLoader />
  </v-app>
</template>

<script setup>
import GlobalLoader from '@/components/GlobalLoader.vue'
</script>
