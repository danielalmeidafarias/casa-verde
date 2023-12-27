import { useEffect, useState } from "react";
import useUserId from "../../hooks/useUserId";
import { H1, P } from "../Home/SignInBox/SignInBox";
import { StyledSection } from "../Ofertas/Ofertas";
import { IUser } from "../../interfaces/IUser";
import useCart from "../../hooks/useCart";
import CartProduct from "./CartProduct";
import styled from "styled-components";
import { StyledBox as Box } from "../Box";
import { Button } from "@mui/material";
import useGetUserInfo from "../../hooks/useGetUserInfo";


export const FlexCart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (max-width: 900px){
  }

  @media screen and (max-width: 600px) {
  }
`

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`

const StyledBox = styled(Box)`
  width: 30vw;
  height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  cursor: pointer;
  background-color: var(--backgroundColor);
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 768px){
    height: 100px;
  width: 80vw;
    
  }
`

const H3 = styled(H1)`
  text-align: start;
  font-size: 28px;
`

const Cart = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>()

  const userId = useUserId()

  const cart = useCart()
  
  console.log(cart)

  const getUserInfo = useGetUserInfo()

  useEffect(() => {
    getUserInfo({ userId, setUserInfo })
  }, [])

  return (
    <StyledSection>
      <H1>Seu Carrinho</H1>
      {userId ?
        <>
          <P>Carrinho de {userInfo?.name}</P>
          <StyledDiv>
            <div>
              <FlexCart>
                {cart.map(product => (
                  <CartProduct
                    key={product.id}
                    id={product.id}
                    number={product.number} 
                    price={product.price}
                    />
                ))}
              </FlexCart>
            </div>

            {cart[0] && (
              <StyledBox>
                <H3 as='h3'>Resumo do pedido</H3>
                <p>Total: R${Array.from(cart, (product) => {
                  return product.number * product.price
                }).reduce((acc, cv) => {
                  return acc + cv
                })}</p>
                <Button sx={{width: '100%'}} variant="contained">Continuar</Button>
              </StyledBox>
            )}

          </StyledDiv>

        </>

        : <p>Faça login para acessar o carrinho</p>}
    </StyledSection>
  );
}

export default Cart;