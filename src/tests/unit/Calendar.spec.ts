import Calendar from '../../views/Calendar.vue';
import {mount} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';

test('renders Calendar component', () => {
    const wrapper = mount(Calendar, {
        global: {
            plugins: [createTestingPinia()],
        },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Select Station');
});
