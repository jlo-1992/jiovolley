<template>
  <div class="bg-light">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" class="pa-0">
          <div class="banner-wrapper">
            <v-img
              class="banner-img"
              :class="{ 'scale-in': bannerImg }"
              src="../assets/images/banner/banner7.jpg"
              height="700"
              cover
              position="top"
            ></v-img>
            <div class="banner-overlay"></div>
            <div class="banner-content">
              <h3 class="banner-text">搜尋球場</h3>
              <h1 class="banner-subtext">找到離你最近的球場，然後，開始打球吧！</h1>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row> </v-row>
      <v-row>
        <v-col cols="12" xl="9" lg="9" md="9" style="margin: auto">
          <div class="text-right">
            <v-btn
              width="150"
              height="35"
              class="btn mr-n2 mb-3"
              @click="!isLoggedIn ? openDialog() : router.push('#createVenue')"
              ><v-icon>mdi-plus</v-icon>新增球場</v-btn
            >
          </div>
          <v-row justify="center" class="bg-dark mt-2 mb-10">
            <div class="bg-stripe"></div>
            <v-col cols="12" md="6" class="bg-dark1">
              <v-text-field
                placeholder="請輸入球場或地址的關鍵字"
                bg-color="#f1f1f1"
                rounded="xl"
                hide-details
                class="search-field mb-5 mt-3"
                density="comfortable"
                clearable
                v-model="searchText"
              ></v-text-field>
              <div class="d-flex align-center">
                <v-divider
                  class="flex-grow-1"
                  thickness="2"
                  color="#f1f1f1"
                  opacity="20"
                ></v-divider>
                <div class="d-flex mx-4">
                  <span class="mx-1">或</span>
                  <span class="mx-1">選</span>
                  <span class="mx-1">擇</span>
                  <span class="mx-1">縣</span>
                  <span class="mx-1">市</span>
                </div>
                <v-divider
                  class="flex-grow-1"
                  thickness="2"
                  color="#f1f1f1"
                  opacity="20"
                ></v-divider>
              </div>
              <v-card>
                <v-tabs bg-color="#353D42" center-active v-model="tab" color="#fdd000">
                  <v-tab v-for="(tab, idx) in tabs" :value="tab.value" :key="idx">{{
                    tab.name
                  }}</v-tab>
                </v-tabs>
                <v-tabs-window v-model="tab">
                  <v-tabs-window-item
                    v-for="(tabItem, idx) in tabs"
                    :value="tabItem.value"
                    :key="idx"
                  >
                    <div v-if="displayedVenues.length > 0">
                      <swiper
                        v-if="display.smAndDown.value"
                        :slides-per-view="auto"
                        :space-between="5"
                        :centered-slides="true"
                        class="mySwiper"
                      >
                        <swiper-slide
                          v-for="(venue, index) in displayedVenues"
                          :key="index"
                          class="venue-bg"
                        >
                          <div class="venue-row">
                            <div class="venue-name">{{ venue.name }}</div>
                            <ToggleFavoriteBtn
                              :venue="venue"
                              :icon="isFavorite(venue._id) ? 'mdi-heart' : 'mdi-heart-outline'"
                            />
                          </div>
                          <div class="venue-row">
                            <v-icon>mdi-map-marker</v-icon>
                            <div class="venue-address">{{ venue.city }}{{ venue.address }}</div>
                          </div>
                          <div class="text-center">
                            <v-btn class="btn btn-showOnMap mr-10" @click="showOnMap(venue.name)"
                              >在地圖上顯示</v-btn
                            >
                            <v-btn class="btn btn-venueInfo" :to="`/venueSingle/${venue._id}`"
                              >球場與場次資訊</v-btn
                            >
                          </div>
                        </swiper-slide>
                      </swiper>
                      <div v-else class="scrollable-container">
                        <div
                          v-for="(venue, index) in displayedVenues"
                          :key="index"
                          class="venue-bg"
                        >
                          <div class="venue-row">
                            <div class="venue-name">{{ venue.name }}</div>
                            <ToggleFavoriteBtn
                              :venue="venue"
                              class="ml-n3"
                              :icon="isFavorite(venue._id) ? 'mdi-heart' : 'mdi-heart-outline'"
                            />
                          </div>
                          <div class="venue-row">
                            <v-icon>mdi-map-marker</v-icon>
                            <div class="venue-address">{{ venue.city }}{{ venue.address }}</div>
                          </div>
                          <div class="text-center">
                            <v-btn class="btn btn-showOnMap" @click="showOnMap(venue.name)"
                              >在地圖上顯示</v-btn
                            >
                            <v-btn class="btn btn-venueInfo" :to="`/venueSingle/${venue._id}`"
                              >球場與場次資訊</v-btn
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-center pa-4">
                      <p>
                        目前此縣市沒有可用的球場。
                        <router-link
                          v-if="!isLoggedIn"
                          style="color: #353d42; text-decoration: underline"
                          :to="{ path: '/logInSingUp', query: { redirect: route.fullPath } }"
                          >請點我登入
                        </router-link>
                        <span v-else style="color: #353d42">請到下方</span>新增球場吧！
                      </p>
                    </div>
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card>
              <div v-if="display.smAndDown.value" class="d-flex align-center mt-3">
                <v-divider
                  class="flex-grow-1"
                  thickness="2"
                  color="#f1f1f1"
                  opacity="20"
                ></v-divider>
                <div class="d-flex mx-4">
                  <span class="mx-1">請</span>
                  <span class="mx-1">左</span>
                  <span class="mx-1">右</span>
                  <span class="mx-1">拖</span>
                  <span class="mx-1">曳</span>
                  <span class="mx-1">瀏</span>
                  <span class="mx-1">覽</span>
                </div>
                <v-divider
                  class="flex-grow-1"
                  thickness="2"
                  color="#f1f1f1"
                  opacity="20"
                ></v-divider>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="bg-dark2">
              <iframe
                :src="mapSrc"
                style="border: 0"
                allowfullscreen="false"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <v-dialog v-model="dialog.open" persistent width="360">
    <v-card class="card-dialog">
      <v-card-title class="text-center mt-3">{{ dialog.message }}</v-card-title>
      <v-icon-btn icon="mdi-close" @click="closeDialog" class="btn-close"></v-icon-btn>
      <v-card-actions>
        <v-btn class="btn mx-auto mt-3" @click="navigateToLogin">前往登入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'
