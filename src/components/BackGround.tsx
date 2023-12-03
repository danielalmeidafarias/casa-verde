import styled from 'styled-components';
import Hero from '../assets/imagem-hero 1.png'
import Vector from '../assets/Vector.png'

const StyledBackGround = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`

const StyledHero = styled.img`
  height: 100%;
  position: absolute;
  bottom: 0px;
  right: 20%;
`

const StyledVector = styled.img`
  height: 65vh;
  position: absolute;
  right: 0;
`

const BackGround = () => {
  return (
    <StyledBackGround>
      <StyledVector src={Vector} alt="" />
      <StyledHero src={Hero} alt="" />
    </StyledBackGround>
  );
}
 
export default BackGround;