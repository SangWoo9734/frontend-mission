<template>
  <div class='container'>
    <!-- Header -->
    <TheHeader />
    <!-- View -->
    <router-view />
    <!-- Navbar -->
    <TheNavbar />
  </div>
</template>
<script>
import TheHeader from './components/ItemCommon/TheHeader.vue';
import TheNavbar from './components/ItemCommon/TheNavbar.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheNavbar,
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
