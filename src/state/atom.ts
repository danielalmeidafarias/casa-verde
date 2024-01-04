import { IUser } from './../interfaces/IUser';
import { atom } from "recoil";
import useCookies from "../hooks/useCookies";
import { TCart } from "../interfaces/ICart";

const getUser = () => {
  if(useCookies('user')) {
    return JSON.parse(useCookies('user'))
  } else return null
}

export const userInfoState = atom<IUser | null>({
  key: 'userInfoState',
  // default: JSON.parse(useCookies("user"))
  default: getUser()
})

const cartStorage = () => {
  const cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

export const cartState = atom<TCart>({
  key: "cartState",
  default: cartStorage(),
});
