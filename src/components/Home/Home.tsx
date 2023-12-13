import styled from "styled-components";
import SignInBox from "./SignInBox/SignInBox";
import MinhaPlanta from "./MinhaPlanta/MinhaPlanta";
import Hero from '../../assets/imagem-hero 1.png'


const StyledHome = styled.div`
  width: 100%;
  height: 100vh;
`

const StyledDiv = styled.div`
  /* width: 100%; */
  /* display: flex; */
  justify-content: center;
 
`

const StyledImg = styled.img`
  height: 90vh;
  position: absolute;
  bottom: 0px;
  right: calc(50vw - 425px);

  @media screen and (max-width: 1200px) {
    display: none;
  }
`

const Home = () => {
  return (
    <StyledHome>
      <div>
        <SignInBox />
        <StyledImg src={Hero} alt="" />
      </div>
      <MinhaPlanta />
    </StyledHome>
  );
}

export default Home;