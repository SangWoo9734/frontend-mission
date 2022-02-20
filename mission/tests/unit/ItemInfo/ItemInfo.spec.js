import { flushPromises, mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import ProductInfo from '@/components/ItemInfo/ProductInfo.vue';
import ProductImage from '@/components/ItemInfo/ProductImage.vue';
import ProductSeller from '@/components/ItemInfo/ProductSeller.vue';
import ProductCost from '@/components/ItemInfo/ProductCost.vue';
import ProductDescription from '@/components/ItemInfo/ProductDescription.vue';
import ProductReview from '@/components/ItemInfo/ProductReview.vue';
import ProductReviewDetail from '@/components/ItemInfo/ProductReviewDetail.vue';
import ItemModal from '@/components/ItemInfo/ItemModal.vue';
import ItemInfo from '@/views/ItemInfo.vue';

import ItemAPI from '@/repositories/ItemRepository';
import cartStore from '@/store/modules/cartStore';

let wrapper;

const testData = {
  id: 'psu8430',
  image: 'https://image.msscdn.net/images/goods_img/20190923/1163605/1163605_2_500.jpg',
  description:
    '<h1>Hello. NIKE.</h1><p>This is NIKE Sweater</p><p>보다 저렴한 가격으로 만나보실 수 있습니다.</p>',
  name: 'NIKE F/W Sweater',
  originalPrice: 30000,
  price: 20000,
  seller: {
    name: 'NIKE Offical',
    profile_image: 'https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg',
    hash_tags: ['스포츠', '러닝', '기능성'],
  },
  reviews: [
    {
      id: 0,
      image: 'https://seeklogo.com/images/S/starbucks-logo-BFBFE6C3A3-seeklogo.com.png',
      reviewImg:
        'https://static.coupangcdn.com/image/vendor_inventory/f1b3/4a0c1ccb435200d7cc52e33f158cf100b4bfa35800ef96bacecc5a36488b.jpg',
      writer: '스타벅스',
      likesCount: 7,
      created: '2022-01-01',
      title: '사이즈가 아주 잘 맞습니다. 컬러도 사진과 아주 유사합니다. 만족스럽습니다',
    },
  ],
};

const response = {
  data: { item: testData },
};

const store = createStore({
  modules: {
    cart: cartStore,
  },
});

ItemAPI.getItemInfo = jest.fn().mockResolvedValue(response);

describe('ItemInfoPage', () => {
  beforeEach(() => {
    wrapper = mount(ItemInfo, {
      global: {
        plugins: [store],
      },
    });
  });

  it('renders ItemInfoPage', async () => {
    await wrapper.setData({
      itemInfo: testData,
      loading: false,
    });
    expect(wrapper.find('#item-info-page').exists()).toBeTruthy();
  });

  it('ItemAPI was called', async () => {
    await flushPromises();

    expect(ItemAPI.getItemInfo).toHaveBeenCalled();
  });

  it('render loading when loading state is false', async () => {
    await wrapper.setData({
      itemInfo: testData,
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

describe('ProductInfo', () => {
  describe('ProductImage', () => {
    it('contains product image', () => {
      wrapper = mount(ProductImage, {
        global: {
          plugins: [store],
        },
      });

      expect(wrapper.find('#product-image').exists()).toBe(true);
    });
  });

  describe('ProductSeller', () => {
    beforeEach(() => {
      wrapper = mount(ProductSeller, {
        global: {
          plugins: [store],
        },
        propsData: {
          hash_tags: testData.seller.hash_tags,
          name: testData.seller.name,
          profile_image: testData.seller.profile_image,
        },
      });
    });

    it('contains user image', () => {
      expect(wrapper.find('[data-test="user-image"]').exists()).toBe(true);
    });
    it('contains user name', () => {
      expect(wrapper.find('[data-test="user-name"]').exists()).toBe(true);
    });
    it('contains user tag', () => {
      expect(wrapper.find('[data-test="user-tag"]').exists()).toBe(true);
    });
    it('add "#" front of each tag', () => {
      expect(wrapper.find('[data-test="user-tag"]').text()).toEqual('#스포츠 #러닝 #기능성');
    });
  });

  describe('Product Title', () => {
    beforeEach(() => {
      wrapper = mount(ProductInfo, {
        global: {
          plugins: [store],
        },
        propsData: {
          item_name: testData.name,
        },
      });
    });

    it('contains product title', () => {
      expect(wrapper.find('[data-test="product-title"]').exists()).toBe(true);
    });
    it('renders product title', async () => {
      expect(wrapper.find('[data-test="product-title"]').text()).toEqual('NIKE F/W Sweater');
    });
  });

  describe('ProductCost', () => {
    beforeEach(() => {
      wrapper = mount(ProductCost, {
        global: {
          plugins: [store],
        },
        propsData: {
          originalPrice: testData.originalPrice,
          price: testData.price,
        },
      });
    });
    it('contains discount rate', () => {
      expect(wrapper.find('[data-test="product-discount-rate"]').exists()).toBe(true);
    });
    it('contains original cost', () => {
      expect(wrapper.find('[data-test="product-cost-origin"]').exists()).toBe(true);
    });
    it('contains discounted cost', () => {
      expect(wrapper.find('[data-test="product-cost-discounted"]').exists()).toBe(true);
    });
    it('changes origin cost format of cost with ","', () => {
      expect(wrapper.find('[data-test="product-cost-origin"]').text()).toEqual('30,000원');
    });
    it('changes discounted cost format of cost with ","', () => {
      expect(wrapper.find('[data-test="product-cost-discounted"]').text()).toEqual('20,000원');
    });
  });

  describe('ProductDescription', () => {
    beforeEach(() => {
      wrapper = mount(ProductDescription, {
        global: {
          plugins: [store],
        },
        propsData: {
          description: '<p>Test Description</p>',
        },
      });
    });

    it('contains product description', () => {
      expect(wrapper.find('[data-test="product-desription"]').exists()).toBe(true);
    });

    it('renders right product description', () => {
      expect(wrapper.find('[data-test="product-desription"]').text()).toEqual('Test Description');
    });
  });

  describe('ProductReview', () => {
    beforeEach(() => {
      wrapper = mount(ProductReview, {
        global: {
          plugins: [store],
        },
        propsData: {
          user_review: [{ id: '11' }],
        },
      });
    });

    it('contains right length of reviews', () => {
      expect(wrapper.findAll('#product-review-content').length).toBe(1);
    });
  });

  describe('ProductReviewDetail', () => {
    beforeEach(() => {
      wrapper = mount(ProductReviewDetail, {
        global: {
          plugins: [store],
        },
        propsData: {
          content: testData.reviews.content,
          created: testData.reviews.created,
          image: testData.reviews.image,
          likesCount: testData.reviews.likesCount,
          title: testData.reviews.title,
          writer: testData.reviews.writer,
        },
      });
    });

    it('contains reviewer nickname', () => {
      expect(wrapper.find('[data-test="user-nickname"]').exists()).toBe(true);
    });
    it('contains reviewer comment', () => {
      expect(wrapper.find('#product-review-comment').exists()).toBe(true);
    });
    it('contains reviewer react', () => {
      expect(wrapper.find('#product-review-react').exists()).toBe(true);
    });
    it('contains review image', () => {
      expect(wrapper.find('#product-review-image').exists()).toBe(true);
    });
  });
});

describe('Product Buy', () => {
  beforeEach(async () => {
    wrapper = mount(ItemInfo, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.setData({
      itemInfo: testData,
      loading: false,
    });
  });
  it('contains "구매" button', () => {
    expect(wrapper.find('#btn-buy').exists()).toBe(true);
  });

  it('add item in cartItem when user press "구매" button', async () => {
    cartStore.actions.AC_ADD_ITEM_IN_CART = jest.fn();

    const buyDirect = jest.fn().mockImplementation(
      () => cartStore.actions.AC_ADD_ITEM_IN_CART(),
    );
    const getItemInfo = jest.fn();

    wrapper = mount(ItemInfo, {
      global: {
        plugins: [store],
      },
      methods: {
        buyDirect,
        getItemInfo,
      },
    });

    await wrapper.setData({
      itemInfo: testData,
      loading: false,
    });

    await wrapper.find('#btn-buy').trigger('click');

    expect(buyDirect).toHaveBeenCalledTimes(1);
    expect(cartStore.actions.AC_ADD_ITEM_IN_CART).toHaveBeenCalledTimes(1);
  });

  it('move cart when click "장바구니 이동"', async () => {
    expect(wrapper.find('[data-test="move-order"]').html()).toContain('to="/order"');
  });

  it('contains "장바구니" button', () => {
    expect(wrapper.find('#btn-cart').exists()).toBe(true);
  });

  it('contains right format of cost that includes ","', () => {
    expect(wrapper.find('#btn-buy p').text()).toContain('20,000');
  });

  it('add item in cartItem when user press "장바구니 담기" button', async () => {
    cartStore.actions.AC_ADD_ITEM_IN_CART = jest.fn();

    const addItemInCart = jest.fn().mockImplementation(
      () => cartStore.actions.AC_ADD_ITEM_IN_CART(),
    );
    const getItemInfo = jest.fn();

    wrapper = mount(ItemInfo, {
      global: {
        plugins: [store],
      },
      methods: {
        addItemInCart,
        getItemInfo,
      },
    });

    await wrapper.setData({
      itemInfo: testData,
      loading: false,
    });

    await wrapper.find('#btn-cart').trigger('click');

    expect(addItemInCart).toHaveBeenCalledTimes(1);
    expect(cartStore.actions.AC_ADD_ITEM_IN_CART).toHaveBeenCalledTimes(1);
  });
});

describe('Item Modal', () => {
  beforeEach(async () => {
    wrapper = mount(ItemInfo, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.setData({
      itemInfo: testData,
      loading: false,
    });
  });

  it('renders modal when modal state is true', async () => {
    await wrapper.setData({
      modalState: false,
    });
    expect(wrapper.findComponent(ItemModal).exists()).toBeFalsy();
  });

  it('renders modal when modal state is true', async () => {
    await wrapper.setData({
      modalState: true,
    });
    expect(wrapper.findComponent(ItemModal).exists()).toBeTruthy();
  });
});
