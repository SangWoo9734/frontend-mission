<template>
    <div id='navigation' class='position-fixed flex'>
      <h2>🦁 LionAbly</h2>
      <button class='btn'>☰</button>
    </div>
</template>

<script>
export default {
  name: 'TheNavbar',
};
</script>

<style scoped>
#navigation {
  top:0;
  max-width:500px;
  width: 100%;
  height: 50px;
  border-bottom: 0.5px solid lightgray;
  box-shadow: 0px 2px 3px 0px lightgray;
  background: white;
  z-index: 10;
}
#navigation *{
  margin : 15px;
}
#navigation button{
  font-size : 20px;
  padding : 0 12px;
}
</style>
