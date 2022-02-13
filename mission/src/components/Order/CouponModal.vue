<template>
  <div id="couponModal">
    <div class='background'>
      <div class='coupon-container'>
        <div class='modal-title bold' data-test='modal-title'>쿠폰함</div>
        <div v-for='coupon in couponList' :key='coupon.couponId'
          class='coupon-row flex' data-test='coupon'>
          <div class='coupon-title text-shorten' data-test='coupon-title'>{{ coupon.name }}</div>
          <button class='coupon-btn btn' @click='applyCoupon(coupon.price)'
            data-test='coupon-apply'>
            적용
          </button>
        </div>
        <div class='modal-close' @click='couponModalToggle' data-test='close'>Close</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponModal',
  props: {
    couponList: { type: Array, default: null },
  },
  methods: {
    couponModalToggle() {
      this.$emit('couponModalToggle');
    },
    applyCoupon(cost) {
      this.$emit('applyCoupon', cost);
      this.$emit('couponModalToggle');
    },
  },
};
</script>

<style scoped>
#couponModal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100vh;
  background: rgba(0, 0, 0, 0.288);
  z-index: 10;
}
.coupon-container {
  max-width: 300px;
  width: 70%;
  height: 40%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
}
.modal-title {
  padding: 10px;
  font-size: 20px;
  border-bottom: 1px solid black;
}
.coupon-row {
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
}
.coupon-title {
  width: 60%;
  text-align: left;
}
.modal-close {
  padding: 10px 0;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
