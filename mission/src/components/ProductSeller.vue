<template>
    <div id='user-info-container' class='flex'>
      <div id='user-image'>
        <img :src="imgUrl" alt="" class='item-center' data-test='user-image'>
      </div>
      <div id='user-info'>
        <p id='user-name' data-test='user-name'>{{ userName }}</p>
        <p id='user-tag' data-test='user-tag'>
          <span v-for='(tag, index) in tagWithHashtag' :key='index'>{{ tag }}</span>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductSeller',
  data() {
    return {
      userName: 'NIKE Official',
      imgUrl: 'https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg',
      tag: ['스포츠', '러닝', '기능성'],
    };
  },
  computed: {
    tagWithHashtag() {
      const withHashtag = [];
      this.tag.forEach((t) => {
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
}
#user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-right:10px;
}
#user-image img {
  height : 100%;
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
