import { shallowMount } from '@vue/test-utils';
import Item from '@/components/ItemList/Item.vue';

describe('Item', () => {
  const testId = 'abcd';
  const tesImagetUrl = 'www.google.com';
  const testName = 'TestTitle';
  const testDescription = 'Test Description';
  const testOriginalPrice = 30000;
  const testPrice = 27000;

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Item, {
      propsData: {
        id: testId,
        image: tesImagetUrl,
        name: testName,
        description: testDescription,
        originalPrice: testOriginalPrice,
        price: testPrice,
      },
    });
  });

  it('renders ItemListItem', () => {
    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  describe('Item Image', () => {
    it('contains prodcut image', async () => {
      expect(wrapper.find('[data-test="item-image"]').exists()).toBeTruthy();
    });

    it('renders product image', async () => {
      expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(tesImagetUrl);
    });

    it('renders "No image"', async () => {
      const basicUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU';

      await wrapper.setProps({
        image: '',
      });

      expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(basicUrl);
    });
  });

  describe('Item Title', () => {
    it('contains product title', async () => {
      expect(wrapper.find('[data-test="item-title"]').exists()).toBeTruthy();
    });

    it('renders product title', async () => {
      expect(wrapper.find('[data-test="item-title"]').text()).toEqual(testName);
    });
  });

  describe('Item Short Description', () => {
    it('contains short description about each item', () => {
      expect(wrapper.find('[data-test="item-description"]').exists()).toBeTruthy();
    });

    it('render right description', () => {
      expect(wrapper.find('[data-test="item-description"]').text()).toEqual(testDescription);
    });

    it('renders empty string if data not contain description', async () => {
      await wrapper.setProps({
        description: '',
      });

      expect(wrapper.find('[data-test="item-description"]').text()).toEqual('');
    });
  });

  describe('Item Cost', () => {
    it('contains Item discount info if isDiscount is True', async () => {
      expect(wrapper.find('[data-test="item-discount-rate"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test="item-origin-cost"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
    });

    it('renders Item discount info if isDiscount is True', async () => {
      expect(wrapper.find('[data-test="item-origin-cost"]').text()).toEqual('30,000원');
      expect(wrapper.find('[data-test="item-discount-rate"]').text()).toEqual('10%');
      expect(wrapper.find('[data-test="item-discounted-cost"]').text()).toEqual('27,000원');
    });

    it('contains Item discount info if isDiscount is False', async () => {
      await wrapper.setProps({
        originalPrice: 10000,
        price: 10000,
      });

      expect(wrapper.find('[data-test="item-discount-rate"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test="item-origin-cost"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
    });
  });
});
