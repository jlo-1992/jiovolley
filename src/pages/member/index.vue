<template>
  <v-container class="bg-dark">
    <v-card class="bg-light pt-10 mt-1 pb-5" style="border: 2px solid black">
      <v-row>
        <v-col cols="4" md="6">
          <v-tooltip text="回首頁" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="outlined"
                class="ml-7 btn-hover"
                rounded="0"
                to="/"
                size="40"
                v-bind="props"
                ><v-icon>mdi-home</v-icon></v-btn
              >
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="8" md="6" class="d-flex">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            density="compact"
            placeholder="請輸入關鍵字"
            hide-details
            style="background-color: #f1f1f1; border: 2px solid black"
            class="mr-md-10 mr-3"
          ></v-text-field>
          <v-btn class="mr-md-2 mr-1 btn-hover" variant="outlined" rounded="0" to="/" size="40"
            ><v-icon>mdi-bell</v-icon></v-btn
          >
          <v-avatar
            rounded="0"
            image="@/assets/images/passing.png"
            style="border: 2px solid black"
            class="mr-7 btn-hover"
          ></v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" md="7">
          <h1 class="card-title mb-3 ml-7">球員檔案 Player Information</h1>
          <v-card class="pa-5 card-memberPage mb-5 ml-7" color="#fdd000">
            <v-row>
              <v-col cols="4">
                <v-img
                  style="border: 2px solid black"
                  :src="userInfo.avatar"
                  height="320"
                  width="250"
                  class="mt-1"
                  cover
                ></v-img>
              </v-col>
              <v-col cols="8" class="ml-n5">
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <h1 class="font-weight-bold mt-n1 mb-1" style="font-size: 2rem">
                      {{ userInfo.name }}
                    </h1>
                    <v-tooltip text="編輯球員檔案" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          to="/member/profile"
                          rounded="0"
                          size="35"
                          variant="outlined"
                          class="btn-hover mt-1"
                          ><v-icon icon="mdi-pencil"></v-icon
                        ></v-btn>
                      </template>
                    </v-tooltip>
                  </div>
                  <h3>{{ userInfo.gender }}．{{ userInfo.skillLevel }}．</h3>
                  <h3>{{ userInfo.email }}</h3>
                  <div class="d-flex justify-space-between mt-5">
                    <div>
                      <v-card class="card-border mr-n4 text-center" width="130" rounded="0">
                        <v-card-title class="font-weight-bold text-h5">{{
                          socialsAttendedNum
                        }}</v-card-title>
                        <v-card-text>打過的 play </v-card-text>
                      </v-card>
                    </div>
                    <div>
                      <v-card class="card-border mr-n4 text-center" width="130" rounded="0">
                        <v-card-title class="font-weight-bold text-h5">{{
                          socialsHostedNum
                        }}</v-card-title>
                        <v-card-text>揪過的 play </v-card-text>
                      </v-card>
                    </div>
                    <div>
                      <v-card class="card-border mr-n4 text-center" width="130" rounded="0">
                        <v-card-title class="font-weight-bold text-h5">{{ joinAgo }}</v-card-title>
                        <v-card-text>加入揪排咖 </v-card-text>
                      </v-card>
                    </div>
                    <div>
                      <v-card class="card-border text-center" width="130" rounded="0">
                        <v-card-title class="font-weight-bold text-h5">{{ joinAgo }}</v-card-title>
                        <v-card-text>加入揪排咖 </v-card-text>
                      </v-card>
                    </div>
                  </div>
                  <div>
                    <h1 class="font-weight-bold mt-6" style="font-size: 1.3rem">
                      {{ userInfo.quote }}
                    </h1>
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="11" md="5">
          <h1 class="card-title mt-1 mb-2 ml-7 ml-md-0">排球行事曆 Events Calender</h1>
          <v-card
            class="pa-4 card-memberPage mr-md-7 ml-7 ml-md-0"
            height="368"
            style="overflow-y: scroll"
          >
            <v-row class="fill-height">
              <v-col>
                <v-sheet height="350">
                  <v-calendar
                    ref="calendar"
                    v-model="today"
                    :events="events"
                    color="#353D42"
                    type="month"
                  ></v-calendar>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <div class="card-title mb-2 ml-7">出席統計 Presence Rate</div>
          <v-card class="card-memberPage mr-10 mr-md-7 ml-7 mb-7" height="225">
            <v-pie
              :items="currentItems"
              :legend="{ position: $vuetify.display.mdAndUp ? 'right' : 'bottom' }"
              :tooltip="{ subtitleFormat: '[value]%' }"
              class="justify-center mt-5"
              inner-cut="70"
              item-key="id"
              rounded="2"
              size="180"
              animation
              hide-slice
              reveal
            >
              <template v-slot:center>
                <div class="text-center">
                  <div class="card-title text-h5">出席率</div>
                  <div class="opacity-70 text-h4 mt-1 mb-n1">90%</div>
                </div>
              </template>

              <template v-slot:legend="{ items, toggle, isActive }">
                <v-list class="py-0 mb-n5 mb-md-0 bg-transparent" density="compact" width="150">
                  <v-list-item
                    v-for="item in items"
                    :key="item.key"
                    :class="['my-1', { 'opacity-40': !isActive(item) }]"
                    :title="item.title"
                    rounded="xl"
                    link
                  >
                    <template v-slot:prepend>
                      <v-avatar :color="item.color" :size="16"></v-avatar>
                    </template>
                    <template v-slot:append>
                      <div class="font-weight-bold">{{ item.value }}%</div>
                    </template>
                  </v-list-item>
                </v-list>
              </template>
            </v-pie>
          </v-card>
        </v-col>
        <v-col cols="11" md="8" class="ml-md-n7 ml-7 mr-7 mb-8 mb-md-0">
          <div class="d-flex justify-space-between">
            <h1 class="card-title mb-2">收藏的球場 Favorite Courts</h1>
            <v-tooltip text="編輯收藏" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mr-md-2 mr-1 mt-1 btn-hover"
                  variant="outlined"
                  rounded="0"
                  to="/member/favorites"
                  size="35"
                  v-bind="props"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
              </template>
            </v-tooltip>
          </div>

          <v-card
            height="225"
            v-if="!favoriteVenues || favoriteVenues.length === 0"
            class="card-memberPage"
          >
            <v-card-title style="font-size: 1.5rem; line-height: 200px" class="text-center">
              你還沒有收藏任何球場喔~快到
              <router-link to="/venueList"
                ><span style="text-decoration: underline">球場列表</span></router-link
              >
              搜尋喜歡的球場吧！
            </v-card-title>
          </v-card>
          <swiper
            :slidesPerView="'4'"
            :navigation="true"
            :modules="modules"
            :space-between="220"
            class="mySwiper"
          >
            <swiper-slide v-for="(venue, idx) in favoriteVenues" :key="idx">
              <v-card
                class="card-memberPage card-favoriteVenues"
                width="300"
                height="220"
                :to="`/venueSingle/${venue._id}`"
              >
                <v-img :src="venue.imageUrl" class="fill-height img-favoriteVenues" cover></v-img>
                <h2 class="venueName">{{ venue.name }}</h2>
              </v-card>
            </swiper-slide>
          </swiper>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { useDisplay, useDate } from 'vuetify'
