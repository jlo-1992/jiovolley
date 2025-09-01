<template>
  <v-container fluid class="bg pa-0">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <div class="banner-wrapper">
          <v-img
            class="banner-img"
            :class="{ 'scale-in': bannerImg }"
            src="../../assets/images/banner/banner2.jpg"
            height="700px"
            cover
            position="top"
          ></v-img>
          <div class="banner-overlay"></div>
          <div class="banner-content">
            <h3 class="banner-text">球場介紹</h3>
            <h1 class="banner-subtext">看看不同的球場風景，然後，挑一個屬於你的主場吧！</h1>
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="blurred-bg-layer" :style="backgroundStyle"></div>
    <v-row justify="center">
      <template v-if="display.smAndDown.value">
        <v-col cols="12" style="position: relative">
          <div class="main-pic-wrapper">
            <v-img height="485" class="img" :src="coverPhoto" cover></v-img>
            <div class="overlay-text">
              <div class="venueName-wrapper d-flex align-center">
                <h1 class="venueName">{{ venue.name }}</h1>
                <ToggleFavoriteBtn
                  size="38"
                  :icon="isFavorite(venue._id) ? 'mdi-heart' : 'mdi-heart-outline'"
                  class="mt-2 ml-2"
                  :venue="venue"
                />
                <v-icon-btn
                  icon="mdi-pencil"
                  size="38"
                  color="#fdd000"
                  @click="openDialog(venue)"
                  class="edit-btn"
                  variant="text"
                >
                </v-icon-btn>
              </div>

              <div class="d-flex align-center" cols="12">
                <v-icon>mdi-map-marker-outline</v-icon>
                <h3 class="venueAddress">{{ venue.city }}{{ venue.address }}</h3>
              </div>
            </div>
          </div>

          <div v-if="venue.images && venue.images.length > 0" class="pics-wrapper">
            <v-img
              v-for="(img, index) in venue.images"
              class="pic"
              width="60"
              height="60"
              cover
              :key="index"
              :src="img"
              @click="changeCoverPhoto(index)"
              :class="{ 'active-pic': selectedIndex === index }"
            ></v-img>
          </div>
        </v-col>

        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="4" sm="3" md="1" v-for="(item, idx) of venue.facilities" :key="idx">
              <h3 class="facility text-center mr-4 mb-3 ml-5 mt-3 py-2">{{ item }}</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <h2 class="ml-6">球場簡介</h2>
        </v-col>
        <v-col cols="12">
          <p class="ml-6 mr-6 bg-article">
            {{ venue.description }}
          </p>
        </v-col>
        <v-col cols="12">
          <h2 class="ml-6">交通及停車資訊</h2>
        </v-col>
        <v-col cols="12">
          <p class="ml-6 mr-6 bg-article">
            {{ venue.trafficInfo }}
          </p>
        </v-col>
        <v-col class="mb-10 mt-5 text-center mr-8 ml-12" cols="12">
          <v-row>
            <v-col cols="6">
              <v-btn
                height="50"
                width="170"
                class="btn mr-10"
                to="/socials"
                rounded="lg"
                @click="goBookSocials(venue)"
                >我要報 play</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                height="50"
                width="170"
                class="btn"
                rounded="lg"
                to="/socials/#createSocial"
                @click="goCreateSocial(venue)"
                >我要揪團</v-btn
              >
            </v-col>
          </v-row>
          <h3 class="text-right mt-4 mr-6">最後編輯：{{ lastUpdateByName }}</h3>
        </v-col>
      </template>

      <template v-else>
        <v-col cols="4" class="main-content-row mr-10">
          <div class="info-wrapper">
            <div class="venueName-wrpper d-flex align-center">
              <h1 class="venueName">
                {{ venue.name }}
              </h1>
              <ToggleFavoriteBtn
                size="38"
                :icon="isFavorite(venue._id) ? 'mdi-heart' : 'mdi-heart-outline'"
                class="mt-1 ml-1"
                :venue="venue"
              />
              <v-icon-btn
                icon="mdi-pencil"
                size="38"
                color="#fdd000"
                @click="openDialog(venue)"
                class="edit-btn"
                variant="text"
              >
              </v-icon-btn>
            </div>

            <div class="d-flex align-center mb-5">
              <v-icon>mdi-map-marker-outline</v-icon>
              <h2 class="venueAddress ml-2">{{ venue.city }}{{ venue.address }}</h2>
            </div>

            <v-row no-gutters class="mb-5">
              <v-col cols="6" sm="4" md="4" v-for="(item, idx) of venue.facilities" :key="idx">
                <h3 class="facility text-center mr-5 mb-3 py-2">{{ item }}</h3>
              </v-col>
            </v-row>
            <h2 class="mb-3 mt-5">球場簡介</h2>
            <div class="article-wrapper">
              <p class="bg-article">
                <span class="line-clamp">{{ venue.description }}</span>
              </p>
            </div>
            <div class="article-wrapper">
              <h2 class="mb-3 mt-6">交通及停車資訊</h2>
              <p class="bg-article">
                <span class="line-clamp">{{ venue.trafficInfo }}</span>
              </p>
            </div>
            <v-row class="mt-6">
              <v-col cols="6">
                <v-btn
                  height="60"
                  width="280"
                  class="btn btn-yellow mr-10"
                  @click="goBookSocials(venue)"
                  to="/socials"
                  >我要報 play</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  height="60"
                  width="280"
                  class="btn"
                  @click="goCreateSocial(venue)"
                  to="/socials/#createSocial"
                  >我要揪團</v-btn
                >
              </v-col>
            </v-row>
            <h3 class="text-right mt-4">最後編輯：{{ lastUpdateByName }}</h3>
          </div>
        </v-col>

        <v-col cols="4" class="main-content-row mt-16 ml-6">
          <GlareCard class="main-pic-wrapper">
            <v-img class="img" :src="coverPhoto" cover></v-img>
          </GlareCard>
          <div v-if="venue.images && venue.images.length > 0" class="pics-wrapper">
            <v-img
              v-for="(img, index) in venue.images"
              class="pic"
              cover
              :key="index"
              :src="img"
              @click="changeCoverPhoto(index)"
              :class="{ 'active-pic': selectedIndex === index }"
            ></v-img>
          </div>
        </v-col>
      </template>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="600">
    <v-form :disabled="isSubmitting" @submit.prevent="submitUpdate(venue)">
      <v-card class="card-dialog">
        <v-card-title class="text-center mt-3">球場資訊</v-card-title>
        <v-icon-btn icon="mdi-close" @click="closeDialog" class="btn btn-close"></v-icon-btn>
        <v-divider thickness="2" opacity="1" color="black" class="mt-3 mx-10"></v-divider>
        <v-card-text>
          <v-list-subheader>球場名稱</v-list-subheader>
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            hide-details
            clearable
            bg-color="#f1f1f1"
            rounded="sm"
            density="comfortable"
            class="ml-0 mb-5 neubrutalism"
            :rules="[rules.required]"
            placeholder="請輸入 google maps 上顯示的球場名稱"
          ></v-text-field>
          <v-list-subheader>球場地址</v-list-subheader>
          <v-select
            v-model="city.value.value"
            :error-messages="city.errorMessage.value"
            clearable
            class="mb-5 neubrutalism"
            rounded="sm"
            density="comfortable"
            bg-color="#f1f1f1"
            label="請選擇縣市"
            hide-details
            :rules="[rules.required]"
            :items="cities"
          ></v-select>
          <v-text-field
            v-model="address.value.value"
            :error-messages="address.errorMessage.value"
            hide-details
            clearable
            bg-color="#f1f1f1"
            rounded="sm"
            density="comfortable"
            :rules="[rules.required]"
            class="neubrutalism"
          ></v-text-field>
          <v-list-subheader>球場介紹</v-list-subheader>
          <v-textarea
            v-model="description.value.value"
            :error-messages="description.errorMessage.value"
            clearable
            bg-color="#f1f1f1"
            :rules="[rules.required]"
            counter
            class="neubrutalism"
            hide-details=""
          ></v-textarea>
          <v-list-subheader>球場設備</v-list-subheader>
          <div class="d-flex flex-wrap justify-space-between">
            <v-checkbox
              v-for="item of checkboxItems"
              :key="item.label"
              v-model="facilities.value.value"
              :error-messages="facilities.errorMessage.value"
              :label="item.label"
              :value="item.label"
              hide-details
            ></v-checkbox>
          </div>
          <div class="d-flex align-center">
            <v-checkbox-btn v-model="enabled" hide-details></v-checkbox-btn>
            <v-text-field
              bg-color="#f1f1f1"
              :disabled="!enabled"
              label="其他請輸入"
              hide-details
              clearable
              class="mb-5 neubrutalism"
              style="margin-left: -380px"
            ></v-text-field>
          </div>
          <v-list-subheader>交通及停車資訊</v-list-subheader>
          <v-textarea
            v-model="trafficInfo.value.value"
            :error-messages="trafficInfo.errorMessage.value"
            clearable
            bg-color="#f1f1f1"
            :rules="[rules.required]"
            counter
            hide-details
            class="neubrutalism"
          ></v-textarea>
          <v-list-subheader>原有球場照片</v-list-subheader>
          <div class="d-flex flex-wrap" v-if="existingImages.length > 0">
            <draggable
              v-model="existingImages"
              item-key="url"
              tag="div"
              class="d-flex flex-wrap image-list-draggable"
            >
              <template #item="{ element: image, index }">
                <div class="image-preview mr-2 mb-2 text-right">
                  <!-- <v-btn
                    icon
                    size="x-small"
                    class="delete-btn btn btn-yellow"
                    @click="deleteExistingImage(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn> -->
                  <v-icon-btn
                    icon="mdi-close"
                    size="sm"
                    @click="deleteExistingImage(index)"
                    class="delete-btn btn btn-yellow mb-n10"
                  ></v-icon-btn>
                  <v-img :src="image.url" height="150" width="150" cover></v-img>
                </div>
              </template>
            </draggable>
          </div>
          <v-list-subheader>新增球場照片</v-list-subheader>
          <VueFileAgent
            ref="fileAgent"
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            :error-text="{ type: '檔案格式不正確', size: '檔案大小不得超過 1MB' }"
            help-text="選擇或拖拽檔案"
            max-size="1MB"
            multiple
            class="neubrutalism"
          />
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn class="btn btn-cancel" :disabled="isSubmitting" @click="closeDialog">取消編輯</v-btn> -->
          <v-btn class="btn btn-yellow mb-5 mr-5" :loading="isSubmitting" type="submit"
            >送出編輯</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <venueComments :key="route.params.id" :venue-id="route.params.id" />
  <footerSection />
