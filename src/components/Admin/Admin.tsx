import { useEffect } from "react";
import { H1 } from "../Home/SignInBox/SignInBox";
import { useUserInfo } from "../../hooks/useUserInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const userInfo = useUserInfo();
  const navigate = useNavigate()

  const adminLogin = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/admin?adminId=${userInfo?.id}`).then((response) => {
      if(response.status === 200) {
        window.alert("Admin logado")
      }
    }).catch(() => {
      navigate("/")
    });
  };

  useEffect(() => {
    adminLogin();
  }, [userInfo]);

  return (
    <div
      style={{
        marginTop: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <H1>Administração Casa Verde</H1>
    </div>
  );
};

export default Admin;
