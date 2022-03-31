<template>
  <div id='productListInfo' class='container'>
    <div class='order-navbar flex'>
      <h4 class='order-navbar-title' data-test='order-title'>상품 확인</h4>
    </div>
    <div class='order-product-table' data-test='order-product-table'>
      <div class='order-item-row order-table-header'>
        <div>제품</div>
        <div>수량</div>
        <div>가격</div>
      </div>
      <div v-if='isEmpty' class='order-table-no-item flex' data-test='no-item'>
        <p>장바구니가 비어있습니다.</p>
      </div>
      <div v-else class='order-item-row order-table-item'
        v-for='item in orderItems' :key='item.prodcut_no' data-test='order-table-row'>
        <div class='order-item-product flex'>
          <div class='order-item-image'>
            <img :src='item.image' alt='item-image' data-test='item-image'>
          </div>
          <div class='order-item-name text-shorten'>
            <p class='text-shorten' data-test='item-name'>{{item.name}}</p>
          </div>
        </div>
        <div class='order-item-quantity flex'>
          <p data-test='item-quantity'>{{ item.quantity }} 개</p>
        </div>
        <div class='order-item-cost flex'>
          <div class='order-item-originalPrice' data-test='item-originalPrice'>
            {{ priceWithComma(item.original_price) }}
          </div>
          <div class='order-item-price' data-test='item-price'>
            {{ priceWithComma(item.price) }}원
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class='order-cost-info flex'>
        <div>총 금액</div>
        <div class='order-cost-total flex'>
          <div class='order-cost-totalCount' data-test='order-product-totalCount'>
            {{ totalCount }} 개
          </div>
          <div class='order-cost-totalPrice' data-test='order-product-totalPrice'>
            {{ totalOriginalPrice }} 원
          </div>
        </div>
      </div>
      <div class='order-cost-info flex'>
        <div>총 할인가</div>
        <div data-test='order-product-discounting'>-{{ totalPrice }} 원</div>
      </div>
      <div class='order-cost-info flex'>
        <div>쿠폰</div>
        <div class='order-coupon-info flex' data-test='order-coupon-info'>
          <div v-if='additionalDiscount !== 0' data-test='order-product-coupon'>
            -{{ priceWithComma(additionalDiscount) }} 원
          </div>
          <button class='coupon-btn btn' @click='couponModalToggle' data-test='coupon-btn'>
            쿠폰
          </button>
        </div>
      </div>
      <div class='order-cost-info flex'>
        <div>결제 금액</div>
        <div data-test='order-product-finalPrice'>{{ finalPriceWithComma }} 원</div>
      </div>
    </div>
    <CouponModal v-if='modalState' class='coupon-modal' :couponList='couponData'
      @couponModalToggle='couponModalToggle'
      @applyCoupon='applyCoupon' />
  </div>
</template>

<script>
import CouponModal from './CouponModal.vue';

export default {
  name: 'ProductListInfo',
  props: {
    orderItems: { type: Array, default: null },
    totalFinalPrice: { type: Number, default: 0 },
  },
  components: {
    CouponModal,
  },
  data() {
    return {
      modalState: false,
      defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU',
      couponData: [
        {
          couponId: 1234123,
          name: '2월 3000원 할인 쿠폰',
          price: 3000,
        },
        {
          couponId: 7897689,
          name: '2월 4000원 할인 쿠폰',
          price: 4000,
        },
      ],
      additionalDiscount: 0,
    };
  },
  methods: {
    priceWithComma(price) {
      return price.toLocaleString('ko-KR');
    },
    couponModalToggle() {
      this.modalState = !this.modalState;
    },
    applyCoupon(cost) {
      this.additionalDiscount = cost;
    },
  },
  computed: {
    isEmpty() {
      return this.orderItems.length === 0;
    },
    totalCount() {
      let count = 0;
      this.orderItems.forEach((item) => {
        count += item.quantity;
      });

      return count;
    },
    totalOriginalPrice() {
      let originalPrice = 0;
      this.orderItems.forEach((item) => {
        originalPrice += item.original_price * item.quantity;
      });

      return originalPrice.toLocaleString('ko-KR');
    },
    totalPrice() {
      let discountingPrice = 0;
      this.orderItems.forEach((item) => {
        discountingPrice += (item.original_price - item.price) * item.quantity;
      });

      return discountingPrice.toLocaleString('ko-KR');
    },
    finalPriceWithComma() {
      const price = this.totalFinalPrice - this.additionalDiscount;
      return price.toLocaleString('ko-KR');
    },
  },
};
</script>

<style scoped>
#productListInfo {
  margin-bottom: 40px;
}
.order-item-image {
  min-width: 60px;
  position: relative;
}
.order-item-image:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.order-item-image img{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
  width: 90%;
  height: 90%;
  border-radius: 5px;
}
.order-product-table {
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
  margin: 0 15px 10px 15px;
}
.order-item-row {
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 50px 140px;
}
.order-table-header {
  height: 30px;
}
.order-table-item {
  padding: 5px 0;
}
.order-table-no-item {
  height: 60px;
  padding: 5px 0;
  justify-content: center;
  align-items: center;
}
.order-item-product {
  min-width: 20%;
  width: 100%;
  justify-content: left;
  align-items: center;
}
.order-item-product * {
  margin-right: 10px;
}
.order-item-name {
  width: 66%;
  text-align: left;
}
.order-item-quantity {
  justify-content: center;
  align-items: center;
}
.order-item-cost {
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
}
.order-item-originalPrice {
  font-size: 12px;
  color: rgb(170, 170, 170);
  text-decoration: line-through;
}
.order-item-price {
  font-size: 16px;
  font-weight: bold;
}
.order-cost-info {
  margin: 0 15px 10px 15px;
  justify-content: space-between;
  align-items: center;
}
.order-cost-info * {
  font-weight : bold;
}
.order-coupon-info  {
  justify-content: space-between;
  align-items: center;
}
.order-coupon-info * {
  margin-left: 10px;
}
.order-cost-total {
  justify-content: right;
}
.order-cost-total * {
  margin-left: 15px;
}
</style>
