import { TCart } from "../interfaces/ICart";
import { ICartProduct } from "../interfaces/ICart";

interface Parameters {
  userId: string;
  cart: TCart;
  setCart: (valOrUpdater: TCart | ((currVal: TCart) => TCart)) => void;
}

const useAddToCart = ({ userId, cart, setCart }: Parameters) => {
  return (product: ICartProduct) => {
    if (userId) {
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
        setCart([
          ...cart,
          {
            id: product.id,
            number: 1,
            price: product.price,
            name: product.name,
          },
        ]);

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
      window.alert("Faça login para acessar o carrinho");
    }
  };
};

export default useAddToCart;
