import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginButton from '../LoginButton';

const Nav = styled.nav<{ $isOpen?: boolean }>`
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

`

const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 15px;

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

  return (
    <div>
      <Nav>
        Admin Casa Verde

        <Ul>
          {/* <StyledLink to={'/'}>Como Fazer</StyledLink>
          <span>/</span> */}
          <StyledLink to={'/admin/products'}>Produtos</StyledLink>
          <span>/</span>
          <StyledLink to={"/admin/sendemail"}>Envio de Emails</StyledLink>
          <span>/</span>
          <StyledLink to={"/"}>Voltar ao site</StyledLink>
        </Ul>
        <LoginButton />

      </Nav>

    </div>

  );
}

export default Menu;