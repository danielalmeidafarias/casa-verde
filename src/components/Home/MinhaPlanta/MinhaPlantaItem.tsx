import React from "react";
import styled from "styled-components";
import { P } from "../SignInBox/SignInBox";

interface Props {
  children: React.ReactNode
}

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--yellow);
  border-radius: 50%;
`

const Li = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StyledP = styled(P)`
  @media screen and (max-width: 800px){
    font-size: 22px;
  }

`

const MinhaPlantaItem = ({ children }: Props) => {
  return (  
    <Li>
      <Circle></Circle>
      <StyledP>{children}</StyledP>
    </Li>
  );
}
 
export default MinhaPlantaItem;