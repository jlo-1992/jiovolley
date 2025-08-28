<template>
  <v-container v-show="isLoggedIn" class="bg-dark" fluid>
    <div v-if="display.mdAndUp.value" class="bg-stripe"></div>
    <v-card class="mx-auto mt-10 pb-15 pt-5 mb-15 card" rounded="md">
      <v-row justify="center" class="mt-5">
        <v-col cols="10" md="8" lg="8" xl="8" class="text-center">
          <h1 class="mb-3 page-title" id="createSocial">我要當主揪！</h1>
          <h3 class="subtitle" style="color: #353d42">
            沒有時間、球場、程度適合你的時段嗎？ 是時候跳出來當主揪建立一個最適合你的打 play
            時段了吧！<br />
          </h3>
          <v-divider class="mt-3" :thickness="2" color="#f1f1f1" opacity="20"></v-divider>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-form :disabled="isSubmitting" @submit.prevent="submit">
            <v-row no-gutters class="align-center mb-5 mt-8">
              <v-col cols="12" md="2">
                <h5 class="subheader text-sm-start text-center">球場名稱</h5>
              </v-col>
              <v-col cols="4" md="3">
                <v-select
                  clearable
                  class="mr-3 neubrutalism"
                  rounded="sm"
                  density="comfortable"
                  bg-color="#f1f1f1"
                  label="請選擇縣市"
                  hide-details
                  :items="cities"
                  v-model="selectedCity"
                ></v-select>
              </v-col>
              <v-col cols="8" md="7">
                <v-autocomplete
                  clearable
                  class="mr-md-3 neubrutalism"
                  rounded="sm"
                  density="comfortable"
                  bg-color="#f1f1f1"
                  label="請選擇或輸入球場名稱"
                  hide-details
                  :items="venueItems"
                  :item-title="venueItems.title"
                  :item-value="venueItems.value"
                  :disabled="!selectedCity && venueItems.length === 0"
                  v-model="venue.value.value"
                  :error-messages="venue.errorMessage.value"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" md="2">
                <h5 class="subheader text-sm-start text-center">play 場時段</h5>
              </v-col>
              <v-row>
                <v-col cols="12" md="4" class="mt-md-7 ml-10 ml-md-0">
                  <v-date-picker
                    v-model="socialDate.value.value"
                    :error-messages="socialDate.errorMessage.value"
                    :min="minDate"
                    style="border: 1px solid black"
                    rounded="lg"
                    class="neubrutalism"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" md="4" style="width: 350px; flex: 0 1 auto">
                  <h2 class="ml-10 ml-md-0">開始時間：</h2>
                  <v-time-picker
                    v-model="startTime.value.value"
                    :error-messages="startTime.errorMessage.value"
                    :max="endTime.value.value"
                    style="border: 1px solid black"
                    rounded="lg"
                    class="pb-4 mr-5 neubrutalism ml-10 ml-md-0"
                  ></v-time-picker>
                </v-col>
                <v-col cols="12" md="4" style="width: 350px; flex: 0 1 auto">
                  <h2 class="ml-10 ml-md-0">結束時間：</h2>
                  <v-time-picker
                    v-model="endTime.value.value"
                    :error-messages="endTime.errorMessage.value"
                    :min="startTime.value.value"
                    style="border: 1px solid black"
                    rounded="lg"
                    class="pb-4 neubrutalism ml-10 ml-md-0"
                  ></v-time-picker>
                </v-col>
              </v-row>
            </v-row>

            <v-row no-gutters class="align-center mb-5 mt-10">
              <v-col cols="12" md="2">
                <h5 class="subheader text-sm-start text-center">球技程度</h5>
              </v-col>
              <v-col cols="12" md="10">
                <v-select
                  clearable
                  class="neubrutalism"
                  density="comfortable"
                  bg-color="#f1f1f1"
                  label="請選擇需求的球技程度"
                  hide-details
                  :items="skillLevels"
                  v-model="skillLevel.value.value"
                  :error-messages="skillLevel.errorMessage.value"
                ></v-select>
              </v-col>
            </v-row>

            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" md="2">
                <h5 class="subheader text-sm-start text-center">球員數</h5>
              </v-col>
              <v-col cols="12" md="5">
                <v-number-input
                  class="mr-md-5 neubrutalism"
                  :reverse="false"
                  controlVariant="split"
                  label="請輸入需求的女性球員數"
                  :hideInput="false"
                  inset
                  hide-details
                  bg-color="#f1f1f1"
                  v-model="demandFemalePlayers.value.value"
                  :error-messages="demandFemalePlayers.errorMessage.value"
                ></v-number-input>
              </v-col>
              <v-col cols="12" md="5">
                <v-number-input
                  :reverse="false"
                  controlVariant="split"
                  label="請輸入需求的男性球員數"
                  :hideInput="false"
                  inset
                  bg-color="#f1f1f1"
                  v-model="demandMalePlayers.value.value"
                  :error-messages="demandMalePlayers.errorMessage.value"
                  class="neubrutalism"
                  hide-details
                ></v-number-input>
              </v-col>
            </v-row>

            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" md="2">
                <h5 class="subheader text-sm-start text-center">場次費用</h5>
              </v-col>
              <v-col cols="12" md="10">
                <v-number-input
                  class="neubrutalism"
                  :reverse="false"
                  controlVariant="split"
                  :hideInput="false"
                  inset
                  bg-color="#f1f1f1"
                  v-model="fee.value.value"
                  :error-messages="fee.errorMessage.value"
                  label="請輸入場次的費用"
                  hide-details
                ></v-number-input>
              </v-col>
            </v-row>

            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" md="2">
                <h5 class="subheader text-sm-start text-center mt-4">備註</h5>
              </v-col>
              <v-col cols="12" md="10">
                <v-textarea
                  clearable
                  bg-color="#f1f1f1"
                  v-model="note.value.value"
                  :error-messages="note.errorMessage.value"
                  class="neubrutalism"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row justify="end" class="mb-5">
              <v-col cols="12" md="10">
                <v-btn style="font-size: 1.2rem" width="100%" height="50" type="submit" class="btn"
                  >建立場次</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-dialog v-model="successDialog.open" persistent width="550">
    <v-card class="card-dialog">
      <v-card-title class="text-center mt-15">{{ successDialog.message }}</v-card-title>
      <v-icon-btn icon="mdi-close" @click="closeDialog" class="btn-close"></v-icon-btn>
      <v-card-actions class="mt-3 mr-5">
        <v-btn class="btn mb-5 mr-8" @click="navigateToMember">前往會員中心</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="lottie-overlay" v-if="isSubmitting">
    <DotLottieVue
      style="height: 500px; width: 500px"
      autoplay
      loop
      src="https://lottie.host/4583ad3e-73e1-4f3a-83d5-048a1943aaa7/gPKIV1O45e.lottie"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useDate } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import venueService from '@/services/venueService'
