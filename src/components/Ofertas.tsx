import styled from "styled-components";
import { H1, P } from "./SignInBox";
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
  margin-bottom: 40px;
  margin-top: 40px;
`

const GridOfertas = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px;
  gap: 15px;
`

const Ofertas = () => {
  const products: IProduct[] = [
    {
      imgSrc: Product1,
      price: '20,00',
      title: 'Ajuda reptans'
    },
    {
      imgSrc: Product2,
      price: '20,00',
      title: 'Cordyline iruticosa'
    },
    {
      imgSrc: Product3,
      price: '20,00',
      title: 'Crassula ovata'
    },
    {
      imgSrc: Product4,
      price: '20,00',
      title: 'Cyperus rotundus'
    },

    {
      imgSrc: Product5,
      price: '20,00',
      title: 'Delairea odorata'
    },
    {
      imgSrc: Product6,
      price: '20,00',
      title: 'Datura Metel'
    },
  ]

  return (
    <StyledSection>

      <H1>Ofertas</H1>
      <GridOfertas>
        {
          products.map(product => (
            <OfertaProduct
              title={product.title}
              imgSrc={product.imgSrc}
              price={product.price}
            />
          ))
        }
      </GridOfertas>
    </StyledSection>
  );
}

export default Ofertas;