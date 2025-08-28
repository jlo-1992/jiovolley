// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVenueStore = defineStore(
  'venue',
  () => {
    const selectedVenue = ref(null)
    const setSelectedVenue = (venue) => {
      selectedVenue.value = venue
    }
    const clearSelectedVenue = () => {
      selectedVenue.value = null
    }

    return {
      selectedVenue,
      setSelectedVenue,
      clearSelectedVenue,
    }
  },
  {
    persist: {
      key: 'jiovolley-venue',
      pick: ['selectedVenue'],
    },
  },
)
