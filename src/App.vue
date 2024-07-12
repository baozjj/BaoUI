<template>
  <div class="container">
    <!-- <br>
    <div style="width: 80%">
      <Collapse 
      v-model="openedValue"
      accordion
    >
      <CollapseItem name="a" title="qwe">
        <template #title>
          标题1
        </template>
        12312312<br />
        12312312<br />
        12312312<br />
        12312312<br />
      </CollapseItem>
      <CollapseItem name="b">
        <template #title>
          标题2
        </template>
        sadasd
      </CollapseItem>
      <CollapseItem name="c">
        <template #title>
          标题3
        </template>
        sadasd
      </CollapseItem>
      </Collapse>
    </div>

    <Icon icon="arrow-up" size="2xl" />
    <Icon icon="arrow-down" size="xl" type="success"/><br>
    <Button loading> 按钮1 </Button>
    <Button icon="arrow-up"> 按钮2 </Button> -->

    <Tooltip 
      ref='tooltipRef'
      placement="right"
      :trigger="trigger"
      :popper-options="options"
    >
      <div style="border: 1px solid red">321</div>
      <template #content>
        <div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </div>
      </template>
    </Tooltip>
    <Tooltip 
      placement="left"
    >
      <div style="border: 1px solid red">321</div>
      <template #content>
        <div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </div>
      </template>
    </Tooltip>

    <br>
    <br>
    <br>
    <button @click="trigger = trigger === 'hover' ? 'click' : 'hover'">切换</button>
    <button @click="open">打开</button>
    <button @click="close">关闭</button>

    <Dropdown 
      placement="bottom"
      :trigger="trigger"
      :menu-options="dropdownOptions"
    >
    123
    </Dropdown>


    
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, h} from 'vue'
import Button from './components/Button/index.vue'
import Collapse from './components/Collapse/index.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/index.vue'
import type { Trigger, TooltipInstance } from './components/Tooltip/types'
import type { Options } from '@popperjs/core'

import Dropdown from './components/Dropdown/index.vue'
import type {  MenuOption } from './components/Dropdown/types'

const openedValue = ref(['a'])

const trigger = ref<Trigger>('hover')
const tooltipRef = ref<TooltipInstance>()

const options: Partial<Options> = { placement: 'right-end', strategy: 'fixed'}

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

const dropdownOptions: MenuOption[] = [
  { key: 'a', label: h('b', 'this is bold') },
  { key: 'b', label: '选项2', disabled: true },
  { key: 'c', label: '选项3', divided: true },
  { key: 'd', label: '选项4' },
  { key: 'e', label: '选项5' },
]

</script>

<style scope lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
