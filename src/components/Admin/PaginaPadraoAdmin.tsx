import styled from "styled-components";
import Menu from "./Menu";
import { Navigate, Outlet } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const PaginaPadraoAdmin = () => {
  const userInfo = useUserInfo();

  return (
    <StyledDiv>
      <Menu />
      {userInfo?.isAdmin ? <Outlet /> : <Navigate to="/" />}
    </StyledDiv>
  );
};

export default PaginaPadraoAdmin;
