<template>
  <div id='product-review-container'>
    <div id='product-review-nav' class='flex'>
      <h3 class='detail-nav'>Reviews</h3>
      <h2 id='average-rate'>⭐️ {{ averageRate }} <span>({{ reviewsLength }})</span></h2>
    </div>
    <ProducReviewDetail v-for='(review, index) in userReviews' :key='index' :review='review'/>
  </div>
</template>

<script>
import ProducReviewDetail from './ProductReviewDetail.vue';

export default {
  name: 'ProductReview.vue',
  props: {
    userReviews: Array,
  },
  components: {
    ProducReviewDetail,
  },
  computed: {
    reviewsLength() {
      return this.userReviews.length;
    },
    averageRate() {
      let rateSum = 0;
      this.userReviews.forEach((r) => {
        rateSum += r.rate;
      });
      return (rateSum / this.reviewsLength).toFixed(2);
    },
  },
};
</script>

<style scoped>
#product-review-container {
  width: 100%;
  margin: 20px 0;
  padding-bottom: 50px;
}
#product-review-nav {
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
#average-rate {
  display:inline;
  margin: 0;
  margin-right: 25px;
}
#average-rate span{
  font-size: 15px;
}
</style>
