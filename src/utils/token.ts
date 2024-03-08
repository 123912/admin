// 封装本地存储数据与读取数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 获取
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 清除
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('TOKEN')
}