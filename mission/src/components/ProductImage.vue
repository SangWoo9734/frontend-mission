<template>
  <div id='product-image-container'>
    <img :src="productImg" alt="" id='product-image' class='item-center'>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    productImg: String,
  },
};
</script>

<style scoped>
#product-image-container {
  width: 100%;
  position: relative;
}
#product-image-container:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
#product-image {
  width: 90%;
  padding:10px;
}
</style>
