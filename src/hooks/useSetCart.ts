import { Cart } from "../interfaces/ICart"
import { ICartProduct } from "../interfaces/ICart"

interface Parameters {
  userId: string,
  cart: Cart,
  setCart: (valOrUpdater: Cart | ((currVal: Cart) => Cart)) => void
}

// Nessa função deve-se adicionar a opção de retirar o produto do carrinho
// ou
// Criar outra função semelhante responsável por retirar o produto do carrinho

const useSetCart = ({ userId, cart, setCart }: Parameters) => {

  return (product: ICartProduct) => {
    if (userId) {
      const alreadyAdded = cart.find(prod => prod.id === product.id)
  
      if (alreadyAdded) {
  
        let available = alreadyAdded.number < product.number
  
        if (available) {
          setCart(Array.from(cart, (prod: ICartProduct) => {
  
            if (prod === alreadyAdded) {
              return {
                id: prod.id,
                number: prod.number + 1
              }
            }
  
            return prod
  
          }))
  
          localStorage.setItem('cart', JSON.stringify(Array.from(cart, (prod: ICartProduct) => {
  
            if (prod === alreadyAdded) {
              return {
                id: prod.id,
                number: prod.number + 1
              }
            }
  
            return prod
  
          })))
        } else {
          window.alert('Quantidade do produto indisponível')
        }
  
      } else {
        setCart([...cart, {
          id: product.id,
          number: 1
        }])
  
        localStorage.setItem('cart', JSON.stringify([...cart, {
          id: product.id,
          number: 1
        }]))
      }
    } else {
      window.alert('Faça login para acessar o carrinho')
    }
  }

  
}

export default useSetCart