<template>
  <div class="bg-light pt-15">
    <v-container v-if="mdAndUp" class="d-flex justify-center">
      <v-card rounded="xl" class="nav-card mb-10">
        <v-list class="d-flex pa-0 nav-list" bg-color="#1a4d3f">
          <v-list-item
            v-for="(item, i) in navItems"
            :key="i"
            :title="item"
            :active="activeNav === i"
            @click="activeNav = i"
            class="nav-item"
            :class="{ 'active-item': activeNav === i }"
          >
            <template v-slot:append v-if="activeNav === i">
              <div class="active-indicator"></div>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>

    <v-container v-else class="my-4">
      <v-card rounded="lg" dark color="#1a4d3f" class="pa-2">
        <v-list-item
          :title="navItems[activeNav]"
          :class="{ 'active-toggle': navOpen }"
          @click="navOpen = !navOpen"
          class="nav-toggle"
        >
          <template v-slot:append>
            <v-icon :class="{ 'rotate-icon': navOpen }">mdi-chevron-down</v-icon>
          </template>
        </v-list-item>
      </v-card>
      <v-expand-transition>
        <v-card v-show="navOpen" rounded="lg" dark color="#1a4d3f" class="mt-2">
          <v-list class="pa-0">
            <v-list-item
              v-for="(item, i) in navItems"
              :key="i"
              :title="item"
              :active="activeNav === i"
              @click="
                {
                  ;(activeNav = i), (navOpen = false)
                }
              "
              class="nav-item-mobile"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-expand-transition>
    </v-container>

    <v-container class="products-container">
      <v-window v-if="smAndDown" v-model="window" show-arrows>
        <v-window-item v-for="(product, i) in products" :key="i" class="d-flex justify-center">
          <ProductCard
            :product="product"
            :is-highlight="activeProduct === i"
            @click="activeProduct = i"
          />
        </v-window-item>
      </v-window>

      <v-row v-else justify="center">
        <v-col
          v-for="(product, i) in products"
          :key="i"
          cols="12"
          md="6"
          lg="3"
          class="d-flex justify-center"
        >
          <ProductCard :product="product" :is-highlight="i === 1" />
        </v-col>
      </v-row>

      <v-btn
        class="cart-btn"
        icon="mdi-cart"
        size="large"
        v-ripple
        :to="
          isLoggedIn
            ? '/member/cart'
            : { path: '/logInSingUp', query: { redirect: route.fullPath } }
        "
      >
        <v-badge v-model="user.cartTotal" :content="user.cartTotal" color="red" floating>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import ProductCard from '@/components/shProductCard.vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'

const { mdAndUp, smAndDown } = useDisplay()
const user = useUserStore()
const route = useRoute()
const isLoggedIn = computed(() => user.isLoggedIn)

const navItems = ref(['球衣球褲', '球鞋', '球襪', '護具', '其他'])
const activeNav = ref(0)
const navOpen = ref(false)
const window = ref(0)
const activeProduct = ref(1)

const products = ref([
  {
    name: 'CARAMEL LATTE',
    image: 'https://via.placeholder.com/250x300.png?text=Caramel+Latte',
    options: ['MILK', 'CREAM', 'TOPPINGS'],
  },
  {
    name: 'MOCHA FRAPP',
    image: 'https://via.placeholder.com/250x300.png?text=Mocha+Frapp',
    options: ['MILK', 'CREAM', 'TOPPINGS'],
  },
  {
    name: 'VANILLA BEAN',
    image: 'https://via.placeholder.com/250x300.png?text=Vanilla+Bean',
    options: ['MILK', 'CREAM', 'TOPPINGS'],
  },
  {
    name: 'HAZELNUT BREW',
    image: 'https://via.placeholder.com/250x300.png?text=Hazelnut+Brew',
    options: ['MILK', 'CREAM', 'TOPPINGS'],
  },
])
</script>

<style scoped lang="scss">
.bg-light {
  padding-bottom: 500px;
}

/* 導航欄樣式 */
.nav-card {
  background-color: #1a4d3f;
  overflow: hidden;
}

.nav-list {
  background-color: #1a4d3f;
}

.nav-item {
  color: #d1d1d1;
  padding: 15px 30px;
  font-weight: bold;
  position: relative;
  transition: background-color 0.3s;
}

.nav-item.active-item {
  position: relative;
  color: #fff;
}

.nav-item.active-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #104130;
  border-radius: 50px;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 0;
}

.nav-item .v-list-item__content {
  z-index: 1;
}

/* 小螢幕導航切換按鈕 */
.nav-toggle {
  color: #d1d1d1;
  font-weight: bold;
}

.rotate-icon {
  transform: rotate(180deg);
  transition: transform 0.3s;
}

/* 商品卡片樣式 */
.products-container {
  max-width: 1200px;
}

/* 覆寫 Vuetify 預設樣式以實現圖片效果 */
.v-window-item {
  padding: 0 16px;
}

.cart-btn {
  position: fixed;
  top: 18%;
  right: 5%;
  background-color: white;
  color: vars.$primary-color;
  box-shadow: 1px 1px 5px vars.$primary-color;
  border-radius: 50%;
}

@media (min-width: 768px) {
  .cart-btn {
    top: 10%;
  }
}
</style>
