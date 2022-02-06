<template>
  <div id='item-info-page' class='container flex'>
    <!-- 제품 상세 정보 -->
    <ProductInfo
      :description= 'itemInfo.description'
      :image= 'itemInfo.image'
      :name= 'itemInfo.name'
      :originalPrice= 'itemInfo.original_price'
      :price= 'itemInfo.price'
     />
    <!-- 제품 구매 -->
    <ProductBuy :price='itemInfo.price' />
  </div>
</template>

<script>
import ProductInfo from '../components/ProductInfo.vue';
import ProductBuy from '../components/ProductBuy.vue';

import Repository from '../repositories/RepositoryFactory';

const ItemRepository = Repository.get('items');

export default {
  name: 'ItemInfoPage',
  data() {
    return {
      itemInfo: {},
    };
  },
  components: {
    ProductInfo,
    ProductBuy,
  },
  created() {
    this.getItemInfo(this.$route.params.id)
      .then((result) => {
        this.itemInfo = result;
      }).then(() => {
        console.log(this.itemInfo);
      });
  },
  methods: {
    async getItemInfo(id) {
      const result = await ItemRepository.getItemInfo(id);

      return result.data.item;
    },
  },
};
</script>

<style scoped>
</style>
