<template>
  <v-container fluid class="bg-dark">
    <v-row no-gutters class="justify-center align-center">
      <v-col cols="12" md="7" class="bg-light">
        <v-row no-gutters>
          <v-col cols="12" md="6" class="form-section">
            <!-- 登入 ---------------------------------------------------------------->
            <template v-if="isRegistered">
              <v-img
                style="margin: auto"
                src="../assets/images/logo-portrait-dark.png"
                width="130"
              ></v-img>
              <h2 class="text-center slogan">
                For Every Skill, Every Set, <br />
                Every Player.
              </h2>

              <div class="d-flex justify-center mt-5">
                <v-img
                  class="ml-11"
                  src="../assets/images/google-logo.png"
                  @click="googleLogin"
                  max-width="80"
                  style="cursor: pointer"
                ></v-img>
                <v-img
                  class="ml-16"
                  src="../assets/images/LINE_logo.svg"
                  @click="lineLogin"
                  max-width="80"
                  style="cursor: pointer"
                ></v-img>
                <v-icon-btn
                  icon="mdi-information-outline"
                  class="mt-15"
                  variant="text"
                  v-ripple
                  @click="openDialog"
                ></v-icon-btn>
              </div>
              <div class="d-flex align-center mt-3 mb-5">
                <v-divider
                  class="flex-grow-1"
                  thickness="3"
                  color="#353D42"
                  opacity="20"
                ></v-divider>
                <div class="d-flex mx-4">
                  <span style="font-weight: 900; font-size: 1.2rem" class="mx-1">或</span>
                </div>
                <v-divider
                  class="flex-grow-1"
                  thickness="3"
                  color="#353D42"
                  opacity="20"
                ></v-divider>
              </div>
              <v-form :disabled="formLogin.isSubmitting.value" @submit.prevent="submitLogIn">
                <v-text-field
                  v-model="emailLogin.value.value"
                  :error-messages="emailLogin.errorMessage.value"
                  :readonly="loading"
                  :rules="[rules.required]"
                  class="neubrutalism"
                  label="Email"
                  clearable
                  hide-details
                ></v-text-field>
                <v-text-field
                  v-model="passwordLogin.value.value"
                  :error-messages="passwordLogin.errorMessage.value"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showPassword ? 'text' : 'password'"
                  hint="密碼長度至少 8 個字元"
                  label="密碼"
                  maxlength="20"
                  minlength="4"
                  counter
                  @click:append-inner="showPassword = !showPassword"
                  :readonly="loading"
                  hide-details
                  class="neubrutalism mb-10"
                ></v-text-field>

                <v-btn
                  :disabled="formLogin.isSubmitting.value"
                  :loading="loading"
                  color="#353D42"
                  type="submit"
                  variant="elevated"
                  block
                  class="btn"
                  height="45"
                >
                  登入
                </v-btn>

                <div class="text-center mt-13">
                  <span class="toggle"> 忘記密碼？</span>
                  <br />
                  第一次來揪排咖嗎？
                  <span @click.prevent="toggleMode" class="toggle"> 註冊新帳號</span>
                </div>
              </v-form>
            </template>

            <!-- 註冊 ---------------------------------------------------------------->
            <template v-else>
              <v-img
                style="margin: auto"
                src="../assets/images/logo-portrait-dark.png"
                width="130"
              ></v-img>
              <h2 class="text-center slogan">
                For Every Skill, Every Set, <br />
                Every Player.
              </h2>

              <div class="d-flex justify-center">
                <v-img
                  class="ml-11"
                  src="../assets/images/google-logo.png"
                  @click="googleLogin"
                  max-width="80"
                  style="cursor: pointer"
                ></v-img>
                <v-img
                  class="ml-16"
                  src="../assets/images/LINE_logo.svg"
                  max-width="80"
                  @click="lineLogin"
                  style="cursor: pointer"
                ></v-img>
                <v-icon-btn
                  icon="mdi-information-outline"
                  class="mt-15"
                  variant="text"
                  v-ripple
                  @click="openDialog"
                ></v-icon-btn>
              </div>
              <div class="d-flex align-center mt-3 mb-5">
                <v-divider
                  class="flex-grow-1"
                  thickness="3"
                  color="#353D42"
                  opacity="20"
                ></v-divider>
                <div class="d-flex mx-4">
                  <span style="font-weight: 900; font-size: 1.2rem" class="mx-1">或</span>
                </div>
                <v-divider
                  class="flex-grow-1"
                  thickness="3"
                  color="#353D42"
                  opacity="20"
                ></v-divider>
              </div>
              <v-form :disabled="formRegister.isSubmitting.value" @submit.prevent="submitSignUp">
                <v-text-field
                  v-model="emailSignup.value.value"
                  :error-messages="emailSignup.errorMessage.value"
                  :readonly="loading"
                  :rules="[rules.required]"
                  class="neubrutalism"
                  label="Email"
                  clearable
                  hide-details
                ></v-text-field>
                <v-text-field
                  v-model="passwordSignup.value.value"
                  :error-messages="passwordSignup.errorMessage.value"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showPassword ? 'text' : 'password'"
                  hint="密碼長度至少 8 個字元"
                  label="密碼"
                  maxlength="20"
                  minlength="4"
                  counter
                  @click:append-inner="showPassword = !showPassword"
                  :readonly="loading"
                  hide-details
                  class="neubrutalism"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword.value.value"
                  :error-messages="confirmPassword.errorMessage.value"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  hint="確認密碼和密碼必須相同"
                  label="確認密碼"
                  maxlength="20"
                  minlength="4"
                  counter
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  :readonly="loading"
                  hide-details
                  class="neubrutalism mb-8"
                ></v-text-field>

                <v-btn
                  :disabled="formRegister.isSubmitting.value"
                  :loading="loading"
                  color="#353D42"
                  type="submit"
                  variant="elevated"
                  block
                  class="btn"
                  height="45"
                >
                  註冊
                </v-btn>

                <div class="text-center mt-8">
                  已經是揪排咖的一員了嗎？
                  <span class="toggle" @click.prevent="toggleMode"> 按我登入</span>
                </div>
              </v-form>
            </template>
          </v-col>
          <v-col md="6" class="d-none d-md-block pa-8 image-section">
            <v-img id="ran" :src="currentImage" rounded="xl"></v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="300">
    <v-card class="card">
      <v-card-title class="text-center mt-3">登入說明</v-card-title>
      <v-card-text>
        <b>LINE 登入：</b>
        <br />官方帳號會把報名的場次資訊推送給你，絕對不怕遺漏任何一場！
        <br />
        <br />
        <b>Google 登入：</b> <br />場次提醒將會寄到你的 Google 信箱，重要訊息一封不漏！
      </v-card-text>
      <v-card-actions>
        <v-btn class="btn-dialog mb-2 mr-2" @click="closeDialog">了解</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

