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


const MinhaPlantaItem = ({ children }: Props) => {
  return (  
    <Li>
      <Circle></Circle>
      <P>{children}</P>
    </Li>
  );
}
 
export default MinhaPlantaItem;