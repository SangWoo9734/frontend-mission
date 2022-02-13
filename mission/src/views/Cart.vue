<template>
  <div v-if='!loading' id='cart' class='container'>
    <!-- 하위 헤더 -->
    <div class='sub-navbar flex'>
      <h2 class='sub-navbar-title' data-test='cart-title'>🛒 Cart</h2>
    </div>
    <!-- 장바구니 목록 -->
    <div v-if='cart.length === 0' class='cart-empty bold'>장바구니가 비어있습니다.</div>
    <div v-else class='cart-item-container' v-for='item in cart' :key='item.product_no'>
      <CartItem
        :id = 'item.product_no'
        :image= 'item.image'
        :name= 'item.name'
        :originalPrice= 'item.original_price'
        :price= 'item.price'
        :quantity= 'item.quantity'
      />
    </div>
    <!-- 수량확인 및 주문 버튼 -->
    <div class='cart-order flex'>
      <div class='cart-cost flex'>
        <p class='cart-count' data-test='cart-count'><span>{{ countCart }}</span> 개</p>
        <p class='cart-totalcost' data-test='cart-totalcost'>
          <span>{{ calculateTotalCost }}</span> 원
        </p>
      </div>
      <router-link to='/order' class='cart-order-btn bold flex' data-test='order'>
        <div>주문하기</div>
      </router-link>
    </div>
  </div>

  <Circle v-else class='loading item-center' data-test='loading' />
  <TheNavbar :state='"cart"' />
</template>

<script>
import Circle from '../components/ItemCommon/Circle.vue';
import CartItem from '../components/Cart/CartItem.vue';
import TheNavbar from '../components/ItemCommon/TheNavbar.vue';

export default {
  name: 'Cart',
  components: {
    CartItem,
    Circle,
    TheNavbar,
  },
  data() {
    return {
      loading: false,
      cart: this.$store.state.cartItem,
      quantity: {},
    };
  },
  computed: {
    countCart() {
      let totalCount = 0;
      this.cart.forEach((item) => {
        totalCount += item.quantity;
      });

      return totalCount;
    },
    calculateTotalCost() {
      let totalCost = 0;
      this.cart.forEach((item) => {
        totalCost += item.price * item.quantity;
      });
      return totalCost.toLocaleString('ko-KR');
    },
  },
};
</script>

<style scoped>
#cart {
  padding-top: 60px;
  margin-bottom: 70px;
  height: calc(100vh - 130px);
}
.cart-order {
  width: 100%;
  padding: 10px 15px;
  border-top: 1px solid lightgray;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
}
.cart-cost {
  width: 70%;
  font-size: 18px;
  justify-content: center;
  align-items: center;
}
.cart-count{
  margin-right: 15px;
}
.cart-count span, .cart-totalcost span{
  font-size: 24px;
  font-weight: bold;
  color: rgb(255, 209, 123);
}
.cart-order-btn {
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 50px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  background: black;
  color: white;
  text-decoration: none;
}
.cart-empty {
  padding-top: 30px;
}
</style>