import loginImage from '@/assets/images/ran.jpg'
import registerImage from '@/assets/images/kim.jpg'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import validator from 'validator'
import { useField, useForm } from 'vee-validate'
import userService from '@/services/userService'
import { useUserStore } from '@/stores/userStore'

const createSnackbar = useSnackbar()
const router = useRouter()
const route = useRoute()
const isRegistered = ref(true)
const user = useUserStore()

const dialog = ref({
  // 控制對話框開關
  open: false,
  message: '請先登入才能報名打 play 喔！',
})

const closeDialog = () => {
  dialog.value.open = false
}

const openDialog = () => {
  dialog.value.open = true
}

// 建立 vee-validate 註冊表單
const formRegister = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  // 前後端都要做驗證，且驗證的規則要一樣，前端是要回覆給使用者錯誤的原因，後端是要防止錯誤的資料進資料庫
  // 根據後端的 model 的 user.js 寫驗證
  validationSchema: yup.object({
    email: yup
      .string()
      .required('電子郵件必填')
      .test('isEmail', '請輸入有效的電子郵件地址', (value) => {
        return !value || validator.isEmail(value)
      }),
    password: yup
      .string()
      .required('密碼必填')
      .min(8, '密碼長度須至少 8 個字元')
      .max(20, '密碼長度最多 20 個字元'),
    confirmPassword: yup
      .string()
      .required('確認密碼必填')
      // .oneOf(陣列, 訊息)   欄位的值必須是陣列內的其中一個
      // .ref(欄位)          取得欄位的值
      // .ref(password)       欄位的值必須是 password 陣列欄位內的其中一個值
      .oneOf([yup.ref('password')], '確認密碼和密碼必須相同'),
  }),
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const emailSignup = useField('email')
const passwordSignup = useField('password')
const confirmPassword = useField('confirmPassword')

// 建立 vee-validate 登入表單
const formLogin = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  // 前後端都要做驗證，且驗證的規則要一樣，前端是要回覆給使用者錯誤的原因，後端是要防止錯誤的資料進資料庫
  // 根據後端的 model 的 user.js 寫驗證
  validationSchema: yup.object({
    email: yup
      .string()
      .required('電子郵件必填')
      .test('isEmail', '請輸入有效的電子郵件地址', (value) => {
        return !value || validator.isEmail(value)
      }),
    password: yup
      .string()
      .required('密碼必填')
      .min(8, '密碼長度須至少 8 個字元')
      .max(20, '密碼長度最多 20 個字元'),
  }),
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const emailLogin = useField('email')
const passwordLogin = useField('password')

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(true)

