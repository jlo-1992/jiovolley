<template>
  <v-app>
    <v-app-bar style="position: fixed; z-index: 1" class="navbar" color="#353d42">
      <v-app-bar-title>
        <router-link to="/">
          <v-img width="200" height="200" src="../assets/images/logo-light.png"></v-img>
        </router-link>
      </v-app-bar-title>

      <v-btn v-if="display.smAndDown.value" icon="mdi-menu" @click.stop="drawer = !drawer"></v-btn>
      <template v-for="item of navItems" v-else :key="item.to">
        <v-btn class="btn" :to="item.to">{{ item.title }}</v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      width="150"
      style="height: 280px; max-height: fit-content"
      color="#f1f1f1"
    >
      <v-list density="compact" nav>
        <v-list-item v-for="item of navItems" :key="item.to" :value="item.to" :to="item.to">
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="menu-item">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="pa-0" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

const display = useDisplay()
const drawer = ref(false)

const navItems = [
  { title: '首頁', to: '/', icon: 'mdi-home' },
  { title: '關於我們', to: '/aboutUs', icon: 'mdi-compass' },
  { title: '球場列表', to: '/venues', icon: 'mdi-map-marker' },
  { title: '我要打球', to: '/socials', icon: 'mdi-volleyball' },
  { title: '排球商城', to: '/shop', icon: 'mdi-cart' },
  { title: '會員中心', to: '/member', icon: 'mdi-account-outline' },
]
</script>

<style scoped lang="scss">
.navbar {
  opacity: 0.8;
}

.menu-item {
  color: vars.$primary-color;
  font-size: 0.9rem;
}

.btn {
  font-size: 1.8rem;
}
</style>