import socialService from '@/services/socialService'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useSnackbar } from 'vuetify-use-dialog'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone.js'
import { useDisplay } from 'vuetify'
import { useVenueStore } from '@/stores/venueStore'

dayjs.extend(utc)
dayjs.extend(timezone) // 新增這一行
dayjs.tz.setDefault('Asia/Taipei') // 設定預設時區為台灣

const user = useUserStore()
const isLoggedIn = computed(() => user.isLoggedIn)
const createSnackbar = useSnackbar()
const router = useRouter()
const route = useRoute()
const enabled = ref(false)
const display = useDisplay()
const venueStore = useVenueStore()

const cities = ref([
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
])

const skillLevels = ref([
  'S 體保生',
  'A 一般生校隊',
  'B 一般生系隊',
  'C 排球初級班',
  'D 排球初心者',
])
const selectedCity = ref(null)
const allVenues = ref([])
const venueItems = computed(() => {
  if (!selectedCity.value) {
    return []
  }
  return allVenues.value
    .filter((venue) => venue.city === selectedCity.value)
    .map((venue) => ({
      title: venue.name,
      value: venue._id,
    }))
})

const successDialog = ref({
  open: false,
  message: '場次建立成功！可以到會員中心查看報名狀態喔~',
})

const navigateToMember = () => {
  successDialog.value.open = false
  router.push({
    path: '/member/beingHost',
    query: { redirect: route.fullPath },
  })
}

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate()) // 這裡的 .getDate()+1 會得到明天的日期，如果沒有+1則為今天
  // 將日期轉換為 'YYYY-MM-DD' 格式，這是 v-date-picker 所需的格式
  return tomorrow.toISOString().split('T')[0]
})

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: yup.object({
    venue: yup.string().required('球場必選').min(1, '球場名稱不能為空'),
    socialDate: yup.date().required('場次日期必填'),
    startTime: yup.string().required('場次開始時間必填'),
    endTime: yup.string().required('場次結束時間必填'),
    skillLevel: yup.string().required('場次球技程度限制必填'),
    demandFemalePlayers: yup.number().required('場次需求女性球員數必填').min(0),
    demandMalePlayers: yup.number().required('場次需求男性球員數必填').min(0),
    fee: yup.number().required('場次費用必填').min(0),
    note: yup.string(),
  }),
  initialValues: {
    venue: '',
    socialDate: '',
    startTime: '',
    endTime: '',
    skillLevel: '',
    demandFemalePlayers: 0,
    demandMalePlayers: 0,
    fee: 0,
    note: '',
  },
})

