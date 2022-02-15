<template>
  <div id='navigation' class='position-fixed flex'>
      <router-link v-for='m in menu' :key='m.name'
        :class='isSelected(m.route)' :to='`/${m.route}`'
        :data-test='`nav-button-${m.route}`' >
        <font-awesome-icon :icon='m.icon' />
        <p class='navigation-btn-title' data-test='nav-button-title'>{{ m.name }}</p>
        <div v-if='isCartBtn(m.route)' class='cart-count' data-test='cart-count'>
          {{ GE_CART_LEN }}
        </div>
      </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheNavbar',
  props: {
    state: { type: String, default: '' },
  },
  data() {
    return {
      nowSelected: 'item',
      menu: {
        item: {
          name: 'Home',
          route: 'item',
          icon: 'home',
        },
        wish: {
          name: 'Like',
          route: 'wish',
          icon: 'heart',
        },
        cart: {
          name: 'Cart',
          route: 'cart',
          icon: 'shopping-cart',
        },
        mypage: {
          name: 'MyPage',
          route: 'mypage',
          icon: 'user',
        },
      },
    };
  },
  methods: {
    selectMenu(menuName) {
      this.menu[this.nowSelected].select = false;
      this.menu[menuName].select = true;
      this.nowSelected = menuName;
    },
    isSelected(route) {
      return this.state === route ? 'navigation-btn flex selectedMenu' : 'navigation-btn flex';
    },
    isCartBtn(route) {
      return (route === 'cart' && this.GE_CART_LEN);
    },
  },
  computed: {
    ...mapGetters('cart', [
      'GE_CART_LEN',
    ]),
  },
};
</script>

<style scoped>
#navigation {
  bottom: 0;
  max-width: 500px;
  width:100%;
  height: 70px;
  background: white;
  box-shadow: 0 0 7px lightgray;
  z-index: 10;
}
.navigation-btn{
  position: relative;
  width:25%;
  height: 100%;
  background: none;
  font-size: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(160, 160, 160);
  text-decoration: none;
}
.navigation-btn svg {
  font-size: 24px;
}
.navigation-btn-title {
  margin-top: 5px;
}
.selectedMenu {
  color: rgb(255, 209, 123);
}
.cart-count {
  position: absolute;
  top: 5px;
  right: 30px;
  width: 15px;
  height: 15px;
  background: red;
  font-size: 12px;
  font-weight: bold;
  color: white;
  border-radius: 50%;
}
</style>
