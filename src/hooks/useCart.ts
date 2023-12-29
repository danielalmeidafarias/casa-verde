import { useRecoilValue } from "recoil";
import { cartState } from "../state/atom";

const useCart = () => {
  return useRecoilValue(cartState);
};

export default useCart;
