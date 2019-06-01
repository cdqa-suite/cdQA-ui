<template>
  <div id="app">
    <cdqaUI/>
  </div>
</template>

<script>
import cdqaUI from './components/cdqaUI.vue'

export default {
  name: 'app',
  components: {
    cdqaUI
  }
}
</script>

<style>
#app {
  text-align: left;
  font-family: Inter, Inter UI, Inter-UI, SF Pro Display, SF UI Text, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 400;
  letter-spacing: +0.37px;
  color: rgb(175, 175, 175)
}
</style>
