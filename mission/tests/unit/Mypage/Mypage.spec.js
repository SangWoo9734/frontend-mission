import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import MyPage from '@/views/MyPage.vue';

library.add(fas, far);

let wrapper;

describe('My Page', () => {
  beforeEach(() => {
    wrapper = mount(MyPage, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });
  });

  it('renders MyPage', () => {
    expect(wrapper.find('#mypage').exists()).toBeTruthy();
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
});
