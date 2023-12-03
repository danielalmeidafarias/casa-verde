import styled from "styled-components";
import { StyledBox } from "./Box";
import MaskGroup from '../assets/Mask Group.png'
import { H1 as StyledH1 , P } from "./SignInBox";
import MinhaPlantaItem from "./MinhaPlantaItem";

const StyledMinhaPlanta = styled(StyledBox)`
  display: flex;
  height: 350px;
`
const StyledSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-evenly;
`
const H1 = styled(StyledH1) `
  font-size: 32px;
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const MinhaPlanta = () => {
  return (
    <StyledSection>
      <StyledMinhaPlanta>
        <img src={MaskGroup} alt="" />
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