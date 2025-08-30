<template>
  <v-btn
    :icon="icon"
    @click="!isLoggedIn ? openDialog() : toggleFavorite(venue)"
    class="btn-heart"
    variant="default"
  >
  </v-btn>
  <v-dialog v-model="dialog.open" persistent width="360">
    <v-card class="card-dialog">
      <v-card-title class="text-center mt-10">{{ dialog.message }}</v-card-title>
      <v-icon-btn icon="mdi-close" @click="closeDialog" class="btn-close"></v-icon-btn>
      <v-card-actions>
        <v-btn class="btn mx-auto mt-3 mb-5" @click="navigateToLogin">前往登入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import userService from '@/services/userService'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'

const createSnackbar = useSnackbar()
const isFavorite = computed(() => {
  // 從 userStore 取得 favoriteVenues 列表
  // 並判斷當前球場 ID 是否存在於列表中
  return userStore.favoriteVenues.includes(props.venue._id)
})
const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)
const router = useRouter()
const route = useRoute()

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  venue: {
    type: Object,
    required: true, // 強制要求父元件傳遞 venue 物件
  },
})

const toggleFavorite = async () => {
  try {
    const venueId = props.venue._id
    // 在 store 中即時更新收藏狀態，而不用等待後端回傳
    if (isFavorite.value) {
      // 如果已經收藏，則移除
      userStore.removeFavoriteVenue(venueId)
    } else {
      // 如果沒有收藏，則新增
      userStore.addFavoriteVenue(venueId)
    }

    await userService.updateFavoriteVenues({ venueId })

    createSnackbar({
      text: isFavorite.value ? '收藏成功！' : '已移除收藏！',
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '收藏失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const dialog = ref({
  // 控制對話框開關
  open: false,
  message: '請先登入才能收藏球場喔！',
})

const closeDialog = () => {
  dialog.value.open = false
}

const openDialog = () => {
  dialog.value.open = true
}

const navigateToLogin = () => {
  dialog.value.open = false
  router.push({
    path: '/logInSingUp',
    query: { redirect: route.fullPath },
  })
}
</script>

<style scoped lang="scss">
.btn-heart {
  color: #fdd000;
}

.btn-close {
  background-color: #fdd000;
  border: 2px solid black;
  box-shadow: 2px 4px 1px black;
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 8px;
}
.btn-close:hover {
  box-shadow: none;
  transform: translate(3px, 3px);
}
</style>