import { onMounted, ref, shallowRef, toRef } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import userService from '@/services/userService'
import venueService from '@/services/venueService'
import socialService from '@/services/socialService'
import socialParticipantService from '@/services/socialParticipantService'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-tw'
import { set } from '@vueuse/core'

dayjs.extend(relativeTime)
dayjs.locale('zh-tw')

const modules = [Navigation]
const display = useDisplay()
let joinAgo = ref('')
let socialsHostedNum = ref(0)
let socialsAttendedNum = ref(0)
const favoriteVenues = ref([])
const defaultVenueImage = ref('@/assets/images/gabi hitting.jpg.jpg')

// 我的出席統計
const selectedGroup = shallowRef('Transactions')
const currentItems = toRef(() =>
  selectedGroup.value === 'Transactions'
    ? [
        {
          id: 1,
          title: '出席',
          value: 90,
          color: '#ffd000',
        },
        { id: 2, title: '缺席', value: 10, color: '#f1f1f1', pattern: 'url(#pattern-0)' },
      ]
    : [
        { id: 1, title: '出席', value: 90, color: '#353D42' },
        { id: 2, title: '缺席', value: 10, color: '#f1f1f1' },
      ]
)

// 我的排球行事曆
const calendar = ref()

const today = ref([new Date()])
const events = ref([])
const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
// 預計改成傳入的球場名稱
const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
const userInfo = ref({})

function fetchEvents({ start, end }) {
  const _events = []
  const min = start
  const max = end
  const days = (max.getTime() - min.getTime()) / 86400000
  const eventCount = rnd(days, days + 20)
  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0
    const firstTimestamp = rnd(min.getTime(), max.getTime())
    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
    const second = new Date(first.getTime() + secondTimestamp)
    _events.push({
      title: names[rnd(0, names.length - 1)],
      start: first,
      end: second,
      color: colors[rnd(0, colors.length - 1)],
      allDay: !allDay,
    })
  }
  events.value = _events
}
function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

const getUserInfo = async () => {
  try {
    // 使用者資料
    const { data: userData } = await userService.profile()
    if (!userData || !userData.user) {
      console.log('API 回傳資料格式不正確或無使用者資料', userData)
      return
    }
    userInfo.value = userData.user
    joinAgo.value = dayjs(userInfo.value.createdAt).fromNow()

    // 主揪的場次
    const { data: socialData } = await socialService.getAll()
    if (socialData && socialData.socials) {
      const socialHostedByMe = socialData.socials.filter(
        (social) => social.host?._id === userInfo.value._id
      )
      socialsHostedNum.value = socialHostedByMe.length
    } else {
      console.log('API 回傳活動資料格式不正確', socialData)
    }

    // 參與的場次
    const { data: myParticipationsData } = await socialParticipantService.getMyParticipations()
    if (myParticipationsData && myParticipationsData.myParticipations) {
      socialsAttendedNum.value = myParticipationsData.myParticipations.length
    } else {
      console.log('API 回傳參與活動資料格式不正確', myParticipationsData)
    }

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

onMounted(() => {
  getUserInfo()
  const adapter = useDate()
  fetchEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())),
    end: adapter.endOfDay(adapter.endOfMonth(new Date())),
  })
})
</script>

<style lang="scss" scoped>
.bg-dark {
  min-height: 100vh;
}

.card-title {
  font-family: 'Huninn', sans-serif;
  font-weight: bold;
  font-size: 1.8rem;
}

.btn-hover {
  border: 2px solid black;
  background-color: white;
}

.btn-hover:hover {
  background-color: #fdd000;
}

.card-border {
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.575);
}

.card-favoriteVenues {
  position: relative;
  cursor: pointer;
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
.card-favoriteVenues:hover .venueName {
  box-shadow: 2px 4px 1px #fdd000;
}

.img-favoriteVenues {
  transition: 0.5s;
}

.card-favoriteVenues:hover .img-favoriteVenues {
  transform: scale(1.3);
}
</style>

<style>
.mySwiper .swiper-button-prev,
.mySwiper .swiper-button-next {
  color: white;
}
</style>
