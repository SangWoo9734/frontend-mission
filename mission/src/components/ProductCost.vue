<template>
  <div id='product-cost-container' class='flex'>
    <div id='product-discount'>
      <p v-if='originalPrice != price' data-test='product-discount-rate'>
        {{ calculateDiscountRate }}%↘︎
      </p>
    </div>
    <div id='product-cost'>
      <p v-if='originalPrice != price' data-test='product-cost-origin' class='cost-origin'>
        {{ commaWithOriginalPrice }}원
      </p>
      <p data-test='product-cost-discounted' class='cost-final'>
        {{ commaWithPrice }}원
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCost',
  props: {
    originalPrice: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
  },
  computed: {
    commaWithOriginalPrice() {
      return this.originalPrice.toLocaleString('ko-KR');
    },
    commaWithPrice() {
      return this.price.toLocaleString('ko-KR');
    },
    calculateDiscountRate() {
      return ((1 - (this.price / this.originalPrice)) * 100).toFixed(0).toLocaleString('ko-KR');
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
