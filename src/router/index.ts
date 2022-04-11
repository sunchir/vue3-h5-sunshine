import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { constantRouterMap } from './router.config';
import { useSetTitle } from '/@/hooks/useSetTitle';
import { useGlobSetting } from '/@/hooks/useGlobSetting';

const router = createRouter({
  history: createWebHistory('/'),
  // to performmance like the normal bower, When pressing the back / forward button
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: constantRouterMap,
});

/**
 * before inner router
 */

router.beforeEach((to, _from, next) => {
  useSetTitle(to.meta.title as string);
  next();
});

// router.afterEach((to, from, next) => {
//   let url;
//   if (phoneModel() === 'ios') {
//     url = window.entryUrl;
//   } else {
//     url = window.location.href;
//   }
//   // 保存url
//   store.commit('link/SET_INIT_LINK', url);
// });

export function setupRouter(app: App<Element>) {
  app.use(router);
}
