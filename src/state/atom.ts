import { atom } from "recoil";
import useCookies from "../hooks/useCookies";
import { Cart } from "../interfaces/ICart";

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

export const cartState = atom<Cart>({
  key: "cartState",
  default: cartStorage(),
});
