import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  height: 60px;
`;

const StyledButton = styled.button`
  width: 40%;
  background-color: var(--yellow);
  border: none;
  box-shadow: 0px 0px 20px -5px var(--yellow);
  color: white;
  font-weight: 300;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid white;
  transition: all ease-in-out 100ms;

  &:hover {
    box-shadow: 0px 0px 20px -1px var(--yellow);
  }
`;

const StyledInput = styled.input`
  width: 60%;
  background-color: white;
  border: none;
  padding-left: 20px;
  color: #727171;
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const Input = () => {
  const [email, setEmail] = useState<string>("");

  const emailSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const regularExpressionEmail = new RegExp(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    );
    const isValid = regularExpressionEmail.test(email);

    if (!isValid) {
      window.alert("Digite um email válido");
    }

    if (email && isValid) {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
          email,
        })
        .then(() => {
          setEmail("");

          window.alert("Email registrado com sucesso");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setEmail("");

            window.alert("Email ja registrado");
          }
        });
    }
  };

  return (
    <StyledForm>
      <StyledInput
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={`Insira seu e-mail`}
        type="email"
      />

      <StyledButton onClick={(e) => emailSubmit(e)} type="submit">
        Assinar newsletter
      </StyledButton>
    </StyledForm>
  );
};

export default Input;
