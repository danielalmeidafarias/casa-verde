import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentFailed = () => {
  useEffect(() => {
    window.alert("O pagamento falhou, por favor tente novamente");
  }, []);

  return <Navigate to={"/carrinho"} />;
};

export default PaymentFailed;
