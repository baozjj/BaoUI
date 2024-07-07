<template>
  <div 
    class='v-tooltip'
    v-on="outerEvents"
  >
    <div 
      class="v-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
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
import { ref, watch, reactive } from 'vue'
import type { TooltipProps, TooltipEmits } from './types.ts'
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events= ref<Record<string, any>>({})
let outerEvents= ref<Record<string, any>>({})

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
} 
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

const attachEcents = () => {
  if (props.trigger === 'hover') {
    events.value['mouseenter'] = open
    outerEvents.value['mouseleave'] = close
  } else if (props.trigger === 'click') {
   events.value['click'] = togglePopper 
  }
}

attachEcents()


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

watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      events.value = {}
      outerEvents.value = {}
      attachEcents()
    }
  }
)

</script>

<style scoped lang='stylus'>
</style>