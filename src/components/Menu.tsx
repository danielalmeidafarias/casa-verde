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
  color: #313131;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
    font-size: 2em;
    text-align: center;
  }
`

const Li = styled.li`
  font-weight: 600;
  font-size: 12px;
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
          <Li>/</Li>
          <Li>Ofertas</Li>
          <Li>/</Li>
          <Li>Depoimentos</Li>
          <Li>/</Li>
          <Li>Vídeos</Li>
          <Li>/</Li>
          <Li>Meu Carrinho</Li>
        </Ul>
      </Nav>
    </div>

  );
}

export default Menu;