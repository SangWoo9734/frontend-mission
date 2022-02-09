<template>
  <div v-if='!loading' id='item-info-page' class='container flex'>
    <!-- 제품 상세 정보 -->
    <ProductInfo
      :description= 'itemInfo.description'
      :image= 'itemInfo.image'
      :item_name= 'itemInfo.name'
      :originalPrice= 'itemInfo.original_price'
      :price= 'itemInfo.price'
      :review= 'itemInfo.reviews'
      v-bind='itemInfo.seller'
    />
    <!-- 제품 구매 -->
    <ProductBuy :price='itemInfo.price' />
  </div>

  <Circle v-else class='loading item-center' data-test='loading' />
</template>

<script>
import Circle from '../components/ItemCommon/Circle.vue';
import ProductInfo from '../components/ProductInfo.vue';
import ProductBuy from '../components/ProductBuy.vue';

import Repository from '../repositories/RepositoryFactory';

const ItemRepository = Repository.get('item');

export default {
  name: 'ItemInfoPage',
  data() {
    return {
      loading: true,
      itemInfo: {},
    };
  },
  props: {
    id: { type: String, default: '' },
  },
  components: {
    Circle,
    ProductInfo,
    ProductBuy,
  },
  created() {
    this.getItemInfo(this.id);
  },
  methods: {
    async getItemInfo(id) {
      const result = await ItemRepository.getItemInfo(id);
      if (result.status === 200) {
        this.itemInfo = result.data.item;
        this.loading = false;
      } else {
        console.log(result);
      }
    },
  },
};
</script>

<style scoped>
</style>
