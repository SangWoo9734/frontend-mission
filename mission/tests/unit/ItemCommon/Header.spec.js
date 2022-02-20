import { mount } from '@vue/test-utils';
import Header from '@/components/ItemCommon/TheHeader.vue';

let wrapper;

describe('Header', () => {
  beforeEach(() => {
    wrapper = mount(Header);
  });
  it('contains header', () => {
    expect(wrapper.find('#header').exists()).toBeTruthy();
  });

  it('renders header titles', () => {
    expect(wrapper.find('[data-test="header"]').text()).toEqual('🦁 LionAbly');
  });
});
