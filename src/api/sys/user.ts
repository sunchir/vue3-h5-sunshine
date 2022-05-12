import { request } from '/@/utils/request';
import { LoginParams, LoginResultModel } from './model/userModel';

enum Api {
  Login = '/login',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
  return request.post<LoginResultModel>(Api.Login, params);
}
