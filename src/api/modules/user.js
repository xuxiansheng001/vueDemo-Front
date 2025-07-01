import request from '@/utils/request';

/**
 * @description 用户注册接口
 * @param {object} data - 注册所需的用户信息
 * @param {string} data.username - 用户名
 * @param {string} data.email - 邮箱
 * @param {string} data.password - 密码
 * @param {string} data.phone - 手机号
 * @param {string} data.nickname - 昵称
 * @returns {Promise}
 */
export function register(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data, // 等同于 data: data
  });
}

/**
 * @description 获取用户信息接口 (示例)
 * @param {number} userId
 * @returns {Promise}
 */
export function getUserInfo(userId) {
    return request({
        url: `/users/${userId}`,
        method: 'get',
    });
}