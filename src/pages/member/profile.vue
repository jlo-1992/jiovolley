<template>
  <v-container class="bg-dark">
    <v-card class="pa-16 mt-1 card-memberPage">
      <v-form @submit.prevent="submitUpdate">
        <div>
          <div>
            <h1 class="font-weight-bold text-h4">球員資料</h1>
            <v-divider :thickness="2" opacity="20" class="mt-5"></v-divider>
          </div>
        </div>

        <v-divider class="my-4"></v-divider>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card class="pb-13 pt-8 pl-16 card-memberPage">
              <h3 class="font-weight-bold ml-n6" style="font-size: 1.3rem">一般資訊</h3>
              <v-row>
                <v-col cols="12" sm="4">
                  <div class="img-wrapper">
                    <v-img :src="avatarSrc" class="avatar-img" cover></v-img>
                    <input
                      type="file"
                      ref="fileInput"
                      @change="handleFileChange"
                      style="display: none"
                      accept="image/*"
                    />
                    <v-icon-btn
                      icon="mdi-pencil"
                      class="btn btn-edit"
                      @click="triggerFileInput"
                      rounded="circle"
                      size="50"
                    ></v-icon-btn>
                  </div>
                </v-col>

                <v-col cols="12" sm="7">
                  <v-row>
                    <v-col cols="12" sm="6" class="mt-3">
                      <v-text-field
                        label="姓名"
                        v-model="name.value.value"
                        :error-messages="name.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :rules="[rules.required]"
                        class="neubrutalism"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mt-3">
                      <v-select
                        label="性別"
                        v-model="gender.value.value"
                        :error-messages="gender.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :items="['女性', '男性']"
                        :rules="[rules.required]"
                        class="neubrutalism"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Email"
                        v-model="email.value.value"
                        :error-messages="email.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :rules="[rules.required]"
                        class="neubrutalism"
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
                        class="neubrutalism"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        label="你的專屬球場勝利語"
                        v-model="quote.value.value"
                        :error-messages="quote.errorMessage.value"
                        variant="outlined"
                        hide-details
                        :rules="[rules.required]"
                        class="neubrutalism"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <div class="text-right">
                    <v-btn class="mt-4 btn mr-3" color="white" type="cancel">取消更新</v-btn>
                    <v-btn class="mt-4 btn" type="submit">確認更新</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="pa-10 rounded-lg mt-8 card-memberPage">
              <h3 class="font-weight-bold mb-4" style="font-size: 1.3rem">機密資訊</h3>
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
                    class="neubrutalism"
                  ></v-text-field>
                  <v-btn class="mt-6 btn" variant="outlined" type="submit" block>更改密碼</v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Line ID"
                    v-model="line_uid.value.value"
                    :error-messages="line_uid.errorMessage.value"
                    variant="outlined"
                    hide-details
                    readonly
                    class="neubrutalism"
                  ></v-text-field>
                  <v-btn class="mt-6 btn" type="submit" variant="outlined" block
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
                    class="neubrutalism"
                  ></v-text-field>
                  <v-btn class="mt-6 btn" type="submit" variant="outlined" block
                    >更改 Google ID</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <div
      class="bottom-decoration d-flex justify-end pr-8"
      style="position: fixed; bottom: 0; width: 100%; z-index: -1"
    ></div>
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
const quote = useField('quote')
const databaseAvatarSrc = ref('')
const previewAvatarSrc = ref(null)
const selectedFile = ref(null)
const fileInput = ref(null)
const triggerFileInput = () => {
  fileInput.value.click()
}

// 根據是否有預覽圖，決定要顯示哪張圖片
const avatarSrc = computed(() => {
  return (
    previewAvatarSrc.value || databaseAvatarSrc.value || '@/assets/images/userProfile/ryujji.jpg'
  )
})

const getUserProfile = async () => {
  try {
    const { data } = await userService.profile()
    const userInfo = data.user
    console.log(userInfo._id)
    setValues({
      name: userInfo.name,
      gender: userInfo.gender,
      email: userInfo.email,
      skillLevel: userInfo.skillLevel,
      password: userInfo.password,
      line_uid: userInfo.line_uid,
      google_uid: userInfo.google_uid,
      quote: userInfo.quote,
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

// 提交表單，包含所有資料和圖片
const submitUpdate = handleSubmit(async (values) => {
  try {
    const formData = new FormData()

    // 將所有文字欄位資料加入 FormData
    for (const key in values) {
      // 避免傳送空值或不需要的欄位
      if (key !== 'password' && key !== 'line_uid' && key !== 'google_uid') {
        formData.append(key, values[key])
      }
    }

    // 如果使用者有選擇新圖片，就將其加入 FormData
    if (selectedFile.value) {
      formData.append('avatar', selectedFile.value)
    }

    const { data } = await userService.updateProfile(formData)

    createSnackbar({
      text: '球員資料編輯成功！',
      snackbarProps: {
        color: 'green',
      },
    })

    // 更新成功後，重新取得會員資料來更新頁面顯示
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

// 處理檔案變更，只做本地預覽並儲存檔案
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      previewAvatarSrc.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 獨立的圖片上傳函式
// const uploadAvatar = async (file) => {
//   try {
//     const formData = new FormData()
//     formData.append('avatar', file)
//     const { data } = await userService.updateProfile(formData) // 假設後端 API 接收圖片並回傳新的使用者資料

//     if (data.user && data.user.avatar) {
//       databaseAvatarSrc.value = data.user.avatar
//       previewAvatarSrc.value = null
//       selectedFile.value = null
//     }
//     createSnackbar({
//       text: '照片更新成功！',
//       snackbarProps: {
//         color: 'green',
//       },
//     })
//   } catch (error) {
//     console.error('照片上傳失敗:', error)
//     createSnackbar({
//       text: error?.response?.data?.message || '照片更新失敗，請稍後再試！',
//       snackbarProps: {
//         color: 'red',
//       },
//     })
//   }
// }

const rules = {
  required: (value) => !!value || '此欄位為必填.',
}

onMounted(() => {
  getUserProfile()
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

.avatar-img {
  border: 2px solid black;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  box-shadow: 2px 4px 1px black;
}

.img-wrapper {
  position: relative;
  border-radius: 50%;
  width: 300px;
  text-align: center;
  margin-left: 50px;
}

.btn-edit {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.neubrutalism {
  margin-bottom: 10px;
}

/* 這裡可以放置您圖片中背景漸層和裝飾物（雲朵、鯨魚）的樣式 */
.v-list-item--active {
  background-color: #e3f2fd; /* Vuetify's light blue color */
  color: #1976d2; /* Vuetify's primary blue color */
  border-radius: 8px;
}
</style>
