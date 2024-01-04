import styled from "styled-components";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import LoginButton from "./LoginButton";
import useUserId from "../hooks/useUserId";
import { IUser } from "../interfaces/IUser";
import useGetUserInfo from "../hooks/useGetUserInfo";

const Nav = styled.nav`
  display: flex;
  width: 100dvw;
  justify-content: space-around;
  align-items: center;
  background-color: white;

  position: absolute;
  top: 0;
  transition: all ease-in 0.1s;
  padding-top: 10px;
  box-shadow: 10px 0px 20px 2px rgba(62, 62, 62, 0.1);
  padding-bottom: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(Nav)`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 15px;
`;

const MobileUl = styled(Ul)<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: absolute;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100vw;
  height: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  top: 68px;
  right: ${(props) => (props.$isOpen ? "0" : "-100%")};
  transition: all ease-in-out 2s;
  background-color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  color: #4e4e4e;
  cursor: pointer;

  &:hover {
    color: #010101;
    text-decoration: underline;
  }
`;

const Menu = () => {
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser | null>();

  const userId = useUserId();
  const getUserInfo = useGetUserInfo();

  useEffect(() => {
    getUserInfo({ userId, setUserInfo });
  }, [userId]);

  return (
    <>
      <Nav>
        <img src={Logo} alt="Logo Casa Verde" />
        <Ul>
          <StyledLink to={"/"}>Como Fazer</StyledLink>
          <span>/</span>
          <StyledLink to={"/ofertas"}>Ofertas</StyledLink>
          <span>/</span>
          <StyledLink to={"/carrinho"}>Meu Carrinho</StyledLink>
          {userInfo?.isAdmin && (
            <>
              <span>/</span>
              <StyledLink to={"/admin"}>Administração</StyledLink>
            </>
          )}
        </Ul>
        <LoginButton />
      </Nav>

      <MobileNav>
        <img src={Logo} alt="Logo Casa Verde" />
        <Hamburger
          toggled={mobileIsOpen}
          onToggle={() => {
            setMobileIsOpen(!mobileIsOpen);
          }}
        />
        <MobileUl $isOpen={mobileIsOpen}>
          <StyledLink to={"/"}>Como Fazer</StyledLink>
          <StyledLink to={"/ofertas"}>Ofertas</StyledLink>
          <StyledLink to={"/carrinho"}>Meu Carrinho</StyledLink>
          <LoginButton />
        </MobileUl>
      </MobileNav>
    </>
  );
};

export default Menu;
