import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import useUserId from '../hooks/useUserId'
import useDeleteCookies from "../hooks/useDeleteCookies";
import styled from "styled-components";
import { CiLogout } from "react-icons/ci";
import useSetUserId from "../hooks/useSetUserId";

const Button = styled.button`
  background-color: white;
  border-radius: 20px;
  border: 1px solid #c3c2c2;
  color: #2e2d2d;
  width: 115px;
  height: 30px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  transition: all ease-in-out 200ms;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover { 
    background-color: rgba(112, 162, 247, 0.05);
    border: 1px solid rgba(112, 162, 247, 0.3);

  }
`

const LoginButton = () => {
  const userId = useUserId()
  const setUserId = useSetUserId()

  return (  

      <>
        {
          userId == '' ? 
          <GoogleLogin
          shape='circle'
          type='standard'
          text='signin'
          size='medium'
          onSuccess={async(credentialResponse) => {
            axios.post('http://localhost:3000/api/auth', {
              credential: credentialResponse.credential
            }).then(response => {
              setUserId(response.data)
              const expiresAt = new Date(Date.now() + 86400000).toUTCString()
              document.cookie = `userId=${response.data.id}; expires=${expiresAt}; path=/`
            })
          }}
          onError={() => {
            window.alert('Login falhou')
            console.log('Login Failed');
          }}
        />
          :
          <Button
          onClick={() => {
            setUserId('')
            useDeleteCookies()
          }}
          ><CiLogout />Logout</Button>
        }
      </>

  );
}
 
export default LoginButton;