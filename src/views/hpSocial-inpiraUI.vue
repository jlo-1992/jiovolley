<template>
  <div class="bg-black">
    <div class="overlay-background"></div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="12" class="mb-md-5 ml-md-11 d-flex justify-space-between">
          <h1 class="page-title">選好場次馬上報名</h1>
          <v-btn class="btn-outlined mt-md-10 mt-9" variant="outlined" to="/venueList"
            >更多場次</v-btn
          >
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <div
            class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl mb-md-15 marquee-wrapper"
          >
            <Marquee pause-on-hover class="[--duration:20s]">
              <div class="card" v-for="(social, i) in allSocials" :key="i">
                <v-img
                  class="card-img"
                  :src="social.venue.images[0]"
                  height="100%"
                  width="100%"
                  cover
                ></v-img>
                <div class="overlay">
                  <v-btn class="btn" height="50" variant="outlined" @click="goBookSocials(social)">
                    我要報名
                  </v-btn>
                </div>
                <div>
                  <div class="cardInfo-container">
                    <h3 class="text-title">{{ social.venue.name }}</h3>

                    <h4 class="text-demandPlayers">
                      還缺 {{ social.demandFemalePlayers + social.demandMalePlayers }} 人
                    </h4>
                  </div>

                  <h4 class="text-detail">
                    日期：{{ formatDate(social.startDateTime) }}<br />
                    時間：{{ formatTime(social.startDateTime) }}-{{ formatTime(social.endDateTime)
                    }}<br />
                    價格：{{ social.fee }} 元
                  </h4>
                </div>
              </div>
            </Marquee>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { defineProps } from 'vue'
import socialService from '@/services/socialService'
import { useRouter, useRoute } from 'vue-router'
import { useSocialStore } from '@/stores/socialStore'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone.js'

const allSocials = ref([])
const router = useRouter()
const socialStore = useSocialStore()
dayjs.extend(utc)
dayjs.extend(timezone) // 新增這一行
dayjs.tz.setDefault('Asia/Taipei') // 設定預設時區為台灣

const props = defineProps({
  pauseOnHover: { default: () => false },
  vertical: { default: () => false },
  reverse: { default: () => false },
  repeat: { default: () => 1 },
})

const getSocials = async () => {
  const { data } = await socialService.getAvailable()
  allSocials.value = data.socials
}

const goBookSocials = (social) => {
  socialStore.setSelectedSocial(social)
  // 導向到 /socials 頁面
  router.push('/socials')
}

const formatDate = (isoString) => {
  if (!isoString) return ''
  // 使用 .utc() 確保 dayjs 將其解析為 UTC 時間
  return dayjs.utc(isoString).tz('Asia/Taipei').format('YYYY-MM-DD')
}

const formatTime = (isoString) => {
  if (!isoString) return ''
  // 使用 .utc() 確保 dayjs 將其解析為 UTC 時間
  return dayjs.utc(isoString).tz('Asia/Taipei').format('HH:mm')
}

onMounted(() => {
  getSocials()
})
</script>

<style scoped lang="scss">
.marquee-wrapper {
  height: 450px;
}

.bg-black {
  // background: black;
  position: relative;
  background: url('@/assets/images/banner/volleyballCourt.jpeg') center/cover;
}

.page-title {
  color: vars.$secondary-color;
  font-size: 2rem;
  letter-spacing: 2px;
  font-weight: 900;
  margin-left: 25px;
  z-index: 100;
}

.animate-marquee {
  animation: marquee var(--duration) linear infinite;
  animation-direction: reverse;
}

.animate-marquee-vertical {
  animation: marquee-vertical var(--duration) linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}

.cardInfo-container {
  display: flex;
  top: 0;
  left: 0;
  position: absolute;
  border-bottom: 1px solid vars.$secondary-color;
  width: 100%;
}

.text-title {
  font-size: 1.5rem;
  border-right: 1px solid vars.$secondary-color;
  padding-top: 10px;
  padding-left: 20px;
  // padding-right: 10px;
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text-detail {
  position: absolute;
  font-size: 1.7rem;
  bottom: 5%;
  left: 8%;
}

.text-demandPlayers {
  font-size: 2rem;
  width: 200px;
  padding-left: 20px;
  // padding-top: 10px;
  margin: auto;
}

.card {
  color: white;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.5s ease;
  width: 300px;
  height: 400px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover .overlay {
  pointer-events: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.card-img {
  transition: transform 0.5s ease;
  object-position: center;
}

.btn {
  background-color: #ffd000;
  height: 50px;
  width: 200px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.card:hover .card-img {
  transform: scale(1.2);
}

.card:hover .btn {
  opacity: 1;
  transform: translateY(0);
}

.btn-outlined {
  border: 2px solid white;
  color: white;
  border-radius: 30px;
  margin-right: 30px;
  font-size: 1rem !important;
  height: 35px;
  width: 100px;
  box-shadow: 2px 3px 1px white;
}

.btn-outlined:hover {
  background-color: #ffd000;
  color: white;
  border: 2px solid #ffd000;
  transform: translate(5px, 5px);
  box-shadow: none;
}

.overlay-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.664) 90%, transparent);
}

@media (min-width: 768px) {
  .card {
    width: 480px;
    height: 600px;
  }

  .text-title {
    font-size: 2.2rem;
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    line-height: 1.4;
    height: 2.05em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }
  .text-city {
    left: 45%;
    font-size: 2.2rem;
    padding-right: 65px;
    padding-left: 65px;
  }

  .text-address {
    font-size: 1.7rem;
  }

  .page-title {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .btn-outlined {
    margin-right: 60px;
    height: 50px;
    width: 150px;
    font-size: 1.3rem !important;
  }

  .marquee-wrapper {
    height: 600px;
  }
}
</style>
