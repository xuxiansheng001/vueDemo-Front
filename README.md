# Vue3 + Vite + Element Plus 前端脚手架

> 企业级 SPA 模板，集成了常用的网络层、状态层、UI 组件库及最佳实践。

---

## 1️⃣ 技术栈
| 模块 | 说明 |
|------|------|
| Vue 3 | 主框架 (Composition API) |
| Vite 7 | 极速打包 + Dev Server |
| Element Plus | UI 组件库 |
| Pinia | 现代状态管理 |
| Axios | 网络请求封装 |
| vue-router 4 | 路由管理 |

---

## 2️⃣ 目录结构
```text
vueDemo/
├─ public/                  # 静态资源
├─ src/
│  ├─ api/                  # 后端接口封装
│  │   └─ modules/
│  │       └─ user.js
│  ├─ assets/               # 图片、字体等
│  ├─ components/           # 可复用组件 (common / business)
│  ├─ config/               # AppConfig 配置
│  ├─ hooks/                # 通用组合函数 useXXX
│  ├─ layouts/              # 布局组件（预留）
│  ├─ router/               # 路由配置
│  ├─ store/                # Pinia 状态树
│  │   └─ modules/
│  │       └─ user.js
│  ├─ styles/               # 全局样式
│  ├─ utils/                # 工具库 (request.js 等)
│  ├─ views/                # 页面级组件
│  │   ├─ HomeView.vue      # 首页
│  │   └─ register/
│  │       └─ RegisterView.vue
│  ├─ App.vue               # 根组件
│  └─ main.js               # 应用入口
├─ vite.config.js           # 构建 / 代理配置
└─ package.json             # 依赖管理
```

---

## 3️⃣ 模块设计
### 3.1 网络层 (`src/utils/request.js`)
* 基于 `axios.create()`
* 动态设置 `Content-Type`，避免不必要的 CORS 预检
* 请求 / 响应拦截器统一处理日志、错误码、消息提示

### 3.2 API 层 (`src/api`)
* 每个业务一个文件（如 `user.js`）
* 纯函数，返回 Promise

### 3.3 状态层 (Pinia)
* `store/index.js` 创建 pinia
* `store/modules/user.js` 持有 `userInfo`, `isRegistering`, `error` 等状态

### 3.4 视图层 (`src/views`)
* `HomeView.vue` —— 欢迎页 + 导航
* `RegisterView.vue` —— 注册表单，表单验证后调用 `userStore.registerUser`

### 3.5 路由 (`src/router`)
```js
createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
    { path: '/register', name: 'Register', component: () => import('@/views/register/RegisterView.vue') },
  ],
});
```

---

## 4️⃣ 开发 & 运行
```bash
# 安装依赖
npm install

# 本地开发 (端口 5173)
npm run dev

# 打包生产
npm run build
```

> **后端接口** 默认运行在 `http://localhost:8080`，Vite 通过 `server.proxy` 将 `/api` 请求代理过去。

---

## 5️⃣ 待办 / 可选增强
- 🔒 登录模块 & 路由守卫
- 🎨 统一主题变量（SCSS + CSS Var）
- 🧪 测试：Vitest / Cypress
- 🚀 CI/CD：GitHub Actions + Docker + Nginx

欢迎基于本模板进行二次开发！
