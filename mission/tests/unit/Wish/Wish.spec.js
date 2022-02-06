import { mount } from '@vue/test-utils';
import Wish from '@/views/Wish.vue';

let wrapper;

describe('Cart.vue', () => {
  beforeEach(() => {
    wrapper = mount(Wish);
  });

  it('renders Wish', () => {
    expect(wrapper.find('#wish').exists()).toBeTruthy();
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
});
