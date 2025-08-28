<template>
  <logInSignUp />
</template>

<script setup>
import logInSignUp from '@/views/mbLogIn.vue'
</script>

<route lang="yaml">
meta:
  title: '註冊'
  # 只有在沒登入的狀態下可以看
  login: 'no-login-only'
  # 不是管理員也可以看
  admin: false
</route>
