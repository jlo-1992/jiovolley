<template>
  <div class="bg">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex" id="copyright">
            <div>© 2025 · 詹薏靜 · All rights reserved</div>
            <div>Code / Design by <a class="a" href="https://github.com/jlo-1992">jlo-1992</a></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg {
  background-color: vars.$primary-color;
  opacity: 0.9;
  height: 8vh;
}

#copyright {
  color: vars.$secondary-color;
  font-size: 0.65rem;
  margin-top: 10px;
  text-align: center;
  flex-direction: column;

  .a {
    color: vars.$secondary-color;
  }
  .a:visited {
    color: vars.$secondary-color;
  }
}

@media (min-width: 768px) {
  .bg {
    min-height: 5vh;
  }
  #copyright {
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.8rem;
  }
}
</style>
