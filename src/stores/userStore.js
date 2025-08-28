// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const email = ref('')
    const cartTotal = ref(0)
    const role = ref('user')
    const token = ref('')
    const gender = ref('')
    const skillLevel = ref('')
    const name = ref('')
    const favoriteVenues = ref([])

    const isLoggedIn = computed(() => token.value.length > 0)
    const isAdmin = computed(() => role.value === 'admin')

    const login = (data) => {
      email.value = data.email
      cartTotal.value = data.cartTotal
      role.value = data.role
      skillLevel.value = data.skillLevel
      gender.value = data.gender
      name.value = data.name
      favoriteVenues.value = data.favoriteVenues

      // 重新整理頁面時，用 token 取得使用者資料
      // 這個回應不包含 token
      if (data.token) {
        token.value = data.token
      }
    }

    const logout = () => {
      email.value = ''
      cartTotal.value = 0
      role.value = 'user'
      token.value = ''
      gender.value = ''
      skillLevel.value = ''
      name.value = ''
      favoriteVenues.value = []
    }

    const setFavoriteVenues = (venues) => {
      favoriteVenues.value = venues
    }

    const addFavoriteVenue = (venueId) => {
      // 檢查是否已存在，避免重複加入
      if (!favoriteVenues.value.includes(venueId)) {
        favoriteVenues.value.push(venueId)
      }
    }

    // 在前端本地移除一個收藏項目
    const removeFavoriteVenue = (venueId) => {
      const index = favoriteVenues.value.indexOf(venueId)
      if (index !== -1) {
        favoriteVenues.value.splice(index, 1)
      }
    }

    return {
      email,
      cartTotal,
      role,
      token,
      gender,
      skillLevel,
      name,
      isLoggedIn,
      isAdmin,
      favoriteVenues,
      login,
      logout,
      setFavoriteVenues,
      addFavoriteVenue,
      removeFavoriteVenue,
    }
  },
  {
    persist: {
      key: 'jiovolley-user',
      pick: ['token', 'favoriteVenues'],
    },
  },
)
