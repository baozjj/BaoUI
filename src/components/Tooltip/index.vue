<template>
  <div class='v-tooltip'>
    <div 
      class="v-tooltip__trigger"
      ref="triggerNode"
      @click="togglePopper"
    >
      <slot />
    </div>

    <div
      v-if="isOpen"
      class="v-tooltip__poper"
      ref="popperNode"  
    >
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script lang='ts' setup >
import { ref, watch } from 'vue'
import type { TooltipProps, TooltipEmits } from './types.ts'
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (popperNode.value && triggerNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement,
        })
      }
    } else {
      popperInstance?.destroy()
    }
  },
  { flush: 'post' }
)

</script>

<style scoped lang='stylus'>
</style>