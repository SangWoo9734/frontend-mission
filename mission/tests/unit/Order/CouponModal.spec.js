import { mount } from '@vue/test-utils';

import CouponModal from '@/components/Order/CouponModal.vue';

let wrapper;
const testCoupon = [
  {
    couponId: 1234123,
    name: '2월 3000원 할인 쿠폰',
    price: 3000,
  },
];

describe('Coupon Modal', () => {
  beforeEach(() => {
    wrapper = mount(CouponModal);
  });

  it('renders Coupon Modal', () => {
    expect(wrapper.find('#couponModal').exists()).toBeTruthy();
  });

  it('renders title as "쿠폰함"', () => {
    expect(wrapper.find('[data-test="modal-title"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="modal-title"]').text()).toEqual('쿠폰함');
  });

  it('renders coupons', async () => {
    await wrapper.setProps({
      couponList: testCoupon,
    });

    expect(wrapper.find('[data-test="coupon"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="coupon-title"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="coupon-apply"]').exists()).toBeTruthy();
  });

  it('renders Coupon Modal', () => {
    expect(wrapper.find('[data-test="close"]').exists()).toBeTruthy();
  });

  it('pass discount value with $emit', async () => {
    await wrapper.setProps({
      couponList: testCoupon,
    });

    await wrapper.find('[data-test="coupon-apply"]').trigger('click');

    expect(wrapper.emitted().applyCoupon[0]).toEqual([testCoupon[0].price]);
  });

  it('called $emit when press close button', async () => {
    await wrapper.setProps({
      couponList: testCoupon,
    });

    await wrapper.find('[data-test="coupon-apply"]').trigger('click');

    expect(wrapper.emitted('couponModalToggle')).toBeTruthy();
  });
});
