<template>
  <v-container fluid class="bg-black">
    <v-row justify="center">
      <v-col cols="11" md="3" class="text-center mb-md-15">
        <h1 class="page-title">探索各地特色球場</h1>
        <v-divider :thickness="3" opacity="100"></v-divider>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <swiper
          :modules="[Navigation]"
          :slides-per-view="3"
          :space-between="100"
          :navigation="true"
          class="mySwiper"
        >
          <swiper-slide v-for="(venue, idx) in allVenues" :key="idx">
            <v-card class="card" height="600" rounded="lg" width="460">
              <v-img
                class="imgs"
                :src="venue.images[0]"
                rounded="lg"
                cover
                height="100%"
                position="top"
              ></v-img>
              <div class="overlay-text">
                <h1 class="text-h5 card-title">{{ venue.name }}</h1>
                <h2 class="venue-address">{{ venue.city }}{{ venue.address }}</h2>
                <v-divider :thickness="1" opacity="100" class="mr-5 mt-8 mb-3 divider"></v-divider>
                <v-btn class="btn" rounded="lg" :to="`/venueSingle/${venue._id}`"
                  >點我看更多球場資訊</v-btn
                >
              </div>
            </v-card>
          </swiper-slide>
        </swiper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import venueService from '@/services/venueService'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const allVenues = ref([])

const getVenues = async () => {
  try {
    const { data } = await venueService.getAvailable()
    if (data && data.venues) {
      allVenues.value = data.venues
      console.log('球場列表取得成功', allVenues.value)
    } else {
      allVenues.value = []
      console.log('API 回傳資料格式不正確', data)
    }
  } catch (error) {
    console.error('球場列表取得失敗:', error)
  }
}

onMounted(() => {
  getVenues()
})
</script>

<style scoped lang="scss">
.page-title {
  color: vars.$secondary-color;
  font-size: 2.5rem;
  letter-spacing: 5px;
  font-weight: 900;
}

.mySwiper {
  width: 100%;
  padding: 20px 50px !important; // 為導航按鈕留出空間
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #ffd000 !important;

  &:after {
    font-size: 24px;
  }

  &.swiper-button-disabled {
    opacity: 0.35;
  }
}

h1 {
  font-family: 'Huninn', sans-serif;
  font-weight: 500;
}

.bg-black {
  background-color: black;
}

.imgs {
  position: relative;
  transition: transform 0.2s;
}

.overlay-text {
  position: absolute;
  color: black;
  background-color: white;
  padding-left: 20px;
  padding-top: 15px;
  text-align: left;
  height: 130px;
  bottom: 0;
  width: 100%;
  transition: height 0.2s ease-in-out;
}

.card-title {
  transition: padding-bottom 0.2s ease-in-out;
  position: relative;
  z-index: 2;
}
.venue-address {
  display: none;
}

.card:hover {
  .overlay-text {
    height: 200px;
  }

  .imgs {
    transform: scale(1.2);
  }
  .venue-address {
    display: block;
    padding-bottom: 45px;
    color: gray;
  }
}

:deep(.v-divider) {
  border-color: #ffd000 !important; // 強制覆蓋 Vuetify 的預設顏色
}

.btn {
  background-color: #ffd000;
  color: white;
}

.btn:hover {
  background-color: white;
  border: 3px solid #ffd000;
  color: #ffd000;
}

@media (min-width: 768px) {
  .page-title {
    font-size: 3rem;
  }
}
</style>
