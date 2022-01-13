<template>
    <div id='product-buy' class='position-fixed'>
        <button id='btn-cart' class='btn'>장바구니 담기</button>
        <button id='btn-buy' class='btn'>
            <p>{{ comma(cost) }} 원</p>
            <p>바로 구매</p>
        </button>
    </div>
</template>

<script>
export default {
  name: 'ProductBuy',
  data() {
    return {
      cost: 2000,
    };
  },
  methods: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style scoped>
#product-buy {
  bottom: 0;
  left: 0;
  height: 60px;
  border-top: 0.5px solid lightgray;
  box-shadow: 0px -2px 3px 0px lightgray;
}
#btn-cart {
  width: 43%;
  margin: 0 10px;
  height: 70%;
}
#btn-buy {
  width: 43%;
  margin: 0 10px;
  background : rgb(255, 192, 109);
}
</style>
