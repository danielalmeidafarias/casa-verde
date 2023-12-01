import styled from "styled-components";

const Div = styled.div<{ $isOpen?: boolean }>`
  height: 3px;
  border-radius: 5px;
  background-color: black;
  width: 30px;
  transition: all ease-in 0.1s;

`

const Div1 = styled(Div)`
  @media screen and (max-width: 768px){
    rotate: ${props => props.$isOpen && '45deg'};
    transform: ${props => props.$isOpen && 'translate(0, 5px)'};
  };

`

const Div2 = styled(Div)`
  @media screen and (max-width: 768px){
    rotate: ${props => props.$isOpen && '-45deg'};
    transform: ${props => props.$isOpen && 'translate(0, -5px)'};
  };
`

const Div3 = styled(Div)`
  @media screen and (max-width: 768px){
    display: ${props => props.$isOpen && 'none'};
    rotate: ${props => props.$isOpen && '-45deg'};
  };
`

const StyledHamburgerButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 3ms;
  position: fixed;
  top: 20px;
  left: 20px;


  @media screen and (min-width: 768px){
    display: none;
  }
`

interface Props {
  $isOpen?: boolean
  onClick: () => void
}

const HamburgerButton = ({ $isOpen, onClick }: Props) => {
  return (  
    <StyledHamburgerButton onClick={onClick}>
      <Div1 $isOpen={$isOpen} ></Div1>
      <Div3 $isOpen={$isOpen} ></Div3>
      <Div2 $isOpen={$isOpen} ></Div2>
    </StyledHamburgerButton>
  );
}
 
export default HamburgerButton;