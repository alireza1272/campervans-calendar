import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Calendar from '../views/Calendar.vue';
import BookingDetail from '../views/BookingDetail.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'calendar',
        component: Calendar,
    },
    {
        path: '/booking/:sId/:bId',
        name: 'booking',
        component: BookingDetail,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
