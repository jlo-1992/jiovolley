<template>
  <v-container class="bg-dark">
    <v-card class="mt-1 pa-16 card-memberPage">
      <div>
        <div>
          <h1 class="font-weight-bold text-h4">我的收藏</h1>
          <v-divider :thickness="2" opacity="20" class="mt-5"></v-divider>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>
      <v-row class="mt-4 align-center">
        <v-col cols="12">
          <h2 class="mb-3 font-weight-bold" style="font-size: 1.7rem">球場收藏</h2>
          <v-card class="pa-8 card-memberPage" color="#f1f1f1">
            <swiper
              :slidesPerView="'4'"
              :navigation="true"
              :modules="modules"
              :space-between="5"
              class="mySwiper"
            >
              <swiper-slide v-for="(venue, idx) in favoriteVenues" :key="idx">
                <v-card
                  class="card-memberPage card-favoriteVenues"
                  width="330"
                  height="250"
                  :to="`/venueSingle/${venue._id}`"
                >
                  <v-tooltip text="移除收藏" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon-btn
                        :venue="venue"
                        v-bind="props"
                        icon="mdi-close"
                        class="btn btn-close"
                        @click.prevent.stop="removeFavoriteVenue(venue._id)"
                      ></v-icon-btn>
                    </template>
                  </v-tooltip>
                  <v-img :src="venue.imageUrl" class="fill-height img-favoriteVenues" cover></v-img>
                  <h2 class="venueName">{{ venue.name }}</h2>
                </v-card>
              </swiper-slide>
            </swiper>
          </v-card>
          <h2 class="mb-4 mt-8 font-weight-bold" style="font-size: 1.7rem">商品收藏</h2>
          <v-card class="pa-8 card-memberPage"> </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import userService from '@/services/userService'
import venueService from '@/services/venueService'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { useSnackbar } from 'vuetify-use-dialog'
import ToggleFavoriteBtn from '@/components/ToggleFavoriteBtn.vue'

const modules = [Navigation]
const router = useRouter()
const defaultVenueImage = ref('@/assets/images/gabi hitting.jpg.jpg')
const favoriteVenues = ref([])
const userInfo = ref({})
const createSnackbar = useSnackbar()

const getUserInfo = async () => {
  try {
    // 使用者資料
    const { data: userData } = await userService.profile()
    if (!userData || !userData.user) {
      console.log('API 回傳資料格式不正確或無使用者資料', userData)
      return
    }
    userInfo.value = userData.user

    // 球場照片
    const { data: venueData } = await venueService.getAvailable()
    if (venueData && venueData.venues && userInfo.value.favoriteVenues) {
      const userFavoriteIds = new Set(userInfo.value.favoriteVenues)
      favoriteVenues.value = venueData.venues
        .filter((venue) => userFavoriteIds.has(venue._id))
        .map((venue) => {
          const imageUrl =
            venue.images && venue.images.length > 0 ? venue.images[0] : defaultVenueImage.value
          return { ...venue, imageUrl }
        })
    }
  } catch (error) {
    console.error('使用者資料取得失敗:', error)
  }
}

const removeFavoriteVenue = async (venueId) => {
  const originalFavorites = [...favoriteVenues.value]
  favoriteVenues.value = favoriteVenues.value.filter((venue) => venue._id !== venueId)

  try {
    await userService.updateFavoriteVenues({ venueId })
  } catch (error) {
    favoriteVenues.value = originalFavorites
    console.error('移除收藏失敗:', error)
    createSnackbar({
      text: '無法移除收藏，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

onMounted(() => {
  getUserInfo()
})
</script>

<style scoped lang="scss">
.bg-dark {
  min-height: 100vh;
}

h1 {
  font-family: 'Huninn', sans-serif;
}

h3 {
  font-family: 'Cooper Black', sans-serif;
}

th {
  font-size: 1.2rem;
}

.card-favoriteVenues {
  position: relative;
  cursor: pointer;
  // box-shadow: 10px 10px 2px black;
}

.venueName {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: vars.$primary-color;
  padding: 5px 10px;
  white-space: nowrap;
  border-radius: 8px;
}
.card-favoriteVenues:hover {
  box-shadow: 10px 10px 2px black;

  .venueName {
    box-shadow: 2px 4px 1px #fdd000;
  }
  .img-favoriteVenues {
    transform: scale(1.3);
  }
}

.img-favoriteVenues {
  transition: 0.5s;
}

.btn-close {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
}
</style>
