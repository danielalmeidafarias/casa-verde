import { IProduct } from "@/components/Ofertas/OfertaProduct";
import { atom } from "recoil";

export const userIdState = atom<string>({
  key: 'userIdState',
  default: ''
})

export const cartState = atom<IProduct[]>({
  key: 'cartState',
  default: []
})