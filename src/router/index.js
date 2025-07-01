import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    // 路由懒加载：只有当用户访问 /register 时，才会加载这个组件的代码
    component: () => import('@/views/register/RegisterView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;