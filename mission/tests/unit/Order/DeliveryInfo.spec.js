import { mount } from '@vue/test-utils';

import Delivery from '@/components/Order/DeliveryInfo.vue';

let wrapper;

describe('Delivery Info', () => {
  beforeEach(() => {
    wrapper = mount(Delivery);
  });

  it('renders Delivery Information', () => {
    expect(wrapper.find('#deliveryInfo').exists()).toBeTruthy();
  });

  it('renders part title with "수령인"', () => {
    expect(wrapper.find('[data-test="delivery-user"]').exists()).toBeTruthy();
  });

  it('renders input tag of "전화번호"', () => {
    expect(wrapper.find('[data-test="delivery-user-input"]').exists()).toBeTruthy();
  });

  it('renders part title with "전화번호"', () => {
    expect(wrapper.find('[data-test="delivery-call"]').exists()).toBeTruthy();
  });

  it('renders input tag of "전화번호"', () => {
    expect(wrapper.find('[data-test="delivery-call-input"]').exists()).toBeTruthy();
  });

  it('renders part title with "배송지"', () => {
    expect(wrapper.find('[data-test="delivery-address"]').exists()).toBeTruthy();
  });

  it('renders input tag of "배송지"', () => {
    expect(wrapper.find('[data-test="delivery-address-input"]').exists()).toBeTruthy();
  });

  it('renders input tag of "주소찾기"', () => {
    expect(wrapper.find('[data-test="delivery-address-btn"]').exists()).toBeTruthy();
  });

  it('renders input tag of "세부 배송지"', () => {
    expect(wrapper.find('[data-test="delivery-address-detail"]').exists()).toBeTruthy();
  });

  it('renders part title with "배송요청사항"', () => {
    expect(wrapper.find('[data-test="delivery-message"]').exists()).toBeTruthy();
  });

  it('renders select tag of "배송요청사항"', () => {
    expect(wrapper.find('[data-test="delivery-message-select"]').exists()).toBeTruthy();
  });

  it('renders input tag when user selects "직접입력"', async () => {
    await wrapper.setData({
      userInput: true,
    });
    expect(wrapper.find('[data-test="delivery-message-input"]').exists()).toBeTruthy();
  });

  it('renders input tag when user does not select "직접입력"', async () => {
    await wrapper.setData({
      userInput: false,
    });
    expect(wrapper.find('[data-test="delivery-message-input"]').exists()).toBeFalsy();
  });

  it('renders part title with ""', () => {
    expect(wrapper.find('[data-test="delivery-call"]').exists()).toBeTruthy();
  });

  it('renders input tag of ""', () => {
    expect(wrapper.find('[data-test="delivery-call-input"]').exists()).toBeTruthy();
  });
});
