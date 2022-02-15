<template>
  <div class='background'>
    <div class='circlular-box item-center'>
      <svg class='circular-loader' viewBox='25 25 50 50'>
        <circle class='loader-path' cx='50' cy='50' r='20' fill='none'></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Circle',
};
</script>
<style scoped>
.loader-path {
  fill: none;
  stroke: rgb(255, 209, 123);
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-dasharray: 10 10;
}
@keyframes rotate {
  100% {
    transform : rotate(360deg);
  }
}
.circlular-box {
  width: 70px;
}
.circular-loader {
  animation: rotate 1s linear infinite;
  }
.background {
  height: 100vh;
}
</style>
