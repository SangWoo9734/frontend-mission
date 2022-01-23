import { shallowMount } from '@vue/test-utils';
import ItemInfoPage from '@/components/ItemList/Item.vue';

describe('Item', () => {
  const testUrl = 'www.google.com';
  const testTitle = 'TestTitle';
  const testCost = 30000;
  const testDiscountTrue = { isDiscount: true, rate: 10 };
  const testDiscountFalse = { isDiscount: false, rate: 0 };
  const testUserRate = [4.8, 4.3, 4.7];
  const testDiscountedCost = 27000;
  const testReviewLength = 3;
  const testAverageRate = 4.6;

  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ItemInfoPage, {
      propsData: {
        item: {
          id: 1102323,
          imgUrl: testUrl,
          title: testTitle,
          cost: testCost,
          discount: testDiscountTrue,
          userRate: testUserRate,
          discountedCost: testDiscountedCost,
          reviewLength: testReviewLength,
          averageRate: testAverageRate,
        },
      },
    });
  });

  it('renders ItemListItem', () => {
    expect(wrapper.find('.item-list-item').exists()).toBe(true);
  });

  describe('Product Image', () => {
    it('contains prodcut image', async () => {
      expect(wrapper.find('[data-test="item-image"]').exists()).toBeTruthy();
    });

    it('renders product image', async () => {
      expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(testUrl);
    });

    it('renders "No image"', async () => {
      const basicUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU';
      await wrapper.setProps({
        item: {
          id: 1102323,
          imgUrl: '',
          title: testTitle,
          cost: testCost,
          discount: testDiscountTrue,
          userRate: testUserRate,
          discountedCost: testDiscountedCost,
          reviewLength: testReviewLength,
          averageRate: testAverageRate,
        },
      });
      expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(basicUrl);
    });
  });

  describe('Product Title', () => {
    it('contains product title', async () => {
      expect(wrapper.find('[data-test="item-title"]').exists()).toBeTruthy();
    });

    it('renders product title', async () => {
      expect(wrapper.find('[data-test="item-title"]').text()).toEqual(testTitle);
    });
  });

  describe('Product Rate', () => {
    it('contains product rate', async () => {
      expect(wrapper.find('[data-test="item-averagerate"]').exists()).toBeTruthy();
    });

    it('renders product average rate', async () => {
      expect(wrapper.find('[data-test="item-averagerate"]').text()).toContain('4.6');
    });

    it('renders the number of reviews', async () => {
      expect(wrapper.find('[data-test="item-averagerate"]').text()).toContain('(3)');
    });

    it('renders average rate when it has not product review', async () => {
      await wrapper.setProps({
        item: {
          id: 1102323,
          imgUrl: testUrl,
          title: testTitle,
          cost: testCost,
          discount: testDiscountTrue,
          userRate: [],
          discountedCost: testDiscountedCost,
          reviewLength: 0,
          averageRate: '0.00',
        },
      });

      expect(wrapper.find('[data-test="item-averagerate"]').text()).toContain('0.00');
      expect(wrapper.find('[data-test="item-averagerate"]').text()).toContain('(0)');
    });
  });

  it('contains product discount info if isDiscount is True', async () => {
    expect(wrapper.find('[data-test="item-discount-rate"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="item-origin-cost"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
  });

  it('renders product discount info if isDiscount is True', async () => {
    expect(wrapper.find('[data-test="item-origin-cost"]').text()).toEqual('30,000원');
    expect(wrapper.find('[data-test="item-discount-rate"]').text()).toEqual('10%');
    expect(wrapper.find('[data-test="item-discounted-cost"]').text()).toEqual('27,000원');
  });

  it('contains product discount info if isDiscount is False', async () => {
    await wrapper.setProps({
      item: {
        id: 1102323,
        imgUrl: testUrl,
        title: testTitle,
        cost: testCost,
        discount: testDiscountFalse,
        userRate: testUserRate,
        discountedCost: testDiscountedCost,
        reviewLength: testReviewLength,
        averageRate: testAverageRate,
      },
    });

    expect(wrapper.find('[data-test="item-discount-rate"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="item-origin-cost"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
  });
});
