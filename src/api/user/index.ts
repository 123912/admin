// 统一管理项目接口
import request from "@/utils/request";
import type { loginFormData, loginResponseData, userInfoResponseData } from "./type";

// // 枚举 定义值是字符串字面量的枚举称为字符串枚举
// enum API {
//   LOGIN_URL = '/user/login',
//   USERINFO_URL = '/user/info'
// }

// // 暴露请求函数
// // 登录接口
// export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// // 获取用户数据接口
// export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL)


// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

// 登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL)
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)