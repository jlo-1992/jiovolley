<template>
  <v-container fluid class="background">
    <div class="overlay"></div>

    <div class="info-wrapper">
      <h1 class="font-weight-bold slogan-title mb-5">一球入魂，熱血開打</h1>
      <h3>加入我們，找到和你一樣熱愛排球的夥伴，享受揮灑汗水的樂趣。</h3>
      <v-btn rounded="xl" width="120" height="40" class="mt-10" to="/logInSingUp">現在註冊</v-btn>
    </div>
  </v-container>
</template>
<script setup></script>

<style scoped lang="scss">
.background {
  min-height: 80vh;
  background: url('@/assets/images/banner/volleyballCourt.jpeg') center/cover;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.678) 100%, transparent);
}

.info-wrapper {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  line-height: 1.7;
}

.slogan-title {
  font-size: 3rem;
}

@media (min-width: 768px) {
  .slogan-title {
    font-size: 5rem;
  }
}
</style>
