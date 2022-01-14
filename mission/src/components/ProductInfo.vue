<template>
    <div id='product-container'>
      <!-- 상품 이미지 -->
      <ProductImage />
      <div id='product-seller-data' class='flex'>
        <!-- 판매자 정보 -->
        <ProductSeller />
        <ProductCost />
      </div>
      <!-- 제품 설명 -->
      <div v-html='productDescription' data-test='product-desription'></div>

      <!-- 사용자 리뷰 -->
      <ProductReview />
    </div>
</template>

<script>
import ProductImage from './ProductImage.vue';
import ProductSeller from './ProductSeller.vue';
import ProductCost from './ProductCost.vue';
import ProductReview from './ProductReview.vue';

export default {
  name: 'ProductInfo',
  data() {
    return {
      isDiscount: true,
      productDescription: '<h1>Hello</h1><p>This is NIKE Sweater</p>',
    };
  },
  components: {
    ProductSeller,
    ProductCost,
    ProductImage,
    ProductReview,
  },
  methods: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  computed: {
    tagWithHashtag() {
      const withHashtag = [];
      this.tag.forEach((t) => {
        withHashtag.push('#'.concat(t));
      });
      return withHashtag;
    },
    applyDiscount() {
      return this.cost * (1 - this.discountRate / 100);
    },
  },
};
</script>

<style scoped>
#product-container {
  padding-top : 60px;
  width: 100%;
}
#product-seller-data {
  width: 100%;
  height: 60px;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}
</style>
