import { IUser } from "@/interfaces/IUser";
import { TCart } from "../interfaces/ICart";
import { ICartProduct } from "../interfaces/ICart";

interface Parameters {
  userInfo: IUser | null;
  cart: TCart;
  setCart: (valOrUpdater: TCart | ((currVal: TCart) => TCart)) => void;
}

const useAddToCart = ({ userInfo, cart, setCart }: Parameters) => {
  return (product: ICartProduct) => {
    if (userInfo) {
      const alreadyAdded = cart.find((prod) => prod.id === product.id);

      if (alreadyAdded) {
        let available = alreadyAdded.number < product.number;

        if (available) {
          setCart(
            Array.from(cart, (prod: ICartProduct) => {
              if (prod === alreadyAdded) {
                return {
                  id: prod.id,
                  number: prod.number + 1,
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
                if (prod === alreadyAdded) {
                  return {
                    id: prod.id,
                    number: prod.number + 1,
                    price: prod.price,
                    name: prod.name,
                  };
                }

                return prod;
              })
            )
          );
        } else {
          window.alert("Quantidade do produto indisponível");
        }
      } else {
        let available = product.number > 0;

        if (available) {
          setCart([
            ...cart,
            {
              id: product.id,
              number: 1,
              price: product.price,
              name: product.name,
            },
          ]);
        } else {
          window.alert("Produto indisponível");
          window.location.reload()
        }

        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...cart,
            {
              id: product.id,
              number: 1,
              price: product.price,
              name: product.name,
            },
          ])
        );
      }
    } else {
      console.log(userInfo);
      window.alert("Faça login para acessar o carrinho");
    }
  };
};

export default useAddToCart;
