import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    window.alert("Pagamento realizado com sucesso!");
  }, []);

  return <Navigate to={"/pedidos"} />;
};

export default PaymentSuccess;
