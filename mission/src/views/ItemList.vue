<template>
  <div id='item-list-page' class='container'>
    <!-- SortButton -->
    <ItemSort @sortItem='sortItem' />
    <!-- ItemList -->
    <div class='item-list' data-test='item-list'>
      <Item v-for='item in itemData' :key='item.product_no'
        :id= 'item.product_no'
        :image= 'item.image'
        :name= 'item.name'
        :description= 'item.description'
        :originalPrice= 'item.original_price'
        :price= 'item.price'
        @click= 'goItemInfo(item.product_no)'
        data-test='item' />
    </div>
  </div>
</template>

<script>
import ItemSort from '../components/ItemList/ItemSort.vue';
import Item from '../components/Item.vue';

import Repository from '../repositories/RepositoryFactory';

const ItemRepository = Repository.get('items');

export default {
  name: 'ItemListPage',
  components: {
    ItemSort,
    Item,
  },
  data() {
    return {
      itemData: [],
    };
  },
  methods: {
    sortAscending(point) {
      this.itemData.sort((a, b) => {
        if (a[point] > b[point]) return 1;
        if (a[point] === b[point]) return 0;
        if (a[point] < b[point]) return -1;
        return 0;
      });
    },
    sortDesending(point) {
      this.itemData.sort((a, b) => {
        if (a[point] < b[point]) return 1;
        if (a[point] === b[point]) return 0;
        if (a[point] > b[point]) return -1;
        return 0;
      });
    },

    sortItem(point) {
      if (point === '최신순') this.sortDesending('id');
      if (point === '높은 할인율') {
        this.itemData.sort((a, b) => {
          if (a.discount.rate < b.discount.rate) return 1;
          if (a.discount.rate === b.discount.rate) return 0;
          if (a.discount.rate > b.discount.rate) return -1;
          return 0;
        });
      }
      if (point === '높은 평점순') this.sortDesending('averageRate');
      if (point === '낮은 가격순') this.sortAscending('discountedCost');
      if (point === '높은 가격순') this.sortDesending('discountedCost');
      if (point === '리뷰 많은순') this.sortDesending('reviewLength');
    },
    goItemInfo(itemId) {
      this.$router.push({ name: 'ItemInfo', params: { id: itemId } });
    },
    async getItemData() {
      const result = await ItemRepository.getItems();
      return result.data.items;
    },
  },
  created() {
    this.getItemData()
      .then((result) => {
        this.itemData = result;
      });
  },
};
</script>

<style scoped>
#item-list-page{
  padding-top: 60px;
}
.item-list {
  padding : 10px 7px 100px 7px;
  display: grid;
  grid-template-columns: 50% 50%;
}
.sort-btn-container{
  width: 100%;
  height: 50px;
  margin-top: 20px;
  overflow: auto;
  align-items: center;
}
.sort-btn-viewbox {
  width: fit-content;
  align-items: center;
  padding: 0 10px;
}
#sort-fixed-btn{
  border: 1px solid gray;
  background: white;
  width: 60px;
}
.sort-btn {
  padding: 5px 10px;
  margin-right: 10px;
  width: max-content;
  float: left;
  border-radius: 25px;
  border: 2px solid rgb(255, 209, 123);
}
.sort-btn:hover{
  cursor: pointer;
}

</style>
