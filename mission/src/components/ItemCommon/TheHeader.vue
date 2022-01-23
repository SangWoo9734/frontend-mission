<template>
    <div id='header' class='flex' data-test='header'>
      <h2>🦁 LionAbly</h2>
    </div>
</template>

<script>
export default {
  name: 'TheNavbar',
};
</script>

<style scoped>
#header {
  max-width:500px;
  width: 100%;
  height: 60px;
  border-bottom: 0.5px solid lightgray;
  box-shadow: 0px 2px 3px 0px lightgray;
  background: white;
  align-items: center;
  z-index: 10;
}
#header h2{
  width: 100%;
  text-align: left;
  margin-left : 15px;
}
</style>
