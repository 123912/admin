// interface:接口，会进行类型的强校验，但是除了基本数据类型，引用类型，还可以具体定义某一个对象的属性

// // 登录接口需要携带参数ts类型
// export interface loginForm {
//   username: string,
//   password: string
// }

// interface dataType {
//   token?: string,
//   message?: string
// }
// // 登录接口返回的数据类型
// export interface loginResponseData {
//   code: number,
//   data: dataType
// }

// interface userInfo {
//   userId: number,
//   avatar: string,
//   username: string,
//   password: string,
//   desc: string,
//   roles: string[],
//   routes: string[],
//   token: string
// }
// // 定义服务器返回用户信息相关的数据类型
// interface user {
//   checkUser: userInfo
// }
// export interface userResponseData {
//   code: number,
//   data: user
// }




// 定义用户相关数据的ts类型
// 用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string,
  password: string
}

// 定义全部接口返回数据类型都拥有的ts类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}