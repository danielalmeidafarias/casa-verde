import styled from "styled-components";
import { H1, P as StyledP } from "./SignInBox";
import OfertaProduct, { IProduct } from "./OfertaProduct";

import Product1 from '../assets/produto-01 1.png'
import Product2 from '../assets/produto-02 1.png'
import Product3 from '../assets/produto-03 1.png'
import Product4 from '../assets/produto-04 1.png'
import Product5 from '../assets/produto-05 1.png'
import Product6 from '../assets/produto-06 1.png'

const StyledSection = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 40px;
  gap: 20px;
`

const GridOfertas = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px;
  gap: 15px;
`

const P = styled(StyledP)`
  width: auto;
  font-size: 20px;
`

const Ofertas = () => {
  const products: IProduct[] = []

  return (
    <StyledSection>
      <P>Conheça nossas ofertas</P>
      <H1>Ofertas</H1>
      <GridOfertas>
        {
          products.map(product => (
            <OfertaProduct
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))
        }
      </GridOfertas>
    </StyledSection>
  );
}

export default Ofertas;