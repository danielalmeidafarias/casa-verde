import { useEffect, useState } from "react";
import { H1} from "../Home/SignInBox/SignInBox";
import { StyledSection } from "../Ofertas/Ofertas";
import useCart from "../../hooks/useCart";
import CartProduct from "./CartProduct";
import styled from "styled-components";
import { StyledBox as Box } from "../Box";
import { Button } from "@mui/material";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import useHandlePayment from "../../hooks/useHandlePayment";

export const FlexCart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (max-width: 900px) {
  }

  @media screen and (max-width: 600px) {
  }
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

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

  @media screen and (max-width: 768px) {
    height: 100px;
    width: 80vw;
  }
`;

const H3 = styled(H1)`
  text-align: start;
  font-size: 28px;
`;

const Span = styled.span`
  color: black;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  
`

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState<number | undefined>();
  const cart = useCart();

  const userInfo = useUserInfo();

  const handlePayment = useHandlePayment(cart, userInfo)

  // const handlePayment = async () => {
  //   await axios
  //     .post(`http://localhost:3000/api/payment`, {
  //       cart: cart,
  //       userId: userInfo?.id
  //     })
  //     .then(async (response) => {
  //       // console.log(cart)
  //       window.location.href = response.data.href;
  //     });
  // };

  const handleTotalPrice = () => {
    if (cart[0]) {
      setTotalPrice(
        Array.from(cart, (product) => {
          return product.number * product.price;
        }).reduce((acc, cv) => {
          return acc + cv;
        })
      );
    }
  };

  const navigate = useNavigate()

  useEffect(() => {
    handleTotalPrice();
  }, [cart]);

  return (
    <StyledSection>
      <H1>Seu Carrinho</H1>
      {userInfo ? (
        <>
          <p>Carrinho de {userInfo?.name}</p>
          <StyledDiv>
            <div>
              <FlexCart>
                {
                  cart[0] ? (
                    cart.map((product) => (
                      <CartProduct
                        userInfo={userInfo}
                        key={product.id}
                        id={product.id}
                        number={product.number}
                        price={product.price}
                        name={product.name}
                      />
                    ))
                  ) : 
                  <p>
                    Seu carrinho está vazio! <Span onClick={() => navigate('/ofertas')}>Vá às compras!!!</Span> 
                  </p>
                }
                {}
              </FlexCart>
            </div>

            {cart[0] && (
              <StyledBox>
                <H3 as="h3">Resumo do pedido</H3>
                <p>Total: R$ {totalPrice},00</p>
                <Button
                  onClick={handlePayment}
                  sx={{ width: "100%" }}
                  variant="contained"
                >
                  Continuar
                </Button>
              </StyledBox>
            )}
          </StyledDiv>
        </>
      ) : (
        <p>Faça login para acessar o carrinho</p>
      )}
    </StyledSection>
  );
};

export default Cart;
