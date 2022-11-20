import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import MasterPage from "../components/MasterPage";
import Mapbox from "../components/Mapbox";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "MasterPage",
        component: MasterPage,
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
            },
            {
                path: "/home",
                name: "Home",
                component: HomePage,
            },
            {
                path: "/map-box",
                name: "Mapbox",
                component: Mapbox,
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
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    let localStorage_userLogin = null;

    try {
        localStorage_userLogin = JSON.parse(localStorage.getItem("userLogin"));
    } catch (error) {
        localStorage_userLogin = null;
    }

    const username = localStorage_userLogin
        ? localStorage_userLogin.username
        : null;

    if (to.path != "/login") {
        if (!username) {
            next({ path: "/login" });
        } else {
            if (username) {
                if (to.path == "/") {
                    next({ path: "/home" });
                } else {
                    next();
                }
            }
        }
    } else {
        if (username) {
            next({ path: "/home" });
        } else {
            next();
        }
    }
});

export default router;
