import styled from 'styled-components';
import Logo from '../assets/logo.png'
import HamburgerButton from './HamburgerButton';
import { useState } from 'react';

const Nav = styled.nav<{ $isOpen?: boolean }>`
  display: flex;
  width: 100dvw;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
  position: absolute;
  top: 0;
  transition: all ease-in 0.1s;
  padding-top: 10px;


  @media screen and (max-width: 768px) {
    /* transform: ${props => !props.$isOpen && 'translate(-100%, 0);'}; */
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 30%;
    height: 100dvh;
    gap: 50px;
    background-color: inherit;

  }
`

const Ul = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
    font-size: 2em;
    text-align: center;
  }
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

const Img = styled.img`
  @media screen and (max-width: 768px){
    width: 60dvw;
  }
`

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Nav $isOpen={isOpen}>
        <HamburgerButton
          $isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Img src={Logo} alt="Logo Casa Verde" />
        <Ul>
          <Li>Como Fazer</Li>
          <span>/</span>
          <Li>Ofertas</Li>
          <span>/</span>
          <Li>Depoimentos</Li>
          <span>/</span>
          <Li>Vídeos</Li>
          <span>/</span>
          <Li>Meu Carrinho</Li>
        </Ul>
      </Nav>
    </div>

  );
}

export default Menu;