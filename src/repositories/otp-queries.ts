import { OTPEnd } from '../endpoints';
import { httpGet, httpPost } from './base';

export async function generateOTP(
  userId: number
): Promise<boolean | undefined> {
  return await httpGet<boolean>(OTPEnd.Generate + '/' + userId);
}

export async function validateOTP(
  userId: number,
  otp: string
): Promise<boolean | undefined> {
  return await httpPost<boolean>(OTPEnd.Validate, { userId, otp });
}
