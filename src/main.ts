import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from '/@/router';
// 引入全局样式
import '/@/assets/css/index.less';
// 移动端适配
import 'amfe-flexible/index.js';
// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant';

import { setupStore } from '/@/store';

const app = createApp(App);

app.use(vantPlugins);
setupRouter(app);
// Configure store
setupStore(app);
app.mount('#app');
