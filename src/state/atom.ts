import { atom } from "recoil";
import useCookies from "../hooks/useCookies";
import { TCart } from "../interfaces/ICart";

export const userIdState = atom<string>({
  key: "userIdState",
  default: useCookies("userId"),
});

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
