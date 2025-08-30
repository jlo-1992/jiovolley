<template>
  <v-container class="bg-dark">
    <v-card class="pa-16 mt-1 card-memberPage">
      <div>
        <div>
          <h1 class="font-weight-bold text-h4">打 play 紀錄</h1>
          <v-divider :thickness="2" opacity="20" class="mt-5"></v-divider>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>
      <v-row class="mt-4 align-center">
        <v-col cols="12">
          <v-card class="pa-4 card-memberPage">
            <h2 class="mb-4 font-weight-bold" style="font-size: 1.3rem">即將開打的場次</h2>
            <v-table height="300px" fixed-header striped="even">
              <thead>
                <tr>
                  <th class="text-left">球場</th>
                  <th class="text-left">日期</th>
                  <th class="text-left">時段</th>
                  <th class="text-left">價格</th>
                  <th class="text-left">主揪</th>
                  <th class="text-left">狀態</th>
                  <th class="text-left">備註</th>
                  <th class="text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(social, idx) in upcomingSocials" :key="idx">
                  <td>{{ social.social.venue.name }}</td>
                  <td>{{ formatDate(social.social.startDateTime) }}</td>
                  <td>
                    {{ formatTime(social.social.startDateTime) }} -
                    {{ formatTime(social.social.endDateTime) }}
                  </td>
                  <td>{{ social.social.fee }}</td>
                  <td>{{ social.social.host.name }}</td>
                  <td>{{ social.status }}</td>
                  <td>{{ social.note }}</td>
                  <td>
                    <v-icon-btn
                      icon="mdi-delete"
                      class="deleteBtn"
                      title="取消報名"
                      @click="openDialog(social)"
                    ></v-icon-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
          <v-card class="pa-4 mt-8 card-memberPage">
            <h2 class="mb-4 font-weight-bold" style="font-size: 1.3rem">已結束的場次</h2>
            <v-table height="300px" fixed-header striped="even">
              <thead>
                <tr>
                  <th class="text-left">球場</th>
                  <th class="text-left">日期</th>
                  <th class="text-left">時段</th>
                  <th class="text-left">價格</th>
                  <th class="text-left">主揪</th>
                  <th class="text-left">狀態</th>
                  <th class="text-left">備註</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(social, idx) in pastSocials" :key="idx">
                  <td>{{ social.social.venue.name }}</td>
                  <td>{{ formatDate(social.social.startDateTime) }}</td>
                  <td>
                    {{ formatTime(social.social.startDateTime) }} -
                    {{ formatTime(social.social.endDateTime) }}
                  </td>
                  <td>{{ social.social.fee }}</td>
                  <td>{{ social.social.host.name }}</td>
                  <td>{{ social.status }}</td>
                  <td>{{ social.note }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="350">
    <v-card rounded="lg">
      <v-card-title class="text-center mt-3">{{ dialog.message }}</v-card-title>
      <v-card-actions>
        <v-btn color="red" @click="changeParticipateState(social)">確定取消</v-btn>
        <v-btn color="black" @click="closeDialog">關閉視窗</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import socialParticipantService from '@/services/socialParticipantService'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone.js'
import { useSnackbar } from 'vuetify-use-dialog'
dayjs.extend(utc)
dayjs.extend(timezone) // 新增這一行
dayjs.tz.setDefault('Asia/Taipei') // 設定預設時區為台灣

const myParticipations = ref([])
const upcomingSocials = ref([])
const pastSocials = ref([])
const createSnackbar = useSnackbar()
const dialog = ref({
  // 控制對話框開關
  open: false,
  // 當前操作的 ID
  id: '',
  message: '再考慮一下，確定要取消報名嗎？',
})

const openDialog = (participation) => {
  console.log('participation', participation)
  dialog.value.open = true
  dialog.value.id = participation.social._id
}

const closeDialog = () => {
  dialog.value.open = false
  dialog.value.id = ''
}

const changeParticipateState = async () => {
  try {
    const socialId = dialog.value.id
    console.log('要取消報名的 socialId:', socialId)
    const response = await socialParticipantService.update(socialId, { status: '已取消報名' })

    if (response.data.message === '已過取消報名期限，如臨時無法出席，請自行找人補。') {
      return createSnackbar({
        text: '已過取消報名期限，如臨時無法出席，請自行找人補。',
        snackbarProps: {
          color: 'red',
        },
      })
    }

    closeDialog()
    createSnackbar({
      text: '已取消報名該場次！如果改變心意了，可以再到報名頁面報名喔~',
      snackbarProps: {
        color: 'green',
      },
    })
    await getMyparticipants()
  } catch (error) {
    console.error('無法修改報名狀態', error)
    createSnackbar({
      text: '無法修改報名狀態，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  // 使用 .utc() 確保 dayjs 將其解析為 UTC 時間
  return dayjs.utc(isoString).tz('Asia/Taipei').format('YYYY-MM-DD')
}

// 格式化時間，將 UTC 時間視為本地時間
const formatTime = (isoString) => {
  if (!isoString) return ''
  // 使用 .utc() 確保 dayjs 將其解析為 UTC 時間
  return dayjs.utc(isoString).tz('Asia/Taipei').format('HH:mm')
}

const getMyparticipants = async () => {
  try {
    myParticipations.value = await socialParticipantService.getMyParticipations()

    const { data: upcomingData } = await socialParticipantService.getMyParticipations({
      time: 'upcoming',
    })
    upcomingSocials.value = upcomingData.myParticipations
    console.log('即將到來的場次:', upcomingSocials.value)

    const { data: pastData } = await socialParticipantService.getMyParticipations({ time: 'past' })
    pastSocials.value = pastData.myParticipations
    console.log('已過期的場次:', pastSocials.value)
  } catch (error) {
    console.error('打 play 紀錄取得失敗:', error)
    createSnackbar({
      text: '無法載入打 play 紀錄，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
onMounted(() => {
  getMyparticipants()
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

.bg-light {
  padding-bottom: 155px;
}

.deleteBtn:hover {
  background-color: #ffd000;
}
</style>
