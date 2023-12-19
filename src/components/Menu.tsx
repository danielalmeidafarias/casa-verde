import styled from 'styled-components';
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react'
import { Button, Hidden } from '@mui/material';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';

const Nav = styled.nav<{ $isOpen?: boolean }>`
  display: flex;
  width: 100dvw;
  justify-content: space-around;
  align-items: center;
  /* background-color: #eeebeb; */
  background-color: white;

  position: absolute;
  top: 0;
  transition: all ease-in 0.1s;
  padding-top: 10px;
  box-shadow: 10px 0px 20px 2px rgba(62, 62, 62, 0.1);
  padding-bottom: 10px;

  & > div {
    @media screen and (min-width: 768px){
      display: none;
    }
  }

  & > ul {
    @media screen and (max-width: 768px){
      display: none;
    }
  }


`

const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 15px;

`

const Li = styled.li`
  font-weight: 600;
  font-size: 14px;
  color: #4e4e4e;
  cursor: pointer;

  &:hover {
  color: #010101;
  text-decoration: underline;
  }
`

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
`


const Menu = () => {
  const [mobileIsOpen, setMobileIsOpen] = useState(false)

  return (
    <div>
      <Nav $isOpen={mobileIsOpen}>
        <>
          <img src={Logo} alt="Logo Casa Verde" />
          <Hamburger />
        </>

        <Ul>
          <StyledLink to={'/'}>Como Fazer</StyledLink>
          <span>/</span>
          <StyledLink to={'/ofertas'}>Ofertas</StyledLink>
          <span>/</span>
          <Li>Meu Carrinho</Li>
          <GoogleLogin
          shape='circle'
          type='icon'
          text='signin'
          size='medium'
          onSuccess={async(credentialResponse) => {
            axios.post('http://localhost:3000/api/auth', {
              credential: credentialResponse.credential
            }).then(response => {
              console.log(response.data)
            })
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />{`Login`}
        </Ul>
      </Nav>

    </div>

  );
}

export default Menu;