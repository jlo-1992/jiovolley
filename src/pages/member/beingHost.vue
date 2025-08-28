<template>
  <div class="pt-8 bg-light">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-16 rounded-lg card-memberPage">
          <div>
            <div>
              <h1 class="font-weight-bold text-h4">揪團紀錄</h1>
            </div>
            <v-divider :thickness="2" opacity="20" class="mt-5"></v-divider>
          </div>

          <v-divider class="my-4"></v-divider>
          <v-row class="mt-4 align-center">
            <v-col cols="12">
              <v-card class="pa-4 rounded-lg card-memberPage">
                <h2 class="mb-4 font-weight-bold" style="font-size: 1.3rem">即將開打的場次</h2>
                <v-table height="300px" fixed-header striped="even">
                  <v-alert v-if="upcomingSocials.length === 0" type="info" class="mt-4">
                    目前沒有您的揪團紀錄
                  </v-alert>
                  <thead>
                    <tr>
                      <th class="text-left">球場</th>
                      <th class="text-left">時段</th>
                      <th class="text-left">價格</th>
                      <th class="text-left">球員名單</th>
                      <th class="text-left">出席登入</th>
                      <th class="text-left">備註</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(social, idx) in upcomingSocials" :key="idx">
                      <td>{{ social.venue.name }}</td>
                      <td>
                        {{ formatTime(social.startDateTime) }} -
                        {{ formatTime(social.endDateTime) }}
                      </td>
                      <td>{{ social.fee }}</td>
                      <td><v-btn @click="openDialog(social)" class="btn">球員名單</v-btn></td>
                      <td>
                        <v-btn class="btn" @click="openQrcodeDialog(social)">QR Code</v-btn>
                        <!-- <span v-else>QR Code 尚未生成</span> -->
                      </td>
                      <td>{{ social.note }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card>
              <v-card class="pa-4 rounded-lg mt-8 card-memberPage">
                <h2 class="mb-4 font-weight-bold" style="font-size: 1.3rem">已結束的場次</h2>

                <v-table height="300px" fixed-header striped="even">
                  <v-alert v-if="pastSocials.length === 0" type="info" class="mt-4">
                    目前沒有您的揪團紀錄
                  </v-alert>
                  <thead>
                    <tr>
                      <th class="text-left">球場</th>
                      <th class="text-left">時段</th>
                      <th class="text-left">價格</th>
                      <th class="text-left">球員名單</th>
                      <th class="text-left">備註</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(social, idx) in pastSocials" :key="idx">
                      <td>{{ social.venue?.name || '未知場地' }}</td>
                      <td>
                        {{ formatTime(social.startDateTime) }} -
                        {{ formatTime(social.endDateTime) }}
                      </td>
                      <td>{{ social.fee }}</td>
                      <td><v-btn class="btn" @click="openDialog(social)">球員名單</v-btn></td>

                      <td>{{ social.note }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <v-dialog v-model="dialog.open" persistent width="800">
    <v-card rounded="lg" class="card-dialog">
      <v-card-title class="text-center mt-3 page-title">球員名單</v-card-title>
      <v-icon-btn icon="mdi-close" @click="closeDialog" class="btn btn-close"></v-icon-btn>
      <v-divider thickness="2" opacity="20" color="black" class="mx-auto" width="25%"></v-divider>
      <v-card-text>
        <v-card class="card-players">
          <v-card-title
            >女性球員
            <template v-if="participantsList.length > 0 && participantsList[0].social"
              >（需求人數：{{ participantsList[0].social.demandFemalePlayers }}/ 已報名人數：{{
                participantsList[0].social.currentFemalePlayers
              }}）</template
            ></v-card-title
          >
          <v-table height="300px" fixed-header striped="even">
            <thead>
              <tr>
                <th class="text-left">球員</th>
                <th class="text-left">程度</th>
                <th class="text-left">出席率</th>
                <th class="text-left">狀態</th>
                <th class="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="femalePlayers.length === 0">
                <td>目前還沒有球員報名喔，趕快揪人去~</td>
              </tr>
              <tr v-else v-for="(player, idx) in femalePlayers" :key="idx">
                <td>{{ player.user.name }}</td>
                <td>{{ player.user.skillLevel }}</td>
                <td>
                  {{ player.user.attendanceRate }} ({{ player.user.attendancePresent }} /
                  {{ player.user.attendanceTotal }})
                </td>
                <td>{{ player.status }}</td>
                <td><v-icon-btn icon="mdi-pencil"></v-icon-btn></td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
        <v-card class="mt-5 card-players">
          <v-card-title>
            <template v-if="participantsList.length > 0 && participantsList[0].social">
              男性球員（需求人數：{{ participantsList[0].social.demandMalePlayers }}/ 已報名人數：{{
                participantsList[0].social.currentMalePlayers
              }}）</template
            ></v-card-title
          >
          <v-table height="300px" fixed-header striped="even">
            <thead>
              <tr>
                <th class="text-left">球員</th>
                <th class="text-left">程度</th>
                <th class="text-left">出席率</th>
                <th class="text-left">狀態</th>
                <th class="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="malePlayers.length === 0">
                <td style="font-size: 1rem">目前還沒有球員報名喔，趕快揪人去~</td>
              </tr>
              <tr v-else v-for="(player, idx) in malePlayers" :key="idx">
                <td>{{ player.user.name }}</td>
                <td>{{ player.user.skillLevel }}</td>
                <td>
                  {{ player.user.attendanceRate }}({{ player.user.attendancePresent }}/{{
                    player.user.attendanceTotal
                  }})
                </td>
                <td>{{ player.status }}</td>
                <td><v-icon-btn icon="mdi-pencil"></v-icon-btn></td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="qrcodeDialog.open" persistent width="500">
    <v-card rounded="lg" class="card-dialog">
      <v-card-title class="text-center mt-3 page-title">出席登入 Qrcode</v-card-title>
      <v-icon-btn icon="mdi-close" @click="closeQrcodeDialog" class="btn btn-close"></v-icon-btn>
      <v-divider thickness="2" opacity="20" color="black" class="mx-auto" width="25%"></v-divider>
      <v-card-text>
        <v-img :src="qrCodeDataUrl"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import socialParticipantService from '@/services/socialParticipantService'
import socialService from '@/services/socialService'
import { useSnackbar } from 'vuetify-use-dialog'
import userService from '@/services/userService'
import dayjs from 'dayjs'

const createSnackbar = useSnackbar()
const loading = ref(false)
const hostSocials = ref([])
const upcomingSocials = ref([])
const pastSocials = ref([])
const dialog = ref({
  // 控制對話框開關
  open: false,
  // 當前操作的留言 ID
  id: '',
})

const participantsList = ref([])
const femalePlayers = ref([])
const malePlayers = ref([])

const openDialog = async (social) => {
  dialog.value.open = true
  dialog.value.id = social._id
  await getParticipantsList(social)
}

const closeDialog = () => {
  dialog.value.open = false
  dialog.value.id = ''
}

const qrCodeDataUrl = ref('')

const qrcodeDialog = ref({
  open: false,
  id: '',
})

const openQrcodeDialog = async (social) => {
  qrcodeDialog.value.open = true
  qrcodeDialog.value.id = social._id
  await getQrcodeUrl(social)
}

const closeQrcodeDialog = () => {
  qrcodeDialog.value.open = false
  qrcodeDialog.value.id = ''
}

const getQrcodeUrl = async (social) => {
  try {
    const socialId = social._id
    const { data } = await socialService.getQrCode(socialId)
    qrCodeDataUrl.value = data.qrCodeDataUrl
    console.log('qrCodeDataUrl', qrCodeDataUrl.value)
  } catch (error) {
    console.error('Qrcode 取得失敗:', error)
    createSnackbar({
      text: '無法載入 Qrcode，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
    closeQrcodeDialog()
  }
}

const socialsHostedByMe = async () => {
  loading.value = true
  try {
    const { data: userData } = await userService.profile()
    const userId = userData.user._id
    // const { data } = await socialService.getAvailable()
    // const socials = Array.isArray(data) ? data : data.socials || []
    // hostSocials.value = socials.filter((social) => {
    //   return social.host?._id === userId
    // })
    // console.log('hostSocials', hostSocials.value)
    const { data: upcomingData } = await socialService.getAll({
      time: 'upcoming',
    })
    if (upcomingData.success) {
      upcomingSocials.value = (upcomingData.socials || []).filter((social) => {
        return social.host?._id === userId
      })
    }
    console.log('即將到來的場次:', upcomingSocials.value)

    const { data: pastData } = await socialService.getAll({ time: 'past' })
    if (pastData.success) {
      pastSocials.value = (pastData.socials || []).filter((social) => {
        return social.host?._id === userId
      })
    }
    console.log('已過期的場次:', pastSocials.value)
  } catch (error) {
    console.error('揪團紀錄取得失敗:', error)
    createSnackbar({
      text: '無法載入揪團紀錄，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const getParticipantsList = async (social) => {
  try {
    const socialid = social._id
    const { data } = await socialParticipantService.getParticipantsList(socialid)
    participantsList.value = data.participantsList

    // 使用 filter() 方法來篩選女性球員
    femalePlayers.value = participantsList.value.filter(
      (participant) => participant.user.gender === 'female'
    )
    // 使用 filter() 方法來篩選男性球員
    malePlayers.value = participantsList.value.filter(
      (participant) => participant.user.gender === 'male'
    )

    console.log('femalePlayers', femalePlayers.value)
    console.log('malePlayers', malePlayers.value)
  } catch (error) {
    console.error('球員名單取得失敗:', error)
    createSnackbar({
      text: '無法載入球員名單，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const formatTime = (isoString) => {
  // 檢查 isoString 是否有效，避免錯誤
  if (!isoString) return ''
  // 使用 dayjs 函式庫來格式化時間
  return dayjs(isoString).format('HH:mm')
}

onMounted(() => {
  socialsHostedByMe()
})
</script>

<style scoped lang="scss">
h1 {
  font-family: 'Huninn', sans-serif;
}

.btn-close {
  position: absolute;
  right: 10px;
  top: 10px;
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

.btn {
  background-color: #fdd000;
  font-weight: 100;
  color: black;
}

.card-players {
  box-shadow: 8px 8px 1px black;
}
</style>
