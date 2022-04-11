import { RouteRecordRaw } from 'vue-router';

export const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/views/index.vue'),
    meta: {
      title: '首页',
      keepAlive: false,
    },
  },
];
