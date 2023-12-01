import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  height: 60px;
`

const StyledButton = styled.button`
  width: 40%;
  background-color: var(--yellow);
  border: none;
  box-shadow: 0px 0px 20px -5px var(--yellow);
  color: white;
  font-weight: 300;
  font-size: 16px;
`

const StyledInput = styled.input`
  width: 60%;
  background-color: white;
  border: none;
  padding-left: 20px;
  color: #727171;
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.1);

`

const Input = () => {
  return (  
    <StyledForm>
      <StyledInput 
      placeholder={`Insira seu e-mail`}
      type="text" />
      <StyledButton>Assinar newsletter</StyledButton>
    </StyledForm>
  );
}
 
export default Input;