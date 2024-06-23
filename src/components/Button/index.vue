<template>
  <button
    ref="_ref"
    class="v-button"
    :class="{
      [`v-button--${type}`]: type,
      [`v-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from './types'

defineOptions({
  name: 'BButton'
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>
