import { createRouter, createWebHashHistory } from "vue-router";
import SearchDataBasedOnZipCode from './components/SearchDataBasedOnZipCode.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: SearchDataBasedOnZipCode
        },

    ],
    // mode: 'history',
})