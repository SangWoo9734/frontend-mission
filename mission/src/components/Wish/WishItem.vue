<template>
  <div id='wish-item' class='flex'>
    <div class='item-image-container'>
      <img :src='getImage' alt=''
        class='item-image item-center width-fit' data-test='item-image'>
    </div>
    <div class='item-info-container'>
      <div class='item-title text-shorten bold' data-test='item-name'>{{ name }}</div>
      <div class='item-description text-shorten' data-test='item-description'>
        <p>{{ description }}</p>
      </div>
      <div class='item-discounted-cost bold' data-test='item-discounted-cost'>
        {{ commaWithPrice }}원
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemListItem',
  data() {
    return {
      defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU',
    };
  },
  props: {
    id: { type: String, default: '' },
    image: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU' },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
  },
  computed: {
    commaWithPrice() {
      return this.price.toLocaleString('ko-KR');
    },
    getImage() {
      return this.image ? this.image : this.defaultImage;
    },
  },
};
</script>

<style scoped>
#wish-item {
  position: relative;
  margin: 7px;
  border: 1px solid lightgray;
  border-radius: 5px;
  flex-direction: column;
  justify-content: left;
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
  min-height: 100px;
  height:fit-content;
  padding: 0 10px;
  text-align: left;
}
.item-title {
  font-size: 18px;
}
.item-discount {
  height: 20px;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 5px;
}
.item-discount-rate {
  font-size: 20px;
  color: red;
}
.item-description {
  margin-top: 5px;
  color: rgb(170, 170, 170)
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
</style>
