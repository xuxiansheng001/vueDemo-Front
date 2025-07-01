<template>
    <div class="register-container">
      <el-card class="register-card">
        <template #header>
          <div class="card-header">
            <h2>用户注册</h2>
            <p>创建您的新账户</p>
          </div>
        </template>
  
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerRules"
          label-width="80px"
          @submit.prevent="handleRegister"
        >
          <el-form-item label="用户名" prop="username">
            <el-input 
              v-model="registerForm.username" 
              placeholder="请输入用户名"
              :disabled="userStore.isRegistering"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input 
              v-model="registerForm.email" 
              placeholder="请输入邮箱"
              :disabled="userStore.isRegistering"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
              v-model="registerForm.password" 
              type="password" 
              show-password 
              placeholder="请输入密码"
              :disabled="userStore.isRegistering"
            />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input 
              v-model="registerForm.phone" 
              placeholder="请输入手机号"
              :disabled="userStore.isRegistering"
            />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input 
              v-model="registerForm.nickname" 
              placeholder="请输入昵称"
              :disabled="userStore.isRegistering"
            />
          </el-form-item>
  
          <!-- 错误信息显示 -->
          <el-form-item v-if="userStore.error">
            <el-alert
              :title="userStore.error"
              type="error"
              show-icon
              :closable="false"
            />
          </el-form-item>
  
          <el-form-item>
            <el-button 
              type="primary" 
              native-type="submit" 
              :loading="userStore.isRegistering"
              class="register-button"
              size="large"
            >
              {{ userStore.isRegistering ? '注册中...' : '立即注册' }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onUnmounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useUserStore } from '@/store/modules/user';
  
  /**
   * @description 用户注册页面
   */
  
  // 使用 Pinia Store - 这是关键！
  const userStore = useUserStore();
  
  // 表单引用
  const registerFormRef = ref(null);
  
  // 表单数据 - 使用 reactive 创建响应式对象
  const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    phone: '',
    nickname: '',
  });
  
  // 表单验证规则
  const registerRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
    ],
    nickname: [
      { required: true, message: '请输入昵称', trigger: 'blur' },
      { min: 2, max: 10, message: '昵称长度在 2 到 10 个字符', trigger: 'blur' }
    ],
  };
  
  /**
   * 处理注册表单提交
   */
  const handleRegister = async () => {
    if (!registerFormRef.value) return;
  
    // 清除之前的错误信息
    userStore.clearError();
  
    // 表单验证
    await registerFormRef.value.validate(async (valid) => {
      if (valid) {
        try {
          console.log('📝 组件: 开始提交注册表单', registerForm);
          
          // 调用 Pinia Store 的 action - 这是关键的区别！
          // 组件不直接调用 API，而是通过 Store 来管理业务逻辑
          await userStore.registerUser(registerForm);
          
          // 注册成功
          ElMessage.success('注册成功！欢迎加入我们！');
          
          // 清空表单
          registerFormRef.value.resetFields();
          
          // 可以在这里进行页面跳转
          // router.push('/login');
          
        } catch (error) {
          // 错误已经在 Store 中处理了，这里只需要显示用户友好的消息
          console.error('�� 组件: 注册失败', error);
          
          // Store 中已经设置了 error 状态，会自动显示在 template 中
          // 这里可以添加额外的用户交互，比如震动效果等
        }
      } else {
        console.log('❌ 表单验证失败');
        ElMessage.warning('请检查并完善表单信息');
        return false;
      }
    });
  };
  
  // 组件卸载时清理错误状态
  onUnmounted(() => {
    userStore.clearError();
  });
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    /* 动态渐变背景 */
    background: linear-gradient(120deg, #0d0d0d, #111927, #0d0d0d);
    background-size: 400% 400%;
    animation: bgMove 10s ease-in-out infinite;
    overflow: hidden;
  }
  
  @keyframes bgMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .register-card {
    width: 100%;
    max-width: 480px;
    border-radius: 16px;
    padding: 40px 30px 30px;
    background: rgba(27, 33, 54, 0.85);
    border: 1px solid rgba(0, 255, 255, 0.12);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.08), 0 0 60px rgba(0, 255, 255, 0.04);
    backdrop-filter: blur(12px);
  }
  
  .card-header {
    text-align: center;
    margin-bottom: 30px;
    color: #e6f7ff;
  }
  
  .card-header h2 {
    margin: 0 0 10px 0;
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 26px;
    background: linear-gradient(90deg, #00e5ff, #8a7dff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .card-header p {
    margin: 0;
    color: #7f94b0;
    font-size: 14px;
  }
  
  .register-button {
    width: 100%;
    height: 46px;
    font-weight: 600;
    border-radius: 10px;
    background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
    box-shadow: 0 0 8px rgba(0, 210, 255, 0.6);
    transition: all 0.3s ease;
  }
  .register-button:hover:not(:disabled) {
    box-shadow: 0 0 15px rgba(0, 210, 255, 0.9), 0 0 25px rgba(58, 71, 213, 0.6);
    transform: translateY(-2px);
  }
  
  /* 表单及输入框暗黑主题 */
  :deep(.el-form-item__label) {
    color: #8fa4ce;
  }
  
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 255, 255, 0.15);
    color: #e6f7ff;
  }
  
  :deep(.el-input__inner::placeholder) {
    color: #6b7da0;
  }
  
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1.5px #00e5ff inset, 0 0 8px rgba(0, 229, 255, 0.6);
  }
  
  /* 错误提示卡片暗色化 */
  :deep(.el-alert) {
    background: rgba(255, 77, 79, 0.1);
    border: 1px solid rgba(255, 77, 79, 0.3);
  }
  
  /* 表单项间距调整 */
  :deep(.el-form-item) {
    margin-bottom: 20px;
  }
  
  /* 移动端适配 */
  /* 响应式设计 */
  @media (max-width: 480px) {
    .register-container {
      padding: 10px;
    }
    
    .register-card {
      margin: 0;
    }
  }
  </style>