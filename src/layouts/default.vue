<template>
  <v-app>
    <v-app-bar
      style="position: fixed"
      :color="isHome ? 'transparent' : '#353d42'"
      :elevation="isHome ? 0 : 10"
      :absolute="isHome"
      :app="!isHome"
      height="80"
    >
      <template v-if="display.smAndDown.value">
        <v-app-bar-title>
          <router-link to="/">
            <v-img width="200" height="200" src="../assets/images/logo-light.png" id="logo"></v-img>
          </router-link>
        </v-app-bar-title>
        <v-btn icon="mdi-menu" @click.stop="drawer = !drawer" color="#f1f1f1"></v-btn>
      </template>

      <template v-else>
        <router-link to="/">
          <v-img
            width="220"
            height="220"
            src="../assets/images/logo-light.png"
            id="logo"
            class="ml-5"
          ></v-img>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn v-for="item in leftNavItems" :key="item.title" class="btn-appbar" :to="item.to">{{
          item.title
        }}</v-btn>
        <v-spacer class="right-section"></v-spacer>
        <v-btn v-for="item in rightNavItems" :key="item.to" class="btn-appbar" :to="item.to">{{
          item.title
        }}</v-btn>
        <v-btn v-if="user.isLoggedIn" class="btn-appbar" @click="logout">登出</v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      style="position: fixed"
      v-model="drawer"
      temporary
      location="right"
      width="180"
      :style="user.isLoggedIn ? 'height: 280px' : 'height: 240px'"
      color="#f1f1f1"
      rounded="sm"
    >
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in navItems.filter((i) => i.show)"
          :key="item.to"
          :value="item.to"
          :to="item.to"
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="menu-item">{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="user.isLoggedIn"
          prepend-icon="mdi-logout"
          class="menu-item"
          @click="logout"
          >登出</v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="pa-0" fluid :class="isHome ? 'container' : ''">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import userService from '@/services/userService'
import { useUserStore } from '@/stores/userStore'
import { useSnackbar } from 'vuetify-use-dialog'
const createSnackbar = useSnackbar()

const user = useUserStore()

const display = useDisplay()
const drawer = ref(false)

const router = useRouter()
const isHome = computed(() => router.path === '/')

const navItems = computed(() => [
  { title: '關於我們', to: '/aboutUs', icon: 'mdi-compass', show: true },
  { title: '球場列表', to: '/venueList', icon: 'mdi-map-marker', show: true },
  { title: '我要打球', to: '/socials', icon: 'mdi-volleyball', show: true },
  { title: '排球商城', to: '/shop', icon: 'mdi-cart', show: true },
  { title: '會員中心', to: '/member', icon: 'mdi-account-outline', show: user.isLoggedIn },
  { title: '註冊/登入', to: '/logInSingUp', icon: 'mdi-login', show: !user.isLoggedIn },
])

const leftNavItems = computed(() => {
  return navItems.value.filter((item) => item.show).slice(0, 4)
})
const rightNavItems = computed(() => {
  return navItems.value.filter((item) => item.show).slice(4)
})

const logout = async () => {
  try {
    await userService.logout()
  } catch (error) {
    console.error(error)
  }
  user.logout()
  router.push('/')
  createSnackbar({
    text: '登出成功！',
    snackbarProps: {
      color: 'green',
    },
  })
}
</script>

<style scoped lang="scss">
.menu-item {
  color: vars.$primary-color;
  font-size: 0.9rem;
  font-family: 'Huninn', sans-serif;
}

.btn-appbar {
  font-size: 1.3rem;
  color: vars.$secondary-color;
  font-family: 'Huninn', sans-serif;
}

.btn-appbar:hover {
  background-color: #fdd000;
  color: black;
}

.container {
  position: absolute;
  top: 0;
}

.right-section {
  border-right: 2px solid #f1f1f1;
}
</style>
