<template>
  <div v-if='!loading' id='wish' class='container'>
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

  <LoadingCircle v-else data-test='loading' />
  <TheNavbar :state='"wish"' />
</template>

<script>
import LoadingCircle from '../components/ItemCommon/LoadingCircle.vue';
import WishItem from '../components/Wish/WishItem.vue';
import TheNavbar from '../components/ItemCommon/TheNavbar.vue';

import Repository from '../repositories/RepositoryFactory';

const WishRepository = Repository.get('wish');

export default {
  name: 'Wish',
  data() {
    return {
      loading: true,
      wish: [],
    };
  },
  components: {
    LoadingCircle,
    WishItem,
    TheNavbar,
  },
  computed: {
    countWish() {
      return this.wish.length;
    },
  },
  methods: {
    async getWishInfo() {
      try {
        const result = await WishRepository.getWish();
        this.wish = result.data.items;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    goItemInfo(itemId) {
      this.$router.push({ name: 'ItemInfo', params: { id: itemId } });
    },
  },
  created() {
    this.getWishInfo();
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
