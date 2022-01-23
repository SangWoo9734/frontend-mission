<template>
  <div class='item-list-item flex'>
    <div class='item-image-container'>
      <img :src='getImage' alt=''
        class='item-image item-center width-fit' data-test='item-image'>
    </div>
    <div class='item-info-container'>
      <div class='item-title bold' data-test='item-title'>{{ item.title }}</div>
      <div class='item-averagerate' data-test='item-averagerate'>
        ⭐️ {{ item.averageRate }} ({{ item.reviewLength }})
      </div>
      <div v-if='item.discount.isDiscount' class='item-discount flex'>
        <p class='item-discount-rate bold' data-test='item-discount-rate'>
          {{ item.discount.rate }}%
        </p>
        <p class='item-original-cost' data-test='item-origin-cost'>
          {{ commaWithOriginalCost }}원
        </p>
      </div>
      <div class='item-discounted-cost bold' data-test='item-discounted-cost'>
        {{ commaWithDiscountedCost }}원
      </div>
    </div>
    <div v-if='item.isNew' class='item-new'>NEW</div>
  </div>
</template>

<script>
export default {
  name: 'ItemListItem',
  props: {
    item: Object,
  },
  data() {
    return {
      basicImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU',
    };
  },
  computed: {
    commaWithOriginalCost() {
      return this.item.cost.toLocaleString('ko-KR');
    },
    commaWithDiscountedCost() {
      return this.item.discountedCost.toLocaleString('ko-KR');
    },
    getImage() {
      return this.item.imgUrl ? this.item.imgUrl : this.basicImgUrl;
    },
  },
};
</script>

<style scoped>
.item-list-item {
  display: block;
  position: relative;
  width: calc(50% - 16.2px);
  margin: 7px;
  border: 1px solid lightgray;
  border-radius: 5px;
  float:left;
  flex-direction: column;
  justify-content: left;
  box-shadow: 0 0 7px lightgray;
}
.item-image-container {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  margin: 5px 5px 10px 5px;
}
.item-image{
  width:100%;
  border-radius: 5px;
}
.item-info-container {
  position:relative;
  min-height: 130px;
  height:fit-content;
  padding: 0 10px;
  text-align: left;
}
.item-title {
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break:break-all;
}
.item-averagerate{
  font-size: 15px;
  padding: 2px 0;
}
.item-discount {
  height: 20px;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 15px;
}
.item-discount-rate {
  font-size: 20px;
  color: red;
}
.item-original-cost {
  color: rgb(170, 170, 170);
  text-decoration: line-through;
}
.item-discounted-cost {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 20px;
  padding-bottom: 10px;
  padding-right: 10px;
}
.item-new {
  position: absolute;
  top : 10px;
  left : 10px;
  font-size: 15px;
  font-weight: 900;
  color: red;
}
</style>
