import { mount } from '@vue/test-utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ItemSort from '@/components/ItemList/ItemSort.vue';

library.add(fas, far);

let wrapper;

describe('Item Sort', () => {
  beforeEach(() => {
    wrapper = mount(ItemSort, {
      global: {
        stubs: { FontAwesomeIcon },
      },
    });
  });
  it('contiains sort points', () => {
    expect(wrapper.find('[data-test="sort-btn"]').exists()).toBeTruthy();
  });

  it('renders several buttons', async () => {
    await wrapper.setData({
      sortPoints: ['기준 1', '기준 2', '기준 3'],
    });

    expect(wrapper.findAll('.sort-btn').length).toBe(4);
  });

  it('renders button name with each points', async () => {
    await wrapper.setData({
      sortPoints: ['기준 1', '기준 2', '기준 3'],
    });

    expect(wrapper.find('[data-test="sort-btn"]').text()).toBe('정렬  # 기준 1 # 기준 2 # 기준 3');
  });

  it('emits parents function', async () => {
    const sortPointArr = ['기준 1', '기준 2', '기준 3'];
    await wrapper.setData({
      sortPoints: sortPointArr,
    });

    let latestButton;

    sortPointArr.forEach((point, i) => {
      latestButton = wrapper.find(`[data-test="btn-${i}"]`);

      latestButton.trigger('click');
      expect(wrapper.emitted().sortItem[i]).toEqual([point]);
    });
  });
});
