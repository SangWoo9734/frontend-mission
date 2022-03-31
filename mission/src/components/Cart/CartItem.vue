<template>
  <div id='cart-item' class='flex'>
    <div class='cart-item-image-container'>
      <img class='cart-item-image' :src='getImage' alt='item-img' data-test='item-image'>
    </div>
    <div class='cart-item-info-container flex'>
      <div class='cart-item-name' data-test='item-name'>{{ name }}</div>
      <div class='cart-item-cost-container'>
        <div class='cart-item-cost flex'>
          <div class='cart-item-info-price flex'>
            <p class='cart-item-originalprice' data-test='item-originalprice'>
              {{ commaWithOriginalPrice }}
            </p>
            <p class='cart-item-price' data-test='item-price'>
              {{ commaWithPrice }}원
            </p>
          </div>
        </div>
        <div class='cart-totalcost-container flex'>
          <div class='cart-item-count flex'>
            <p class='cart-quantity'>수량</p>
            <button id='minus' class='cart-quantity-btn'
              @click='subQuantity()' data-test='quantity-minus'>
              <font-awesome-icon icon='minus' />
            </button>
            <div data-test='quantity'>{{ quantity }}</div>
            <button class='cart-quantity-btn'
              @click='addQuantity()' data-test='quantity-plus'>
              <font-awesome-icon icon='plus' />
            </button>
            개
          </div>
          <div class='cart-totalcost' data-test='total-cost'>
            {{ calculateTotalcost }} 원
          </div>
        </div>
      </div>
    </div>
    <button id='delete' class='cart-delete' @click='removeItemFromCart' data-test='delete-button'>
      삭제
    </button>
  </div>
</template>

<script>
// Library
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  props: {
    id: { type: String, default: '' },
    image: { type: String, default: '' },
    name: { type: String, default: '' },
    originalPrice: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
  },
  data() {
    return {
      defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU',
    };
  },
  computed: {
    commaWithOriginalPrice() {
      return this.originalPrice.toLocaleString('ko-KR');
    },
    commaWithPrice() {
      return this.price.toLocaleString('ko-KR');
    },
    getImage() {
      return this.image ? this.image : this.defaultImage;
    },
    calculateTotalcost() {
      return (this.quantity * this.price).toLocaleString('ko-KR');
    },
  },
  methods: {
    ...mapActions('cart', [
      'AC_ADD_QUANTITY',
      'AC_SUB_QUANTITY',
      'AC_REMOVE_ITEM_FROM_CART',
    ]),
    addQuantity() {
      this.AC_ADD_QUANTITY(this.id);
    },
    subQuantity() {
      this.AC_SUB_QUANTITY(this.id);
    },
    removeItemFromCart() {
      this.AC_REMOVE_ITEM_FROM_CART(this.id);
    },
  },
};
</script>

<style scoped>
#cart-item{
  position: relative;
  margin: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
}
.cart-item-image-container {
  width: 30%;
  position: relative;
}
.cart-item-image-container:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.cart-item-image{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
  width: 90%;
}
.cart-item-name {
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.cart-item-info-container {
  width: 70%;
  height: 150px;
  flex-direction: column;
  justify-content: space-between;
}
.cart-item-cost-container {
  flex-direction: column;
  margin-bottom: 10px;
}
.cart-item-cost {
  padding-right: 10px;
  justify-content: right;
  align-items: center;
  margin-bottom: 5px;
}
.cart-item-info-price {
  justify-content: space-between;
  align-items: flex-end;
}
.cart-item-info-price * {
  margin-left: 10px;
}
.cart-item-originalprice {
  font-size: 14px;
  color : lightgray;
  text-decoration: line-through;
}
.cart-item-price{
  font-size: 18px;
  font-weight: bold;
}
.cart-item-coupon * {
  margin-right: 10px;
}
.cart-item-coupon button {
  border:none;
  border-radius: 5px;
  background: black;
  color: white;
  font-weight: bold;
}
.cart-totalcost-container {
  justify-content: space-between;
}
.cart-item-count {
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}
.cart-quantity {
  font-weight: bold;
}
.cart-quantity-btn {
  margin: 0 5px;
  border: 1px solid rgb(100, 100, 100);
  border-radius: 5px;
  height: 25px;
}
.cart-totalcost {
  margin-right: 10px;
  font-size: 22px;
  font-weight: bold;
}
.cart-delete {
  padding-top: 3px;
  border:none;
  border-radius: 5px;
  background: black;
  color: white;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: 5px;
  right: 7px;
}
</style>
