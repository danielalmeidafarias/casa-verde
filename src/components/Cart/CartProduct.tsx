import { useEffect, useState } from "react";
import { ICartProduct } from "../../interfaces/ICart";
import axios from "axios";
import { IProduct } from "../../interfaces/IProduct";
import { StyledBox as Box } from "../Box"; 
import { H1 as StyledH1, P as StyledP } from "../Home/SignInBox/SignInBox";
import styled from "styled-components";
import { Button } from "@mui/material";
import { FaPlus, FaMinus } from "react-icons/fa6";
import useSetCart from "../../hooks/useSetCart";
import useUserId from "../../hooks/useUserId";
import useCart from "../../hooks/useCart";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../state/atom";

const StyledBox = styled(Box)`
  height: 70px;
  width: 500px;
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: var(--backgroundColor);
`

const MiddleDiv = styled.div`
`

const Counter = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  `

const H1 = styled(StyledH1)`
  font-size: 32px;
  text-align: left;
`
const P = styled(StyledP)`
  font-size: 18px;
  display: flex;
  justify-content: center;
`


const StyledImage = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
`


const CartProduct = ({id, number} : ICartProduct) => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState<number>()
  const [image, setImage] = useState('')

  const userId = useUserId()
  const cart = useCart()
  const setCart = useSetRecoilState(cartState)


  const handleSetCart = useSetCart({ userId, cart, setCart })

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
        handleSetCart({
          id: data.id,
          number: data.number
        })
      })
      .catch((err: any) => {
        console.error(err)
      })

  }

  useEffect(() => {
    getProduct()
  }, [])

  return (  
    <StyledBox>
      <StyledImage src={image} alt="" />
      <MiddleDiv>
        <H1>{name}</H1>
        <P>R${price},00</P>
      </MiddleDiv>

      <Counter>
        <Button 
        onClick={() => addProduct(id)}
        variant="contained"><FaPlus/></Button>
        <P>{number}</P>
        <Button variant="contained"><FaMinus/></Button>
      </Counter>
    </StyledBox>
  );
}
 
export default CartProduct;