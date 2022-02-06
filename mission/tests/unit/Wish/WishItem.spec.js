import { mount } from '@vue/test-utils';
import WishItem from '@/components/Wish/WishItem.vue';

let wrapper;

const testImage = 'www.test.com';
const testName = 'testname';
const testDescription = 'This is test description.';
const testPrice = 10000;

describe('Cart.vue', () => {
  beforeEach(() => {
    wrapper = mount(WishItem);
  });

  it('renders Wish Item Component', () => {
    expect(wrapper.find('#wish-item').exists()).toBeTruthy();
  });

  it('renders Item image', () => {
    expect(wrapper.find('[data-test="item-image"]').exists()).toBeTruthy();
  });

  it('renders right image of item', async () => {
    await wrapper.setProps({
      image: testImage,
    });

    expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(testImage);
  });

  it('renders right image of item', async () => {
    await wrapper.setProps({
      image: testImage,
    });

    expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(testImage);
  });

  it('renders right image of item if image URL is ""', async () => {
    const defaultUrl = 'default';
    await wrapper.setData({
      defaultImage: defaultUrl,
    });
    await wrapper.setProps({
      image: '',
    });

    expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(defaultUrl);
  });

  it('renders Item name', () => {
    expect(wrapper.find('[data-test="item-name"]').exists()).toBeTruthy();
  });

  it('renders right name of item', async () => {
    await wrapper.setProps({
      name: testName,
    });

    expect(wrapper.find('[data-test="item-name"]').text()).toEqual(testName);
  });

  it('renders Item description', () => {
    expect(wrapper.find('[data-test="item-description"]').exists()).toBeTruthy();
  });

  it('renders right description of item', async () => {
    await wrapper.setProps({
      description: testDescription,
    });

    expect(wrapper.find('[data-test="item-description"]').text()).toEqual(testDescription);
  });

  it('renders Item price', () => {
    expect(wrapper.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
  });

  it('renders right price of item with format', async () => {
    const priceWithFormat = '10,000';
    await wrapper.setProps({
      price: testPrice,
    });

    expect(wrapper.find('[data-test="item-discounted-cost"]').text()).toContain(priceWithFormat);
  });
});
