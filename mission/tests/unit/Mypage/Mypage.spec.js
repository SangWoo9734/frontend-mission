import { flushPromises, mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import cartStore from '@/store/modules/cartStore';

import MyPage from '@/views/MyPage.vue';

import MyPageAPI from '@/repositories/UserRepository';

library.add(fas, far);

let wrapper;

const userData = {
  id: 'abcd123',
  name: 'kim',
  email: 'a123@gmail.com',
};

const response = {
  data: userData,
};

const store = createStore({
  modules: {
    cart: cartStore,
  },
});

MyPageAPI.getInfo = jest.fn().mockResolvedValue(response);

describe('My Page', () => {
  beforeEach(async () => {
    wrapper = mount(MyPage, {
      global: {
        plugins: [store],
        stubs: { FontAwesomeIcon },
      },
    });

    await wrapper.setData({
      loading: false,
    });
  });

  it('renders MyPage', async () => {
    expect(wrapper.find('#mypage').exists()).toBeTruthy();
  });

  it('called user info API', async () => {
    await flushPromises();

    expect(MyPageAPI.getInfo).toHaveBeenCalled();
  });

  it('renders user Image', () => {
    expect(wrapper.find('[data-test="user-image"]').exists()).toBeTruthy();
  });

  it('renders right image of user', async () => {
    const testUrl = 'www.test.com';
    await wrapper.setData({
      defaultImage: testUrl,
    });

    expect(wrapper.find('[data-test="user-image"]').attributes().src).toEqual(testUrl);
  });

  it('render user name', () => {
    expect(wrapper.find('[data-test="user-name"]').exists()).toBeTruthy();
  });

  it('render user nickname', () => {
    expect(wrapper.find('[data-test="user-nick"]').exists()).toBeTruthy();
  });

  it('render user email', () => {
    expect(wrapper.find('[data-test="user-email"]').exists()).toBeTruthy();
  });

  it('render tools', () => {
    expect(wrapper.find('[data-test="tools"]').exists()).toBeTruthy();
  });

  test('tools contain "결제수단 관리", "로그아웃", "설정"', () => {
    const tools = ['결제수단 관리', '로그아웃', '설정'];

    wrapper.findAll('[data-test="tools"]').forEach((tool, i) => {
      expect(tool.text()).toContain(tools[i]);
    });
  });

  it('render loading when loading state is false', async () => {
    await wrapper.setData({
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
