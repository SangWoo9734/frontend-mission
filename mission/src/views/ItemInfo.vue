<template>
  <div id='item-info-page' class='flex'>
    <!-- 네비게이션 바 -->
    <TheNavbar />
    <!-- 제품 상세 정보 -->
    <ProductInfo :productData='testData' />
    <!-- 제품 구매 -->
    <ProductBuy :cost='testData.product.cost' :discount='testData.product.discount' />
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
      testData: {
        product: {
          id: 1102323,
          imgUrl: 'https://image.msscdn.net/images/goods_img/20190923/1163605/1163605_2_500.jpg',
          descriptionHTML: '<h1>Hello. NIKE.</h1><p>This is NIKE Sweater</p><p>보다 저렴한 가격으로 만나보실 수 있습니다.</p>',
          title: 'NIKE F/W Sweater',
          cost: 30000,
          discount: { isDiscount: true, rate: 15 },
        },
        seller: {
          userName: 'NIKE Offical',
          imgUrl: 'https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg',
          tag: ['스포츠', '러닝', '기능성'],
        },
        reviews: [
          {
            id: 0,
            userImg: 'https://seeklogo.com/images/S/starbucks-logo-BFBFE6C3A3-seeklogo.com.png',
            reviewImg: 'https://static.coupangcdn.com/image/vendor_inventory/f1b3/4a0c1ccb435200d7cc52e33f158cf100b4bfa35800ef96bacecc5a36488b.jpg',
            userNickname: '스타벅스',
            rate: 4.5,
            text: '사이즈가 아주 잘 맞습니다. 컬러도 사진과 아주 유사합니다. 만족스럽습니다',
          },
          {
            id: 1,
            userImg: 'https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg',
            reviewImg: 'https://image.msscdn.net/images/goods_img/20190923/1163133/1163133_1_500.jpg',
            userNickname: '아디다스',
            rate: 4.25,
            text: '원하던 디자인이어서 만족스럽습니다',
          },
        ],
      },
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
