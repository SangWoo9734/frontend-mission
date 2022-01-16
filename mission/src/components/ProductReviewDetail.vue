<template>
  <div id='product-review-content' class='flex'>
    <div id='product-review-info'>
      <div id='product-review-reviewer' class='flex'>
        <div class='user-image' data-test='user-image'>
          <img :src='review.userImg' alt="" class='item-center'>
        </div>
        <p data-test='user-nickname'>{{ review.userNickname }}</p>
      </div>
      <div id='product-review-comment'>
        <div id='product-review-rate'>⭐️ {{ review.rate }}</div>
        <div id='product-review-text'>{{ review.text }}</div>
        <div id='product-review-react' class='flex'>
          <button id='react-good' class='btn' @click='reaction("good")'>👍 {{ react.good }}</button>
          <button id='react-bad' class='btn' @click='reaction("bad")'>👎 {{ react.bad }}</button>
        </div>
      </div>
    </div>
    <div id='product-review-image'>
      <img :src="review.reviewImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProducReviewDetail',
  props: {
    review: Object,
  },
  data() {
    return {
      react: { good: 0, bad: 0 },
      reactOnOff: { good: true, bad: true },
    };
  },
  methods: {
    reaction(val) {
      this.react[val] = this.reactOnOff[val] ? this.react[val] + 1 : this.react[val] - 1;
      this.reactOnOff[val] = !this.reactOnOff[val];
    },
  },
};
</script>

<style scoped>
#product-review-content {
  width: 95%;
  height: 180px;
  margin: 10px;
  padding: 10px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
}
#product-review-info {
  width: 70%;
  align-items: center;
  padding: 0 5px 0 10px;
  text-align:left;
}
#product-review-reviewer {
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
}
#product-review-reviewer p{
  font-weight: bold;
}
#product-review-rate {
  padding: 0 10px;
  font-size: 15px;
  font-weight: bold;
}
#product-review-text {
  padding: 10px;
  font-size: 15px;
}
#product-review-image {
  width: 30%;
  position: relative;
}
#product-review-image:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
#product-review-image img{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin:auto;
  width: 90%;
  height: 90%;
}
#product-review-react button{
  font-size: 13px;
  margin-left: 5px;
  border: none;
}
#react-good{
  color: blue;
}
#react-bad{
  color: red;
}
</style>
