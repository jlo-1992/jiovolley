<template>
  <v-container fluid class="bg-light pa-0">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <div class="banner-wrapper">
          <v-img
            class="banner-img"
            :class="{ 'scale-in': bannerImg }"
            src="../assets/images/banner/banner6.jpg"
            height="700"
            cover
            position="bottom"
          ></v-img>
          <div class="banner-overlay"></div>
          <div class="banner-content">
            <h3 class="banner-text">關於我們</h3>
            <h1 class="banner-subtext">從球場到生活，我們的連結不只是一顆球。</h1>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="4">
        <h1 class="text-center slogan">
          "For Every Skill,<br />
          Every Set, <br />
          Every Player."
        </h1>
      </v-col>
      <v-col cols="10" md="6" class="aboutContent mt-10">
        <h1 class="page-title">關於我們。</h1>
        <h2 class="aboutContent-text">
          你是不是也有過那種衝動：天氣這麼好，好想打排球！<br />
          然後呢？傳了一輪訊息，群組裡不是已讀不回，就是剛好沒空；好不容易湊到幾個人，又臨時找不到場地，只能眼睜睜看著熱情被冷卻。<br />
          <br />
          我們懂，因為我們就是這樣一路走來的排球人。<br />
          我們熱愛排球，但在生活與時間夾縫中，一場想打就打的球，變得可望不可及。打球不是問題，「揪人打球」才是困難的關卡。<br />
          於是，我們開始思考： 如果排球可以像訂飲料一樣簡單？<br />
          如果每個熱血的你我，都不必再因為湊不到人而錯過週末？<br />
          如果新手也能輕鬆找到願意接納、教學相長的球友，而不是被拒於外的邊緣人？<br />
          我們想創造的，不只是一個排球揪團的平台，而是一個讓排球變得「不再麻煩」的入口。<br />
          在這裡，你可以找到離你最近的場地、與你球技相仿的球友、適合你時間的揪團活動，甚至，是一個全新的社群與歸屬感。<br />
          <br />
          我們相信，排球不只是扣殺與得分，而是一次次「接住彼此」的過程。<br />
          而這個過程，不應該被工具、資訊落差或社交壓力所阻礙。 這，就是我們的初衷。<br />
          從一顆排球開始，我們想連結每一個熱愛運動、渴望交流、想重新找回打球快樂的人。<br />
          一起發球、接球、得分，也一起把那些生活的壓力、孤單與無聊，全部打出場外。
        </h2>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="mb-15">
        <v-img
          class="img"
          src="@/assets/images/aboutUs/team.jpg"
          height="600"
          cover
          ref="teamImg"
        ></v-img>
      </v-col>
    </v-row>

    <v-row class="mt-12" no-gutters justify="center">
      <v-col cols="12" md="6" class="px-4 third-row">
        <v-card flat tile class="pa-4">
          <v-card-text>
            <div class="text-h4 font-italic font-weight-light pa-7">
              <span class="font-weight-bold mr-2">“</span>
              A lot of people told me I would never be a good volleyball player or high jumper
              because I never specialized. But I always knew that I could, believed I could, so I
              didn't listen to what they said. I just followed my heart and did it.
              <span class="font-weight-bold">“</span>
            </div>
            <div class="text-subtitle-1 mt-4">Jean-Philippe Noel, Director</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="px-4 mt-8 mt-md-0">
        <v-img
          src="@/assets/images/aboutUs/circle.jpg"
          alt="Director looking at photos"
          cover
          height="330"
          class="img-circle"
          position="50% 10%"
          ref="circleImg"
        ></v-img>
      </v-col>
    </v-row>

    <v-row class="pb-15" justify="center">
      <v-col cols="12" md="3" class="d-flex flex-column justify-center">
        <div class="img-gabi" ref="gabiImg">
          <v-img src="@/assets/images/aboutUs/gabi.jpg" cover position="top"></v-img>
        </div>
        <div class="mt-5 img-bella" ref="bellaImg">
          <v-img src="@/assets/images/aboutUs/bella.jpg" cover position="top"></v-img>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="img-brazil" ref="brazilImg">
          <v-img src="@/assets/images/aboutUs/brazil.jpg" cover></v-img>
        </div>
      </v-col>
      <v-col cols="10" md="4" class="mt-md-15">
        <h2 class="page-title mb-8">聯絡我們。</h2>
        <v-text-field class="neubrutalism" hide-details label="姓名"></v-text-field>
        <v-text-field class="neubrutalism" hide-details label="E-mail"></v-text-field>
        <v-textarea
          class="neubrutalism"
          hide-details
          placeholder="請輸入想要對我們說的話"
        ></v-textarea>
        <v-btn type="submit" width="100%" class="btn mt-3" height="45">送出</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 建立 ref 來引用 DOM 元素
const teamImg = ref(null)
const circleImg = ref(null)
const gabiImg = ref(null)
const bellaImg = ref(null)
const brazilImg = ref(null)
const bannerImg = ref(null)

onMounted(() => {
  setTimeout(() => {
    bannerImg.value = true
  }, 100)
  // 將所有要動畫的元素設定初始狀態
  gsap.set(teamImg.value.$el, { opacity: 0 })
  gsap.set(circleImg.value.$el, { opacity: 0, x: 100 })
  gsap.set([gabiImg.value, bellaImg.value, brazilImg.value], { opacity: 0, x: -150 })

  // 1. team.jpg 淡入動畫
  gsap.to(teamImg.value.$el, {
    opacity: 1,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: teamImg.value.$el,
      start: 'top 80%',
      toggleActions: 'play reverse play reverse',
    },
  })

  // 2. circle.jpg 從右側滑入動畫
  gsap.to(circleImg.value.$el, {
    opacity: 1,
    x: 0,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: circleImg.value.$el,
      start: 'bottom bottom',
      toggleActions: 'play reverse play reverse',
    },
  })

  // 3. 底部三張圖片從左側滑入動畫
  gsap.to([gabiImg.value, bellaImg.value, brazilImg.value], {
    opacity: 1,
    x: 0,
    duration: 2,
    stagger: 0.3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: gabiImg.value,
      start: 'top 80%',
      toggleActions: 'play reverse play reverse',
    },
  })
})
</script>

<style lang="scss" scoped>
.slogan {
  margin-top: 15%;
  font-family: 'Cooper Black', sans-serif;
  font-size: 2.5rem;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  height: 700px;
  margin-bottom: 30px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
}

.scale-in {
  animation: scaleIn 10s ease-in-out forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(2) translateY(175px);
  }
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.banner-content {
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 80px 10%;
}
.banner-text {
  color: white;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.banner-subtext {
  color: white;
  font-size: 2rem;
}

.aboutContent-text {
  font-size: 1.5rem;
}

.img-gabi {
  height: 400px;
  width: 100%;
}

.img-bella {
  height: 400px;
  width: 100%;
  text-align: center;
}
.neubrutalism {
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .slogan {
    margin-right: 100px;
    margin-left: 10%;
    margin-top: 50%;
  }

  .aboutContent {
    margin-top: 2%;
    margin-bottom: 8%;
  }

  .img-gabi {
    width: 350px;
    height: 350px;
    margin-left: 20px;
  }

  .img-bella {
    height: 330px;
    width: 330px;
    margin-left: 30px;
    text-align: center;
  }

  .img-brazil {
    margin-top: 50%;
    margin-left: -50px;
    width: 480px;
    height: 500px;
  }

  .third-row {
    margin-top: 5%;
    margin-bottom: 8%;
  }

  .img-circle {
    margin-top: 10%;
    margin-bottom: 8%;
  }
}
</style>
