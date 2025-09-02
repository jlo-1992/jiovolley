<template>
  <v-container id="createVenue" v-show="isLoggedIn" class="bg-dark" fluid>
    <div v-if="display.mdAndUp.value" class="bg-stripe"></div>
    <v-card class="card mx-auto mt-10 pb-16 pt-5" rounded="lg">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" xl="8" class="text-center">
          <h1 class="mb-3 mt-10 page-title">找不到心儀的球場嗎？</h1>
          <h3 class="subtitle" style="color: #353d42">
            建立一座新的球場吧！<br />
            別擔心資料不完整，大家一起像維基百科一樣，同心協力把它變得更完整！
          </h3>
          <v-divider class="mt-5 mb-10" :thickness="2" color="#f1f1f1" opacity="20"></v-divider>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" xl="8">
          <v-form @submit.prevent="submit">
            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" sm="3" md="2">
                <h5 class="subheader text-sm-start text-center">球場名稱</h5>
              </v-col>
              <v-col cols="12" sm="9" md="10">
                <v-text-field
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value"
                  hide-details
                  clearable
                  bg-color="#f1f1f1"
                  density="comfortable"
                  class="ml-0 mb-5 neubrutalism"
                  :rules="[rules.required]"
                  placeholder="請輸入 google maps 上顯示的球場名稱"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" sm="3" md="2">
                <h5 class="subheader text-sm-start text-center">球場地址</h5>
              </v-col>
              <v-col cols="12" sm="9" md="10">
                <v-row no-gutters>
                  <v-col cols="4">
                    <v-select
                      v-model="city.value.value"
                      :error-messages="city.errorMessage.value"
                      clearable
                      class="mb-5 mr-3 neubrutalism"
                      rounded="sm"
                      density="comfortable"
                      bg-color="#f1f1f1"
                      label="請選擇縣市"
                      hide-details
                      :rules="[rules.required]"
                      :items="cities"
                    ></v-select>
                  </v-col>
                  <v-col cols="8">
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
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row no-gutters class="align-center mb-2">
              <v-col cols="12" sm="3" md="2">
                <h5 class="subheader text-sm-start text-center">球場介紹</h5>
              </v-col>
              <v-col cols="12" sm="9" md="10">
                <v-textarea
                  v-model="description.value.value"
                  :error-messages="description.errorMessage.value"
                  clearable
                  bg-color="#f1f1f1"
                  :rules="[rules.required]"
                  counter
                  hide-details
                  class="neubrutalism"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" sm="3" md="2">
                <h5 class="subheader text-sm-start text-center">球場設備</h5>
              </v-col>
              <v-col cols="12" sm="9" md="10">
                <v-row no-gutters>
                  <v-col cols="6" sm="4" md="3" v-for="item of checkboxItems" :key="item.label">
                    <v-checkbox
                      v-model="facilities.value.value"
                      :error-messages="facilities.errorMessage.value"
                      class="checkbox"
                      :label="item.label"
                      :value="item.label"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-checkbox-btn
                  v-model="enabled"
                  class="pe-2 mt-2"
                  style="color: #353d42"
                ></v-checkbox-btn>
                <v-text-field
                  bg-color="#f1f1f1"
                  :disabled="!enabled"
                  label="其他請輸入"
                  hide-details
                  clearable
                  class="mt-5 mb-5 neubrutalism"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="align-center mb-5">
              <v-col cols="12" sm="3" md="2">
                <h5 class="subheader text-sm-start text-center mt-4">交通及停車資訊</h5>
              </v-col>
              <v-col cols="12" sm="9" md="10">
                <v-textarea
                  v-model="trafficInfo.value.value"
                  :error-messages="trafficInfo.errorMessage.value"
                  clearable
                  bg-color="#f1f1f1"
                  :rules="[rules.required]"
                  hide-details
                  class="neubrutalism"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row no-gutters class="align-center mb-2">
              <v-col cols="12" sm="3" md="2">
                <h5 class="subheader text-sm-start text-center">球場照片</h5>
              </v-col>
              <v-col cols="12" sm="9" md="10">
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
              </v-col>
            </v-row>
            <v-row justify="end" class="mt-8">
              <v-col cols="12" sm="9" md="10">
                <v-btn
                  :loading="isSubmitting"
                  :disabled="isSubmitting"
                  type="submit"
                  width="100%"
                  class="btn"
                  height="50"
                  >新增球場</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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
