import Input from "./Input";
import styled from "styled-components";

const StyledSignIn = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 1200px){
    &::after {
    content: 'Veja Abaixo ⬇️';
    font-size: 40px;
  }

  }
`
export const H1 = styled.h1`
  font-family: var(--elsie);
  font-size: 80px;
  font-weight: 900;
  text-align: center;
`

export const H3 = styled.h3`
  color: #727171;
  font-size: 18px;
`

export const P = styled.p`
  color: #727171;
  font-size: 16px;
  width: 80%;
  font-weight: 400;
`

const StyledDiv = styled.div`

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1200px){
  width: 50vw;
  }

`

const SignInBox = () => {


  return (
    <StyledDiv>
      <StyledSignIn>
        <H3>Sua casa com as</H3>
        <H1>melhores plantas</H1>
        <P>Encontre aqui uma vasta seleção de plantas para decorar a sua casa e torná-lo uma pessoa mais feliz no seu dia a dia. Entre com seu e-mail e assine nossa newsletter para saber das novidades da marca.</P>
        <Input />
      </StyledSignIn>
    </StyledDiv>

  );
}

export default SignInBox;