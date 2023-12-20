import { atom } from "recoil";
import useCookies from '../hooks/useCookies'
import { Cart } from '../interfaces/ICart';

export const userIdState = atom<string>({
  key: 'userIdState',
  default: useCookies('userId')
})

export const cartState = atom<Cart>({
  key: 'cartState',
  default: []
})