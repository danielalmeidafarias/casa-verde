import styled from "styled-components";
import Menu from "./Menu";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserId from "../../hooks/useUserId";
import { IUser } from "../../interfaces/IUser";
import useGetUserInfo from "../../hooks/useGetUserInfo";

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const PaginaPadraoAdmin = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>();
  const userId = useUserId();

  const getUserInfo = useGetUserInfo();

  useEffect(() => {
    getUserInfo({ userId, setUserInfo });
  }, [userId]);

  return (
    <StyledDiv>
      <Menu />
      {userInfo?.isAdmin ? (
        <Outlet />
      ) : 
      <Navigate to="/"/>
      }
    </StyledDiv>
  );
};

export default PaginaPadraoAdmin;
