import { useEffect, useState } from "react";
import { ICartProduct } from "../../interfaces/ICart";
import axios from "axios";
import { IProduct } from "../../interfaces/IProduct";
import { StyledBox as Box } from "../Box";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa6";
import useAddToCart from "../../hooks/useAddToCart";
import useCart from "../../hooks/useCart";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../state/atom";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import { IUser } from "../../interfaces/IUser";

export const StyledBox = styled(Box)`
  height: 40px;
  width: 50vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--backgroundColor);
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 80vw;
    height: 70px;
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledImage = styled.img`
  height: 100%;
`;

const ImageDiv = styled.div`
  height: 100%;
  width: 60px;
`;

const CounterDiv = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px;
  border: 1px solid #aca8a8;
  border-radius: 5px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const RightDiv = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LeftDiv = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

interface Props extends ICartProduct {
  userInfo: IUser;
}

const CartProduct = ({ id, number, userInfo }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState("");

  const cart = useCart();
  const setCart = useSetRecoilState(cartState);

  const handleAddToCart = useAddToCart({ userInfo, cart, setCart });

  const handleRemoveFromCart = useRemoveFromCart({ userInfo, cart, setCart });

  const getProduct = async () => {
    await axios
      .get<IProduct>(`http://localhost:3000/api/plantas/${id}`)
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addProduct = async (plantaID: number) => {
    await axios
      .get(`http://localhost:3000/api/plantas/${plantaID}`)
      .then((response) => {
        const data = response.data;
        handleAddToCart({
          id: data.id,
          number: data.number,
          price: data.price,
          name: data.name,
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const removeProduct = async (plantaID: number) => {
    await axios
      .get(`http://localhost:3000/api/plantas/${plantaID}`)
      .then((response) => {
        const data = response.data;
        handleRemoveFromCart({
          id: data.id,
          number: data.number,
          price: data.price,
          name: data.name,
        });
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <StyledBox>
        <LeftDiv style={{ height: "40px" }}>
          <ImageDiv>
            <StyledImage src={image} alt="" />
          </ImageDiv>

          <h1>{name}</h1>
        </LeftDiv>

        <RightDiv>
          <CounterDiv>
            <Button onClick={() => addProduct(id)}>
              <FaPlus />
            </Button>
            <p>{number}</p>

            <Button
              onClick={() => {
                removeProduct(id);
              }}
            >
              <FaMinus />
            </Button>
          </CounterDiv>
          <p>R$ {price ? price * number : null},00</p>
        </RightDiv>
      </StyledBox>
    </>
  );
};

export default CartProduct;
