import Employee from '../entities/Employee';

export default interface UpdateUserProfile {
  employee?: Employee | undefined;
  allow2FA: boolean | undefined;
  mobileNumber?: string | undefined;
  username: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
