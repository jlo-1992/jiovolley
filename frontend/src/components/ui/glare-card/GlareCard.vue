<template>
  <div
    ref="refElement"
    class="container-style duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] container relative isolate w-[550px] transition-transform will-change-transform [aspect-ratio:17/21] [contain:layout_style] [perspective:600px]"
    @pointermove="handlePointerMove"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
  >
    <div
      class="duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] grid h-full origin-center overflow-hidden rounded-lg border-slate-800 transition-transform will-change-transform [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] hover:filter-none hover:[--duration:200ms] hover:[--easing:linear] hover:[--opacity:0.6]"
    >
      <div
        class="grid size-full mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))] [grid-area:1/1]"
      >
        <div :class="cn('size-full bg-slate-950', props.class)">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cn } from '@/lib/utils'
import { useTimeoutFn } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  class: { type: String, required: false },
})

const isPointerInside = ref(false)
const refElement = ref(null)

const state = ref({
  rotate: { x: 0, y: 0 },
})

function handlePointerMove(event) {
  const rotateFactor = 0.4
  const rect = refElement.value?.getBoundingClientRect()
  if (rect) {
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    const percentage = {
      x: (100 / rect.width) * position.x,
      y: (100 / rect.height) * position.y,
    }
    const delta = {
      x: percentage.x - 50,
      y: percentage.y - 50,
    }
    state.value.rotate.x = -(delta.x / 3.5) * rotateFactor
    state.value.rotate.y = (delta.y / 2) * rotateFactor
  }
}

function handlePointerEnter() {
  isPointerInside.value = true
  useTimeoutFn(() => {
    if (isPointerInside.value && refElement.value) {
      refElement.value.style.setProperty('--duration', '0s')
    }
  }, 300)
}

function handlePointerLeave() {
  isPointerInside.value = false
  if (refElement.value) {
    refElement.value.style.removeProperty('--duration')
    state.value.rotate = { x: 0, y: 0 }
  }
}
</script>

<style scoped>
.container-style {
  --r-x: v-bind(state.rotate.x + 'deg');
  --r-y: v-bind(state.rotate.y + 'deg');
  --duration: 300ms;
  --foil-size: 100%;
  --opacity: 0;
  --radius: 48px;
  --easing: ease;
  --transition: var(--duration) var(--easing);
}
</style>
