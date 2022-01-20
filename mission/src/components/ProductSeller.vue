<template>
    <div id='user-info-container' class='flex'>
      <div class='user-image'>
        <img :src="seller.imgUrl" alt="" class='item-center' data-test='user-image'>
      </div>
      <div id='user-info'>
        <p id='user-name' data-test='user-name'>{{ seller.userName }}</p>
        <p id='user-tag' data-test='user-tag'>
          <span v-for='(tag, index) in tagWithHashtag' :key='index' data-test='tag'>{{ tag }}</span>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductSeller',
  props: {
    seller: Object,
  },
  computed: {
    tagWithHashtag() {
      const withHashtag = [];
      this.seller.tag.forEach((t) => {
        withHashtag.push('#'.concat(t));
      });
      return withHashtag;
    },
  },
};
</script>

<style scoped>
#user-info-container{
  padding: 0 15px;
  align-items: center;
  margin-bottom: 15px;
}
#user-info {
  text-align: left;
}
#user-name {
  font-size: 18px;
  font-weight: bold;
}
#user-tag{
  font-size: 12px;
  color: rgb(170, 170, 170);
}
</style>
