<template>
  <div class='v-dropdown'>
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
          <ul class="v-dropdown__menu">
            <template v-for="item in menuOptions" :key="item.key">
              <li
                v-if="item.divided"
                role="separator"
                class="divided-placeholder"
              />

              <li
                class="v-dropdown__item"
                @click="itemClick(item)"
                :class="{'is-disabled': item.disabled, 'is-divied': item.divided }"
                :id="`dropdown-item-${item.key}`"
              >
                <RenderVnode 
                  :v-node="item.label"
                />
              </li>

            </template>
          </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script lang='ts' setup >
import { ref } from 'vue'
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
import Tooltip from '../Tooltip/index.vue'
import type { TooltipInstance } from '../Tooltip/types';
import RenderVnode from '../Common/RenderVnode';

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref<TooltipInstance>()

const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}
</script>

<style scoped lang='stylus'>
</style>