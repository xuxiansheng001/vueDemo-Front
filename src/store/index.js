import { createPinia } from 'pinia';

/**
 * @description Pinia 状态管理入口文件
 */

const pinia = createPinia();

export default pinia;

// 导出所有 store 以便统一管理
export { useUserStore } from './modules/user'; 