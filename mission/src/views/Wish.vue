<template>
  <div id='wish' class='container'>
    <!-- 하위 헤더 -->
    <div class='sub-navbar wish-navbar flex'>
      <h2 class='sub-navbar-title' data-test='wish-title'>❤️ Like</h2>
      <p class='wish-count' data-test='wish-count'><span>{{ countWish }}</span> 개</p>
    </div>
    <div class='wish-item-container'>
      <WishItem v-for='item in wish' :key='item.product_no'
        :id= 'item.product_no'
        :image= 'item.image'
        :name= 'item.name'
        :description= 'item.description'
        :price= 'item.price'
        @click= 'goItemInfo(item.product_no)'
        data-test='item'
      />
    </div>
  </div>
</template>

<script>
import WishItem from '../components/Wish/WishItem.vue';

import Repository from '../repositories/RepositoryFactory';

const ItemRepository = Repository.get('items');

export default {
  name: 'Wish',
  data() {
    return {
      wish: [],
    };
  },
  components: {
    WishItem,
  },
  computed: {
    countWish() {
      return this.wish.length;
    },
  },
  methods: {
    async getWishInfo() {
      const result = await ItemRepository.getWish();
      return result.data.items;
    },
    goItemInfo(itemId) {
      this.$router.push({ name: 'ItemInfo', params: { id: itemId } });
    },
  },
  created() {
    this.getWishInfo()
      .then((result) => {
        this.wish = result;
      });
  },
};
</script>

<style scoped>
#wish {
  padding-top: 60px;
  margin-bottom: 70px;
  height: calc(100vh - 130px);
}
.wish-navbar{
  justify-content: space-between;
}
.wish-item-container {
  padding : 10px 7px 100px 7px;
  display: grid;
  grid-template-columns: 50% 50%;
}
.wish-count{
  font-size: 18px;
  padding-right: 20px;
}
.wish-count span {
  font-size: 32px;
  font-weight: bold;
  color: rgb(255, 209, 123);
}
</style>