</template>

<script setup>
import { ref, onMounted, computed, useTemplateRef, watch } from 'vue'
import { useDisplay } from 'vuetify'
import venueService from '@/services/venueService'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/userStore'
import userService from '@/services/userService'
import venueComments from '@/views/vsVenueComments.vue'
import footerSection from '@/views/hpFooter.vue'
import GlareCard from '@/components/ui/glare-card/GlareCard.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import draggable from 'vuedraggable'
import { useVenueStore } from '@/stores/venueStore'

const createSnackbar = useSnackbar()
const coverPhoto = ref('')
const selectedIndex = ref(-1)
const display = useDisplay()
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const venue = ref({})
const lastUpdateByName = ref('')
const isLoggedIn = computed(() => user.isLoggedIn)
const isFavorite = (venueId) => {
  if (!user.isLoggedIn || !user.favoriteVenues) {
    return false
  }
  return user.favoriteVenues.includes(venueId)
}
const bannerImg = ref(null)
const enabled = ref(false)
const dialog = ref({
  // 控制對話框開關
  open: false,
  // 當前操作的留言 ID
  id: '',
})
const fileAgent = useTemplateRef('fileAgent')
const fileRecords = ref([])
const rawFileRecords = ref([])
const existingImages = ref([])
const venueStore = useVenueStore()

