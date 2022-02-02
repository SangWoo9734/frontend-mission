<template>
  <div id='navigation' class='position-fixed flex' data-test='nav-button'>
      <div v-for='m in menu' :key='m.name'
        :class='isSelected(m.select)' @click='selectMenu(m.name)'>
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
      nowSelected: 'Home',
      menu: {
        Home: {
          name: 'Home',
          icon: 'home',
          select: true,
        },
        Like: {
          name: 'Like',
          icon: 'heart',
          select: false,
        },
        Cart: {
          name: 'Cart',
          icon: 'shopping-cart',
          select: false,
        },
        MyPage: {
          name: 'MyPage',
          icon: 'user',
          select: false,
        },
      },
    };
  },
  methods: {
    selectMenu(name) {
      this.menu[this.nowSelected].select = false;
      this.menu[name].select = true;
      this.nowSelected = name;
    },
    isSelected(select) {
      return select ? 'navigation-btn flex selectedMenu' : 'navigation-btn flex';
    },
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
