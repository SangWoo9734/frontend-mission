import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils';

import Order from '@/views/Order.vue';
import ProductListInfo from '@/components/Order/ProductListInfo.vue';
import DeliveryInfo from '@/components/Order/DeliveryInfo.vue';
import CreditInfo from '@/components/Order/CreditInfo.vue';

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

describe('Order', () => {
  const store = createStore({
    state() {
      return {
        cartItem: testData,
      };
    },
    getters: {
      getCartItems(state) {
        return state.cartItem;
      },
    },
  });

  beforeEach(async () => {
    wrapper = shallowMount(Order, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.setData({
      items: store.state.cartItem,
      loading: false,
    });
  });

  it('renders Order view', () => {
    expect(wrapper.find('#order').exists()).toBeTruthy();
  });

  it('does not render Loading circle when loading state is false', () => {
    expect(wrapper.find('[data-test="loading"]').exists()).toBeFalsy();
  });

  it('renders Loading Circle when loading state is true', async () => {
    await wrapper.setData({
      loading: true,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBeTruthy();
  });

  it('contains Product Info Components', () => {
    expect(wrapper.findComponent(ProductListInfo).exists()).toBeTruthy();
  });

  it('contains Delivery Info Components', () => {
    expect(wrapper.findComponent(DeliveryInfo).exists()).toBeTruthy();
  });

  it('contains Credit Info Components', () => {
    expect(wrapper.findComponent(CreditInfo).exists()).toBeTruthy();
  });

  it('contains final Price component', () => {
    expect(wrapper.find('[data-test="final-price"]').exists()).toBeTruthy();
  });

  it('render number of final price correctly', async () => {
    expect(wrapper.find('[data-test="final-price"]').text()).toContain('34,000');
  });
});
