<template>
    <div id='user-info-container' class='flex'>
      <div class='user-image'>
        <img :src='getImage' alt='' class='item-center' data-test='user-image'>
      </div>
      <div id='user-info'>
        <p id='user-name' data-test='user-name'>{{ name }}</p>
        <p id='user-tag' data-test='user-tag'>
          <span v-for='(tag, index) in hash_tags' :key='index' data-test='tag'>
            #{{ tag }}
          </span>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductSeller',
  data() {
    return {
      defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU',
    };
  },
  props: {
    hash_tags: { type: Array, default: null },
    name: { type: String, default: '' },
    profile_image: { type: String, default: '' },
  },
  computed: {
    getImage() {
      return this.profile_image ? this.profile_image : this.defaultImage;
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
