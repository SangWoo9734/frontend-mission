<template>
  <div id='product-image-container'>
    <img :src="getImage" alt="" id='product-image' class='item-center'>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU',
    };
  },
  props: {
    image: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU' },
  },
  computed: {
    getImage() {
      return this.image ? this.image : this.defaultImage;
    },
  },
};
</script>

<style scoped>
#product-image-container {
  width: 100%;
  position: relative;
}
#product-image-container:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
#product-image {
  width: 90%;
  padding:10px;
}
</style>
