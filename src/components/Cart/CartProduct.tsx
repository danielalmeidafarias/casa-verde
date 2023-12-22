import { useEffect, useState } from "react";
import { ICartProduct } from "../../interfaces/ICart";
import axios from "axios";
import { IProduct } from "../../interfaces/IProduct";
import { StyledBox as Box } from "../Box";
import { H1 as StyledH1, P as StyledP } from "../Home/SignInBox/SignInBox";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa6";
import useAddToCart from "../../hooks/useAddToCart";
import useUserId from "../../hooks/useUserId";
import useCart from "../../hooks/useCart";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../state/atom";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";

const StyledBox = styled(Box)`
  height: 40px;
  /* width: 500px; */
  width: 50vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: var(--backgroundColor);
  border-radius: 10px;
  padding: 20px;


  @media screen and (max-width: 768px){
  height: 100px;
    
  }
`

const H1 = styled(StyledH1)`
  font-size: 28px;
  text-align: left;
  width: 100%;
`
const P = styled(StyledP)`
  font-size: 18px;
  display: flex;
  justify-content: center;
`

const StyledImage = styled.img`
  height: 100%;
`

const CounterDiv = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px;
  border: 1px solid #aca8a8;
  border-radius: 5px;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const RightDiv = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface Props extends ICartProduct {
  total: number
  setTotal: React.Dispatch<React.SetStateAction<number>>
}

const CartProduct = ({ id, number, total, setTotal }: Props ) => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState<number>()
  const [image, setImage] = useState('')

  const userId = useUserId()
  const cart = useCart()
  const setCart = useSetRecoilState(cartState)


  const handleAddToCart = useAddToCart({ userId, cart, setCart })

  const handleRemoveFromCart = useRemoveFromCart({ userId, cart, setCart })

  const getProduct = async () => {

    await axios.get<IProduct>(`http://localhost:3000/api/plantas/${id}`)
      .then(response => {
        const data = response.data
        setName(data.name)
        setPrice(data.price)
        setImage(data.image)

      })
      .catch(err => {
        console.error(err)
      })

  }

  const addProduct = async (plantaID: number) => {

    await axios.get(`http://localhost:3000/api/plantas/${plantaID}`)
      .then(response => {
        const data = response.data
        handleAddToCart({
          id: data.id,
          number: data.number
        })
      })
      .catch((err: any) => {
        console.error(err)
      })

  }

  const removeProduct = async (plantaID: number) => {

    await axios.get(`http://localhost:3000/api/plantas/${plantaID}`)
      .then(response => {
        const data = response.data
        handleRemoveFromCart({
          id: data.id,
          number: data.number
        })
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  console.log(total)

  useEffect(() => {

    if(price) {
      setTotal(total + price)
    }

    getProduct()
  }, [])

  return (
    <StyledBox>
      <StyledImage src={image} alt="" />
      <h1>{name}</h1>
      <RightDiv>
        <CounterDiv>
          <Button
            onClick={() => addProduct(id)}
          >
            <FaPlus />
          </Button>
          <p>{number}</p>

          <Button
            onClick={() => removeProduct(id)}
          >
            <FaMinus />
          </Button>
        </CounterDiv>
        <p>R$ {price ? price * number : null},00</p>
      </RightDiv>

    </StyledBox>
  );
}

export default CartProduct;