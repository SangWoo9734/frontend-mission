import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductImage from '@/components/ProductImage.vue';
import ProductSeller from '@/components/ProductSeller.vue';
import ProductCost from '@/components/ProductCost.vue';
import ProductBuy from '@/components/ProductBuy.vue';

describe('ItemInfoPage', () => {
  it('renders ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });
});

describe('TheNavbar', () => {
  it('contains menu button', () => {
    const wrapper = mount(TheNavbar);

    expect(wrapper.find('#navigation button').exists()).toBe(true);
  })
})

describe('ProductInfo', () => {
  describe('ProductImage', () => {
    it('contains product image', () => {
        const wrapper = mount(ProductImage);

        expect(wrapper.find('#product-image').exists()).toBe(true)
    });
  })
  describe('ProductSeller', () => {
      it('contains user image', ()=> {
        const wrapper = mount(ProductSeller);

        expect(wrapper.find('[data-test="user-image"]').exists()).toBe(true);
      });
      it('contains user name', ()=> {
        const wrapper = mount(ProductSeller);

        expect(wrapper.find('[data-test="user-name"]').exists()).toBe(true);
      });
      it('contains user tag', ()=> {
        const wrapper = mount(ProductSeller);

        expect(wrapper.find('[data-test="user-name"]').exists()).toBe(true);
      });
      it('add "#" front of each tag', async () => {
        const wrapper = mount(ProductSeller);

        await wrapper.setData({
          tag: ['스포츠', '러닝', '기능성'],
        })

        expect(wrapper.vm.tagWithHashtag).toEqual(['#스포츠', '#러닝', '#기능성']);
      })
  });
  describe('ProductCost', () => {
    it('contains discount rate', () => {
      const wrapper = mount(ProductCost);

      expect(wrapper.find('[data-test="product-discount-rate"]').exists()).toBe(true);
    });
    it('contains original cost', () => {
      const wrapper = mount(ProductCost);

      expect(wrapper.find('[data-test="product-cost-origin"]').exists()).toBe(true);
    });
    it('contains discounted cost', () => {
      const wrapper = mount(ProductCost);

      expect(wrapper.find('[data-test="product-cost-discounted"]').exists()).toBe(true);
    });
    it('show discounted cost if discount rate is not 0', async () =>{
      const wrapper = mount(ProductCost);

      await wrapper.setData({
        cost: 30000,
        discountRate: 15,
      });

      expect(wrapper.vm.applyDiscount).toEqual(25500);
    })
    it('changes origin cost format of cost with ","', async () => {
      const wrapper = mount(ProductCost);

      await wrapper.setValue({
        cost: 30000,
      })

      expect(wrapper.find('[data-test="product-cost-origin"]').text()).toEqual('30,000원');
    })
    it('changes discounted cost format of cost with ","', async () => {
      const wrapper = mount(ProductCost);

      await wrapper.setValue({
        cost: 30000,
      })

      expect(wrapper.find('[data-test="product-cost-discounted"]').text()).toEqual('25,500원');
    })
  })
  describe('ProductDescription', () => {
      it('contains product description', () => {
        const wrapper = mount(ProductInfo);

        expect(wrapper.find('[data-test="product-desription"]').exists()).toBe(true);
      });
  });
  describe('ProductReview', () => {
      
  });
});

describe('Product Buy', () => {
  it('contains 바로구매 button', () => {
    const wrapper = mount(ProductBuy);

    expect(wrapper.find('#btn-buy').exists()).toBe(true);
  })
  it('contains 장바구니 button', () => {
    const wrapper = mount(ProductBuy);

    expect(wrapper.find('#btn-cart').exists()).toBe(true);
  })
  // it('바로구매 button show product cost', () => {
  //   const wrapper = mount(ProductBuy);
    

  // })
})