import { useEffect, useState } from "react";
import useUserId from "../../hooks/useUserId";
import { H1, P } from "../Home/SignInBox/SignInBox";
import { StyledSection } from "../Ofertas/Ofertas";
import axios from "axios";
import { IUser } from "../../interfaces/IUser";
import useCart from "../../hooks/useCart";
import CartProduct from "./CartProduct";
import styled from "styled-components";
import { StyledBox as Box } from "../Box";
import { Button } from "@mui/material";


export const FlexCart = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 300px 300px 300px; */
  gap: 5px;

  @media screen and (max-width: 900px){
  }

  @media screen and (max-width: 600px) {
  }
`

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;

`

const StyledBox = styled(Box)`
  width: 30vw;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  background-color: var(--backgroundColor);
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 768px){
  height: 100px;
    
  }
`

const H3 = styled(H1)`
  font-size: 28px;
`

const Cart = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>()
  const [total, setTotal] = useState<number>(0)

  const userId = useUserId()

  const cart = useCart()

  const getUserInfo = async () => {
    if (userId) {
      await axios.get(`http://localhost:3000/api/userinfo/${userId}`)
        .then(response => {
          setUserInfo(response.data)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      setUserInfo(null)
    }

  }

  useEffect(() => {
    getUserInfo()
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
                    total={total}
                    setTotal={setTotal}
                    key={product.id}
                    number={product.number} id={product.id} />
                ))}
              </FlexCart>
            </div>

            {cart[0] && (
              <StyledBox>
                <H3 as='h3'>Resumo do pedido</H3>
                <p>{total}</p>
                <Button variant="contained">Continuar</Button>
              </StyledBox>
            )}

          </StyledDiv>

        </>

        : <p>Voce nao esta logado</p>}
    </StyledSection>
  );
}

export default Cart;