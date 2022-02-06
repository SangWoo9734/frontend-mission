import { mount } from '@vue/test-utils';
import CartItem from '@/components/Cart/CartItem.vue';

let wrapper;

const testId = 'abc123';
const testImage = 'www.test.com';
const testName = 'testname';
const testOriginalPrice = 20000;
const testPrice = 10000;
const testQuantity = 2;

describe('CartItem', () => {
  beforeEach(() => {
    wrapper = mount(CartItem);
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
      image: testImage,
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

  it('calls $emit when press "plus" button', async () => {
    await wrapper.setProps({
      id: testId,
      quantity: testQuantity,
    });

    await wrapper.find('[data-test="quantity-plus"]').trigger('click');

    expect(wrapper.emitted().addQuantity[0]).toEqual([testId]);
  });

  it('calls $emit when press "minus" button', async () => {
    await wrapper.setProps({
      id: testId,
      quantity: testQuantity,
    });

    await wrapper.find('[data-test="quantity-minus"]').trigger('click');

    expect(wrapper.emitted().subQuantity[0]).toEqual([testId]);
  });

  test('if quantity was 0, it can not call $emit when press "minus" button', async () => {
    await wrapper.setProps({
      id: testId,
      quantity: 1,
    });

    await wrapper.find('[data-test="quantity-minus"]').trigger('click');

    expect(wrapper.emitted().subQuantity).toBeFalsy();
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
});
