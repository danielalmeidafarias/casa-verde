import styled from "styled-components";
import { StyledBox } from "../../Box";
import MaskGroup from '../../../assets/Mask Group.png'
import { H1 as StyledH1 , P as StyledP } from "../../Home/SignInBox/SignInBox";
import MinhaPlantaItem from "./MinhaPlantaItem";

const StyledMinhaPlanta = styled(StyledBox)`
  display: flex;
  height: 400px;
  width: 850px;
  @media screen and (max-width: 800px){
    padding: 10px;
  }
`
const StyledSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`

const RightDiv = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-evenly;

  @media screen and (max-width: 800px){
    gap: 50px;
  }

`
const H1 = styled(StyledH1)`
  font-size: 32px;
  @media screen and (max-width: 800px){
    width: 100%;
    font-size: 70px;
    text-align: center;
  }
`

const P = styled(StyledP)`
  @media screen and (max-width: 800px){
    width: 100%;
    font-size: 30px;
    text-align: center;
    font-weight: 600;
  }
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledImg = styled.img`
display: block;

  @media screen and (max-width: 800px){
    display: none;
  }

`

const MinhaPlanta = () => {
  return (
    <StyledSection>
      <StyledMinhaPlanta>
        <StyledImg src={MaskGroup} alt="" />
        <RightDiv>
          <P>Como conseguir</P>
          <H1>minha planta</H1>
          <Ul>
            <MinhaPlantaItem>Escolha suas plantas</MinhaPlantaItem>
            <MinhaPlantaItem>Faça seu pedido</MinhaPlantaItem>
            <MinhaPlantaItem>Aguarde na sua casa</MinhaPlantaItem>
          </Ul>
        </RightDiv>
      </StyledMinhaPlanta>
    </StyledSection>

  );
}

export default MinhaPlanta;