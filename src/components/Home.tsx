import styled from "styled-components";
import BackGround from "./BackGround";
import Menu from "./Menu";
import SignInBox from "./SignInBox";


const StyledHome = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: var(--padding-top);
`

const Home = () => {
  return (
    <StyledHome>
      <BackGround />
      <Menu />
      <SignInBox />
    </StyledHome>
  );
}

export default Home;