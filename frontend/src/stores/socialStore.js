// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSocialStore = defineStore(
  'social',
  () => {
    const selectedSocial = ref(null)
    const setSelectedSocial = (social) => {
      selectedSocial.value = social
    }
    const clearSelectedSocial = () => {
      selectedSocial.value = null
    }

    return {
      selectedSocial,
      setSelectedSocial,
      clearSelectedSocial,
    }
  },
  {
    persist: {
      key: 'jiovolley-social',
      pick: ['selectedSocial'],
    },
  },
)
