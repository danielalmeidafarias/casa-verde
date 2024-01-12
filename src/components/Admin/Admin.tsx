import { useEffect } from "react";
import { H1 } from "../Home/SignInBox/SignInBox";
import { useUserInfo } from "../../hooks/useUserInfo";
import axios from "axios";

const Admin = () => {
  const userInfo = useUserInfo()

  const adminLogin = async () => {
    await axios.get(`http://localhost:3000/admin?adminId=${userInfo?.id}`)
  }

  useEffect(() => {
    adminLogin()
  }, [userInfo])

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
