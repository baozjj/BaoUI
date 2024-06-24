<template>
  <div class='v-collapse'>
    <slot />
  </div>
</template>

<script lang='ts' setup >
import { ref, provide, watch } from 'vue'
import type { nameType, CollapseProps, CollapseEmits,  } from './types';
import { collapseContextKey } from './types'
defineOptions({
    name: 'BCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeItems = ref(props.modelValue)

if (props.accordion && activeItems.value.length > 1) {
  console.warn('当前展开项（activeItems）应当只有一个')
}

const handleItemClick = (item: nameType) => {
  if (props.accordion) {
    activeItems.value = [activeItems.value[0] === item ? '' : item]
  } else {
    const index = activeItems.value.indexOf(item)
    if (index > -1) {
      // 存在，删除数组中对应的一项
      activeItems.value.splice(index, 1)
    } else {
      // 不存在，插入对应的一项
      activeItems.value.push(item)
    }
  }

  emits('update:modelValue', activeItems.value)
  emits('change', activeItems.value)
}

provide(collapseContextKey, {
  activeItems,
  handleItemClick
})

watch(
  () => props.modelValue,
  () => {
    activeItems.value = props.modelValue
  }
)
</script>

<style scoped lang='stylus'>
</style>