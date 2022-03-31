import { shallowMount, mount } from '@vue/test-utils';

import ItemModal from '@/components/ItemInfo/ItemModal.vue';

let wrapper;
describe('Item Modal', () => {
  beforeEach(() => {
    wrapper = shallowMount(ItemModal);
  });

  it('render ItemModal Component', () => {
    expect(wrapper.find('#itemModal').exists()).toBeTruthy();
  });

  it('render modal content', () => {
    expect(wrapper.find('[data-test="modal-content"]').exists()).toBeTruthy();
  });

  it('deliver a message that suits the situation when cart already contain item. ', async () => {
    const targetMessage = '장바구니에 담았습니다.';
    wrapper = mount(ItemModal, {
      propsData: {
        isAlreadyInCart: true,
      },
    });

    console.log(wrapper.vm.isAlreadyInCart);

    expect(wrapper.find('[data-test="modal-text"]').text()).toContain(targetMessage);
  });

  it('deliver a message that suits the situation when cart already contain item. ', async () => {
    const targetMessage = '수량이 변경되었습니다.';
    wrapper = mount(ItemModal, {
      propsData: {
        isAlreadyInCart: false,
      },
    });

    console.log(wrapper.vm.isAlreadyInCart);

    expect(wrapper.find('[data-test="modal-content"]').text()).toContain(targetMessage);
  });
});

describe('Item Modal Route', () => {
  it('move cart when click "장바구니 이동"', async () => {
    expect(wrapper.find('[data-test="move"]').html()).toContain('to="/cart"');
  });
});
