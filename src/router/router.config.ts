import { RouteRecordRaw } from 'vue-router';

export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/views/layouts/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('/@/views/tabBar/index.vue'),
        meta: { title: '首页', keepAlive: false, showTab: true },
      },
      {
        path: '/demo',
        name: 'Dome',
        component: () => import('/@/views/tabBar/index.vue'),
        meta: { title: '案例', keepAlive: false, showTab: true },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('/@/views/tabBar/index.vue'),
        meta: { title: '关于我', keepAlive: false, showTab: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
    meta: { title: '登陆页面', keepAlive: false, showTab: true },
  },
];
