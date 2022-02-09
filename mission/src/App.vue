<template>
  <div class='container'>
    <!-- Header -->
    <TheHeader />
    <!-- View -->
    <router-view />
  </div>
</template>
<script>
import TheHeader from './components/ItemCommon/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
};
</script>
<style>
@import url('./assets/style/common.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
