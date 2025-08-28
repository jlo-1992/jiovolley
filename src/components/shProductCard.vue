<template>
  <v-card
    :class="{ 'highlight-card': isHighlight, 'product-card': true }"
    rounded="lg"
    dark
    color="#102e24"
    @click="$emit('click')"
  >
    <div class="product-content">
      <v-img :src="product.image" class="product-image"></v-img>
      <v-card-title class="text-h6 font-weight-bold">{{ product.name }}</v-card-title>
      <v-card-text class="pa-0">
        <v-list class="options-list">
          <v-list-item v-for="(option, i) in product.options" :key="i" class="option-item">
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption text-grey-lighten-1">{{ option }}</span>
              <v-btn small class="option-btn" color="#1a4d3f" rounded>OPTIONS</v-btn>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="d-flex justify-center pt-0 pb-4">
        <v-btn color="#3b8e5c" rounded class="add-to-cart-btn">ADD TO CART</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  product: Object,
  isHighlight: Boolean,
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 280px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.product-card.highlight-card {
  background-color: #1a4d3f;
  transform: scale(1.1) translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
}

.options-list {
  background-color: transparent;
  padding: 0 16px;
}

.option-item {
  min-height: 40px !important;
  padding: 0;
}

.option-btn {
  font-size: 0.8rem;
  padding: 0 10px;
  height: 25px !important;
  color: #d1d1d1;
}

.add-to-cart-btn {
  font-weight: bold;
}

@media (max-width: 768px) {
  .product-card.highlight-card {
    transform: none;
    box-shadow: none;
  }
}
</style>