const venue = useField('venue')
const socialDate = useField('socialDate')
const startTime = useField('startTime')
const endTime = useField('endTime')
const skillLevel = useField('skillLevel')
const demandFemalePlayers = useField('demandFemalePlayers')
const demandMalePlayers = useField('demandMalePlayers')
const fee = useField('fee')
const note = useField('note')

const submit = handleSubmit(async (values) => {
  // 將表單值賦予給新的變數，避免直接修改 values
  const payload = { ...values }

  // 直接將使用者選擇的日期和時間組合成字串
  const startDateTimeLocal = dayjs(values.socialDate)
    .hour(values.startTime.split(':')[0])
    .minute(values.startTime.split(':')[1])
  const endDateTimeLocal = dayjs(values.socialDate)
    .hour(values.endTime.split(':')[0])
    .minute(values.endTime.split(':')[1])
  console.log('startDateTimeLocal:', startDateTimeLocal)
  console.log('endDateTimeLocal:', endDateTimeLocal)

  // 將本地時間字串轉換成UTC時間，再以ISO格式傳送
  payload.startDateTime = dayjs(startDateTimeLocal).utc().toISOString()
  payload.endDateTime = dayjs(endDateTimeLocal).utc().toISOString()

  // 移除多餘的欄位，只留下後端 Schema 需要的
  delete payload.socialDate
  delete payload.startTime
  delete payload.endTime

  try {
    // 呼叫後端服務來建立場次，並傳入整理好的 payload
    const { data } = await socialService.create(payload)

    // 成功後的提示與導向
    // createSnackbar({
    //   text: '場次新增成功！',
    //   snackbarProps: {
    //     color: 'green',
    //   },
    // })

    // 重設表單
    resetForm()
    selectedCity.value = ''
    venueStore.clearSelectedVenue()
    successDialog.value.open = true
  } catch (error) {
    console.error('場次新增失敗：', error)
    createSnackbar({
      text: error?.response?.data?.message || '場次新增失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

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

onMounted(async () => {
  await getVenues()
  if (venueStore.selectedVenue) {
    const { city, name } = venueStore.selectedVenue
    selectedCity.value = city
    await nextTick()
    venue.value.value = name
  }
})

onBeforeUnmount(() => {
  venueStore.clearSelectedVenue()
})

watch(selectedCity, () => {
  console.log(venueItems.value)
  venue.value.value = null

  // 清空已選球場
})
</script>

<style lang="scss" scoped>
.bg-dark {
  padding-top: 70px;
  position: relative;
}

.card {
  padding: 15px;
  background-color: white;
  border: 2px solid black;
  z-index: 2;
  margin-bottom: 50px;
}

.bg-stripe {
  position: absolute;
  border-radius: 8px;
  // border: 1px solid black;
  top: 8%;
  right: 8%;
  width: 1550px;
  height: 1500px;
  z-index: 1;
  background-image: repeating-linear-gradient(
    -75deg,
    black 0,
    black 40px,
    #f1f1f1 40px,
    #fdd000 42px
  );
}

.subheader {
  color: vars.$primary-color;
  font-size: 1.2rem;
  margin-right: 20px;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 1.1rem;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
}

.lottie-overlay {
  // 固定在視窗上，不隨滾動條移動
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.neubrutalism {
  box-shadow: 3px 6px 1px vars.$primary-color;
  border-radius: 8px;
  margin-bottom: 15px;

  :deep(.v-field) {
    border-radius: 8px !important;
  }

  :deep(.v-field__outline::before),
  :deep(.v-field__outline::after) {
    border-style: none !important;
  }
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

@media (min-width: 768px) {
  .card {
    width: 1550px;
  }
  .subtitle {
    font-size: 1.2rem;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: bold;
  }
}
</style>