const closeDialog = () => {
  dialog.value.open = false
  dialog.value.id = ''
  resetForm()
  fileAgent.value.deleteFileRecord()
}

const openDialog = (venue) => {
  if (!isLoggedIn.value) {
    createSnackbar({
      text: '請先登入才能編輯球場資訊喔！',
      snackbarProps: {
        color: 'red',
      },
    })
    return router.push('/logInSingUp')
  }
  if (venue) {
    dialog.value.id = venue._id
    name.value.value = venue.name
    city.value.value = venue.city
    address.value.value = venue.address
    description.value.value = venue.description
    facilities.value.value = venue.facilities
    trafficInfo.value.value = venue.trafficInfo
    // 處理現有圖片
    if (venue.images && venue.images.length > 0) {
      // 將現有圖片轉換為 FileRecord 格式
      existingImages.value = venue.images.map((url, index) => {
        return {
          url: url,
          isExisting: true,
        }
      })
    } else {
      existingImages.value = []
    }
    fileRecords.value = []
  }

  dialog.value.open = true
}

const goBookSocials = (venue) => {
  venueStore.setSelectedVenue(venue)
  router.push('/socials')
}

const goCreateSocial = (venue) => {
  venueStore.setSelectedVenue(venue)
  router.push('/socials/#createSocial')
}

