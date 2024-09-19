import { atom } from 'recoil';

interface UserState {
  isLoggedIn: boolean | null;
  userInfo: { name: string; role: string } | null;
}

export const loginState = atom<UserState>({
  key: 'loginState',
  default: {
    isLoggedIn: null,
    userInfo: null,
  },
});
