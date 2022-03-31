import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import ProductListInfo from '@/components/Order/ProductListInfo.vue';
import CouponModal from '@/components/Order/CouponModal.vue';

import cartStore from '@/store/modules/cartStore';

let wrapper;

const testData = [
  {
    image: 'image1',
    name: 'item1',
    quantity: 1,
    original_price: 10000,
    price: 10000,
  },
  {
    image: 'image1',
    name: 'item2',
    quantity: 2,
    original_price: 20000,
    price: 12000,
  },
];

const store = createStore({
  state: {
    arr: 1,
  },
  mutaitions: {
    addArr: (state) => {
      state.arr += 1;
    },
  },
  actions: {
    ac_addArr: ({ commit }) => {
      commit('addArr');
    },
  },
  modules: {
    cart: cartStore,
  },
});

describe('ProductListInfo', () => {
  it('render Product list info component', () => {
    wrapper = mount(ProductListInfo, {
      global: {
        plugins: [store],
      },
      propsData: {
        orderItems: testData,
      },
    });

    expect(wrapper.find('#productListInfo').exists()).toBeTruthy();
  });

  describe('When items is not NULL', () => {
    beforeEach(() => {
      wrapper = mount(ProductListInfo, {
        global: {
          plugins: [store],
        },
        propsData: {
          orderItems: [],
        },
      });
    });

    it('renders product table', () => {
      expect(wrapper.find('[data-test="order-product-table"]').exists()).toBeTruthy();
    });

    it('renders No-items row', () => {
      expect(wrapper.find('[data-test="no-item"]').exists()).toBeTruthy();
    });

    it('does not renders rows when item data is NULL.', () => {
      expect(wrapper.findAll('[data-test="order-table-row"]').length).toEqual(0);
    });

    it('render total number of item', () => {
      expect(wrapper.find('[data-test="order-product-totalCount"]').exists()).toBeTruthy();
    });

    it('renders right total number of item', () => {
      expect(wrapper.find('[data-test="order-product-totalCount"]').text()).toContain('0');
    });

    it('render total price', () => {
      expect(wrapper.find('[data-test="order-product-totalPrice"]').exists()).toBeTruthy();
    });

    it('render right number of totalPrice when there is no item', () => {
      expect(wrapper.find('[data-test="order-product-discounting"]').text()).toContain('0');
    });

    it('render total discounting price', () => {
      expect(wrapper.find('[data-test="order-product-discounting"]').exists()).toBeTruthy();
    });

    it('render right cost of total discounting price when there is no item', () => {
      expect(wrapper.find('[data-test="order-product-discounting"]').text()).toContain('0');
    });

    it('render coupon information', () => {
      expect(wrapper.find('[data-test="order-coupon-info"]').exists()).toBeTruthy();
    });

    it('render final price', () => {
      expect(wrapper.find('[data-test="order-product-finalPrice"]').exists()).toBeTruthy();
    });

    it('render right cost of final price when there is no item', () => {
      expect(wrapper.find('[data-test="order-product-finalPrice"]').text()).toContain('0');
    });
  });

  describe('When items is not NULL', () => {
    beforeEach(async () => {
      // 직접 state에 접근하는 것 보다 initCart로 불러오는 것이 더 적절해보임
      // 구현 실패중
      cartStore.state.cartItem = testData;

      wrapper = mount(ProductListInfo, {
        global: {
          plugins: [store],
        },
        propsData: {
          orderItems: testData,
        },
      });

      await wrapper.setData({
        additionalDiscount: 0,
      });
    });

    it('renders product table', () => {
      expect(wrapper.find('[data-test="order-product-table"]').exists()).toBeTruthy();
    });

    it('renders as many rows as length of items.', () => {
      expect(wrapper.findAll('[data-test="order-table-row"]').length).toEqual(testData.length);
    });

    it('render total number of item', () => {
      expect(wrapper.find('[data-test="order-product-totalCount"]').exists()).toBeTruthy();
    });

    it('renders right total number of item', () => {
      expect(wrapper.find('[data-test="order-product-totalCount"]').text()).toContain('3');
    });
    it('render total price', () => {
      expect(wrapper.find('[data-test="order-product-totalPrice"]').exists()).toBeTruthy();
    });

    it('renders right number of totalPrice', () => {
      expect(wrapper.find('[data-test="order-product-totalPrice"]').text()).toContain('50,000');
    });

    it('render total discounting price', () => {
      expect(wrapper.find('[data-test="order-product-discounting"]').exists()).toBeTruthy();
    });

    it('render right cost of total discounting price', () => {
      expect(wrapper.find('[data-test="order-product-discounting"]').text()).toContain('16,000');
    });

    it('render coupon information', () => {
      expect(wrapper.find('[data-test="order-coupon-info"]').exists()).toBeTruthy();
    });

    it('render final price', () => {
      expect(wrapper.find('[data-test="order-product-finalPrice"]').exists()).toBeTruthy();
    });

    it('render right cost of final price', async () => {
      expect(wrapper.find('[data-test="order-product-finalPrice"]').text()).toContain('34,000');
    });
  });

  describe('Test rows', () => {
    wrapper = mount(ProductListInfo, {
      global: {
        plugins: [store],
      },
      propsData: {
        orderItems: [testData[0]],
        totalFinalPrice: 34000,
      },
    });

    it('renders item image', () => {
      expect(wrapper.find('[data-test="item-image"]').exists()).toBeTruthy();
    });
    it('renders right item image', () => {
      expect(wrapper.find('[data-test="item-image"]').attributes().src).toEqual(testData[0].image);
    });

    it('renders item name', () => {
      expect(wrapper.find('[data-test="item-name"]').exists()).toBeTruthy();
    });
    it('renders right item name', () => {
      expect(wrapper.find('[data-test="item-name"]').text()).toEqual(testData[0].name);
    });

    it('renders item quantity', () => {
      expect(wrapper.find('[data-test="item-quantity"]').exists()).toBeTruthy();
    });
    it('renders right item quantity', () => {
      expect(wrapper.find('[data-test="item-quantity"]').text()).toContain(testData[0].quantity);
    });

    it('renders item originalPrice', () => {
      expect(wrapper.find('[data-test="item-originalPrice"]').exists()).toBeTruthy();
    });
    it('renders right item originalPrice', () => {
      const expectResult = testData[0].original_price.toLocaleString('ko-KR');

      expect(wrapper.find('[data-test="item-originalPrice"]').text()).toContain(expectResult);
    });

    it('renders item price', () => {
      expect(wrapper.find('[data-test="item-price"]').exists()).toBeTruthy();
    });
    it('renders right item price', () => {
      const expectResult = testData[0].price.toLocaleString('ko-KR');

      expect(wrapper.find('[data-test="item-price"]').text()).toContain(expectResult);
    });
  });

  describe('Test Coupon Modal', () => {
    it('call Coupon modal when user press Coupon button', async () => {
      await wrapper.setData({
        modalState: false,
      });

      await wrapper.find('[data-test="coupon-btn"]').trigger('click');

      expect(wrapper.findComponent(CouponModal).exists()).toBeTruthy();
    });
  });
});
