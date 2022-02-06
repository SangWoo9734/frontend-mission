<template>
  <div id='navigation' class='position-fixed flex' data-test='nav-button'>
      <div v-for='m in menu' :key='m.name'
        :class='isSelected(m.select)' @click='selectMenu(m.route)'>
        <font-awesome-icon :icon='m.icon' />
        <p class='navigation-btn-title'>{{ m.name }}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      nowSelected: 'item',
      menu: {
        item: {
          name: 'Home',
          route: 'item',
          icon: 'home',
          select: true,
        },
        wish: {
          name: 'Like',
          route: 'wish',
          icon: 'heart',
          select: false,
        },
        cart: {
          name: 'Cart',
          route: 'cart',
          icon: 'shopping-cart',
          select: false,
        },
        mypage: {
          name: 'MyPage',
          route: 'mypage',
          icon: 'user',
          select: false,
        },
      },
    };
  },
  methods: {
    selectMenu(menuName) {
      this.menu[this.nowSelected].select = false;
      this.menu[menuName].select = true;
      this.nowSelected = menuName;
      this.$router.push({ name: menuName });
    },
    isSelected(select) {
      return select ? 'navigation-btn flex selectedMenu' : 'navigation-btn flex';
    },
  },
  created() {
    this.selectMenu(window.location.href.split('/')[3]);
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
  width:25%;
  height: 100%;
  background: none;
  font-size: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(160, 160, 160);
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
</style>
