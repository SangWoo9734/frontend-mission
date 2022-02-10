<template>
  <div id='product-review-content' class='flex'>
    <div id='product-review-info'>
      <div id='product-review-reviewer' class='flex'>
        <p data-test='user-nickname'>{{ writer }}</p>
      </div>
      <div id='product-review-comment'>
        <div id='product-review-text'>{{ content }}</div>
      </div>
      <div id='product-review-react' class='flex'>
          <button id='react-good' class='btn' @click='reaction("good")'>👍 {{ react.good }}</button>
          <button id='react-bad' class='btn' @click='reaction("bad")'>👎 {{ react.bad }}</button>
        </div>
    </div>
    <div id='product-review-image'>
      <img :src='image' alt=''>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProducReviewDetail',
  data() {
    return {
      defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU',
      react: { good: 0, bad: 0 },
      reactOnOff: { good: true, bad: true },
    };
  },
  props: {
    content: { type: String, default: '' },
    created: { type: String, default: '' },
    image: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU' },
    likesCount: { type: Number, default: 0 },
    title: { type: String, default: '' },
    writer: { type: String, default: '' },
  },
  methods: {
    reaction(val) {
      this.react[val] = this.reactOnOff[val] ? this.react[val] + 1 : this.react[val] - 1;
      this.reactOnOff[val] = !this.reactOnOff[val];
    },
    getImage() {
      return this.image ? this.image : this.defaultImgUrl;
    },
  },
};
</script>

<style scoped>
#product-review-content {
  width: 95%;
  height: fit-content;
  margin: 10px;
  padding: 10px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
}
#product-review-info {
  width: 70%;
  height: 100%;
  align-items: center;
  padding: 0 5px 0 10px;
  text-align:left;
}
#product-review-reviewer {
  align-items: center;
  height: 20%;
  padding: 5px 0 0 10px;
}
#product-review-reviewer p{
  font-weight: bold;
}
#product-review-rate {
  padding: 0 10px;
  font-size: 15px;
  font-weight: bold;
}
#product-review-comment {
  min-height: 80px;
  height: fit-content;
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
#product-review-react {
  margin-top: 10px;
}
#product-review-react button{
  font-size: 13px;
  margin-left: 5px;
  border: none;
  background: none;
}
#react-good{
  color: blue;
}
#react-bad{
  color: red;
}
</style>
