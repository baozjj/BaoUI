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
        <div id="arrow" data-popper-arrow></div>
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
import { debounce } from 'lodash-es'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  manual: false,
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainer = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events= ref<Record<string, any>>({})
let outerEvents = ref<Record<string, any>>({})
let openTimes = 0
let closeTimes = 0

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ],
    ...props.popperOptions
  }
})

const open = debounce(() => {
  openTimes++
  isOpen.value = true
  emits('visible-change', true)
}, props.openDelay) 
const close = debounce(() => {
  closeTimes++
  isOpen.value = false
  emits('visible-change', false)
}, props.openDelay)

const togglePopper = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
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