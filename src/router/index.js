import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import MasterPage from '../components/MasterPage';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'MasterPage',
        component: MasterPage,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login,
            },
            {
                path: '/home',
                name: 'Home',
                component: HomePage,
            },
        ],
    },

    // {
    //     path: '/404',
    //     name: 'Login',
    //     component: Login,
    // },

    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const localStorage_userLogin = localStorage.getItem('userLogin')
        ? JSON.parse(localStorage.getItem('userLogin'))
        : null;

    // console.log({ localStorage_userLogin });

    const username = localStorage_userLogin
        ? localStorage_userLogin.username
        : null;

    // console.log({ username });

    // console.log("to path in beforEach: ", to.path);

    if (to.path != '/login') {
        if (!localStorage_userLogin) {
            next({ path: '/login' });
        } else {
            if (username) {
                next();
            } else {
                alert('SOMETHING WRONG!');
                // next({ path: '/login' });
            }
        }
    } else {
        if (username) {
            next({ path: '/home' });
        } else {
            next();
        }

        // if(to.path) {
        //     next();
        // } else {
        //     next({ path: '/' });
        // }
    }
});

export default router;
