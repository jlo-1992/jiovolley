<template>
  <v-container fluid class="bg-dark">
    <v-row justify="center">
      <v-col cols="12" md="9">
        <h1 class="name">Hi, Foxy!</h1>
        <p class="text-subtitle-1 text-grey-darken-1">Let's take a look at your activity today</p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="5">
        <v-row>
          <v-col cols="12">
            <div class="h-0">
              <svg height="0" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="pattern-0"
                    height="20"
                    patternTransform="rotate(145) scale(.2)"
                    patternUnits="userSpaceOnUse"
                    width="20"
                  >
                    <path
                      d="M0 10h20zm0 20h20zm0 20h20zm0 20h20z"
                      fill="none"
                      stroke="rgb(var(--v-theme-surface))"
                      stroke-width="3"
                    />
                  </pattern>
                </defs>
              </svg>
            </div>
          </v-col>

          <v-col cols="12" md="5">
            <v-card class="pa-4 card">
              <v-card-title class="card-title">我的球員檔案</v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" md="12">
            <v-card class="pa-4 card">
              <v-card-title class="card-title">我的購物車</v-card-title>
              <swiper
                effect="coverflow"
                :grabCursor="true"
                :centeredSlides="true"
                :slidesPerView="'auto'"
                :coverflowEffect="{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }"
                :pagination="true"
                :modules="modules"
                class="mySwiper"
              >
                <swiper-slide
                  ><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
                ><swiper-slide
                  ><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
                ><swiper-slide
                  ><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
                ><swiper-slide
                  ><img src="https://swiperjs.com/demos/images/nature-4.jpg"
                /></swiper-slide>
              </swiper>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <v-card class="pa-4 card">
              <v-card-title class="card-title">我的訂單</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4">
        <div class="mb-5">
          <v-card class="pa-6" elevation="6" rounded="xl">
            <v-card-title class="d-flex align-center justify-space-between">
              <div class="card-title">我的出席統計</div>
              <v-select
                v-model="selectedGroup"
                :items="['Transactions', 'Other']"
                density="compact"
                max-width="200"
                variant="solo-filled"
                flat
                hide-details
                single-line
              ></v-select>
            </v-card-title>

            <v-pie
              :items="currentItems"
              :legend="{ position: $vuetify.display.mdAndUp ? 'right' : 'bottom' }"
              :tooltip="{ subtitleFormat: '[value]%' }"
              class="pa-3 mt-3 justify-center"
              gap="2"
              inner-cut="70"
              item-key="id"
              rounded="2"
              size="200"
              animation
              hide-slice
              reveal
            >
              <template v-slot:center>
                <div class="text-center">
                  <div class="card-title text-h5">出席率</div>
                  <div class="opacity-70 text-h4 mt-1 mb-n1">90%</div>
                </div>
              </template>

              <template v-slot:legend="{ items, toggle, isActive }">
                <v-list class="py-0 mb-n5 mb-md-0 bg-transparent" density="compact" width="150">
                  <v-list-item
                    v-for="item in items"
                    :key="item.key"
                    :class="['my-1', { 'opacity-40': !isActive(item) }]"
                    :title="item.title"
                    rounded="lg"
                    link
                    @click="toggle(item)"
                  >
                    <template v-slot:prepend>
                      <v-avatar :color="item.color" :size="16"></v-avatar>
                    </template>
                    <template v-slot:append>
                      <div class="font-weight-bold">{{ item.value }}%</div>
                    </template>
                  </v-list-item>
                </v-list>
              </template>
            </v-pie>
          </v-card>
        </div>
        <v-card class="pa-4 card" style="overflow-y: scroll">
          <v-card-title class="card-title">我的排球行事曆</v-card-title>
          <v-row class="fill-height">
            <v-col>
              <v-sheet height="350">
                <v-calendar
                  ref="calendar"
                  v-model="today"
                  :events="events"
                  color="#353D42"
                  type="month"
                ></v-calendar>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay, useDate } from 'vuetify'
import { computed, onMounted, ref, shallowRef, toRef } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper/modules'

const modules = [EffectCoverflow, Pagination]
const display = useDisplay()

// 我的出席統計
const selectedGroup = shallowRef('Transactions')
const currentItems = toRef(() =>
  selectedGroup.value === 'Transactions'
    ? [
        {
          id: 1,
          title: '出席',
          value: 90,
          color: '#353D42',
        },
        { id: 2, title: '缺席', value: 10, color: '#f1f1f1', pattern: 'url(#pattern-0)' },
      ]
    : [
        { id: 1, title: '出席', value: 90, color: '#767119' },
        { id: 2, title: '缺席', value: 10, color: '#9e850d' },
      ]
)

// 我的排球行事曆
const calendar = ref()

const today = ref([new Date()])
const events = ref([])
const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
// 預計改成傳入的球場名稱
const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

onMounted(() => {
  const adapter = useDate()
  fetchEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())),
    end: adapter.endOfDay(adapter.endOfMonth(new Date())),
  })
})
function fetchEvents({ start, end }) {
  const _events = []
  const min = start
  const max = end
  const days = (max.getTime() - min.getTime()) / 86400000
  const eventCount = rnd(days, days + 20)
  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0
    const firstTimestamp = rnd(min.getTime(), max.getTime())
    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
    const second = new Date(first.getTime() + secondTimestamp)
    _events.push({
      title: names[rnd(0, names.length - 1)],
      start: first,
      end: second,
      color: colors[rnd(0, colors.length - 1)],
      allDay: !allDay,
    })
  }
  events.value = _events
}
function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}
</script>

<style lang="scss" scoped>
.name {
  font-family: 'Cooper Black', sans-serif;
  color: vars.$secondary-color;
  font-weight: 100;
}

.card {
  font-family: 'Cooper Black', sans-serif;
  background: vars.$secondary-color;
  border-radius: 32px;
}

.card-title {
  font-family: 'Huninn', sans-serif;
  font-family: 'Cooper Black', sans-serif;
  font-weight: bold;
}
</style>
