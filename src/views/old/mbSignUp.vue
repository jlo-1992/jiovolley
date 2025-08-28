<template>
  <v-container fluid class="d-flex justify-center align-center full-height bg-dark">
    <v-card :class="['login-card', { 'register-mode': !isLoginMode }]" elevation="10">
      <div class="card-content">
        <div v-if="isLoginMode" class="form-container pa-16">
          <v-img
            style="margin: auto"
            src="../assets/images/logo-portrait-dark.png"
            width="130"
          ></v-img>
          <h2 class="text-center slogan">
            For Every Skill, Every Set, <br />
            Every Player.
          </h2>

          <div class="d-flex justify-center mt-8">
            <v-img class="ml-11" src="../assets/images/google-logo.png" max-width="80"></v-img>
            <v-img class="ml-16" src="../assets/images/LINE_logo.svg" max-width="80"></v-img>
            <v-icon-btn
              icon="mdi-information-outline"
              class="mt-10"
              variant="text"
              v-ripple
            ></v-icon-btn>
          </div>
          <div class="d-flex align-center mt-3 mb-5">
            <v-divider class="flex-grow-1" thickness="3" color="#353D42" opacity="20"></v-divider>
            <div class="d-flex mx-4">
              <span style="font-weight: 900; font-size: 1.2rem" class="mx-1">或</span>
            </div>
            <v-divider class="flex-grow-1" thickness="3" color="#353D42" opacity="20"></v-divider>
          </div>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              :readonly="loading"
              :rules="[rules.required]"
              class="mb-2"
              label="Email"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              hint="至少 8 個字"
              label="password"
              name="input-10-1"
              counter
              @click:append="show1 = !show1"
              :readonly="loading"
            ></v-text-field>

            <br />
            <v-btn
              :disabled="!form"
              :loading="loading"
              color="#353D42"
              size="large"
              type="submit"
              variant="elevated"
              block
              rounded="lg"
            >
              登入
            </v-btn>

            <div class="text-center mt-8">
              <router-link to="/" class="mb-5">
                <span> 忘記密碼？</span>
              </router-link>
              <br />
              第一次來揪排咖嗎？
              <span @click="toggleMode" class="toggle"> 註冊新帳號</span>
            </div>
          </v-form>
        </div>

        <div v-else class="form-container pa-16">
          <v-img
            style="margin: auto"
            src="../assets/images/logo-portrait-dark.png"
            width="130"
          ></v-img>
          <h2 class="text-center slogan">
            For Every Skill, Every Set, <br />
            Every Player.
          </h2>
          <div class="d-flex align-center mt-3 mb-5">
            <v-divider class="flex-grow-1" thickness="3" color="#353D42" opacity="20"></v-divider>
            <div class="d-flex mx-4">
              <span style="font-weight: 900; font-size: 1.2rem" class="mx-1">註冊</span>
            </div>
            <v-divider class="flex-grow-1" thickness="3" color="#353D42" opacity="20"></v-divider>
          </div>
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field
              v-model="username"
              :readonly="loading"
              :rules="[rules.required]"
              class="mb-2"
              label="使用者名稱"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="email"
              :readonly="loading"
              :rules="[rules.required]"
              class="mb-2"
              label="Email"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              hint="至少 8 個字"
              label="password"
              name="input-10-1"
              counter
              @click:append="show1 = !show1"
              :readonly="loading"
            ></v-text-field>

            <br />
            <v-btn
              :disabled="!form"
              :loading="loading"
              color="#353D42"
              size="large"
              type="submit"
              variant="elevated"
              block
              rounded="lg"
            >
              註冊
            </v-btn>
            <div class="text-center mt-12">
              已經是揪排咖的一員了嗎？
              <span class="toggle" @click="toggleMode"> 按我登入</span>
            </div>
          </v-form>
        </div>
      </div>

      <div class="image-section d-none d-md-block">
        <v-img :src="currentImage" cover rounded="xl"></v-img>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

import loginImage from '@/assets/images/ran.jpg'
import registerImage from '@/assets/images/kim.jpg'

const isLoginMode = ref(true) // 預設顯示登入頁面

const currentImage = computed(() => {
  return isLoginMode.value ? loginImage : registerImage
})

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
}

const form = ref(false)
const email = ref(null)
const loading = ref(false)
const show1 = ref(false)
const password = ref('')
const username = ref('') // 新增註冊頁面的 username

function onSubmit() {
  if (!form.value) return
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}
const rules = {
  required: (value) => !!value || '此欄位為必填.',
  min: (v) => v.length >= 8 || '至少 8 個字',
  emailMatch: () => `使用者的帳號與密碼不符`,
}
</script>

<style lang="scss" scoped>
.full-height {
  min-height: 100vh;
}

.login-card {
  display: flex;
  width: 900px; // 調整卡片寬度以適應內容
  max-width: 90%;
  height: 600px;
  overflow: hidden;
  border-radius: 32px !important;
  transition: transform 0.6s ease-in-out;
}

.card-content {
  width: 50%;
  position: relative;
  transition: transform 0.6s ease-in-out;
  display: flex;
  background-color: #fff;
}

.image-section {
  width: 50%;
  transition: transform 0.6s ease-in-out;
}

.image-section .v-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.6s ease-in-out;
}

.form-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.6s ease-in-out;
  background-color: #fff;
}

// 註冊模式下的樣式
.login-card.register-mode .card-content {
  transform: translateX(100%);
}

.login-card.register-mode .image-section {
  transform: translateX(-100%);
}

.slogan {
  font-family: 'Cooper Black', sans-serif;
  font-weight: 300;
  line-height: 1.2;
  margin-top: 15px;
}

.toggle {
  text-decoration: underline;
  cursor: pointer;
}

// 小螢幕響應式設計 (隱藏圖片，使用淡入淡出)
@media (max-width: 960px) {
  // Vuetify 的 md 斷點
  .login-card {
    width: 100%;
    max-width: 450px;
    height: auto;
    border-radius: 16px !important;
    flex-direction: column;
    overflow: hidden;
  }

  .card-content {
    width: 100%;
    transform: none !important; // 取消大螢幕的平移動畫
  }

  .form-container {
    position: relative;
    padding: 24px !important; // 調整小螢幕 padding
  }

  .login-card.register-mode .image-section {
    transform: none !important; // 取消大螢幕的平移動畫
  }

  // 針對小螢幕的淡入淡出動畫
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
