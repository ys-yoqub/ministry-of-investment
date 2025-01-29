import {createRouter, createWebHistory} from 'vue-router';
import Cookies from "js-cookie";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home/index.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/authenticate',
        name: 'Authenticate',
        component: () => import('../pages/Authenticate/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../pages/NotFound/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = Cookies.get('isAuthenticated');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({name: 'Authenticate'});
    } else {
        next();
    }
});

export default router;
