import styled from "styled-components";
import { StyledBox as Box } from "../Box";
import { P as StyledP } from "../Home/SignInBox/SignInBox";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import { IProduct } from "../../interfaces/IProduct";
import useCart from "../../hooks/useCart";
import { cartState } from "../../state/atom";
import { useSetRecoilState } from "recoil";
import useAddToCart from "../../hooks/useAddToCart";
import { IUser } from "../../interfaces/IUser";

const StyledBox = styled(Box)`
  height: 150px;
  display: flex;
  position: relative;
  cursor: pointer;
  background-color: var(--backgroundColor);
`;

const H1 = styled.h1`
  font-size: 24px;
  text-align: left;
  font-family: var(--elsie);
  font-weight: 900;
`;
const P = styled(StyledP)`
  font-size: 14px;
`;

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
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  position: absolute;
  right: 10px;
  width: 150px;
  height: 100%;
`;

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
`;

interface Props extends IProduct {
  userInfo: IUser | null;
}

const OfertaProduct = ({ name, price, image, id, userInfo }: Props) => {
  const cart = useCart();

  const setCart = useSetRecoilState(cartState);

  const handleSetCart = useAddToCart({ userInfo, cart, setCart });

  const comprar = async (plantaID: number) => {
    await axios
      .get(`http://localhost:3000/api/plantas/${plantaID}`)
      .then((response) => {
        const data = response.data;
        handleSetCart({
          id: data.id,
          number: data.number,
          price: data.price,
          name: data.name,
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <StyledBox>
      <StyledImage src={image} />
      <RightDiv>
        <H1>{name}</H1>
        <P>R$ {price}, 00</P>
        <StyledButton onClick={() => comprar(id)}>
          Comprar
          <FaLongArrowAltRight size={20} />
        </StyledButton>
      </RightDiv>
    </StyledBox>
  );
};

export default OfertaProduct;
