<template>
    <div id='product-container'>
      <!-- 상품 이미지 -->
      <ProductImage :image='image' />
      <!-- 판매자 정보 -->
      <ProductSeller
        :hash_tags= 'hash_tags'
        :name= 'name'
        :profile_image= 'profile_image'
      />
      <div id='product-data-detail' class='flex'>
        <p data-test='product-title'>{{ item_name }}</p>
      </div>
      <ProductCost :originalPrice='originalPrice' :price='price' />
      <!-- 제품 설명 -->
      <ProductDescription :description='description' />

      <!-- 사용자 리뷰 -->
      <ProductReview :user_review='review' />
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
    description: { type: String, default: '' },
    image: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU' },
    item_name: { type: String, default: '' },
    originalPrice: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    review: { type: Array, default: null },
    hash_tags: { type: Array, default: null },
    name: { type: String, default: '' },
    profile_image: { type: String, default: '' },
  },
  components: {
    ProductImage,
    ProductSeller,
    ProductCost,
    ProductDescription,
    ProductReview,
  },
  computed: {
    getImage() {
      return this.image ? this.image : this.defaultImgUrl;
    },
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
  height: 50px;
  align-items: center;
}
#product-data-detail p{
  font-weight: bold;
  font-size: 24px;
  padding-left: 15px;
}
</style>
