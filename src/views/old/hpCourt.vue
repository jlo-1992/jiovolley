<template>
  <v-container class="pa-0" fluid>
    <v-row style="background-color: #f1f1f1">
      <v-col class="text-center mb-10" cols="12">
        <h1 class="title">快來看看新增的球場</h1>
      </v-col>
    </v-row>
    <v-row
      class="bg-section"
      :style="{ backgroundImage: `url(${currentBgImage})` }"
      justify="center"
    >
      <v-col cols="12" lg="8" md="8" sm="12" xl="8" xs="12">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div v-for="(card, idx) in cardsInfo" :key="idx" class="swiper-slide">
              <v-img cover height="100%" rounded="xl" :src="card.image" />
              <div class="overlay-text">
                <h1>{{ card.title }}</h1>
                <h2>{{ card.city }}{{ card.address }}</h2>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"><!-- --></div>
          <div class="swiper-button-next"><!-- --></div>
          <div class="swiper-scrollbar"><!-- --></div>
          <div class="swiper-pagination"><!-- --></div>
        </div>
        <router-link to="/venueList">
          <v-btn class="btn mt-5" height="45" width="200">點我看更多</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const currentBgImage = ref('')

const cardsInfo = [
  {
    title: '藍鵲中和館',
    city: '新北市',
    image: new URL('@/assets/images/venues/藍鵲中和1.PNG', import.meta.url).href,
    address: '中和區中和區圓通路439-2號',
  },
  {
    title: '3.14π 球館',
    city: '新北市',
    image: new URL('@/assets/images/venues/新3.14.PNG', import.meta.url).href,
    address: '三重區光復路二段17巷22之1號',
  },
  {
    title: 'NVA Club',
    city: '新北市',
    image: new URL('@/assets/images/venues/NVA.PNG', import.meta.url).href,
    address: '土城區忠義路55巷55-8號',
  },
  {
    title: '球魔方排球館',
    city: '新北市',
    image: new URL('@/assets/images/venues/球魔方.PNG', import.meta.url).href,
    address: '五股區中興路二段37巷13號',
  },
]

onMounted(() => {
  currentBgImage.value = cardsInfo[0].image

  const swiperInstance = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    direction: 'horizontal',
    loop: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },

    // 監聽 slideChange 事件
    on: {
      slideChange: function () {
        currentBgImage.value = cardsInfo[this.realIndex].image
      },
    },
  })
})
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: 640px;
  margin-top: 60px;
}

.bg-section {
  background: url('@/assets/images/venues/藍鵲中和1.PNG') no-repeat center/cover;
  text-align: center;
  padding-bottom: 50px;
  transition: background-image 0.5s ease-in-out;
}

.overlay-text {
  position: absolute;
  bottom: 0;
  color: white;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  width: 100%;
  padding: 55px;
  text-align: left;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
}

h2 {
  line-height: 2.5rem;
  font-size: 2rem;
  letter-spacing: 0;
  font-weight: 500;
  width: 60%;
}

h3 {
  line-height: 1.75rem;
  font-size: 1.375rem;
  letter-spacing: 0;
  font-weight: 400;
  width: 60%;
}
.swiper-button-next,
.swiper-button-prev {
  --swiper-navigation-color: transparent;
  --swiper-navigation-size: 650px;
}

.btn {
  background-color: vars.$primary-color;
  color: vars.$secondary-color;
  border-radius: 8px;
  font-size: 1.3rem;
}

.swiper-pagination {
  --swiper-pagination-top: 10%;
  --swiper-pagination-color: white;
  --swiper-pagination-progressbar-bg-color: rgba(37, 33, 33, 0.25);
}

@media (max-width: 960px) {
  .swiper-button-next,
  .swiper-button-prev {
    --swiper-navigation-color: transparent;
    --swiper-navigation-size: 100px;
  }
  h2 {
    font-size: 1.8rem;
    width: 80%;
  }
  h3 {
    font-size: 1.2rem;
    width: 80%;
  }
}
</style>
