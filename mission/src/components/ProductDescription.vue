<template>
  <div>
    <div id='product-description-nav' class='flex'>
      <h3 class='detail-nav'>Details</h3>
    </div>
    <div id='product-description' v-html='description' data-test='product-desription'></div>
  </div>
</template>

<script>
export default {
  name: 'ProductDescription',
  props: {
    description: { type: String, default: '' },
  },
};
</script>

<style scoped>
#product-description-nav {
  width: 100%;
  height: 60px;
  text-align: left;
  align-items: center;
}
#product-description{
  width: 90%;
  margin: auto;
  padding: 15px 10px;
  border-radius: 10px;
  background: rgb(240, 240, 240);
}
</style>
