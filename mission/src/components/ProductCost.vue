<template>
  <div id='product-cost-container' class='flex'>
    <div id='product-discount'>
      <p v-if='discount.isDiscount' data-test='product-discount-rate'>{{ discount.rate }}%↘︎</p>
    </div>
    <div id='product-cost'>
      <p v-if='discount.isDiscount > 0' data-test='product-cost-origin' class='cost-origin'>
        {{ costWithComma(cost) }}원
      </p>
      <p data-test='product-cost-discounted' class='cost-final'>
        {{ costWithComma(applyDiscount) }}원
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCost',
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
#product-cost-container {
  justify-content: right;
  align-items: center;
  margin: 0;
  padding: 0 15px 10px 15px;
  border-bottom: 1px solid lightgray;
}
#product-cost {
  text-align: right;
  margin-left: 20px;
}
#product-discount {
  font-size: 24px;
  font-weight: bold;
  color: rgb(194, 0, 0);
  padding-top: 20px;
}
.cost-origin {
  text-decoration: line-through;
  color: rgb(170, 170, 170);
  font-size: 16px;
}
.cost-final {
  font-weight: bold;
  font-size: 20px;
}
</style>
