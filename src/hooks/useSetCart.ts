import { cartState } from "../state/atom";
import { useSetRecoilState } from "recoil";

export const useSetCart = () => {
  return useSetRecoilState(cartState);
};