const deleteExistingImage = (index) => {
  // 從現有圖片陣列中移除
  existingImages.value.splice(index, 1)
}

// 建立 vee-validate 註冊表單
const { handleSubmit, resetForm, isSubmitting } = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  // 前後端都要做驗證，且驗證的規則要一樣，前端是要回覆給使用者錯誤的原因，後端是要防止錯誤的資料進資料庫
  // 根據後端的 model 的 user.js 寫驗證

  validationSchema: yup.object({
    name: yup.string().required('球場名稱必填').min(1, '球場名稱不能為空'),
    city: yup.string().required('請選擇球場所在的城市'),
    address: yup
      .string()
      .required('球場地址必填')
      // .oneOf(陣列, 訊息)   欄位的值必須是陣列內的其中一個
      // .ref(欄位)          取得欄位的值
      // .ref(password)       欄位的值必須是 password 陣列欄位內的其中一個值
      .min(1, '球場名稱不能為空'),
    description: yup
      .string()
      .required('球場敘述必填')
      .min(1, '球場敘述不能為空')
      .max(200, '球場敘述最多只能 200 個字'),
    facilities: yup.array().min(1, '球場設備必須至少選個一項目'),
    trafficInfo: yup
      .string()
      .required('球場交通及停車資訊必填')
      .min(1, '球場交通及停車資訊不能為空')
      .max(200, '球場交通及停車資訊最多只能 200 個字'),
  }),
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const name = useField('name')
const city = useField('city')
const address = useField('address')
const description = useField('description')
const facilities = useField('facilities')
const trafficInfo = useField('trafficInfo')

