import Calendar from '../../views/Calendar.vue';
import {mount, RouterLinkStub} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';

test('renders Calendar component', () => {
    const wrapper = mount(Calendar, {
        global: {
            plugins: [createTestingPinia()],
            stubs: {
                RouterLink: RouterLinkStub,
                VueDatePicker: true,
            },
        },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Select Station');
});

