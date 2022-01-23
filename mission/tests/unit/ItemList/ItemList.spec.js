import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemList.vue';

let wrapper;

describe('ItemListPage', () => {
  beforeEach(() => {
    wrapper = mount(ItemInfoPage);
  });

  it('renders ItemListPage', () => {
    expect(wrapper.find('#item-list-page').exists()).toBeTruthy();
  });

  describe('Header', () => {
    it('contains header', () => {
      expect(wrapper.find('#header').exists()).toBeTruthy();
    });

    it('renders header titles', () => {
      expect(wrapper.find('[data-test="header"]').text()).toEqual('🦁 LionAbly');
    });
  });

  describe('Item Sort', () => {
    it('contiains sort points', () => {
      expect(wrapper.find('[data-test="sort-btn"]').exists()).toBeTruthy();
    });

    it('renders several buttons', async () => {
      await wrapper.setData({
        sortPoint: ['기준 1', '기준 2', '기준 3'],
      });

      expect(wrapper.findAll('.sort-btn').length).toBe(4);
    });

    it('renders button name with each points', async () => {
      await wrapper.setData({
        sortPoint: ['기준 1', '기준 2', '기준 3'],
      });

      expect(wrapper.find('[data-test="sort-btn"]').text()).toBe('정렬  # 기준 1 # 기준 2 # 기준 3');
    });
  });

  describe('Item List', () => {
    it('contains item list', () => {
      expect(wrapper.find('[data-test="item-list"]').exists()).toBeTruthy();
    });
  });

  describe('Navigation Bar', () => {
    it('renders navbar', () => {
      expect(wrapper.find('#navigation').exists()).toBeTruthy();
    });

    it('contains 4 buttons', () => {
      expect(wrapper.findAll('.navigation-btn').length).toBe(4);
    });

    it('renders 4 buttons', () => {
      const buttonContents = ['Home', 'Like', 'Cart', 'My Page'];
      const buttons = wrapper.findAll('.navigation-button');

      buttons.forEach((b, i) => {
        expect(b.text()).toEqual(buttonContents[i]);
      });
    });
  });
});