const submitUpdate = handleSubmit(async (values) => {
  // 圖片另外獨立驗證
  if (fileRecords.value.some((f) => f.error)) {
    createSnackbar({ text: '請選擇有效的圖片檔案', snackbarProps: { color: 'red' } })
    return
  }

  // 送出
  try {
    // 建立 FormData 格式資料，這裡不能用 JSON 檔上傳
    // fd.append(欄位名稱, 欄位值)
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('city', values.city)
    fd.append('address', values.address)
    fd.append('description', values.description)
    for (const facility of values.facilities) {
      fd.append('facilities', facility)
    }
    fd.append('trafficInfo', values.trafficInfo)

    if (existingImages.value && existingImages.value.length > 0) {
      existingImages.value.forEach((image) => {
        fd.append('existingImages', image.url)
      })
    }

    if (fileRecords.value && fileRecords.value.length > 0) {
      fileRecords.value.forEach((fileRecord) => {
        // VueFileAgent 的 fileRecords 中，新增的檔案會帶有 file 屬性
        // 而你傳入的既有圖片沒有 file 屬性，所以這裡不會重複傳送
        if (fileRecord.file) {
          fd.append('images', fileRecord.file)
        }
      })
    }

    fd.append('lastUpdateBy', user.id)

    const venueid = dialog.value.id

    await venueService.update(venueid, fd)

    createSnackbar({
      text: '球場編輯成功！',
      snackbarProps: {
        color: 'green',
      },
    })

    await getVenueInfo()
    closeDialog()
    resetForm()
    fileRecords.value = []
    rawFileRecords.value = []
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '球場編輯失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  } finally {
    isSubmitting.value = false
  }
})

const rules = {
  required: (value) => !!value || '此欄位為必填.',
}

const getVenueInfo = async () => {
  try {
    const venueId = route.params.id

    const { data } = await venueService.getId(venueId)
    if (!data || !data.venue) {
      throw new Error('API 回應格式不正確')
    }
    venue.value = data.venue

    document.title = `${venue.value.name} | JIOVOLLEY`

    if (venue.value.lastUpdateBy) {
      try {
        const { data: userData } = await userService.getUserById(venue.value.lastUpdateBy)
        if (userData && userData.user) {
          lastUpdateByName.value = userData.user.name
        } else {
          lastUpdateByName.value = '未知使用者'
        }
      } catch (userError) {
        console.error('無法取得使用者資料', userError)
        lastUpdateByName.value = '無法載入'
      }
    } else {
      lastUpdateByName.value = '無' // 如果沒有 ID
    }

    if (venue.value.images && venue.value.images.length > 0) {
      changeCoverPhoto(0)
    }
    console.log(`${data.venue.name}球場資料取得成功`, venue.value)
  } catch (error) {
    console.error('球場資料取得失敗', error)
    createSnackbar({
      text: '無法載入球場資料',
      snackbarProps: {
        color: 'red',
      },
    })
    router.push('/')
  }
}
onMounted(() => {
  getVenueInfo()
  setTimeout(() => {
    bannerImg.value = true
  }, 100)
})
const changeCoverPhoto = (index) => {
  if (venue.value.images && index >= 0 && index < venue.value.images.length) {
    coverPhoto.value = venue.value.images[index]
    selectedIndex.value = index
  }
}

const backgroundStyle = computed(() => {
  return {
    background: `url(${coverPhoto.value}) no-repeat center/cover`,
    filter: 'blur(50px) brightness(50%)',
    transform: 'scale(1.5)',
  }
})

watch(
  () => route.params.id,
  (newId) => {
    // 確保新 ID 存在
    if (newId) {
      // 當 props.venueId 改變時，重新呼叫 getVenues 並傳入新的 id
      getVenueInfo(newId)
    }
  },
  { immediate: true } // immediate: true 讓它在組件初次載入時也立即執行一次
)

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

const checkboxItems = [
  { label: '廁所' },
  { label: '更衣室' },
  { label: '置物櫃' },
  { label: '販賣機' },
  { label: '吹風機' },
  { label: '藍芽喇叭' },
  { label: '球與球車' },
  { label: '商品販賣' },
  { label: '桌椅' },
  { label: '飲水機' },
  { label: '重訓器材' },
]
</script>

<style scoped lang="scss">
.bg {
  background-color: vars.$primary-color;
  color: vars.$secondary-color;
  transition: background-image 0.5s ease;
  overflow: hidden;
  position: relative;
  padding-bottom: 50px;
}
.background-img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: vars.$primary-color;
  opacity: 0.8;
  transition: all 0.5s ease;
}

h2 {
  font-size: 1.3rem;
}

.main-content-row {
  position: relative;
  z-index: 1;
}

