import { IUser } from "@/interfaces/IUser";
import { TCart } from "./../interfaces/ICart";
import axios from "axios";

const useHandlePayment = (cart: TCart, userInfo: IUser | null) => {
  return async () => {
    await axios
      .post(`http://localhost:3000/api/payment`, {
        cart: cart,
        userId: userInfo?.id,
      })
      .then(async (response) => {
        // console.log(cart)
        window.location.href = response.data.href;
      });
  };
};

export default useHandlePayment;
