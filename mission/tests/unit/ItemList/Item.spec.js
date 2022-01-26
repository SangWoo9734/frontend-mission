import { shallowMount } from '@vue/test-utils';
import Item from '@/components/ItemList/Item.vue';

describe('Item', () => {
  const testUrl = 'www.google.com';
  const testTitle = 'TestTitle';
  const testCost = 30000;
  const testDiscountTrue = { isDiscount: true, rate: 10 };
  const testDiscountFalse = { isDiscount: false, rate: 0 };
  const testDiscountedCost = 27000;
  const testReviewLength = 3;
  const testAverageRate = '4.6';
  const isNewFalse = false;
  const isNewTrue = true;

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Item, {
      propsData: {
        imgUrl: testUrl,
        title: testTitle,
        cost: testCost,
        isDiscount: testDiscountTrue.isDiscount,
        discountRate: testDiscountTrue.rate,
        discountedCost: testDiscountedCost,
        reviewLength: testReviewLength,
        averageRate: testAverageRate,
        isNew: isNewFalse,
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
      expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(testUrl);
    });

    it('renders "No image"', async () => {
      const basicUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nOAglpmejsvQmil3kr19lwURHplsMvhv5A&usqp=CAU';
      await wrapper.setProps({
        imgUrl: '',
      });
      expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(basicUrl);
    });
  });

  describe('Item Title', () => {
    it('contains product title', async () => {
      expect(wrapper.find('[data-test="item-title"]').exists()).toBeTruthy();
    });

    it('renders product title', async () => {
      expect(wrapper.find('[data-test="item-title"]').text()).toEqual(testTitle);
    });
  });

  describe('Item Rate', () => {
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
        reviewLength: 0,
        averageRate: '0.00',
      });

      expect(wrapper.find('[data-test="item-averagerate"]').text()).toContain('0.00');
      expect(wrapper.find('[data-test="item-averagerate"]').text()).toContain('(0)');
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
        isDiscount: testDiscountFalse.isDiscount,
        discountRate: testDiscountFalse.rate,
      });

      expect(wrapper.find('[data-test="item-discount-rate"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test="item-origin-cost"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
    });

    it('contains "new" bedge that item uploaded within 7 days', async () => {
      await wrapper.setProps({
        isNew: isNewTrue,
      });

      expect(wrapper.find('[data-test="item-new"]').exists()).toBeTruthy();
    });

    it('Products that have been uploaded 7 days ago do not include badges.', async () => {
      await wrapper.setProps({
        isNew: isNewFalse,
      });

      expect(wrapper.find('[data-test="item-new"]').exists()).toBeFalsy();
    });
  });
});
