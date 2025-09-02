<template>
  <v-container fluid class="bg-light" style="background-color: white">
    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-space-between ml-md-10 position-relative">
        <h1 class="page-title" style="color: black">探索各地特色球場</h1>
        <h1 class="title-background">Venues</h1>
        <v-btn class="btn-outlined mt-md-10 mt-9" style="" variant="outlined" to="/venueList"
          >球場列表</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center" class="pr-10 pl-10">
      <v-col cols="12" class="d-flex flex-wrap justify-evenly ga-5">
        <template v-for="(venue, idx) in randomVenues" :key="idx">
          <v-card class="card mb-8" height="460" width="400">
            <v-img class="imgs" :src="venue.images[0]" cover height="100%" position="top"></v-img>
            <div class="overlay-text">
              <h1 class="text-h5 card-title">{{ venue.name }}</h1>
              <h2 class="venue-address">{{ venue.city }}{{ venue.address }}</h2>
              <v-divider :thickness="1" opacity="100" class="mr-5 mt-8 mb-3 divider"></v-divider>
              <v-btn class="btn ml-3" rounded="lg" :to="`/venueSingle/${venue._id}`"
                >點我看更多球場資訊</v-btn
              >
            </div>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import venueService from '@/services/venueService'

const allVenues = ref([])
const randomVenues = ref([])

const getVenues = async () => {
  try {
    const { data } = await venueService.getAvailable()
    if (data && data.venues) {
      allVenues.value = data.venues
      const shuffledVenues = allVenues.value.sort(() => 0.5 - Math.random())

      // 2. 再從排序好的陣列中取出前 8 個場館
      randomVenues.value = shuffledVenues.slice(0, 8)

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
  font-size: 1.7rem;
  letter-spacing: 2px;
  font-weight: 900;
  margin-left: 35px;
  z-index: 11111;
}

.title-background {
  font-family: 'Cooper Black', sans-serif;
  color: #f1f1f1;

  font-size: 12rem;
  position: absolute;
  left: 3%;
  top: -75px;
  transform: rotateX(60deg);
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
  padding-top: 10px;
  text-align: left;
  height: 135px;
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

.btn {
  position: absolute; // 絕對定位
  bottom: 15px; // 距離底部 20px
  left: 28%; // 從左邊開始 50%
  transform: translateX(-50%); // 往左平移自身寬度的一半，實現水平置中
  // 其餘按鈕樣式
}

.btn:hover {
  bottom: 12px; // 距離底部 20px
  left: 29%;
}

.card {
  transition: all 0.3s ease-in-out;
  position: relative;
  // border: 2px solid black;
  border-radius: 8px;
  box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 15px 15px 1px black;

  .overlay-text {
    height: 205px;
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

.btn-outlined {
  border-radius: 30px;
  margin-right: 40px;
  font-size: 1rem !important;
  height: 35px;
  width: 100px;
  border-color: black;
  color: black;
  box-shadow: 2px 3px 1px black;
}

.btn-outlined:hover {
  background-color: #ffd000;
  color: white;
  border: 2px solid #ffd000;
  transform: translate(5px, 5px);
  box-shadow: none;
}

@media (min-width: 768px) {
  .page-title {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .btn-outlined {
    margin-right: 115px;
    height: 50px;
    width: 150px;
    font-size: 1.3rem !important;
  }
}
</style>
