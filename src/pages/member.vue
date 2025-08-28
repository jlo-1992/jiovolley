<template>
  <router-view />
</template>

<route lang="yaml">
meta:
  title: '球員中心'
  # 只有在登入的狀態下可以看
  login: 'login-only'
  # 不是管理員也可以看
  admin: false
  layout: 'member'
</route>
