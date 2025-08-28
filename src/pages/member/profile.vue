<template>
  <div class="pt-8 bg-light">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-16 rounded-lg">
          <v-form @submit.prevent="submitUpdate">
            <div>
              <div>
                <h1 class="font-weight-bold text-h4">球員資料</h1>
                <v-divider :thickness="2" opacity="20" class="mt-5"></v-divider>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>
            <v-row class="align-start">
              <v-col cols="12" md="2" class="mt-16 ml-14">
                <v-avatar size="100">
                  <v-img src="../../assets/images/passing.png" class="avatar-img" cover></v-img>
                </v-avatar>
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileChange"
                  style="display: none"
                  accept="image/*"
                />
                <v-icon-btn
                  variant="tonal"
                  style="background-color: #f1f1f1"
                  icon="mdi-pencil"
                  class="mt-15 ml-n7"
                  @click="triggerFileInput"
                ></v-icon-btn>
              </v-col>
              <v-col cols="12" sm="9" md="9">
                <v-card class="pa-4 rounded-lg">
                  <h3 class="text-h6 font-weight-bold mb-4">一般資訊</h3>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="姓名"
                        v-model="name.value.value"
                        :error-messages="name.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        label="性別"
                        v-model="gender.value.value"
                        :error-messages="gender.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :items="['女性', '男性']"
                        :rules="[rules.required]"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Email"
                        v-model="email.value.value"
                        :error-messages="email.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        label="球技程度"
                        v-model="skillLevel.value.value"
                        :error-messages="skillLevel.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :items="[
                          'S 體保生',
                          'A 一般生校隊',
                          'B 一般生系隊',
                          'C 排球初階',
                          'D 排球初心者',
                        ]"
                        :rules="[rules.required]"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-btn class="mt-4 btn" type="submit">更新球員資料</v-btn>
                </v-card>
                <v-card class="pa-4 rounded-lg mt-8">
                  <h3 class="text-h6 font-weight-bold mb-4">機密資訊</h3>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Password"
                        type="password"
                        v-model="password.value.value"
                        :error-messages="password.errorMessage.value"
                        variant="outlined"
                        hide-details
                        readonly
                      ></v-text-field>
                      <v-btn class="mt-4" color="#353d42" variant="outlined" type="submit" block
                        >更改密碼</v-btn
                      >
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Line ID"
                        v-model="line_uid.value.value"
                        :error-messages="line_uid.errorMessage.value"
                        variant="outlined"
                        hide-details
                        readonly
                      ></v-text-field>
                      <v-btn class="mt-4" color="#353d42" type="submit" variant="outlined" block
                        >更改 Line ID</v-btn
                      >
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Google ID"
                        v-model="google_uid.value.value"
                        :error-messages="google_uid.errorMessage.value"
                        variant="outlined"
                        hide-details
                        readonly
                      ></v-text-field>
                      <v-btn class="mt-4" color="#353d42" type="submit" variant="outlined" block
                        >更改 Google ID</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <div
      class="bottom-decoration d-flex justify-end pr-8"
      style="position: fixed; bottom: 0; width: 100%; z-index: -1"
    ></div>
  </div>
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
import userService from '@/services/userService'
import { useSnackbar } from 'vuetify-use-dialog'
const createSnackbar = useSnackbar()
import * as yup from 'yup'
import { ref, onMounted, useTemplateRef } from 'vue'
import { useField, useForm } from 'vee-validate'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import validator from 'validator'

// const userInfo = ref([])
const fileAgent = useTemplateRef('fileAgent')
const fileRecords = ref([])
const rawFileRecords = ref([])

// 建立 vee-validate 註冊表單
const { handleSubmit, isSubmitting, setValues } = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  // 前後端都要做驗證，且驗證的規則要一樣，前端是要回覆給使用者錯誤的原因，後端是要防止錯誤的資料進資料庫
  // 根據後端的 model 的 user.js 寫驗證

  validationSchema: yup.object({
    name: yup.string().required('球場名稱必填').min(1, '球場名稱不能為空'),
    gender: yup.string().required('性別必填'),
    email: yup
      .string()
      .required('電子郵件必填')
      .test('isEmail', '請輸入有效的電子郵件地址', (value) => {
        return validator.isEmail(value)
      }),
    skillLevel: yup.string().required('球技程度必填'),
  }),
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const name = useField('name')
const gender = useField('gender')
const email = useField('email')
const skillLevel = useField('skillLevel')
const password = useField('password')
const line_uid = useField('line_uid')
const google_uid = useField('google_uid')
const databaseAvatarSrc = ref('')
const previewAvatarSrc = ref(null)
const selectedFile = ref(null)
const fileInput = ref(null)
const triggerFileInput = () => {
  fileInput.value.click()
}

const getUserProfile = async () => {
  try {
    const { data } = await userService.profile()
    const userInfo = data.user
    setValues({
      name: userInfo.name,
      gender: userInfo.gender,
      email: userInfo.email,
      skillLevel: userInfo.skillLevel,
      password: userInfo.password,
      line_uid: userInfo.line_uid,
      google_uid: userInfo.google_uid,
    })
    // 設定頭像 URL
    databaseAvatarSrc.value = userInfo.avatar
    // 重設圖片上傳相關變數
    previewAvatarSrc.value = null
    selectedFile.value = null
  } catch (error) {
    console.error('會員資料取得失敗:', error)
    createSnackbar({
      text: '無法載入會員資料，請重新整理或稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const submitUpdate = handleSubmit(async (values) => {
  try {
    await userService.updateProfile(values)

    createSnackbar({
      text: '球員資料編輯成功！',
      snackbarProps: {
        color: 'green',
      },
    })

    await getUserProfile()
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '球員資料編輯失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

// 處理檔案變更並立即上傳
const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    // 先做本地預覽
    const reader = new FileReader()
    reader.onload = (e) => {
      previewAvatarSrc.value = e.target.result
    }
    reader.readAsDataURL(file)

    // 執行圖片上傳
    await uploadAvatar(file)
  }
}

// 獨立的圖片上傳函式
const uploadAvatar = async (file) => {
  try {
    const formData = new FormData()
    formData.append('avatar', file)
    const { data } = await userService.updateProfile(formData) // 假設後端 API 接收圖片並回傳新的使用者資料

    if (data.user && data.user.avatar) {
      databaseAvatarSrc.value = data.user.avatar
      previewAvatarSrc.value = null
      selectedFile.value = null
    }
    createSnackbar({
      text: '照片更新成功！',
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.error('照片上傳失敗:', error)
    createSnackbar({
      text: error?.response?.data?.message || '照片更新失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const rules = {
  required: (value) => !!value || '此欄位為必填.',
}

onMounted(() => {
  getUserProfile()
})
</script>

<style scoped lang="scss">
h1 {
  font-family: 'Huninn', sans-serif;
}

h3 {
  font-family: 'Cooper Black', sans-serif;
}

.bg-light {
  padding-bottom: 155px;
}

.btn {
  background-color: #fdd000;
}

.avatar-img {
  // border: 1px solid black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: 2px 2px 5px #f1f1f1;
}

/* 這裡可以放置您圖片中背景漸層和裝飾物（雲朵、鯨魚）的樣式 */
.v-list-item--active {
  background-color: #e3f2fd; /* Vuetify's light blue color */
  color: #1976d2; /* Vuetify's primary blue color */
  border-radius: 8px;
}
</style>
