import styled from "styled-components";
import Menu from "../Menu";
import { Outlet } from "react-router-dom";

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`

const PaginaPadrao = () => {
  return (  
    <StyledDiv>
      <Menu />
      <Outlet />
    </StyledDiv>
  );
}
 
export default PaginaPadrao;