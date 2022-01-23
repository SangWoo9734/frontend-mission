import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import TheHeader from '@/components/ItemCommon/TheHeader.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductImage from '@/components/ProductImage.vue';
import ProductSeller from '@/components/ProductSeller.vue';
import ProductCost from '@/components/ProductCost.vue';
import ProductDescription from '@/components/ProductDescription.vue';
import ProductReview from '@/components/ProductReview.vue';
import ProductReviewDetail from '@/components/ProductReviewDetail.vue';
import ProductBuy from '@/components/ProductBuy.vue';

let wrapper;

const testData = {
  product: {
    id: 1102323,
    imgUrl: 'https://image.msscdn.net/images/goods_img/20190923/1163605/1163605_2_500.jpg',
    descriptionHTML:
      '<h1>Hello. NIKE.</h1><p>This is NIKE Sweater</p><p>보다 저렴한 가격으로 만나보실 수 있습니다.</p>',
    title: 'NIKE F/W Sweater',
    cost: 30000,
    discount: { isDiscount: true, rate: 15 },
  },
  seller: {
    userName: 'NIKE Offical',
    imgUrl: 'https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg',
    tag: ['스포츠', '러닝', '기능성'],
  },
  reviews: [
    {
      id: 0,
      userImg: 'https://seeklogo.com/images/S/starbucks-logo-BFBFE6C3A3-seeklogo.com.png',
      reviewImg:
        'https://static.coupangcdn.com/image/vendor_inventory/f1b3/4a0c1ccb435200d7cc52e33f158cf100b4bfa35800ef96bacecc5a36488b.jpg',
      userNickname: '스타벅스',
      rate: 4.5,
      text: '사이즈가 아주 잘 맞습니다. 컬러도 사진과 아주 유사합니다. 만족스럽습니다',
    },
    {
      id: 1,
      userImg: 'https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg',
      reviewImg: 'https://image.msscdn.net/images/goods_img/20190923/1163133/1163133_1_500.jpg',
      userNickname: '아디다스',
      rate: 4.25,
      text: '원하던 디자인이어서 만족스럽습니다',
    },
  ],
};

describe('ItemInfoPage', () => {
  it('renders ItemInfoPage', () => {
    wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });
});

describe('TheHeader', () => {
  beforeEach(() => {
    wrapper = mount(TheHeader);
  });

  it('contains navigation bar', () => {
    expect(wrapper.find('#header').exists()).toBe(true);
  });
});

describe('ProductInfo', () => {
  describe('ProductImage', () => {
    it('contains product image', () => {
      wrapper = mount(ProductImage);

      expect(wrapper.find('#product-image').exists()).toBe(true);
    });
  });

  describe('ProductSeller', () => {
    beforeEach(() => {
      wrapper = mount(ProductSeller, {
        propsData: {
          seller: testData.seller,
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
      expect(wrapper.find('[data-test="user-tag"]').text()).toEqual('#스포츠#러닝#기능성');
    });
  });

  describe('Product Title', () => {
    beforeEach(() => {
      wrapper = mount(ProductInfo, {
        propsData: {
          productData: testData,
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
        propsData: {
          cost: testData.product.cost,
          discount: testData.product.discount,
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
    it('show discounted cost if discount rate is not 0', () => {
      expect(wrapper.vm.applyDiscount).toEqual(25500);
    });
    it('changes origin cost format of cost with ","', () => {
      expect(wrapper.find('[data-test="product-cost-origin"]').text()).toEqual('30,000원');
    });
    it('changes discounted cost format of cost with ","', () => {
      expect(wrapper.find('[data-test="product-cost-discounted"]').text()).toEqual('25,500원');
    });
  });

  describe('ProductDescription', () => {
    beforeEach(() => {
      wrapper = mount(ProductDescription, {
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
        propsData: {
          userReviews: testData.reviews,
        },
      });
    });

    it('contains average review rate', () => {
      expect(wrapper.find('#average-rate').exists()).toBe(true);
    });
    it('contains right length of reviews', () => {
      expect(wrapper.findAll('#product-review-content').length).toBe(2);
    });
    it('contains right average review rate', () => {
      expect(wrapper.find('#average-rate').text()).toContain('4.38');
    });
  });

  describe('ProductReviewDetail', () => {
    beforeEach(() => {
      wrapper = mount(ProductReviewDetail, {
        propsData: {
          review: testData.reviews[0],
        },
      });
    });

    it('contains reviewer image', () => {
      expect(wrapper.find('[data-test="user-image"]').exists()).toBe(true);
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
  beforeEach(() => {
    wrapper = mount(ProductBuy, {
      propsData: {
        cost: testData.product.cost,
        discount: testData.product.discount,
      },
    });
  });
  it('contains "구매" button', () => {
    expect(wrapper.find('#btn-buy').exists()).toBe(true);
  });
  it('contains "장바구니" button', () => {
    expect(wrapper.find('#btn-cart').exists()).toBe(true);
  });
  it('contains discounted cost of product', () => {
    expect(wrapper.vm.applyDiscount).toEqual(25500);
  });
  it('contains right format of cost that includes ","', () => {
    expect(wrapper.find('#btn-buy p').text()).toContain('25,500');
  });
});
