<template>
  <div id='product-review-container'>
    <div id='product-review-nav' class='flex'>
      <h3 class='detail-nav'>Reviews</h3>
    </div>
    <ProducReviewDetail v-for='review in user_review' :key='review.review_no'
      :content= 'review.content'
      :created= 'review.created'
      :image= 'review.img'
      :likesCount= 'review.likes_count'
      :title= 'review.title'
      :writer= 'review.writer'
    />
  </div>
</template>

<script>
import ProducReviewDetail from './ProductReviewDetail.vue';

export default {
  name: 'ProductReview.vue',
  components: {
    ProducReviewDetail,
  },
  props: {
    user_review: { type: Array, default: null },
  },
};
</script>

<style scoped>
#product-review-container {
  width: 100%;
  margin: 20px 0;
  padding-bottom: 70px;
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
