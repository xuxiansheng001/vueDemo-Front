import { defineStore } from 'pinia';
import { register, getUserInfo } from '@/api/modules/user';

/**
 * @description 用户状态管理
 */
export const useUserStore = defineStore('user', {
  // 1. 状态定义
  state: () => ({
    // 用户信息
    userInfo: null,
    
    // 加载状态
    isLoading: false,
    
    // 注册状态
    isRegistering: false,
    
    // 错误信息
    error: null,
  }),

  // 2. 计算属性（类似于 computed）
  getters: {
    // 是否已登录
    isLoggedIn: (state) => !!state.userInfo,
    
    // 用户名称显示
    displayName: (state) => {
      return state.userInfo?.nickname || state.userInfo?.username || '未知用户';
    },
  },

  // 3. 异步操作和业务逻辑（类似于 methods）
  actions: {
    /**
     * 用户注册操作
     * @param {object} registerData - 注册数据
     * @returns {Promise<object>} 注册结果
     */
    async registerUser(registerData) {
      // 设置加载状态
      this.isRegistering = true;
      this.error = null;
      
      try {
        console.log('🔄 Store: 开始用户注册...', registerData);
        
        // 调用 API 进行注册
        const response = await register(registerData);
        
        console.log('✅ Store: 注册成功', response);
        
        // 注册成功后可以选择自动登录或保存用户信息
        // this.userInfo = response.user; // 如果后端返回用户信息
        
        return response;
        
      } catch (error) {
        console.error('❌ Store: 注册失败', error);
        
        // 保存错误信息到状态中
        this.error = error.message || '注册失败';
        
        // 重新抛出错误，让组件可以捕获
        throw error;
        
      } finally {
        // 无论成功失败都要清除加载状态
        this.isRegistering = false;
      }
    },

    /**
     * 获取用户信息
     * @param {number|string} userId - 用户ID
     * @returns {Promise<object>} 用户信息
     */
    async fetchUserInfo(userId) {
      this.isLoading = true;
      this.error = null;
      
      try {
        console.log('🔄 Store: 获取用户信息...', userId);
        
        const userInfo = await getUserInfo(userId);
        
        // 更新状态
        this.userInfo = userInfo;
        
        console.log('✅ Store: 获取用户信息成功', userInfo);
        
        return userInfo;
        
      } catch (error) {
        console.error('❌ Store: 获取用户信息失败', error);
        this.error = error.message || '获取用户信息失败';
        throw error;
        
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * 清空错误信息
     */
    clearError() {
      this.error = null;
    },

    /**
     * 用户登出
     */
    logout() {
      this.userInfo = null;
      this.error = null;
      // 清除本地存储的 token 等
      // localStorage.removeItem('token');
    },
  },
}); 