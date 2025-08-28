<template>
  <v-container fluid class="bg-light">
    <v-row justify="center">
      <v-col cols="11" md="3" class="text-center mb-10">
        <h1 class="page-title">一鍵下單熱門商品</h1>
        <v-divider :thickness="3" opacity="100"></v-divider>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <v-row justify="center">
          <v-col
            cols="12"
            md="5"
            lg="3"
            v-for="(product, idx) in productInfo"
            :key="idx"
            class="d-flex justify-center"
          >
            <v-card
              width="332"
              height="438s"
              class="ma-2 card d-flex flex-column pb-10"
              rounded="lg"
              to="/shop"
            >
              <div class="img-container d-flex justify-center mt-10">
                <v-img :src="product.image"></v-img>
              </div>
              <div class="text-center content-container mt-10">
                <v-card-title class="justify-center text-wrap">{{ product.title }}</v-card-title>
                <v-btn class="btn mx-auto mt-3" width="230" height="60">進入賣場</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const productInfo = ref([
  {
    image: new URL('../assets/images/products/jerseys/jersey-12.jpg', import.meta.url).href,
    title: '【VOLLEY】室內排球訓練服',
  },
  {
    image: new URL('../assets/images/products/others/nikebag2.jpg', import.meta.url).href,
    title: '【NIKE】 運動提袋 BRSLA ',
  },
  {
    image: new URL('../assets/images/products/shoes/nike-white.jpg', import.meta.url).href,
    title: '【ASICS】 排球鞋 Upcourt 6 ',
  },
  {
    image: new URL('../assets/images/products/socks/football.jpg', import.meta.url).href,
    title: '【白襪賓賓】ACE 嗆司排球襪',
  },
])
</script>

<style scoped lang="scss">
.bg-light {
  background-color: white;
  padding-top: 200px;
  padding-bottom: 200px;
}

.page-title {
  font-size: 2.5rem;
  letter-spacing: 5px;
  font-weight: 900;
}

.card {
  background-color: white;
  box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.1);
}

.btn {
  background-color: #f8d741;
  font-size: 1.4rem;
  // font-weight: 600;
  border-radius: 30px;
  color: white;
  letter-spacing: 5px;
}

.btn:hover {
  background-color: white;
  border: 3px solid #ffd000;
  color: #ffd000;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  // padding: 20px;
}

.img-container {
  width: 100%;
  height: 180px;
  // overflow: hidden;
}

:deep(.v-divider) {
  border-color: #ffd000 !important; // 強制覆蓋 Vuetify 的預設顏色
}

@media (min-width: 768px) {
  .page-title {
    font-size: 3rem;
  }
}
</style>
