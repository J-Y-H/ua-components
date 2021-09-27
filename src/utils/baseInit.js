/*
 * @Descripttion: 
 * @Date: 2021-09-26 16:20:02
 * @LastEditTime: 2021-09-26 16:20:02
 */
/**
 * 获取当前环境(把mp-去掉)
 */
 export function getEnv() {
  return (process.env.VUE_APP_PLATFORM || '').replace(/mp-/g, '')
}

// 初始化api
export function initApi() {
  uni.getEnv = getEnv
}