// https://uvr.esm.is/guide/extending-routes.html#definepage
// definePage({
//   meta: {
//     title: '註冊',
//   },
// })

const currentImage = computed(() => {
  return isRegistered.value ? loginImage : registerImage
})

const toggleMode = () => {
  isRegistered.value = !isRegistered.value
}

// vee-validate 的表單送出
// handleSubmit(處理function)
// values 表單所有欄位的值
const submitSignUp = formRegister.handleSubmit(async (values) => {
  try {
    await userService.create({
      email: values.email,
      password: values.password,
    })
    createSnackbar({
      text: '註冊成功！請填寫個人資料，以利使用網站功能~',
      snackbarProps: {
        color: 'green',
      },
    })
    // 註冊成功後，導向到原本的頁面
    router.push(route.query.redirect || '/')
    // router.push('member/profile')
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '註冊失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

const submitLogIn = formLogin.handleSubmit(async (values) => {
  try {
    const { data } = await userService.login({
      email: values.email,
      password: values.password,
    })
    user.login(data.user)

    console.log('準備導轉，redirect 參數為:', route.query.redirect)

    // 登入成功後，導向到原本的頁面
    if (!user.name || !user.gender || !user.skillLevel) {
      router.push('member/profile')
      createSnackbar({
        text: '登入成功！請填寫個人資料，以利使用網站功能~',
        snackbarProps: {
          color: 'green',
        },
      })
    } else {
      router.push(route.query.redirect || '/')
      createSnackbar({
        text: '登入成功！',
        snackbarProps: {
          color: 'green',
        },
      })
    }
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '登入失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

const lineLogin = async () => {
  try {
    // const { data } = await userService.lineLogin()
    // LINE 登入會回傳授權網址
    console.log('準備重定向到 LINE 登入頁面')
    window.location.href = 'https://jiovolley-backend.onrender.com/user/auth/line'
  } catch (error) {
    console.error('LINE 登入錯誤:', error)
    createSnackbar({
      text: '無法連接 LINE 登入服務，請稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const googleLogin = async () => {
  try {
    // LINE 登入會回傳授權網址
    console.log('準備重定向到 Google 登入頁面')
    window.location.href = 'https://jiovolley-backend.onrender.com/user/auth/google'
  } catch (error) {
    console.error('Google 登入錯誤:', error)
    createSnackbar({
      text: '無法連接 Google 登入服務，請稍後再試',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const rules = {
  required: (value) => !!value || '此欄位為必填.',
  min: (v) => v.length >= 8 || '至少 8 個字',
  emailMatch: () => `使用者的帳號與密碼不符`,
}
</script>

<style lang="scss" scoped>
.bg-dark {
  min-height: 91.8vh;
  overflow: hidden;
}

.bg-light {
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  color: vars.$primary-color;
  // min-height: 810px;
  // max-height: 95vh;
  // overflow-y: auto;
  box-shadow: 15px 15px 1px black;
}

.slogan {
  font-family: 'Cooper Black', sans-serif;
  font-weight: 300;
  line-height: 1.2;
  margin-top: 15px;
}

#ran {
  width: 100%;
  margin-left: -10px;
}

.toggle {
  text-decoration: underline;
  cursor: pointer;
}

.form-section,
.image-section {
  transition: transform 0.6s ease-in-out;
  padding: 5% !important;
}

.card-container.register-mode .image-section {
  transform: translateX(100%);
}

.card-container.register-mode .form-section {
  transform: translateX(-100%);
}

/* 圖片淡入淡出效果 (可選) */
.image-transition {
  transition: opacity 0.6s ease-in-out;
}

.neubrutalism {
  margin-bottom: 25px;
}

.v-col {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.card {
  border: 2px solid black !important;
  background-color: vars.$secondary-color;
}

.btn-dialog {
  border-radius: 8px;
  border: 2px solid black;
  background-color: vars.$primary-color;
  background-color: #ffd000;
  color: black;
  box-shadow: 3px 6px 1px black;
}
.btn-dialog:hover {
  transform: translate(3px, 3px);
  box-shadow: none;
}

span {
  color: vars.$primary-color;
}

@media (min-width: 768px) {
  .bg-light {
    border-radius: 32px;
  }
}
</style>

<!-- 因為安裝了 unplugin-vue-router 套件，所以可以使用 route 標籤，不然需要像番茄鐘一樣，用陣列的寫法 -->
<route lang="yaml">
meta:
  title: '註冊'
  # 只有在沒登入的狀態下可以看
  login: 'no-login-only'
  # 不是管理員也可以看
  admin: false
</route>
