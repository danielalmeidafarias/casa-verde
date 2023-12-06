import styled from 'styled-components';
import Hero from '../assets/imagem-hero 1.png'
import Vector from '../assets/Vector.png'
import { useEffect, useState } from 'react';


const StyledBackGround = styled.div`
  width: 50vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
`

const StyledHero = styled.img<{ $rightValue?: number }>`
  height: 100%;
  position: absolute;
  bottom: 0px;
  right: ${props => {
    console.log(props.$rightValue)
    return props.$rightValue
  }
  }px;
`

const StyledVector = styled.img`
  height: 65vh;
  position: absolute;
  right: 0;
`

// Testar passar como prop a vw e assim fazer a postion variar inversamente
// Pegar como base a posição numa tela

const BackGround = () => {
  const [width, setWidth] = useState<number>(window.screen.width)
  const [vectorPosition, setVectorPosition] = useState<number>()

  window.onresize = () => {
    setWidth(window.screen.width)
  }

  const calculoPosition = (width: number): number => {
    return (45 * (width - 1000)) / 182
  }

  useEffect(() => {

    setVectorPosition(calculoPosition(width))

  }, [width])


  return (
    <StyledBackGround>
      <StyledVector src={Vector} alt="" />
      <StyledHero
        $rightValue={vectorPosition}
        src={Hero} alt="" />
    </StyledBackGround>
  );
}

export default BackGround;