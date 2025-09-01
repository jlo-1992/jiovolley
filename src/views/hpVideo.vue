<template>
  <v-container fluid class="pa-0 bg-light" style="background-color: white">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="video-container" ref="videoContainer">
          <v-video
            controls-variant="hidden"
            :src="videoSrc"
            autoplay
            muted
            loop
            hide-overlay
            hide-play
            no-fullscreen
            class="video"
            ref="videoPlayer"
            playsinline
            height="100vh"
          />
          <div id="slogan">
            一躍而起，就是現在！<br />
            你的排球熱情 -<span class="slogan-english">JIOVOLLEY</span><br />
            揪排咖跟你一起實現！<br />
            <v-btn
              class="btn"
              rounded="xl"
              size="x-large"
              append-icon="mdi-arrow-right"
              to="/socials"
              >現在加入</v-btn
            >
          </div>
          <div class="scroll-notice-container" ref="scrollNoticeContainer">
            <div class="scrollNotice">
              <h1>向下捲動</h1>
            </div>
            <div class="scroll-line" ref="scrollLine">
              <div class="meteor" ref="meteor"></div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import videoPath from '../assets/videos/vnl2025.mp4'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const videoSrc = videoPath
const videoPlayer = ref(null)
const videoContainer = ref(null)
const scrollLine = ref(null)
const meteor = ref(null)
const scrollNoticeContainer = ref(null)
let ctx

const handlePageVisibility = () => {
  const videoElement = videoPlayer.value?.$el
  if (!videoElement) return

  const video = videoElement.querySelector('video') || videoElement

  if (document.hidden) {
    // 頁面隱藏時暫停播放
    video.pause()
  } else {
    // 頁面顯示時繼續播放
    video.play().catch((error) => {
      console.error('影片播放失敗', error)
    })
  }
}

// 滾動觸發動畫
const setupTimelineAnimation = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: videoContainer.value,
      start: 'top top',
      end: () => `bottom top`,
      scrub: true,
    },
  })

  // 將三個動畫依序加入時間軸
  tl.to(
    scrollNoticeContainer.value,
    {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.in',
    },
    'start' // 使用標籤確保所有動畫同時開始
  )
    .to(
      '#slogan',
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.in',
      },
      'start' // 與 scrollNoticeContainer 同時開始
    )
    .to(
      videoContainer.value,
      {
        width: '60%',
        height: '50%',
        y: () => window.innerHeight * 0.5,
        x: '30%',
        duration: 1,
        ease: 'power1.out',
      },
      'start' // 與其他兩個動畫同時開始
    )
}

// 新增 GSAP 流星動畫
const setupMeteorAnimation = () => {
  gsap.fromTo(
    meteor.value,
    {
      y: '-100%', // 從上方開始
      opacity: 0.5, // 透明
    },
    {
      y: '100%',
      opacity: 1,
      duration: 1.5,
      repeat: -1,
      ease: 'power1.inOut',
    }
  )
}

onMounted(() => {
  // 確保 DOM 渲染完成後再執行動畫設定
  // if (videoContainer.value) {
  //   setupScrollAnimation()

  //   if (scrollLine.value) {
  //     setupMeteorAnimation()
  //   }
  // }

  ctx = gsap.context(() => {
    if (videoContainer.value) {
      setupTimelineAnimation()
    }
    if (scrollLine.value) {
      setupMeteorAnimation()
    }
  })

  document.addEventListener('visibilitychange', handlePageVisibility)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handlePageVisibility)
  // 在元件卸載時，移除 ScrollTrigger 實例以避免記憶體洩漏
  // ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  if (ctx) {
    ctx.revert()
  }
})
</script>

<style scoped lang="scss">
.video {
  pointer-events: none;

  object-fit: cover;
}

.btn {
  font-family: 'Huninn', sans-serif;
  padding: 5px 40px;
  background-color: #fdd008;
}

#slogan {
  width: 440px;
  position: absolute;
  top: 48%;
  color: vars.$secondary-color;
  font-family: 'Huninn', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  margin-left: 10%;
  text-shadow: 5px 5px 5px solid black;
  line-height: 1.5;
  z-index: 10;
}

.slogan-english {
  font-family: 'Cooper Black', sans-serif;
  font-weight: 900;
}

.video-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-notice-container {
  display: none;
}

@media (min-width: 768px) {
  #slogan {
    top: 45%;
    width: 800px;
    font-size: 3.3rem;
    margin-left: 54%;
  }

  .scroll-notice-container {
    display: block;
    position: absolute;
    bottom: 85px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .scrollNotice {
    bottom: 50px;
    color: white;
    font-size: 1rem;
    animation: bounce 1.5s infinite;
    position: relative;
    overflow: hidden;
  }

  .meteor {
    position: absolute;
    left: 0%;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, white, transparent);
  }

  .scroll-line {
    width: 0px;
    height: 50px;
    background-color: white;
    margin-top: 10px;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
}
</style>
