import { mount } from '@vue/test-utils';
import ProductBuy from '@/components/ProductBuy.vue';

describe('Components', () => {
    it('contains "장바구니" button', () => {
        const wrapper = mount(ProductBuy);

        expect(wrapper.find('#btn-cart').exists()).toBe(true);
    })
    it('contains "바로 구매" button', () => {
        const wrapper = mount(ProductBuy);

        expect(wrapper.find('#btn-buy').exists()).toBe(true);
    })
})