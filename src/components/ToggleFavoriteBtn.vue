<template>
  <v-btn
    :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
    @click="toggleFavorite(venue)"
    class="btn-heart"
    variant="plain"
  >
  </v-btn>
</template>

<script setup>
import { ref, computed } from 'vue'
import userService from '@/services/userService'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/userStore'

const createSnackbar = useSnackbar()
const isFavorite = computed(() => {
  // 從 userStore 取得 favoriteVenues 列表
  // 並判斷當前球場 ID 是否存在於列表中
  return userStore.favoriteVenues.includes(props.venue._id)
})
const userStore = useUserStore()

const props = defineProps({
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
</script>

<style scoped lang="scss">
.btn-heart {
  color: #fdd000;
}
</style>
