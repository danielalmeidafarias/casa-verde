import styled from "styled-components";
import { StyledBox as Box } from "../Box";
import { H1 as StyledH1, P as StyledP } from "../Home/SignInBox/SignInBox";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import { IProduct } from "../../interfaces/IProduct";
import useCart from "../../hooks/useCart";
import { cartState } from "../../state/atom";
import { useSetRecoilState } from "recoil";
import { ICartProduct } from "../../interfaces/ICart";



const StyledBox = styled(Box)`
  height: 150px;
  display: flex;
  position: relative;
  cursor: pointer;
  background-color: var(--backgroundColor);
`

const H1 = styled(StyledH1)`
  font-size: 24px;
`
const P = styled(StyledP)`
  font-size: 14px;
`

const StyledButton = styled.button`
  background-color: transparent;
  color: var(--yellow);
  display: flex;
  gap: 10px;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all ease-in-out 100ms;

  &:hover {
    text-decoration: underline;
    color: #daa62d;
  }
`

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  right: 10px;
  width: 150px;
  height: 100%;
`

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
`

const OfertaProduct = ({ name, price, image, id }: IProduct) => {
  const cart = useCart()
  console.log(cart)

  // Criar estado de disponível 
  // Quando a quantidade de produtos no carrinho for igual a quantidade de produtos disponiveis
  // O botão de comprar deve ficar disabled

  const setCart = useSetRecoilState(cartState)

  const handleSetCart = (product: ICartProduct) => {
    console.log(product.number)

    const alreadyAdded = cart.find(prod => prod.id === product.id)

    if (alreadyAdded) {

      let available = alreadyAdded.number < product.number

      if(available) {
        setCart(Array.from(cart, (prod: ICartProduct) => {

          if (prod === alreadyAdded) {
            return {
              id: prod.id,
              number: prod.number + 1
            }
          }
  
          return prod
  
        }))
      } else {
        window.alert('Quantidade do produto indisponível')
      }

    } else {
      setCart([...cart, {
        id: product.id,
        number: 1
      }])
    }
  }

  const comprar = async (plantaID: number) => {

    await axios.get(`http://localhost:3000/api/plantas/${plantaID}`)
      .then(response => {
        const data = response.data
        handleSetCart({
          id: data.id,
          number: data.number
        })
      })
      .catch((err: any) => {
        console.error(err)
      })

  }

  return (
    <StyledBox>
      <StyledImage src={image} />
      <RightDiv>
        <H1>{name}</H1>
        <P>R$ {price}, 00</P>
        <StyledButton
          onClick={() => comprar(id)}
        >
          Comprar
          <FaLongArrowAltRight size={20} />
        </StyledButton>
      </RightDiv>
    </StyledBox>
  );
}

export default OfertaProduct;