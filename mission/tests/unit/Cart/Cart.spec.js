import { mount } from '@vue/test-utils';
import Cart from '@/views/Cart.vue';

let wrapper;

describe('Cart.vue', () => {
  beforeEach(() => {
    wrapper = mount(Cart);
  });

  it('renders cart page', () => {
    expect(wrapper.find('#cart').exists()).toBeTruthy();
  });

  it('renders page title', () => {
    expect(wrapper.find('[data-test="cart-title"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="cart-title"]').text()).toEqual('🛒 장바구니');
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
});
