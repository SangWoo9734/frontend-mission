<template>
    <div id='user-info-container' class='flex'>
      <div class='user-image'>
        <img :src='sellerInfo.profile_image' alt='' class='item-center' data-test='user-image'>
      </div>
      <div id='user-info'>
        <p id='user-name' data-test='user-name'>{{ sellerInfo.name }}</p>
        <p id='user-tag' data-test='user-tag'>
          <span v-for='(tag, index) in sellerInfo.hash_tags' :key='index' data-test='tag'>
            #{{ tag }}
          </span>
        </p>
      </div>
    </div>
</template>

<script>
import Repository from '../repositories/RepositoryFactory';

const ItemRepository = Repository.get('items');

export default {
  name: 'ProductSeller',
  data() {
    return {
      sellerInfo: {},
    };
  },
  created() {
    this.getSellerInfo(this.$route.params.id)
      .then((result) => {
        this.sellerInfo = result;
      });
  },
  methods: {
    async getSellerInfo(id) {
      const result = await ItemRepository.getItemInfo(id);
      return result.data.item.seller;
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
