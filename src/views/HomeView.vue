<template>
  <div class="home-wrapper">
    <div class="home-card">
      <h1 class="title">欢迎 👋</h1>
      <p class="desc">这是基于 <span>Vue 3 + Vite + Element Plus</span> 的企业级脚手架。</p>
      <router-link to="/register" class="btn">立即体验注册功能</router-link>
    </div>
  </div>
</template>

<script setup>
// 无业务逻辑
</script>

<style scoped>
/* 暗黑科技首页样式 */
.home-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-card {
  width: 90%;
  max-width: 520px;
  padding: 60px 40px;
  background: rgba(27, 33, 54, 0.85);
  border-radius: 18px;
  border: 1px solid rgba(0, 255, 255, 0.12);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.08), 0 0 60px rgba(0, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  text-align: center;
}

.title {
  margin: 0 0 20px;
  font-size: 30px;
  font-weight: 700;
  background: linear-gradient(90deg, #00e5ff, #8a7dff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.desc {
  color: #8fa4ce;
  line-height: 1.8;
  margin-bottom: 40px;
}

.desc span {
  color: #00d2ff;
}

.btn {
  display: inline-block;
  padding: 12px 32px;
  font-weight: 600;
  border-radius: 12px;
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
  color: #fff;
  box-shadow: 0 0 8px rgba(0, 210, 255, 0.6);
  transition: all 0.3s ease;
}

.btn:hover {
  box-shadow: 0 0 15px rgba(0, 210, 255, 0.9), 0 0 25px rgba(58, 71, 213, 0.6);
  transform: translateY(-2px);
}
</style> 