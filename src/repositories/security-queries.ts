import { SecurityEnd } from '../endpoints';
import TokenData from '../models/entities/TokenData';
import LoginRequest from '../models/request-model/LoginRequest';
import { httpAuthenticatingPost, httpGet } from './base';
import { saveToken } from './session-managers';

export async function authenticate(params: LoginRequest): Promise<boolean> {
  return await httpAuthenticatingPost(SecurityEnd.Login, params).then((res) => {
    saveToken(res as TokenData);
    return true;
  });
}

export async function generateKey(
  id: number,
  app: string
): Promise<string | undefined> {
  return await httpGet<string>(
    SecurityEnd.GenerateKey + `?id=${id}&app=${encodeURIComponent(app)}`
  );
}
