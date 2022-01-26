import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Navbar from '@/components/ItemList/TheNavbar.vue';

library.add(fas, far);

let wrapper;

describe('Navigation Bar', () => {
  beforeEach(() => {
    wrapper = mount(Navbar, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });
  });

  it('renders navbar', () => {
    expect(wrapper.find('#navigation').exists()).toBeTruthy();
  });

  it('contains 4 buttons', () => {
    expect(wrapper.findAll('.navigation-btn').length).toBe(4);
  });

  it('renders 4 buttons', () => {
    const buttonContents = ['Home', 'Like', 'Cart', 'My Page'];
    const buttons = wrapper.findAll('.navigation-button');

    buttons.forEach((b, i) => {
      expect(b.text()).toEqual(buttonContents[i]);
    });
  });
});
