import { mount } from '@vue/test-utils';
import ItemInfoPage from '@/views/ItemInfo.vue';

describe('ItemInfoPage', () => {
  it('renders ItemInfoPage', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#item-info-page').exists()).toBe(true);
  });
});

describe('Components', () => {
  it('renders navigation bar?', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#navigation').exists()).toBe(true);
  })
  it('renders menu button on navigation bar?', () => {
    const wrapper = mount(ItemInfoPage);

    expect(wrapper.find('#navigation button').exists()).toBe(true);
  })
})