<template>
  <div>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle size="small">V</Button>
    <Button circle size="normal">V</Button>
    <Button circle size="large">V</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="small">Small</Button>
    <Button size="normal">Small</Button>
    <Button size="large">Large</Button>
  </div>
  <a href="#">zheshi lint</a>
</template>

<script setup lang="ts">
import Button from './components/Button/index.vue'
</script>
