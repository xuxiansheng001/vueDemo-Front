import { createApp } from 'vue';

// 引入 Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 引入根组件和路由
import App from './App.vue';
import router from './router';

// 引入 Pinia 状态管理
import pinia from './store';

// 引入全局样式
import './styles/main.css'; 

const app = createApp(App);

// 使用插件的顺序很重要
app.use(pinia);        // 1. 先启用 Pinia
app.use(router);       // 2. 再启用路由
app.use(ElementPlus);  // 3. 最后启用 UI 组件库

app.mount('#app');