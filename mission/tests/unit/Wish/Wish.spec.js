import { flushPromises, mount } from '@vue/test-utils';
import Wish from '@/views/Wish.vue';
import WishAPI from '@/repositories/WishRepository';

const wishData = [
  {
    product_no: 'abce123',
    name: '핏이 좋은 수트',
    image: 'https://projectlion-vue.s3.ap-northeast-2.amazonaws.com/items/suit-1.png',
    price: 198000,
    original_price: 298000,
    description: '아주 잘 맞는 수트',
  },
];

const response = {
  data: { items: wishData },
};

WishAPI.getWish = jest.fn().mockResolvedValue(response);

let wrapper;

describe('Cart.vue', () => {
  beforeEach(async () => {
    wrapper = mount(Wish);

    await wrapper.setData({
      loading: false,
    });
  });

  it('renders Wish', () => {
    expect(wrapper.find('#wish').exists()).toBeTruthy();
  });

  it('called Wish API', async () => {
    await flushPromises();

    expect(WishAPI.getWish).toHaveBeenCalled();
  });

  it('render page title', () => {
    expect(wrapper.find('[data-test="wish-title"]').exists()).toBeTruthy();
  });

  it('render page title', () => {
    expect(wrapper.find('[data-test="wish-count"]').exists()).toBeTruthy();
  });

  it('renders number of wish list', async () => {
    await wrapper.setData({
      wish: ['item1', 'item2', 'item3'],
    });

    expect(wrapper.find('[data-test="wish-count"]').text()).toContain(3);
  });

  it('renders number of wish list when list is empty', async () => {
    await wrapper.setData({
      wish: [],
    });

    expect(wrapper.find('[data-test="wish-count"]').text()).toContain(0);
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
