import styled from "styled-components";
import { StyledBox as Box } from "./Box";
import { H1 as StyledH1, P as StyledP } from "./SignInBox";
import { FaLongArrowAltRight } from "react-icons/fa";

export interface IProduct {
  title: string
  price: string
  imgSrc: string
}

const StyledBox = styled(Box)`
  height: 150px;
  display: flex;
  position: relative;
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

const OfertaProduct = ({ title, price, imgSrc }: IProduct) => {
  return (  
    <StyledBox>
      <StyledImage src={imgSrc} />
      <RightDiv>
        <H1>{title}</H1>
        <P>R$ {price}</P>
        <StyledButton>
          Comprar
          <FaLongArrowAltRight size={20}/>
        </StyledButton>
      </RightDiv>
    </StyledBox>
  );
}
 
export default OfertaProduct;