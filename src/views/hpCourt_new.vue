<template>
  <v-container fluid class="bg-black">
    <v-row>
      <v-col cols="12" md="12" class="mb-md-5 ml-md-3 d-flex justify-space-between">
        <h1 class="page-title">探索各地特色球場</h1>
        <v-btn class="btn-outlined mt-md-10 mt-9" variant="outlined" to="/venueList"
          >球場列表</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center" class="pr-10 pl-10">
      <v-col cols="12" class="d-flex flex-wrap justify-evenly ga-10">
        <template v-for="(venue, idx) in randomVenues" :key="idx">
          <v-card class="card" height="535" rounded="lg" width="425">
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
  font-size: 2rem;
  letter-spacing: 2px;
  font-weight: 900;
  margin-left: 35px;
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

.card {
  transition: all 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 15px 15px 1px #fdd000;
  // box-shadow: none;
  // transform: translate(15px, 15px);

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

.btn {
  background-color: #ffd000;
}

.btn-outlined {
  border: 2px solid white;
  color: white;
  border-radius: 30px;
  margin-right: 40px;
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

.btn:hover {
  background-color: white;
  border: 3px solid #ffd000;
  color: #ffd000;
}

@media (min-width: 768px) {
  .page-title {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .btn-outlined {
    margin-right: 85px;
    height: 50px;
    width: 150px;
    font-size: 1.3rem !important;
  }
}
</style>
