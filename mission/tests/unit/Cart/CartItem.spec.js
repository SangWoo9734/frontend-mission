import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import CartItem from '@/components/Cart/CartItem.vue';

library.add(fas, far);

let wrapper;

const testId = 'abc123';
const testImage = 'www.test.com';
const testName = 'testname';
const testOriginalPrice = 20000;
const testPrice = 10000;
const testQuantity = 2;

describe('CartItem', () => {
  const mutations = {
    addQuantity: jest.fn(),
    subQuantity: jest.fn(),
    removeItemFromCart: jest.fn(),
  };

  const store = createStore({
    state() {
      return {
        cartItem: ['a', 'b'],
      };
    },
    mutations,
    getters: {
      getCartItemLength(state) {
        return state.cartItem.length;
      },
    },
  });
  beforeEach(() => {
    wrapper = mount(CartItem, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });
  });

  it('renders CartItem components', () => {
    expect(wrapper.find('#cart-item').exists()).toBeTruthy();
  });

  it('renders item image', () => {
    expect(wrapper.find('[data-test="item-image"]').exists()).toBeTruthy();
  });

  it('renders right image of item', async () => {
    await wrapper.setProps({
      image: testImage,
    });

    expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(testImage);
  });

  it('renders right image of item', async () => {
    const testDefaultImage = 'default';
    await wrapper.setProps({
      image: '',
    });
    await wrapper.setData({
      defaultImage: testDefaultImage,
    });

    expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(testDefaultImage);
  });

  it('renders item name', () => {
    expect(wrapper.find('[data-test="item-name"]').exists()).toBeTruthy();
  });

  it('renders right name of item', async () => {
    await wrapper.setProps({
      name: testName,
    });

    expect(wrapper.find('[data-test="item-name"]').text()).toEqual(testName);
  });

  it('renders original price of item', () => {
    expect(wrapper.find('[data-test="item-originalprice"]').exists()).toBeTruthy();
  });

  it('renders right original price with format', async () => {
    const originalPriceWithFormat = '20,000';
    await wrapper.setProps({
      originalPrice: testOriginalPrice,
    });

    expect(wrapper.find('[data-test="item-originalprice"]').text()).toContain(originalPriceWithFormat);
  });

  it('renders (discounted) price of item', () => {
    expect(wrapper.find('[data-test="item-price"]').exists()).toBeTruthy();
  });

  it('renders right original price with format', async () => {
    const priceWithFormat = '10,000';
    await wrapper.setProps({
      price: testPrice,
    });

    expect(wrapper.find('[data-test="item-price"]').text()).toContain(priceWithFormat);
  });

  it('renders quantity components', () => {
    expect(wrapper.find('[data-test="quantity-minus"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="quantity"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="quantity-plus"]').exists()).toBeTruthy();
  });

  it('calls "addQuantity" when press "plus" button', async () => {
    await wrapper.setProps({
      id: testId,
      quantity: testQuantity,
    });

    await wrapper.find('[data-test="quantity-plus"]').trigger('click');

    expect(mutations.addQuantity).toHaveBeenCalled();
  });

  it('calls "subQuantity" when press "minus" button', async () => {
    await wrapper.setProps({
      id: testId,
      quantity: testQuantity,
    });

    await wrapper.find('[data-test="quantity-minus"]').trigger('click');

    expect(mutations.subQuantity).toHaveBeenCalled();
  });

  it('renders total cost', () => {
    expect(wrapper.find('[data-test="total-cost"]').exists()).toBeTruthy();
  });

  it('renders right total price with format', async () => {
    const priceWithFormat = '20,000';
    await wrapper.setProps({
      price: testPrice,
      quantity: testQuantity,
    });

    expect(wrapper.find('[data-test="total-cost"]').text()).toContain(priceWithFormat);
  });

  it('renders delete button', () => {
    expect(wrapper.find('[data-test="delete-button"]').exists()).toBeTruthy();
  });

  it('call delete method from store', async () => {
    await wrapper.setProps({
      id: testId,
    });
    await wrapper.find('[data-test="delete-button"]').trigger('click');

    expect(mutations.removeItemFromCart).toHaveBeenCalled();
  });
});
