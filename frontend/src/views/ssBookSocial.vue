<template>
  <v-container fluid class="bg-light pa-0">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <div class="banner-wrapper">
          <v-img
            class="banner-img"
            :class="{ 'scale-in': bannerImg }"
            src="../assets/images/banner/banner4.jpg"
            height="700"
            cover
            position="bottom"
          ></v-img>
          <div class="banner-overlay"></div>
          <div class="banner-content">
            <h3 class="banner-text">場次報名</h3>
            <h1 class="banner-subtext">別再等了，現在就揪團打 play，一起上場打球吧！</h1>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-form @submit.prevent="submit">
      <v-row justify="center" class="mt-1 mb-5">
        <v-col cols="10">
          <div class="text-right">
            <v-btn class="btn" @click="router.push('#createSocial')"
              ><v-icon>mdi-plus</v-icon>我要當主揪</v-btn
            >
          </div>
        </v-col>
        <v-col cols="11" md="5">
          <v-card class="pa-6 card-left" :class="isLoggedIn ? 'mt-0' : 'mt-9'" rounded="xl">
            <v-expansion-panels
              v-model="panel"
              variant="accordion"
              class="custom-panels"
              rounded="xl"
            >
              <!-- 選擇球場 Panel -->
              <v-expansion-panel value="venue">
                <v-expansion-panel-title class="py-4">
                  <template v-slot:default="{ expanded }">
                    <v-row no-gutters class="align-center">
                      <v-icon :color="selection.venue ? '#fdd000' : 'grey'" class="mr-4"
                        >mdi-check-circle</v-icon
                      >
                      <v-col class="d-flex justify-space-between" cols="10">
                        <span class="font-weight-bold">球場</span>
                        <v-fade-transition leave-absolute>
                          <span style="color: gray" key="1">
                            {{ selection.venue || '請先選擇縣市後再選擇球場 ' }}
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-item-group v-model="selection.venue">
                    <v-row>
                      <v-col cols="6" md="4">
                        <v-select
                          variant="outlined"
                          placeholder="請選擇縣市"
                          :items="cities"
                          clearable
                          v-model="selectedCity"
                          class="neubrutalism"
                          hide-details
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="6" md="5">
                        <v-autocomplete
                          placeholder="請選擇或輸入球場名稱"
                          :items="venueNames"
                          auto-select-first
                          variant="outlined"
                          clearable
                          :disabled="!selectedCity && venueNames.length === 0"
                          v-model="selection.venue"
                          class="neubrutalism"
                          hide-details
                        ></v-autocomplete>
                        <v-alert
                          v-if="selectedCity && venueNames.length === 0"
                          type="error"
                          text="該縣市無可選擇的球場"
                          class="mt-2"
                        ></v-alert>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- 選擇球技程度 Panel -->
              <v-expansion-panel value="skillLevel">
                <v-expansion-panel-title class="py-4">
                  <template v-slot:default="{ expanded }">
                    <v-row no-gutters class="align-center">
                      <v-icon :color="selection.skillLevel ? '#fdd000' : 'grey'" class="mr-4"
                        >mdi-check-circle</v-icon
                      >
                      <v-col class="d-flex justify-space-between" cols="10">
                        <span class="font-weight-bold">球技程度</span>
                        <v-fade-transition leave-absolute>
                          <span style="color: gray" key="1">
                            {{ selection.skillLevel || '請選擇球技程度' }}
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-item-group v-model="selection.skillLevel">
                    <v-row>
                      <v-col
                        v-for="skillLevel in skillLevels"
                        :key="skillLevel"
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-item v-slot="{ isSelected, toggle }" :value="skillLevel">
                          <v-card
                            :color="isSelected ? '#fdd000' : ''"
                            class="d-flex align-center justify-center pa-4 neubrutalism"
                            variant="outlined"
                            height="60"
                            @click="toggle"
                          >
                            <span>{{ skillLevel }}</span>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <!-- 選擇日期及時段 Panel -->
              <v-expansion-panel value="datetime">
                <v-expansion-panel-title>
                  <template v-slot:default="{ expanded }">
                    <v-row no-gutters class="align-center pb-5">
                      <v-icon
                        :color="selection.date && selection.time ? '#fdd000' : 'grey'"
                        class="mr-4"
                        >mdi-check-circle</v-icon
                      >
                      <v-col class="d-flex justify-space-between" cols="10">
                        <span class="font-weight-bold">日期及時段</span>
                        <v-fade-transition leave-absolute>
                          <span style="color: gray" key="1">
                            {{
                              selection.date && selection.time
                                ? `${formatDate(selection.date)} ${selection.time}`
                                : '請選擇日期及時段'
                            }}
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <!-- 日曆選擇器 -->
                    <v-col cols="12" md="6">
                      <v-date-picker
                        v-model="selection.date"
                        class="date-picker-custom"
                        show-adjacent-months
                        hide-header
                        color="#fdd000"
                        :allowed-dates="isDateSelectable"
                      ></v-date-picker>
                    </v-col>
                    <!-- 時間選擇器 -->
                    <v-col cols="12" md="6">
                      <div class="time-selection-container">
                        <div class="mb-4 ml-5">
                          <span class="font-weight-bold">時段</span>
                          <v-chip-group v-model="selection.time" column selected-class="bg-yellow">
                            <v-chip
                              v-for="(time, index) in selectableTimes"
                              :key="index"
                              :value="time"
                              filter
                              variant="outlined"
                            >
                              {{ time }}
                            </v-chip>
                          </v-chip-group>
                          <div
                            v-if="selectableTimes.length === 0 && selection.date"
                            class="mt-2 text-red"
                          >
                            此日期無可選擇的時段
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>

        <v-col cols="11" md="5">
          <h3 v-show="!isLoggedIn" class="text-right mb-2">
            想主揪新的打 play 時段嗎？<router-link
              style="color: #353d42; text-decoration: underline"
              :to="{ path: '/logInSingUp', query: { redirect: route.fullPath } }"
              >請點我登入</router-link
            >
          </h3>
          <v-card
            class="pa-6 mb-4 d-flex card-right"
            :class="display.smAndUp.value ? 'flex-row' : 'flex-column'"
            rounded="xl"
          >
            <iframe
              :src="mapSrc"
              style="border: 0"
              allowfullscreen="false"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div
              v-if="selectedVenue"
              class="d-flex flex-column justify-start align-start ml-5 mt-3"
            >
              <h2>
                球場名稱：<span class="text-gray-500">{{ selection.venue }}</span>
              </h2>
              <p>
                地址：<span class="text-gray-500"
                  >{{ selectedVenue.city }}{{ selectedVenue.address }}</span
                >
              </p>
              <p>
                交通資訊：<br /><span class="text-gray-500">{{ selectedVenue.trafficInfo }}</span>
              </p>
            </div>
            <div v-else class="d-flex flex-column justify-start align-start ml-5 mt-3">
              <h2>球場名稱：</h2>
              <p>地址：</p>
              <p>交通資訊：</p>
            </div>
          </v-card>

          <v-card class="pa-6 card-right" rounded="xl">
            <h3 class="text-h6">您的預約</h3>
            <v-list density="compact" lines="one">
              <v-list-item>
                <v-list-item-title><strong>球場:</strong></v-list-item-title>
                <v-list-item-subtitle>{{ selection.venue || '未選擇' }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title><strong>球技程度:</strong></v-list-item-title>
                <v-list-item-subtitle>{{ selection.skillLevel || '未選擇' }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title><strong>日期:</strong></v-list-item-title>
                <v-list-item-subtitle>{{
                  selection.date ? formatDate(selection.date) : '未選擇'
                }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title><strong>時段:</strong></v-list-item-title>
                <v-list-item-subtitle>{{ selection.time || '未選擇' }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" class="ml-3">
          <div app class="d-flex justify-center bg-light mt-1">
            <v-btn class="mr-4 btn" height="50" width="200" type="submit">確認報名</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="360">
    <v-card class="card-dialog">
      <v-card-title class="text-center mt-3">{{ dialog.message }}</v-card-title>
      <v-card-actions class="mt-3 mr-5">
        <v-btn class="btn" to="/" style="background-color: white">回首頁</v-btn>
        <v-btn class="btn" @click="navigateToLogin">前往登入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeMount, nextTick, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'
import venueService from '@/services/venueService'
import socialService from '@/services/socialService'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import socialParticipantService from '@/services/socialParticipantService'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone.js'
import { useVenueStore } from '@/stores/venueStore'
import { useSocialStore } from '@/stores/socialStore'
dayjs.extend(utc)
dayjs.extend(timezone) // 新增這一行
dayjs.tz.setDefault('Asia/Taipei') // 設定預設時區為台灣

const venueStore = useVenueStore()
const socialStore = useSocialStore()

const bannerImg = ref(null)
const dialog = ref({
  // 控制對話框開關
  open: false,
  message: '請先登入才能報名打 play 喔！',
})

// 新增檢查登入狀態的函數
const checkLoginStatus = () => {
  if (!isLoggedIn.value) {
    dialog.value.open = true
  }
}

// 修改導航函數
const navigateToLogin = () => {
  dialog.value.open = false
  router.push({
    path: '/logInSingUp',
    query: { redirect: route.fullPath },
  })
}

const display = useDisplay()
const route = useRoute()
const createSnackbar = useSnackbar()
const router = useRouter()
const panel = ref('venue') // 控制哪個面板是展開的
const skillLevels = ['S 體保生', 'A 一般生校隊', 'B 一般生系隊', 'C 排球初級班', 'D 排球初心者']
const user = useUserStore()
const isLoggedIn = computed(() => user.isLoggedIn)
const allVenues = ref([])
const allSocials = ref([])
const selectedCity = ref(null)

const venueNames = computed(() => {
  if (!selectedCity.value) {
    return []
  }
  return allVenues.value
    .filter((venue) => venue.city === selectedCity.value)
    .map((venue) => venue.name)
})

const selectedVenue = computed(() => {
  if (!selection.value.venue) {
    return null
  }
  return allVenues.value.find((venue) => venue.name === selection.value.venue)
})

const mapSrc = computed(() => {
  if (!selection.value.venue) {
    return 'https://maps.google.com/maps?q=臺灣&t=&z=10&ie=UTF8&iwloc=&output=embed'
  }
  const encodedAddress = encodeURIComponent(selection.value.venue)
  return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`
})

const cities = [
  '臺北市',
  '新北市',
  '基隆市',
  '桃園市',
  '臺中市',
  '臺南市',
  '高雄市',
  '宜蘭縣',
  '新竹縣',
  '新竹市',
  '苗栗縣',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義縣',
  '嘉義市',
  '屏東縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
]

const selection = ref({
  venue: '',
  skillLevel: null,
  date: null,
  time: null,
  socialId: null,
})

const selectableDates = computed(() => {
  if (!selection.value.venue || !selection.value.skillLevel) {
    return []
  }

  // 1. 根據球場和球技程度篩選出符合條件的場次
  const filteredSocials = allSocials.value.filter((social) => {
    const venueName = social.venue?.name || ''
    return venueName === selection.value.venue && social.skillLevel === selection.value.skillLevel
  })

  // 使用 Set 來儲存不重複的日期
  const dateSet = new Set(
    // 將 UTC 時間轉換為台灣本地時間，然後格式化日期
    filteredSocials.map((social) =>
      dayjs.utc(social.startDateTime).tz('Asia/Taipei').format('YYYY-MM-DD'),
    ),
  )

  return Array.from(dateSet)
})

const isDateSelectable = (date) => {
  // 將傳入的日期轉換為台灣本地時間，然後格式化
  const formattedDate = dayjs.tz(date, 'Asia/Taipei').format('YYYY-MM-DD')
  return selectableDates.value.includes(formattedDate)
}

// 使用 UTC 進行時間過濾
const selectableTimes = computed(() => {
  if (!selection.value.date || !selection.value.venue || !selection.value.skillLevel) {
    return []
  }

  const selectedDate = dayjs.tz(selection.value.date, 'Asia/Taipei').format('YYYY-MM-DD')

  const matchingSocials = allSocials.value.filter((social) => {
    // 將資料庫的 UTC 時間轉換為台灣本地時間格式進行比對
    const socialDate = dayjs.utc(social.startDateTime).tz('Asia/Taipei').format('YYYY-MM-DD')
    const venueName = social.venue?.name || ''
    return (
      venueName === selection.value.venue &&
      social.skillLevel === selection.value.skillLevel &&
      socialDate === selectedDate
    )
  })

  const times = matchingSocials.map((social) => {
    // 將資料庫的 UTC 時間轉換為台灣本地時間，然後格式化
    const startTime = dayjs.utc(social.startDateTime).tz('Asia/Taipei').format('HH:mm')
    const endTime = dayjs.utc(social.endDateTime).tz('Asia/Taipei').format('HH:mm')
    return `${startTime}-${endTime}`
  })
  return [...new Set(times)]
})

// 尋找最終的 socialId
const finalSocialId = computed(() => {
  if (
    !selection.value.venue ||
    !selection.value.skillLevel ||
    !selection.value.date ||
    !selection.value.time
  ) {
    return null
  }

  const selectedDateStr = dayjs.tz(selection.value.date, 'Asia/Taipei').format('YYYY-MM-DD')
  const [startTimeStr, endTimeStr] = selection.value.time.split('-')

  const matchingSocial = allSocials.value.find((social) => {
    // 將資料庫的 UTC 時間轉換為台灣本地時間格式進行比對
    const socialDateStr = dayjs.utc(social.startDateTime).tz('Asia/Taipei').format('YYYY-MM-DD')
    const socialStartTimeStr = dayjs.utc(social.startDateTime).tz('Asia/Taipei').format('HH:mm')
    const socialEndTimeStr = dayjs.utc(social.endDateTime).tz('Asia/Taipei').format('HH:mm')

    return (
      social.venue.name === selection.value.venue &&
      social.skillLevel === selection.value.skillLevel &&
      socialDateStr === selectedDateStr &&
      socialStartTimeStr === startTimeStr &&
      socialEndTimeStr === endTimeStr
    )
  })
  console.log('Matching social found:', matchingSocial)
  return matchingSocial ? matchingSocial._id : null
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: yup.object({
    socialId: yup.string().required('請完整填寫所有資料，包含球場、球技程度、日期及時段'),
  }),
  initialValues: {
    socialId: finalSocialId.value, // 預設值設為 finalSocialId
  },
})

const submit = async (values) => {
  console.log('表單提交觸發，finalSocialId:', finalSocialId.value)

  try {
    const socialId = finalSocialId.value
    console.log('socialId:', socialId)
    if (!socialId) {
      createSnackbar({
        text: '請確認所有資料皆已填寫，包含球場、球技程度、日期及時段',
        snackbarProps: { color: 'red' },
      })
      return
    }

    const { data } = await socialParticipantService.create(socialId, values)
    console.log('API 回應:', data)

    createSnackbar({
      text: '場次報名成功！可以到會員中心查看報名狀態喔~',
      snackbarProps: {
        color: 'green',
      },
    })
    resetSelection()
    venueStore.clearSelectedVenue()
    socialStore.clearSelectedSocial()
  } catch (error) {
    console.error('場次報名失敗：', error)
    createSnackbar({
      text: error?.response?.data?.message || '場次報名失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const resetSelection = () => {
  selection.value = {
    venue: '',
    skillLevel: null,
    date: null,
    time: null,
    socialId: null,
  }
  panel.value = 'venue'
}

// 同樣修改 formatDate 函式，使用本地時間
function formatDate(date) {
  if (!date) return ''
  const d = dayjs.tz(date, 'Asia/Taipei')
  return d.format('YYYY年M月D日')
}

const getVenues = async () => {
  try {
    const { data } = await venueService.getAvailable()
    if (data && data.venues) {
      allVenues.value = data.venues
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

const getSocials = async () => {
  try {
    const { data } = await socialService.getAvailable()
    if (data && data.socials) {
      allSocials.value = data.socials
      console.log('場次列表取得成功，資料筆數:', data.socials.length)
      console.log('範例資料:', data.socials[0])
    } else {
      allSocials.value = []
      console.log('API 回傳的場次資料為空')
    }
  } catch (error) {
    console.error('取得場次失敗', error)
    createSnackbar({
      text: '無法載入場次資料，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

onMounted(async () => {
  await getVenues()
  getSocials()
  setTimeout(() => {
    bannerImg.value = true
  }, 100)
  if (venueStore.selectedVenue) {
    const { city, name } = venueStore.selectedVenue
    selectedCity.value = city
    await nextTick()
    selection.value.venue = name
  }
  if (socialStore.selectedSocial) {
    const { city, name } = socialStore.selectedSocial.venue
    const { skillLevel, startDateTime, endDateTime } = socialStore.selectedSocial
    selectedCity.value = city
    await nextTick()
    selection.value.venue = name
    selection.value.skillLevel = skillLevel
    const socialDateStr = dayjs.utc(startDateTime).tz('Asia/Taipei').format('YYYY-MM-DD')
    const socialStartTimeStr = dayjs.utc(startDateTime).tz('Asia/Taipei').format('HH:mm')
    const socialEndTimeStr = dayjs.utc(endDateTime).tz('Asia/Taipei').format('HH:mm')
    selection.value.date = socialDateStr
    await nextTick()
    selection.value.time = `${socialStartTimeStr}-${socialEndTimeStr}`
  }
})

// 新增 onBeforeMount 鉤子
onBeforeMount(() => {
  checkLoginStatus()
})

onBeforeUnmount(() => {
  venueStore.clearSelectedVenue()
  socialStore.clearSelectedSocial()
})

watch(selectedCity, () => {
  selection.value.venue = null // 清空已選球場
})

watch(
  () => selection.value.date,
  (newDate) => {
    if (newDate) {
      // 當日期改變時，清空時段選擇
      selection.value.time = null
      console.log('日期變更，重置時段選擇')
    }
  },
)

// 監聽選擇變化，自動展開下一個面板
watch(
  () => selection.value.venue,
  (newVal) => {
    if (newVal) {
      panel.value = 'skillLevel'
    }
  },
)

watch(
  () => selection.value.skillLevel,
  (newVal) => {
    if (newVal) {
      panel.value = 'datetime'
    }
  },
)
</script>

<style scoped lang="scss">
.bg-light {
  padding-bottom: 130px;
}

.card-left {
  min-height: 660px;
  border: 2px solid black;
  box-shadow: 3px 6px 1px black;
}

.card-right {
  border: 2px solid black;
  box-shadow: 3px 6px 1px black;
}

.custom-panels .v-expansion-panel {
  border-bottom: 1px solid #e9ecef;
}

.custom-panels .v-expansion-panel:last-child {
  border-bottom: none;
}

.date-picker-custom {
  box-shadow: 3px 6px 1px black;
  border: 2px solid black;
  padding: 5px;
}

.date-picker-custom :deep(.v-date-picker-header) {
  display: flex;
}

.time-selection-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: top;
}

/* 覆蓋 vuetify 的某些樣式以符合設計 */
:deep(.v-expansion-panel-title__overlay) {
  opacity: 0;
}

:deep(.v-expansion-panel-title.py-4) {
  min-height: 64px; /* 確保高度一致 */
}

/* 調整 v-expansion-panel-text 的 padding，使其內容與標題的文字對齊 */
:deep(.v-expansion-panel-text__wrapper) {
  padding-left: calc(24px + 16px + 16px); /* Icon width + mr-4 + default padding */
  padding-right: 16px; /* default padding */
  padding-top: 16px;
  padding-bottom: 16px;
}

/* 調整 v-chip-group 欄位間距 */
:deep(.v-chip-group) {
  gap: 8px;
}

/* 確保 v-row align-center 垂直對齊 */
.v-expansion-panel-title .v-row.align-center {
  align-items: center;
}

h3 {
  color: vars.$primary-color;
}

iframe {
  width: 100%;
  height: 300px;
  border-radius: 16px;
}

.banner-wrapper {
  position: relative;
  width: 100%;
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
    transform: scale(2) translateY(-170px);
  }
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

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

.card-dialog {
  background-color: vars.$secondary-color;
  border: 2px solid black;
  padding: 20px;
}

.bg-yellow {
  background-color: #fdd000;
  box-shadow: 3px 6px 1px black;
}

@media (min-width: 768px) {
  iframe {
    width: 50%;
  }
}
</style>
