import { flushPromises, mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Cart from '@/views/Cart.vue';
import CartAPI from '@/repositories/CartRepository';

library.add(fas, far);

let wrapper;

const cartData = [
  {
    product_no: 'asdf1234',
    name: '핏이 좋은 수트',
    image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
    price: 198000,
    original_price: 298000,
    description: '아주 잘 맞는 수트',
  },
];

const response = {
  data: { cart_item: cartData },
};

CartAPI.getCart = jest.fn().mockResolvedValue(response);

describe('Cart.vue', () => {
  beforeEach(async () => {
    wrapper = mount(Cart, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    await wrapper.setData({
      loading: false,
    });
  });

  it('renders cart page', () => {
    expect(wrapper.find('#cart').exists()).toBeTruthy();
  });

  it('called Cart API', async () => {
    await flushPromises();

    expect(CartAPI.getCart).toHaveBeenCalled();
  });

  it('renders page title', () => {
    expect(wrapper.find('[data-test="cart-title"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-title"]').text()).toEqual('🛒 Cart');
  });

  it('renders number of items which in cart now', () => {
    wrapper.setData({
      cart: [
        'item1', 'item2', 'item3',
      ],
    });

    expect(wrapper.find('[data-test="cart-count"]').exists()).toBeTruthy();
  });

  it('show right number of items which in cart now', async () => {
    await wrapper.setData({
      cart: [
        { quantity: 1 },
        { quantity: 2 },
        { quantity: 3 },
      ],
    });

    expect(wrapper.find('[data-test="cart-count"]').text()).toContain(6);
  });

  it('show right number when cart is empty', async () => {
    await wrapper.setData({
      cart: [],
    });

    expect(wrapper.find('[data-test="cart-count"]').text()).toContain(0);
  });

  it('renders total cost', () => {
    expect(wrapper.find('[data-test="cart-totalcost"]').exists()).toBeTruthy();
  });

  it('renders right total cost', async () => {
    await wrapper.setData({
      cart: [
        { price: 100, quantity: 3 },
        { price: 300, quantity: 2 },
        { price: 700, quantity: 1 },
      ],
    });

    expect(wrapper.find('[data-test="cart-totalcost"]').text()).toContain('1,600');
  });

  it('renders right total cost if no item in cart', async () => {
    await wrapper.setData({
      cart: [],
    });

    expect(wrapper.find('[data-test="cart-totalcost"]').text()).toContain('0');
  });

  it('render loading when loading state is false', async () => {
    await wrapper.setData({
      loading: false,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBeFalsy();
  });

  it('render loading when loading state is true', async () => {
    await wrapper.setData({
      loading: true,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBeTruthy();
  });
});
