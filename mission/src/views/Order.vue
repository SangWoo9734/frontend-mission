<template>
  <div v-if='!loading' id='order' class='container' >
    <!-- 하위 헤더 -->
    <div class='sub-navbar flex'>
      <h2 class='sub-navbar-title' data-test='order-title'>주문확인</h2>
    </div>
    <!-- 제품 확인 -->
    <ProductListInfo
      :orderItems='orderItems'
      :totalFinalPrice='totalFinalPrice'
      @addCoupon='addCoupon'
    />
    <!-- 배송 확인 -->
    <DeliveryInfo />
    <!-- 결제 정보 -->
    <CreditInfo />
    <!-- 주문 버튼 -->
    <div class='order-button position-fixed flex' data-test='final-price'>
      <button id='btn-order' class='btn'>
        <p>{{ priceWithComma(totalFinalPrice) }}원 결제</p>
      </button>
    </div>
  </div>

  <LoadingCircle v-else data-test='loading' />
</template>

<script>
// Library
import { mapGetters } from 'vuex';

import LoadingCircle from '../components/ItemCommon/LoadingCircle.vue';
import ProductListInfo from '../components/Order/ProductListInfo.vue';
import DeliveryInfo from '../components/Order/DeliveryInfo.vue';
import CreditInfo from '../components/Order/CreditInfo.vue';

export default {
  name: 'Order',
  components: {
    LoadingCircle,
    ProductListInfo,
    DeliveryInfo,
    CreditInfo,
  },
  data() {
    return {
      loading: false,
      orderItems: [],
    };
  },
  computed: {
    ...mapGetters('cart', [
      'GE_CART_ITEM',
    ]),
    totalFinalPrice() {
      let price = 0;
      this.orderItems.forEach((item) => {
        price += item.price * item.quantity;
      });

      return price;
    },
  },
  methods: {
    priceWithComma(price) {
      return price.toLocaleString('ko-KR');
    },
  },
  created() {
    this.orderItems = this.GE_CART_ITEM;
  },
};
</script>

<style scoped>
#order {
  padding-top: 60px;
  margin-bottom: 70px;
  height: calc(100vh - 130px);
  overflow: auto;
}
.order-button {
  bottom: 0px;
  max-width:500px;
  width: 100%;
  height: 60px;
  border-top: 0.5px solid lightgray;
  box-shadow: 0px -2px 3px 0px lightgray;
  background: white;
  justify-content: center;
  align-items: center;
}
#btn-order {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  width: 90%;

}
</style>