import venueService from '@/services/venueService'
import { useSnackbar } from 'vuetify-use-dialog'
import ToggleFavoriteBtn from '@/components/ToggleFavoriteBtn.vue'

const user = useUserStore()
const isLoggedIn = computed(() => user.isLoggedIn)
const isFavorite = (venueId) => {
  if (!user.isLoggedIn || !user.favoriteVenues) {
    return false
  }
  return user.favoriteVenues.includes(venueId)
}
const router = useRouter()
const route = useRoute()
const display = useDisplay()
const createSnackbar = useSnackbar()
const tab = ref('新北市')
const venues = ref([])
const searchText = ref('')
const allVenues = ref([])
const displayedVenues = ref([])
const mapSrc = ref('https://maps.google.com/maps?q=台灣&t=&z=10&ie=UTF8&iwloc=&output=embed')
const bannerImg = ref(null)
const dialog = ref({
  // 控制對話框開關
  open: false,
  message: '請先登入才能新增球場喔！',
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

const tabs = [
  { name: '基隆市', value: '基隆市' },
  { name: '新北市', value: '新北市' },
  { name: '臺北市', value: '臺北市' },
  { name: '桃園市', value: '桃園市' },
  { name: '新竹市', value: '新竹市' },
  { name: '新竹縣', value: '新竹縣' },
  { name: '宜蘭縣', value: '宜蘭縣' },
  { name: '苗栗縣', value: '苗栗縣' },
  { name: '臺中市', value: '臺中市' },
  { name: '彰化縣', value: '彰化縣' },
  { name: '南投縣', value: '南投縣' },
  { name: '雲林縣', value: '雲林縣' },
  { name: '嘉義市', value: '嘉義市' },
  { name: '嘉義縣', value: '嘉義縣' },
  { name: '臺南市', value: '臺南市' },
  { name: '高雄市', value: '高雄市' },
  { name: '澎湖縣', value: '澎湖縣' },
  { name: '屏東縣', value: '屏東縣' },
  { name: '臺東縣', value: '臺東縣' },
  { name: '花蓮縣', value: '花蓮縣' },
  { name: '金門縣', value: '金門縣' },
]

const getVenues = async () => {
  try {
    const { data } = await venueService.getAvailable()
    if (data && data.venues) {
      allVenues.value = data.venues
      updateDisplayedVenues()
      console.log('球場列表取得成功', allVenues.value)
    } else {
      allVenues.value = []
      console.log('API 回傳資料格式不正確', data)
    }
  } catch (error) {
    console.error('球場列表取得失敗:', error)
    createSnackbar({
      text: '無法載入球場資料，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

// 當 tab 的值改變時，篩選出的球場列表也會自動更新
const updateDisplayedVenues = () => {
  // 如果搜尋欄有值，執行整體搜尋
  if (searchText.value) {
    const searchLower = searchText.value.toLowerCase()
    // 篩選出所有符合關鍵字的球場
    const searchResults = allVenues.value.filter(
      (venue) =>
        venue.name.toLowerCase().includes(searchLower) ||
        venue.address.toLowerCase().includes(searchLower) ||
        (venue.description && venue.description.toLowerCase().includes(searchLower))
    )
    // 檢查搜尋結果的縣市，如果所有結果都屬於同一個縣市，就自動切換 Tab
    const citiesInResults = [...new Set(searchResults.map((v) => v.city))]
    if (citiesInResults.length === 1) {
      tab.value = citiesInResults[0]
    }
    // 將結果存入 displayedVenues
    displayedVenues.value = searchResults
  } else {
    displayedVenues.value = allVenues.value.filter((venue) => venue.city === tab.value)
  }
}

// 監聽 tab 和 searchText 的變化
watch(tab, () => {
  updateDisplayedVenues()
})
watch(searchText, () => {
  updateDisplayedVenues()
})

const showOnMap = (name) => {
  const encodedAddress = encodeURIComponent(`${name}`)
  mapSrc.value = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`
}

onMounted(() => {
  getVenues()
  setTimeout(() => {
    bannerImg.value = true
  }, 100)
})
</script>

<style scoped lang="scss">
.bg-dark {
  border-radius: 24px;
  border: 1px solid black;
  min-height: 870px;
  position: relative;
  isolation: isolate;
}

.bg-stripe {
  position: absolute;
  border-radius: 24px;
  // border: 1px solid black;
  top: 25px;
  left: 25px;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: repeating-linear-gradient(-45deg, black 0, black 20px, gray 20px, gray 23px);
}

.bg-dark1 {
  background-color: vars.$primary-color;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  margin-top: 10px;
  padding-left: 25px;
}

.bg-dark2 {
  background-color: vars.$primary-color;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-bottom: 50px;
  padding-top: 25px;
  padding-right: 15px;
}

.bg-light {
  padding-bottom: 150px;
  padding-left: 0;
  padding-right: 0;
}

span {
  color: #f1f1f1;
  font-size: 1.1rem;
}

h3 {
  color: vars.$primary-color;
}

iframe {
  width: 100%;
  border-radius: 24px;
  height: 450px;
  margin: 10px auto;
}

.scrollable-container {
  max-height: 650px;
  overflow-y: scroll;
  padding: 5px;
}
.scrollable-container .venue-bg:last-child {
  margin-bottom: 0;
}

.venue-bg {
  background-color: vars.$secondary-color;
  margin-bottom: 10px;
  padding-bottom: 20px;
  padding-top: 15px;
  border-radius: 16px;
}

.venue-row {
  margin-left: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 5px;
}

.venue-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.btn-venueInfo {
  border-radius: 30px;
  margin-top: 10px;
  background-color: white;
  color: vars.$primary-color;
}

.card-dialog {
  padding: 25px 25px 15px 25px;
}

.btn-showOnMap {
  background-color: vars.$primary-color;
  color: white;
  border-radius: 30px;
  margin-top: 10px;
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

.banner-wrapper {
  position: relative;
  width: 100vw;
  height: 700px;
  margin-bottom: 50px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
}

.scale-in {
  animation: scaleIn 10s ease-in-out forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(2) translateY(-150px);
  }
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

// :deep(*) {
//   scrollbar-width: none; /* Firefox */
//   -ms-overflow-style: none; /* IE and Edge */

//   &::-webkit-scrollbar {
//     display: none; /* Chrome, Safari and Opera */
//   }
// }

.banner-content {
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 80px 10%;
}
.banner-text {
  color: white;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.banner-subtext {
  color: white;
  font-size: 2rem;
}

.search-field {
  :deep(.v-field__outline::before),
  :deep(.v-field__outline::after) {
    border-style: none !important;
  }
}

@media (min-width: 768px) {
  iframe {
    width: 99%;
    border-radius: 24px;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .btn,
  .btn-light {
    width: 40%;
    height: 40px;
    margin-right: 20px;
    font-size: 1rem;
  }

  .venue-name {
    font-size: 1.3rem;
  }
  .venue-address {
    font-size: 1.1rem;
  }
}
</style>
