<template>
  <div class="bg">
    <v-container>
      <v-row>
        <div class="card-container d-flex ga-8 mt-md-16">
          <div v-for="(card, i) in cardsInfo" :key="i" class="card">
            <v-img class="card-img" :src="card.image" height="100%" width="100%" cover></v-img>
            <div>
              <h3 class="text-title">{{ card.title }}</h3>
              <h4 class="text-city">{{ card.city }}</h4>
              <h4 class="text-address">{{ card.address }}</h4>
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import gsap from 'gsap'

import { onMounted } from 'vue'

onMounted(() => {
  const cards = document.querySelectorAll('.card')
  const cardContainer = document.querySelector('.card-container')

  if (cards && cardContainer) {
    const totalWidth = cardContainer.scrollWidth
    const containerWidth = cardContainer.offsetWidth
    const distance = totalWidth + containerWidth // 滑過的總距離

    const tl = gsap.timeline({ repeat: -1 })

    tl.to(cards, {
      x: `-=${distance}`,
      duration: 10,
      ease: 'linear',
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const newX = parseFloat(x) % distance
          return newX
        }),
      },
    })

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => tl.pause())
      card.addEventListener('mouseleave', () => tl.resume())
    })
  }
})

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
</script>

<style scoped lang="scss">
.bg {
  background-color: vars.$primary-color;
  height: 65vh;
  padding-top: 5rem;
}

.text-title {
  position: absolute;
  font-size: 1.5rem;
  top: 1%;
  left: 4%;
  border-right: 1px solid vars.$secondary-color;
  border-bottom: 1px solid vars.$secondary-color;
  padding-top: 10px;
  padding-right: 30px;
  padding-bottom: 7px;
}

.text-city {
  position: absolute;
  font-size: 1.5rem;
  top: 1%;
  left: 54%;
  border-bottom: 1px solid vars.$secondary-color;
  padding-top: 10px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 7px;
}

.text-address {
  position: absolute;
  font-size: 1.1rem;
  bottom: 5%;
  left: 4%;
}

.card-container {
  white-space: nowrap;
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

.card-img {
  transition: transform 0.5s ease;
  object-position: center;
}

.card-img:hover {
  transform: scale(1.2);
}

@media (min-width: 768px) {
  .bg {
    min-height: 100vh;
  }
  .card {
    width: 480px;
    height: 600px;
  }

  .text-title {
    font-size: 2.2rem;
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
}
</style>
