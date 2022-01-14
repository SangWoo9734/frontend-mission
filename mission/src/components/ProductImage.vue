<template>
  <div id='product-image-container'>
    <img :src="productUrl" alt="" id='product-image' class='item-center'>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      productUrl: 'https://image.msscdn.net/images/goods_img/20190923/1163605/1163605_2_500.jpg',
    };
  },
};
</script>

<style scoped>
#product-image-container {
  width: 100%;
  height: 100vw;
  position: relative;
}
#product-image {
  width: 90%;
  padding:10px;
}
</style>
