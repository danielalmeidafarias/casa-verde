import styled from "styled-components";
import { H1, P as StyledP } from "../Home/SignInBox/SignInBox";
import OfertaProduct from "./OfertaProduct";
import { IProduct } from "../../interfaces/IProduct";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useUserInfo } from "../../hooks/useUserInfo";

export const StyledSection = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 80px;
  gap: 20px;
  padding-bottom: 50px;
`;

export const GridOfertas = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px;
  gap: 15px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 300px 300px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 300px;
  }
`;

const P = styled(StyledP)`
  width: auto;
  font-size: 20px;
`;
const Input = styled.input`
  background-color: white;
  padding: 5px;
  color: black;
  outline: none;
  border: none;
  width: 200px;
  height: 20px;
  font-size: 18px;
  box-shadow: 10px 0px 20px 2px rgba(62, 62, 62, 0.2);
`;

const FlexDiv = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const Ofertas = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [promoFilter, setPromoFilter] = useState<boolean>(false);
  const [textFilter, setTextFilter] = useState<string>("");

  const userInfo = useUserInfo();

  const getPlantas = async () => {
    await axios
      .get<IProduct[]>(`${import.meta.env.VITE_API_URL}/api/plantas`)
      .then((response) => {
        if (!promoFilter && !textFilter) {
          setProducts(response.data);
          return;
        }

        filter(response);
      });
  };

  const filter = (response: AxiosResponse<any, any>) => {
    if (promoFilter && !textFilter) {
      const listaFiltrada = response.data.filter(
        (product: IProduct) => product.onSale === true
      );
      setProducts([...listaFiltrada]);
    } else if (textFilter && !promoFilter) {
      const searchRegExp = new RegExp(textFilter.toLocaleLowerCase());
      const listaFiltrada = response.data.filter((product: IProduct) =>
        searchRegExp.test(product.name.toLowerCase())
      );
      setProducts([...listaFiltrada]);
    } else if (promoFilter && textFilter) {
      const searchRegExp = new RegExp(textFilter.toLocaleLowerCase());
      const listaFiltrada = response.data.filter(
        (product: IProduct) =>
          product.onSale === true &&
          searchRegExp.test(product.name.toLowerCase())
      );
      setProducts([...listaFiltrada]);
    }
  };

  useEffect(() => {
    getPlantas();
  }, [textFilter, promoFilter]);

  return (
    <StyledSection>
      <H1>Ofertas</H1>
      <FlexDiv>
        <Input
          placeholder="Procurar produto"
          onChange={(e) => setTextFilter(e.target.value)}
          value={textFilter}
          type="text"
        />
        <FlexDiv>
          <input
            type="checkbox"
            onChange={(e) => setPromoFilter(e.target.checked)}
          />
          <P>Promoção</P>
        </FlexDiv>
      </FlexDiv>
      <GridOfertas>
        {products.map((product) => (
          <OfertaProduct
            userInfo={userInfo}
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            number={product.number}
          />
        ))}
      </GridOfertas>
    </StyledSection>
  );
};

export default Ofertas;
