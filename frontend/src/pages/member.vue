<template>
  <v-navigation-drawer
    :rail="display.smAndDown.value"
    :temporary="display.smAndDown.value"
    :permanent="display.smAndUp.value"
    v-model="drawer"
    style="height: 100vh"
  >
    <v-list nav>
      <v-list-item
        prepend-avatar="../assets/images/passing.png"
        class="font-weight-bold text-h6 mt-3"
        style="font-family: 'Huninn', sans-serif"
        >{{ userName }}</v-list-item
      >
    </v-list>
    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        link
        prepend-icon="mdi-monitor-dashboard"
        to="/member"
        title="會員首頁"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-account"
        to="/member/profile"
        title="球員資料"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-heart"
        to="/member/favorites"
        title="我的收藏"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-volleyball"
        to="/member/socials"
        title="打 play 紀錄"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-account-group"
        to="/member/beingHost"
        title="揪團紀錄"
      ></v-list-item>
      <v-list-item link prepend-icon="mdi-cart" to="/member/cart" title="購物車"></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-calendar-text"
        to="/member/orders"
        title="我的訂單"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-btn class="btn" v-show="display.smAndDown.value" color="white" @click.stop="drawer = !drawer">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
  <!-- <v-main> -->
  <router-view />
  <!-- </v-main> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import userService from '@/services/userService'

const display = useDisplay()
const drawer = ref(true)
const userName = ref('')

const getUserName = async () => {
  try {
    const { data } = await userService.profile()

    userName.value = data.user.name
    console.log('userName', userName.value)
  } catch (error) {
    console.error('會員資料取得失敗:', error)
    createSnackbar({
      text: '無法載入會員資料，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

onMounted(() => {
  getUserName()
})
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 50%;
  width: 50px;
  height: 60px;
  bottom: 35px;
  left: 35px;
  position: fixed;
  z-index: 1000;
  font-size: 1.5rem;
  box-shadow: 2px 2px 1px 1px vars.$primary-color;
}
</style>

<route lang="yaml">
meta:
  title: '球員中心'
  # 只有在登入的狀態下可以看
  login: 'login-only'
  # 不是管理員也可以看
  admin: false
</route>
