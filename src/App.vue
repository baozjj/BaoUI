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
    <Tooltip placement="right">
      <div>321</div>
      <template #content>
        <div>content</div>
        <div>content</div>
        <div>content</div>
        <div>content</div>
      </template>
    </Tooltip>

    
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import Button from './components/Button/index.vue'
import Collapse from './components/Collapse/index.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/index.vue'

const openedValue = ref(['a'])


</script>

<style scope lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
