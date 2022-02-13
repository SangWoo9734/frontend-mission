import { flushPromises, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from '@/App.vue';
import TheNavbar from '@/components/ItemCommon/TheNavbar.vue';
import ItemList from '@/views/ItemList.vue';
import Cart from '@/views/Cart.vue';
import Wish from '@/views/Wish.vue';
import MyPage from '@/views/MyPage.vue';

library.add(fas, far);

let wrapper;
const testData = [
  {
    image: 'image1',
    name: 'item1',
    quantity: 1,
    original_price: 10000,
    price: 10000,
  },
  {
    image: 'image1',
    name: 'item2',
    quantity: 2,
    original_price: 20000,
    price: 12000,
  },
];

const store = createStore({
  state() {
    return {
      cartItem: testData,
    };
  },
  getters: {
    getCartItemLength(state) {
      return state.cartItem.length;
    },
  },
});

const routes = [
  {
    path: '/item',
    component: ItemList,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/wish',
    component: Wish,
  },
  {
    path: '/mypage',
    component: MyPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

describe('Navigation routing', () => {
  let wrapperApp;

  beforeEach(async () => {
    wrapperApp = mount(App, {
      global: {
        plugins: [router, store],
        stubs: { FontAwesomeIcon },
      },
    });
  });

  it('routing to Item', async () => {
    router.push('/cart');

    await router.isReady();
    await wrapperApp.find('[data-test="nav-button-item"]').trigger('click');
    await flushPromises();

    expect(wrapperApp.findComponent(ItemList).exists()).toBeTruthy();
  });

  it('routing to Cart', async () => {
    router.push('/item');

    await router.isReady();
    await wrapperApp.find('[data-test="nav-button-cart"]').trigger('click');
    await flushPromises();

    expect(wrapperApp.findComponent(Cart).exists()).toBeTruthy();
  });

  it('routing to Wish', async () => {
    router.push('/cart');

    await router.isReady();
    await wrapperApp.find('[data-test="nav-button-wish"]').trigger('click');
    await flushPromises();

    expect(wrapperApp.findComponent(Wish).exists()).toBeTruthy();
  });

  it('routing to MyPage', async () => {
    router.push('/cart');

    await router.isReady();
    await wrapperApp.find('[data-test="nav-button-mypage"]').trigger('click');
    await flushPromises();

    expect(wrapperApp.findComponent(MyPage).exists()).toBeTruthy();
  });
});

describe('Navigation Bar', () => {
  const mockSelectMenu = jest.fn();
  const mockisSelected = jest.fn();
  const mockIsCartBtn = jest.fn().mockResolvedValue(true);

  beforeEach(async () => {
    wrapper = mount(TheNavbar, {
      methods: {
        selectMenu: mockSelectMenu,
        isSelected: mockisSelected,
        isCartBtn: mockIsCartBtn,
      },
      global: {
        plugins: [router, store],
        stubs: { FontAwesomeIcon },
      },
    });

    await wrapper.setData({
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
    });
  });

  it('renders navbar', () => {
    expect(wrapper.find('#navigation').exists()).toBeTruthy();
  });

  it('contains 4 buttons', () => {
    expect(wrapper.findAll('[data-test="nav-button-title"]').length).toBe(4);
  });

  it('renders "Home" buttons', () => {
    expect(wrapper.find('[data-test="nav-button-item"]').text()).toContain('Home');
  });

  it('renders "Like" buttons', () => {
    expect(wrapper.find('[data-test="nav-button-wish"]').text()).toContain('Like');
  });

  it('renders "Cart" buttons', () => {
    expect(wrapper.find('[data-test="nav-button-cart"]').text()).toContain('Cart');
  });

  it('renders number which show the number of items in cart', () => {
    expect(wrapper.find('[data-test="cart-count"]').exists()).toBeTruthy();
  });

  it('renders right number which show the number of items in cart', () => {
    expect(wrapper.find('[data-test="cart-count"]').text()).toEqual('2');
  });

  it('renders "MyPage" buttons', () => {
    expect(wrapper.find('[data-test="nav-button-mypage"]').text()).toContain('MyPage');
  });
});
