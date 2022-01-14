<template>
  <div id='product-cost-container' class='flex'>
    <div id='product-discount'>
      <p data-test='product-discount-rate'>{{discountRate}}%</p>
    </div>
    <div id='product-cost'>
      <p v-if='discountRate > 0' data-test='product-cost-origin' class='cost-origin'>
        {{ comma(cost) }}원
      </p>
      <p data-test='product-cost-discounted' class='cost-final'>
        {{ comma(applyDiscount) }}원
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCost',
  data() {
    return {
      cost: 30000,
      discountRate: 15,
    };
  },
  methods: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  computed: {
    applyDiscount() {
      return this.cost * (1 - this.discountRate / 100);
    },
  },
};
</script>

<style scoped>
#product-cost-container {
    align-items: center;
    padding: 0 15px;
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
