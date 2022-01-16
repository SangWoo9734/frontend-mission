<template>
    <div id='product-container'>
      <!-- 상품 이미지 -->
      <ProductImage :productImg='productData.product.imgUrl' />
      <!-- 판매자 정보 -->
      <ProductSeller :seller='productData.seller' />
      <div id='product-data-detail' class='flex'>
        <p>{{ productData.product.title }}</p>
        <ProductCost :cost='productData.product.cost' :discount='productData.product.discount' />
      </div>
      <!-- 제품 설명 -->
      <ProductDescription :description='productData.product.descriptionHTML' />

      <!-- 사용자 리뷰 -->
      <ProductReview :userReviews='productData.reviews' />
    </div>
</template>

<script>
import ProductImage from './ProductImage.vue';
import ProductSeller from './ProductSeller.vue';
import ProductCost from './ProductCost.vue';
import ProductDescription from './ProductDescription.vue';
import ProductReview from './ProductReview.vue';

export default {
  name: 'ProductInfo',
  props: {
    productData: Object,
  },
  components: {
    ProductImage,
    ProductSeller,
    ProductCost,
    ProductDescription,
    ProductReview,
  },
};
</script>

<style scoped>
#product-container {
  padding-top : 50px;
  width: 100%;
}
#product-data-detail {
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}
#product-data-detail p{
  font-weight: bold;
  font-size: 20px;
  padding-left: 15px;
}
</style>
