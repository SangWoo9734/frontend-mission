<template>
  <div id='item-info-page'>
    <div id='navigation' class='position-fixed'>
      <h3>🦁 Lionably</h3>
      <button class='btn'>☰</button>
    </div>
    <ProductInfo />

    <ProductBuy />
  </div>
</template>

<script>
import ProductInfo from '../components/ProductInfo.vue';
import ProductBuy from '../components/ProductBuy.vue';

export default {
  name: 'ItemInfoPage',
  data() {
    return {

    };
  },
  components: {
    ProductInfo,
    ProductBuy,
  },
};
</script>

<style scoped>
#item-info-page {
  width : 100%;
  height : 100vh;
  margin : auto;
}
#navigation {
  height : 50px;
  border-bottom: 0.5px solid lightgray;
  box-shadow: 0px 2px 3px 0px lightgray;
}
#navigation *{
  margin : 15px;
}
#navigation button{
  font-size : 20px;
  padding : 0 12px;
}

</style>
