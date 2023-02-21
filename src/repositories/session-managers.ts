import { APP_SECRET } from '../constant';
import SystemUser from '../entities/SystemUser';
import TokenData from '../entities/TokenData';

var CryptoJS = require('crypto-js');
const token_add = '--pxx--';
const profile_add = '--pxx-xdx--';
const theme = '--dark-theme--';
const navigation_add = '--nxx--';

function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, APP_SECRET).toString();
}
function decrypt(data: string): string {
  return CryptoJS.AES.decrypt(data, APP_SECRET).toString(CryptoJS.enc.Utf8);
}
export function getTheme(): boolean | undefined {
  try {
    return localStorage.getItem(theme) === 'true';
  } catch {
    return undefined;
  }
}

export function setTheme(isDarkMode: boolean) {
  localStorage.setItem(theme, isDarkMode.toString());
}
export function saveToken(auth: TokenData) {
  if (auth.token !== undefined && auth.refreshToken !== undefined) {
    localStorage.setItem(token_add, encrypt(JSON.stringify(auth)));
  }
}

export function clearToken() {
  localStorage.removeItem(token_add);
}

export function getToken(): TokenData | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(token_add) ?? ''));
  } catch {
    return undefined;
  }
}

export function getSessionProfile(): SystemUser | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(profile_add) ?? ''));
  } catch {
    return undefined;
  }
}
export function saveSessionProfile(profile: SystemUser) {
  if (profile !== undefined) {
    localStorage.setItem(profile_add, encrypt(JSON.stringify(profile)));
  }
}

export function clearSessionProfile() {
  localStorage.removeItem(profile_add);
}
export function clearSessionMenus() {
  localStorage.removeItem(navigation_add);
}

export function clearSession() {
  clearSessionMenus();
  clearSessionProfile();
  clearToken();
}
