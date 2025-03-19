import request from "../request";

export default {
  /**
   * 账号密码登录
   * @param {Object} data - 登录参数
   * @param {string} data.account - 账号
   * @param {string} data.password - 密码
   */
  login(data) {
    return request.post("/auth/login", data);
  },
};
