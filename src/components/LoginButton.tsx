import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import useDeleteCookies from "../hooks/useDeleteCookies";
import styled from "styled-components";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";
import { useSetUserInfo } from "../hooks/useSetUserInfo";
import { useUserInfo } from "../hooks/useUserInfo";
import { IUser } from "../interfaces/IUser";
import { useSetCart } from "../hooks/useSetCart";

const Button = styled.button`
  background-color: white;
  border-radius: 20px;
  border: 1px solid #c3c2c2;
  color: #2e2d2d;
  width: 115px;
  height: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  transition: all ease-in-out 200ms;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    background-color: rgba(112, 162, 247, 0.05);
    border: 1px solid rgba(112, 162, 247, 0.3);
  }
`;

const LoginButton = () => {
  const setUserInfo = useSetUserInfo();
  const userInfo = useUserInfo();
  const setCart = useSetCart();

  const setUserCookie = (user: IUser) => {
    const expiresAt = new Date(Date.now() + 86400000).toUTCString();
    document.cookie = `user=${JSON.stringify(
      user
    )}; expires=${expiresAt}; path=/`;
  };

  useEffect(() => {
    if (userInfo) {
      setUserCookie(userInfo);
    }
  }, [userInfo]);

  return (
    <>
      {userInfo == null ? (
        <GoogleLogin
          shape="circle"
          type="standard"
          text="signin"
          size="medium"
          onSuccess={async (credentialResponse) => {
            axios
              .post(`${import.meta.env.VITE_API_URL}/api/auth`, {
                credential: credentialResponse.credential,
              },
              {
                headers: {
                  
                }
              })
              .then((response) => {
                setUserCookie(response.data);
                setUserInfo(response.data);
              });
          }}
          onError={() => {
            window.alert("Login falhou");
          }}
        />
      ) : (
        <Button
          onClick={() => {
            setUserInfo(null);
            useDeleteCookies();
            setCart([]);
          }}
        >
          <CiLogout />
          Logout
        </Button>
      )}
    </>
  );
};

export default LoginButton;
