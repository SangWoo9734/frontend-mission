import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

window.alert = jest.fn();

describe('Home.vue', () => {
    describe('Components', () => {
      it('input 요소를 포함하고 있는가', () => {
        const wrapper = shallowMount(Home);

        expect(wrapper.find('[data-test="user-input"]').exists()).toBe(true);
      });
      it('\"제출\" 버튼을 포함하고 있는가', () => {
        const wrapper = shallowMount(Home);

        expect(wrapper.find('[data-test="rotate-word"]').exists()).toBe(true);
      });
      it('\"알림\" 버튼을 포함하고 있는가', () => {
        const wrapper = shallowMount(Home);

        expect(wrapper.find('[data-test="notice-count"]').exists()).toBe(true);
      });
    });
    
    describe('Methods', () => {
      it('사용자의 입력값이 아래 문자열에 반영이 되는가', async () => {
        const wrapper = shallowMount(Home);

        await wrapper.find('[data-test="user-input"]').setValue('ProjectLion');

        expect(wrapper.find('.result').text()).toBe('ProjectLion');
      });
      it('사용자의 입력값이 변경되었을때 count 값이 초기화 되는가', async () => {
        const wrapper = shallowMount(Home);

        await wrapper.find('[data-test="user-input"]').setValue('ProjectLion');
        await wrapper.find('[data-test="notice-count"]').trigger('click');

        expect(wrapper.vm.count).toBe(1);

        await wrapper.find('[data-test="user-input"]').setValue('Hello');

        expect(wrapper.vm.count).toBe(0);
      });
      it('버튼 클릭시 입력한 문자열의 문자가 한 칸씩 회전 하는가', async () => {
        const wrapper = shallowMount(Home);

        await wrapper.find('[data-test="user-input"]').setValue('ProjectLion');
        await wrapper.find('[data-test="rotate-word"]').trigger('click');

        expect(wrapper.find('.result').text()).toBe('rojectLionP');
      });
      it('버튼 클릭시 Notice 횟수(Count)가 1 증가하는가', async () => {
        const wrapper = shallowMount(Home);

        await wrapper.find('[data-test="user-input"]').setValue('ProjectLion');
        await wrapper.find('[data-test="notice-count"]').trigger('click');

        expect(wrapper.vm.count).toBe(1);
      });
    });
  })