import { Cart } from "../interfaces/ICart";
import { ICartProduct } from "../interfaces/ICart";

interface Parameters {
  userId: string;
  cart: Cart;
  setCart: (valOrUpdater: Cart | ((currVal: Cart) => Cart)) => void;
}

const useRemoveFromCart = ({ userId, cart, setCart }: Parameters) => {
  return (product: ICartProduct) => {
    const addedProduct = cart.find((prod) => prod.id === product.id);

    if (userId && addedProduct) {

      let stillOnCart = addedProduct.number > 1
      
      if (stillOnCart) {
        setCart(
          Array.from(cart, (prod: ICartProduct) => {
            if (prod === addedProduct) {
              return {
                id: prod.id,
                number: prod.number - 1,
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
                };
              }

              return prod;
            })
          )
        );
      } else {

        setCart(Array.from(cart).filter(prod => prod !== addedProduct))

        localStorage.setItem('cart', JSON.stringify(Array.from(cart).filter(prod => prod !== addedProduct)))

      }
    } else {
      window.alert("Faça login para acessar o carrinho");
    }
  };
};

export default useRemoveFromCart;
