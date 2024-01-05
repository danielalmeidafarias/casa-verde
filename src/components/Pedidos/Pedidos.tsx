import { useEffect, useState } from "react";
import { StyledSection } from "../Ofertas/Ofertas";
import { H1 } from "../Home/SignInBox/SignInBox";
import { useUserInfo } from "../../hooks/useUserInfo";
import PedidoItem from "./PedidoItem";
import axios from "axios";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<{ id: string }[]>();
  const userInfo = useUserInfo();

  const getPedidos = async () => {
    await axios
      .get<{ id: string }[]>(
        `http://localhost:3000/api/pedidos/${userInfo?.id}`
      )
      .then((response) => {
        setPedidos(response.data);
      });
  };

  useEffect(() => {
    getPedidos();
  }, [userInfo]);

  return (
    <StyledSection>
      <H1>Seus Pedidos</H1>
      {userInfo ? (
        <>
          <div>Pedidos de {userInfo.name}</div>
          {pedidos && pedidos[0] ? (
            pedidos.map((pedido) => <PedidoItem key={pedido.id} id={pedido.id} userId={userInfo.id}/>)
          ) : (
            <p>
              {"Que pena, parece que você ainda não realizou nenhum pedido :("}
            </p>
          )}
        </>
      ) : (
        <div>Faça login para acessar seus pedidos</div>
      )}
    </StyledSection>
  );
};

export default Pedidos;
