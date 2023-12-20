import { IProduct } from "@/components/Ofertas/OfertaProduct";
import { atom } from "recoil";
import useCookies from './hooks/useCookies'

export const userIdState = atom<string>({
  key: 'userIdState',
  default: useCookies('userId')
})

export const cartState = atom<IProduct[]>({
  key: 'cartState',
  default: []
})