import { ref, computed, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import validator from 'validator'
import { useField, useForm } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import venueService from '@/services/venueService'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { useDisplay } from 'vuetify'

const createSnackbar = useSnackbar()
const router = useRouter()
const route = useRoute()
const enabled = ref(false)
const user = useUserStore()
const isLoggedIn = computed(() => user.isLoggedIn)
const display = useDisplay()

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

const fileAgent = useTemplateRef('fileAgent')
const fileRecords = ref([])
const rawFileRecords = ref([])

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
  initialValues: {
    name: '',
    city: '',
    address: '',
    description: '',
    facilities: [],
    trafficInfo: '',
  },
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

const submit = handleSubmit(async (values) => {
  console.log(fileRecords.value)
  // 圖片另外獨立驗證
  if (fileRecords.value.some((f) => f.error)) {
    createSnackbar({ text: '請選擇有效的圖片檔案', snackbarProps: { color: 'red' } })
    return
  }

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

    // 有上傳圖片的話，才把圖片檔案上傳到表單裡面
    if (fileRecords.value && fileRecords.value.length > 0) {
      for (const file of fileRecords.value) fd.append('images', file.file)
    } else {
      // 這個區塊應該會在沒有選擇圖片時被執行
      console.log('沒有選擇任何圖片。')
    }

    fd.append('lastUpdateBy', user.id)

    for (const pair of fd.entries()) {
      console.log(pair[0], pair[1])
    }

    await venueService.create(fd)

    createSnackbar({
      text: '球場新增成功！',
      snackbarProps: {
        color: 'green',
      },
    })

    resetForm()
    fileRecords.value = []
    rawFileRecords.value = []

    router.push('/venueList')
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '球場新增失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  } finally {
    isSubmitting.value = false
  }
})

const rules = {
  required: (value) => !!value || '此欄位為必填。',
}
</script>

<style lang="scss" scoped>
h3 {
  color: vars.$secondary-color;
  font-size: 1.3rem;
}
.subtitle {
  font-size: 1.1rem;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
}

.card {
  padding: 15px;
  // box-shadow: 25px 25px 1px black;
  z-index: 2;
  margin-bottom: 50px;
  border: 6px solid black;
}

.bg-dark {
  padding-top: 70px;
  padding-bottom: 70px;
  position: relative;
}

.subheader {
  color: vars.$primary-color;
  font-size: 1.1rem;
  margin-right: 20px;
  margin-bottom: 15px;
}

.checkbox {
  color: vars.$primary-color;
  margin-bottom: -30px;
}

.bg-stripe {
  position: absolute;
  border-radius: 8px;
  top: 9%;
  right: 10%;
  width: 1450px;
  height: 1420px;
  z-index: 1;
  background-image: repeating-linear-gradient(
    -75deg,
    black 0,
    black 35px,
    #f1f1f1 35px,
    #fdd000 37px
  );
}

.neubrutalism {
  box-shadow: 3px 6px 1px vars.$primary-color;
  border-radius: 8px;

  :deep(.v-field) {
    border-radius: 8px !important;
  }

  :deep(.v-field__outline::before),
  :deep(.v-field__outline::after) {
    border-style: none !important;
  }
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

@media (min-width: 768px) {
  .subtitle {
    font-size: 1.2rem;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: bold;
  }
  .card {
    width: 1450px;
  }
}
</style>
