import { IUser } from "@/interfaces/IUser";
import { TCart } from "../interfaces/ICart";
import { ICartProduct } from "../interfaces/ICart";

interface Parameters {
  userInfo: IUser | null;
  cart: TCart;
  setCart: (valOrUpdater: TCart | ((currVal: TCart) => TCart)) => void;
}

const useRemoveFromCart = ({ userInfo, cart, setCart }: Parameters) => {
  return (product: ICartProduct) => {
    const addedProduct = cart.find((prod) => prod.id === product.id);

    if (userInfo && addedProduct) {
      let stillOnCart = addedProduct.number > 1;

      if (stillOnCart) {
        setCart(
          Array.from(cart, (prod: ICartProduct) => {
            if (prod === addedProduct) {
              return {
                id: prod.id,
                number: prod.number - 1,
                price: prod.price,
                name: prod.name,
              };
            }

            return prod;
          })
        );

        localStorage.setItem(
          "cart",
          JSON.stringify(
            Array.from(cart, (prod: ICartProduct) => {
              if (prod === addedProduct) {
                return {
                  id: prod.id,
                  number: prod.number - 1,
                  price: prod.price,
                  name: prod.name,
                };
              }

              return prod;
            })
          )
        );
      } else {
        setCart(Array.from(cart).filter((prod) => prod !== addedProduct));

        localStorage.setItem(
          "cart",
          JSON.stringify(
            Array.from(cart).filter((prod) => prod !== addedProduct)
          )
        );
      }
    } else {
      window.alert("Faça login para acessar o carrinho");
    }
  };
};

export default useRemoveFromCart;
