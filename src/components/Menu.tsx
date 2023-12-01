import styled from 'styled-components';
import Logo from '../assets/logo.png'

const Nav = styled.nav`
  display: flex;
  width: 100vw;
  justify-content: space-around;
  align-items: center;
`

const Ul = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 10px;
`

const Li = styled.li`
  font-weight: 600;
`

const Menu = () => {
  return (  
    <Nav>
      <img src={Logo} alt="Logo Casa Verde" />
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
  );
}
 
export default Menu;