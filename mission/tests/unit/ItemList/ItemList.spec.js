import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ItemInfoPage from '@/views/ItemList.vue';

library.add(fas, far);

let wrapper;

const testData = [
  {
    id: 1102321,
    imgUrl: '',
    title: 'A',
    cost: 30000,
    discount: { isDiscount: true, rate: 15 },
    userRate: [4.8, 4.3, 4.1, 4.5, 4.7],
    uploadDate: '2022-01-02',
  },
  {
    id: 1102320,
    imgUrl: '',
    title: 'B',
    cost: 12000,
    discount: { isDiscount: true, rate: 10 },
    userRate: [4.4, 4.2, 3.7],
    uploadDate: '2022-01-01',
  },
  {
    id: 1102325,
    imgUrl: '',
    title: 'C',
    cost: 89000,
    discount: { isDiscount: false, rate: 0 },
    userRate: [4.6, 4.5],
    uploadDate: '2022-01-15',
  },
];

describe('ItemList', () => {
  beforeEach(() => {
    wrapper = mount(ItemInfoPage, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });
  });

  it('renders ItemListPage', () => {
    expect(wrapper.find('#item-list-page').exists()).toBeTruthy();
  });

  it('render each items', async () => {
    await wrapper.setData({
      itemData: testData,
    });

    const allItems = wrapper.findAllComponents('[data-test="item"]');

    expect(allItems.length).toEqual(testData.length);

    allItems.forEach((item) => {
      expect(item.exists()).toBeTruthy();
    });
  });

  it('render each items', async () => {
    await wrapper.setData({
      itemData: testData,
    });

    const allItems = wrapper.findAllComponents('[data-test="item"]');

    allItems.forEach((item) => {
      expect(item.find('[data-test="item-image"]').exists()).toBeTruthy();
      expect(item.find('[data-test="item-title"]').exists()).toBeTruthy();
      expect(item.find('[data-test="item-averagerate"]').exists()).toBeTruthy();
      expect(item.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
    });
  });
});
