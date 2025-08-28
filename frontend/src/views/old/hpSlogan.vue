<template>
  <div class="bg">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="text-wrapper">
          <div class="text-line">一躍而起，就是現在！</div>
          <div class="text-line">你的排球熱情 - <span class="text-english">JIOVOLLEY</span></div>
          <div class="text-line">揪排咖跟你一起實現！</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted } from 'vue'
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // 視窗小於 md 尺寸不執行動畫
  if (window.innerWidth < 960) return

  gsap.from('.text-line', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.text-wrapper',
      start: 'bottom bottom',
      toggleActions: 'play reverse play reverse',
    },
  })
})
</script>

<style scoped lang="scss">
.bg {
  background-color: vars.$secondary-color;
  height: 20vh;
}

.text-line {
  color: vars.$primary-color;
  font-size: 35px;
  margin-top: 15px;
  line-height: 1.2;
  font-weight: 900;
  font-family: 'Huninn', sans-serif;
}

.text-english {
  font-family: 'Cooper Black', sans-serif;
}

.text-wrapper {
  margin-top: 30px;
  margin-left: 30px;
}

@media (min-width: 768px) {
  .bg {
    height: 60vh;
  }
  .text-line {
    font-size: 70px;
    margin-bottom: 30px;
  }
  .text-wrapper {
    margin-top: 150px;
  }
}
</style>
