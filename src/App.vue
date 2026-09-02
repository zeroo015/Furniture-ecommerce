<template>
  <router-view/>
  <ToastMsgs></ToastMsgs>
</template>

<script>
import ToastMsgs from './components/ToastMsgs.vue'
export default {
  components: {
    ToastMsgs
  }
}
</script>

<style lang="scss">
@import "./assets/Layout";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}
</style>
