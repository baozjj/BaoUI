<template>
  <div
    ref="popperContainer"
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

    <Transition :name="props.transition">
      <div
        v-if="isOpen"
        class="v-tooltip__popper"
        ref="popperNode"  
      >
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang='ts' setup >
import { onUnmounted, ref, watch, computed } from 'vue'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types.ts'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import { useClickOutside } from '@/hooks/useClickOutside.ts'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  manual: false,
  transition: 'fade'
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainer = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events= ref<Record<string, any>>({})
let outerEvents= ref<Record<string, any>>({})

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    ...props.popperOptions
  }
})

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

useClickOutside(popperContainer, () => {
  if(props.trigger === 'click' && isOpen.value && !props.manual) close() 
})

const attachEcents = () => {
  if (props.trigger === 'hover') {
    events.value['mouseenter'] = open
    outerEvents.value['mouseleave'] = close
  } else if (props.trigger === 'click') {
   events.value['click'] = togglePopper 
  }
}
if (!props.manual) {
  attachEcents()
}

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (popperNode.value && triggerNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      }
    }
  },
  { flush: 'post' }
)

watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue && !props.manual) {
      events.value = {}
      outerEvents.value = {}
      attachEcents()
    }
  }
)

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events.value = {}
      outerEvents.value = {}
    } else {
      attachEcents()
    }
  }
)

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  'show': open,
  'hide': close,
})

</script>

<style scoped lang='stylus'>
</style>