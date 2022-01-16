<template>
    <div id='product-buy' class='position-fixed flex'>
        <button id='btn-cart' class='btn'>장바구니 담기</button>
        <button id='btn-buy' class='btn'>
            <p>{{ costWithComma(applyDiscount) }}원 구매</p>
        </button>
    </div>
</template>

<script>
export default {
  name: 'ProductBuy',
  props: {
    cost: Number,
    discount: Object,
  },
  methods: {
    costWithComma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  computed: {
    applyDiscount() {
      if (this.discount.isDiscount) {
        return this.cost * (1 - this.discount.rate / 100);
      }
      return this.cost;
    },
  },
};
</script>

<style scoped>
#product-buy {
  bottom: 0;
  max-width:500px;
  width: 100%;
  height: 60px;
  border-top: 0.5px solid lightgray;
  box-shadow: 0px -2px 3px 0px lightgray;
  background: white;
}
.btn {
  width: 45%;
  margin: 0 10px;
  height: 70%;
  font-weight: bold;
  font-size: 18px;
}
#btn-buy {
  background : rgb(255, 192, 109);
}
</style>
