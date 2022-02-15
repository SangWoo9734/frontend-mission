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
    <div id='product-buy' class='position-fixed flex'>
      <button id='btn-cart' class='btn' @click='addItemInCart'>장바구니 담기</button>
      <router-link id='btn-buy' class='flex btn' to='/order'
        @click='buyDirect' data-test='move-order'>
          <p>{{ commaWithPrice }}원 구매</p>
      </router-link>
    </div>

    <ItemModal v-if='modalState' class='coupon-modal' :isAlreadyInCart='isAlreadyInCart'
      @modalToggle='modalToggle' />
  </div>

  <Circle v-else data-test='loading' />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Circle from '../components/ItemCommon/Circle.vue';
import ItemModal from '../components/ItemInfo/ItemModal.vue';
import ProductInfo from '../components/ProductInfo.vue';

import Repository from '../repositories/RepositoryFactory';

const ItemRepository = Repository.get('item');

export default {
  name: 'ItemInfoPage',
  data() {
    return {
      isAlreadyInCart: false,
      modalState: false,
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
    ItemModal,
  },
  created() {
    this.getItemInfo(this.id);
  },
  methods: {
    ...mapActions('cart', [
      'AC_ADD_ITEM_IN_CART',
    ]),
    async getItemInfo(id) {
      try {
        const result = await ItemRepository.getItemInfo(id);
        this.itemInfo = result.data.item;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    modalToggle() {
      this.modalState = !this.modalState;
    },
    addItemInCart() {
      this.isAlreadyInCart = this.storeCartItem.filter(
        (cartItem) => cartItem.product_no === this.id,
      ).length === 0;
      this.modalToggle();
      this.AC_ADD_ITEM_IN_CART(this.itemInfo);
    },
    buyDirect() {
      this.AC_ADD_ITEM_IN_CART(this.itemInfo);
    },
  },
  computed: {
    ...mapGetters('cart', {
      storeCartItem: 'GE_CART_ITEM',
    }),
    commaWithPrice() {
      return this.itemInfo.price.toLocaleString('ko-KR');
    },
  },
};
</script>

<style scoped>
#product-buy {
  bottom: 0;
  max-width:500px;
  width: 100%;
  height: 60px;
  border-top: 0.5px solid lightgray;
  box-shadow: 0px -2px 3px 0px lightgray;
  background: white;
}
.btn {
  width: 45%;
  margin: 0 10px;
  height: 70%;
  font-weight: bold;
  font-size: 18px;
}
#btn-buy {
  text-decoration: none;
  background : rgb(255, 192, 109);
  justify-content: center;
  align-items: center;
  color: black;
}
</style>
