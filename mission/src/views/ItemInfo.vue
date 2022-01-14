<template>
  <div id='item-info-page' class='flex'>
    <TheNavbar />
    <ProductInfo />
    <ProductBuy />
  </div>
</template>

<script>
import ProductInfo from '../components/ProductInfo.vue';
import ProductBuy from '../components/ProductBuy.vue';
import TheNavbar from '../components/TheNavbar.vue';

export default {
  name: 'ItemInfoPage',
  data() {
    return {

    };
  },
  components: {
    ProductInfo,
    ProductBuy,
    TheNavbar,
  },
};
</script>

<style scoped>
#item-info-page {
  max-width: 500px;
  width : 100%;
  height : 100vh;
  margin : auto;
  flex-direction: column;
  position: relative;
}
</style>
