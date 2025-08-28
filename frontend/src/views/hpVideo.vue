<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="video-container">
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
              to="/logInSingUp"
              >現在加入</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import videoPath from '../assets/videos/vnl2025.mp4'

const videoSrc = videoPath
const videoPlayer = ref(null)

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

onMounted(() => {
  document.addEventListener('visibilitychange', handlePageVisibility)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handlePageVisibility)
})
</script>

<style scoped lang="scss">
.video {
  pointer-events: none;
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
}

.slogan-english {
  font-family: 'Cooper Black', sans-serif;
  font-weight: 900;
}

.video-container {
  position: relative;
}

@media (min-width: 768px) {
  #slogan {
    top: 45%;
    width: 800px;
    font-size: 3.3rem;
    margin-left: 54%;
  }
}
</style>
