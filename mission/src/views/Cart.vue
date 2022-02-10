<template>
  <div v-if='!loading' id='cart' class='container'>
    <!-- 하위 헤더 -->
    <div class='sub-navbar flex'>
      <h2 class='sub-navbar-title' data-test='cart-title'>🛒 Cart</h2>
    </div>
    <!-- 장바구니 목록 -->
    <div class='cart-item-container' v-for='item in cart' :key='item.id'>
      <CartItem
        :id = 'item.product_no'
        :image= 'item.image'
        :name= 'item.name'
        :originalPrice= 'item.original_price'
        :price= 'item.price'
        :quantity= 'item.quantity'
        @addQuantity= 'addQuantity'
        @subQuantity= 'subQuantity'
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
      <button class='cart-order-btn bold'>주문하기</button>
    </div>
  </div>

  <Circle v-else class='loading item-center' data-test='loading' />
  <TheNavbar :state='"cart"' />
</template>

<script>
import Circle from '../components/ItemCommon/Circle.vue';
import CartItem from '../components/Cart/CartItem.vue';
import TheNavbar from '../components/ItemCommon/TheNavbar.vue';

import Repository from '../repositories/RepositoryFactory';

const CartRepository = Repository.get('cart');

export default {
  name: 'Cart',
  components: {
    CartItem,
    Circle,
    TheNavbar,
  },
  data() {
    return {
      loading: true,
      cart: [],
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
  methods: {
    async getCartInfo() {
      const result = await CartRepository.getCart();
      if (result.status === 200) {
        result.data.cart_item.forEach((item) => {
          this.cart.push(Object.assign(item, {
            quantity: 1,
          }));
        });
        this.loading = false;
      } else {
        console.log(result);
      }
    },
    addQuantity(id) {
      const target = this.cart.find((item) => item.product_no === id);
      target.quantity += 1;
    },
    subQuantity(id) {
      const target = this.cart.find((item) => item.product_no === id);
      target.quantity -= 1;
    },
  },
  created() {
    this.getCartInfo();
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
  width: 30%;
  height: 50px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  background: black;
  color: white;
}
</style>
