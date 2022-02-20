import { mount } from '@vue/test-utils';

import CreditInfo from '@/components/Order/CreditInfo.vue';

let wrapper;

describe('CreditInfo', () => {
  beforeEach(() => {
    wrapper = mount(CreditInfo);
  });

  it('renders CreditInfo', () => {
    expect(wrapper.find('#creditInfo').exists()).toBeTruthy();
  });

  it('renders "간편 결제"', () => {
    expect(wrapper.find('[data-test="easy-pay"]').exists()).toBeTruthy();
  });

  it('renders "간편 결제" content when user select "간편 결제"', async () => {
    await wrapper.setData({
      payState: 1,
    });

    expect(wrapper.find('[data-test="normal-pay-content"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="easy-pay-content"]').exists()).toBeTruthy();
  });

  it('renders "간편 결제" card image', () => {
    expect(wrapper.find('[data-test="easy-pay-image"]').exists()).toBeTruthy();
  });

  it('renders right image of "간편 결제" card', async () => {
    const testImage = 'www.google.com';
    await wrapper.setData({
      cardImage: testImage,
    });

    expect(wrapper.find('[data-test="easy-pay-image"]').attributes().src).toEqual(testImage);
  });

  it('renders "간편 결제" card info', () => {
    expect(wrapper.find('[data-test="easy-pay-cardInfo"]').exists()).toBeTruthy();
  });

  it('renders right information of "간편 결제" card', async () => {
    const testCardInfo = 'this is card';
    await wrapper.setData({
      cardNum: testCardInfo,
    });

    expect(wrapper.find('[data-test="easy-pay-cardInfo"]').text()).toEqual(testCardInfo);
  });

  it('renders "일반 결제"', () => {
    expect(wrapper.find('[data-test="normal-pay"]').exists()).toBeTruthy();
  });

  it('renders "일반 결제" content when user select "일반 결제"', async () => {
    await wrapper.setData({
      payState: 2,
    });

    expect(wrapper.find('[data-test="easy-pay-content"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="normal-pay-content"]').exists()).toBeTruthy();
  });

  it('render menus in "일반 결제"', () => {
    const orderNormalMenu = ['신용카드', '무통장입금', '계좌이체', '휴대폰 결제'];

    wrapper.findAll('[data-test="normal-pay-menu"]').forEach((menu, i) => {
      expect(menu).toEqual(orderNormalMenu[i]);
    });
  });
});
