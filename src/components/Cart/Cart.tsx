import { useEffect, useState } from "react";
import useUserId from "../../hooks/useUserId";
import { H1 } from "../Home/SignInBox/SignInBox";
import { StyledSection } from "../Ofertas/Ofertas";
import axios from "axios";
import { IUser } from "../../interfaces/IUser";
import useCart from "../../hooks/useCart";
import CartProduct from "./CartProduct";
import styled from "styled-components";


export const FlexCart = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 300px 300px 300px; */
  gap: 15px;

  @media screen and (max-width: 900px){
  }

  @media screen and (max-width: 600px) {
  }
`

const StyledDiv = styled.div`


`

const Cart = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>()
  const userId = useUserId()

  const cart = useCart()

  const getUserInfo = async () => {
    if(userId) {
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
      <StyledDiv>
      {/* <p>Carrinho de {userInfo?.name}</p> */}
      <FlexCart>
        {cart.map(product => (
          <CartProduct 
          key={product.id}
          number={product.number} id={product.id}/>
        ))}
      </FlexCart>

      <div>
        
      </div>

      </StyledDiv>
 : <p>Voce nao esta logado</p>}
    </StyledSection>
  );
}
 
export default Cart;