.pics-wrapper {
  position: absolute;
  top: 30%;
  right: 8%;
  display: flex;
  flex-direction: column;
}

.pic {
  border-radius: 16px;
  border: 5px solid #fdd000;
  margin-bottom: 7px;
  cursor: pointer;
  height: 60px;
  width: 60px;
}

.main-pic-wrapper {
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-top: -32px;
  margin-left: -10px;
  margin-right: -10px;
}

.img {
  width: 100%;
}

.overlay-text {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  position: absolute;
  bottom: 0;
  padding-left: 40px;
  padding-bottom: 20px;
  width: 100%;
}

.venueName {
  font-size: 2.3rem;
}

.venueAddress {
  font-size: 1.3rem;
}

.active-pic {
  transform: scale(1.2);
}

.facility {
  border: 3px solid vars.$secondary-color;
  font-weight: 100;
  border-radius: 16px;
  padding: 5px 15px;
  font-size: 1.2rem;
}

.article-wrapper {
  position: relative;
}

.bg-article {
  padding: 20px 30px;
  background: vars.$secondary-color;
  color: vars.$primary-color;
  border-radius: 16px;
  font-size: 1.2rem;
  opacity: 0.8;
  box-shadow: 10px 10px 1px black;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.bg-article:hover {
  transform: scale(1.02);
}

.bg-article:hover .line-clamp {
  -webkit-line-clamp: unset;
  line-clamp: none;
  overflow: visible;
  white-space: pre-wrap;
}

.edit-btn {
  background-color: transparent;
  color: #fdd000;
}

.btn {
  font-size: 1.2rem;
  color: black;
  border-radius: 8px;
  background-color: #f1f1f1;
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
.btn-yellow {
  background-color: #fdd000;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  height: 700px;
  margin-bottom: 30px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  transform-origin: center center;
  z-index: 1;
}

.scale-in {
  animation: scaleIn 10s ease-in-out forwards;
}

.card-dialog {
  background-color: white;
}

@keyframes scaleIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(2);
  }
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.banner-content {
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 80px 10%;
  pointer-events: none; // 新增，讓滑鼠事件穿透到圖片層
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

.aboutContent-text {
  font-size: 1.5rem;
}

@media screen and (min-width: 768px) {
  .bg {
    padding-bottom: 100px !important;
  }

  .info-wrapper {
    padding: 20px;
    margin-right: 20px;
    margin-top: 50px;
  }

  .pics-wrapper {
    position: absolute;
    top: 1%;
    right: -10%;
  }

  .pic {
    border-radius: 50%;
    width: 75px;
    height: 75px;
    margin-bottom: 10px;
    border: none;
    box-shadow: 2px 3px 2px black;
  }

  .main-pic-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    margin-top: 70px;
    margin-left: 70px;
    box-shadow: 5px 5px 5px black;
    width: 550px;
    height: 600px;
    transform: rotateX(v-bind(rotateX + 'deg')) rotateY(v-bind(rotateY + 'deg'));
    transition: transform 0.5s ease-out; // 旋轉動畫的過渡效果
    perspective: 1000px;
  }

  .overlay-text {
    display: none;
  }

  .venueName {
    font-size: 3rem;
  }

  .venueAddress {
    font-size: 1.8rem;
  }

  .img {
    width: 550px;
    height: 680px;
    pointer-events: none;
  }
  .active-pic {
    border: 4px solid #fdd000;
    transform: scale(1);
  }

  .blurred-bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: all 0.5s ease;
  }
}

.image-preview {
  position: relative;
  /* 讓整個圖片預覽區塊變成可拖曳的 */
  cursor: grab;
}

.image-preview .delete-btn {
  /* 確保刪除按鈕的游標不受影響 */
  cursor: pointer;
  z-index: 1;
}
</style>

<route lang="yaml">
meta:
  # 標題
  title: '球場'
  # 有沒有登入都能看
  login: ''
  # 不是管理員也能看
  admin: false
</route>
