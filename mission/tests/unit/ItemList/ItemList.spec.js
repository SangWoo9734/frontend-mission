import { flushPromises, mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from '@/App.vue';
import ItemList from '@/views/ItemList.vue';
import ItemInfo from '@/views/ItemInfo.vue';
import ItemAPI from '@/repositories/ItemRepository';

library.add(fas, far);

let wrapper;

const testData = [
  {
    product_no: '112',
    image: '',
    name: 'A',
    price: 20000,
    originalPrice: 30000,
    description: 'abcdef',
  },
  {
    product_no: '123',
    image: '',
    name: 'A',
    price: 20000,
    originalPrice: 30000,
    description: 'abcdef',
  },
  {
    product_no: '234',
    image: '',
    name: 'A',
    price: 20000,
    originalPrice: 30000,
    description: 'abcdef',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/item',
      component: ItemList,
    },
    {
      path: '/item/:id',
      component: ItemInfo,
    },
  ],
});

const response = {
  data: {
    items: testData,
  },
};

ItemAPI.getItems = jest.fn().mockResolvedValue(response);

describe('ItemList', () => {
  beforeEach(async () => {
    wrapper = mount(ItemList, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });

    await wrapper.setData({
      itemData: testData,
      loading: false,
    });
  });

  it('renders ItemListPage', async () => {
    await wrapper.setData({
      loading: false,
    });
    expect(wrapper.find('#item-list-page').exists()).toBeTruthy();
  });

  it('itemAPI was called', async () => {
    await flushPromises();

    expect(ItemAPI.getItems).toHaveBeenCalled();
  });

  it('routing to ItemInfo', async () => {
    const wrapperApp = mount(App, {
      global: {
        plugins: [router],
        stubs: { FontAwesomeIcon },
      },
    });

    router.push('/item');

    await router.isReady();
    await wrapperApp.find('[data-test="item"]').trigger('click');
    await flushPromises();

    expect(wrapperApp.findComponent(ItemInfo).exists()).toBeTruthy();
  });

  it('does not renders ItemListPage when loading data', async () => {
    await wrapper.setData({
      loading: true,
    });

    expect(wrapper.find('#item-list-page').exists()).toBeFalsy();
  });

  it('render each items', async () => {
    await wrapper.setData({
      itemData: testData,
      loading: false,
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
      expect(item.find('[data-test="item-discounted-cost"]').exists()).toBeTruthy();
    });
  });

  it('render loading if loading state is true', async () => {
    await wrapper.setData({
      loading: true,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBeTruthy();
  });

  it('does not renders loading if loading state is true', async () => {
    await wrapper.setData({
      loading: false,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBeFalsy();
  });
});
