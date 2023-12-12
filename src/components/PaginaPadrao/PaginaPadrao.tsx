import styled from "styled-components";
import Menu from "../Menu";
import { Outlet } from "react-router-dom";

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
`

const PaginaPadrao = () => {
  return (  
    <StyledDiv>
      {/* <BackGround /> */}
      <Menu />
      <Outlet />
    </StyledDiv>
  );
}
 
export default PaginaPadrao;