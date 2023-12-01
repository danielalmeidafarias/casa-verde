import styled from "styled-components";
import BackGround from "./BackGround";
import Menu from "./Menu";
import SignInBox from "./SignInBox";


const StyledHome = styled.div`
  height: 100vh;
  position: relative;
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