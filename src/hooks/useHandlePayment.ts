import { useSetCart } from "./useSetCart";
import { IUser } from "@/interfaces/IUser";
import { TCart } from "./../interfaces/ICart";
import axios from "axios";

const useHandlePayment = (cart: TCart, userInfo: IUser | null) => {
  const setCart = useSetCart();
  return async () => {
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/payment`, {
        cart: cart,
        userId: userInfo?.id,
      })
      .then(async (response) => {
        if (response.status === 200) {
          localStorage.clear();
          window.location.href = response.data.href;
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          window.alert(
            `Sinto muito, um erro ocorreu. A quantidade do produto ${err.response.data.produtoEstoque.name} que deseja não está disponível`
          );

          setCart(err.response.data.filteredCart);
          localStorage.setItem(
            `cart`,
            JSON.stringify(err.response.data.filteredCart)
          );
        }
      });
  };
};

export default useHandlePayment;
