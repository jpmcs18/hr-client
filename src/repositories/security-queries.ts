import { SecurityEnd } from '../endpoints';
import TokenData from '../entities/TokenData';
import LoginRequest from '../request-model/LoginRequest';
import { httpAuthenticatingPost } from './base';
import { saveToken } from './session-managers';

export async function authenticate(params: LoginRequest): Promise<boolean> {
  return await httpAuthenticatingPost(SecurityEnd.Login, params).then((res) => {
    saveToken(res as TokenData);
    return true;
  });
}
