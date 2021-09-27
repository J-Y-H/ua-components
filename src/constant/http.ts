export const TIME_OUT = 60000

export enum STATUS_CODE {
  success = 200,
  error = -1,
  noAuth = 403,
  timeout = 504
}

export enum URL {
  authLogin = '/fintech-api/wechat-corp/login',
  authList = '/fintech-api/dim-jkl-organization-role/emp/auth'
}
