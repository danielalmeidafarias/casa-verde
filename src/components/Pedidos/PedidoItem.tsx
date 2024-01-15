import { IPedido } from "../../interfaces/IPedido";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyledBox as Box } from "../Cart/CartProduct";
import styled from "styled-components";
import { Button } from "@mui/material";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IUser } from "@/interfaces/IUser";
import useHandlePayment from "../../hooks/useHandlePayment";

const StyledBox = styled(Box)`
  height: auto;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileStyledBox = styled(Box)`
  height: auto;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const BlackLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #6b6a6a;
`;

const UpBox = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;

  @media screen and (max-width: 768px) {
    width: 80vw;
    height: 60px;
  }
`;

const MobileUpBox = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;

  @media screen and (max-width: 768px) {
    width: 80vw;
    height: 60px;
  }
`;

const MobileFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const PedidoInfoDiv = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};

  width: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;

const DownBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  gap: 10px;
`;

const MobileDownBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  gap: 10px;

  @media screen and (max-width: 768px) {
    width: 80vw;
    height: 60px;
  }
`;

const P = styled.p`
  overflow: hidden;
  font-weight: 500;
  display: flex;
`;

const ProductTitle = styled.h1`
  width: 30%;
`;
const ProductPrice = styled.p`
  width: 30%;
  display: flex;
  justify-content: flex-end;
`;

const StatusP = styled.p<{ $status: string }>`
  color: ${(props) => props.$status === `complete` && `green`};
  color: ${(props) => props.$status === `expired` && `red`};
  color: ${(props) => props.$status === `open` && `blue`};
`;
interface Props {
  pedidoInfo: IPedido;
  userInfo: IUser;
}

const PedidoItem = ({ pedidoInfo, userInfo }: Props) => {
  const [pedidoDate, setPedidoDate] = useState<string>();
  const [pedidoStatus, setPedidoStatus] = useState<string>();
  const [detailsIsOpen, setDetailsIsOpen] = useState<boolean>(false);
  const handlePayment = useHandlePayment(pedidoInfo.cart, userInfo);

  useEffect(() => {
    if (pedidoInfo) {
      const date = new Date(pedidoInfo?.date);
      setPedidoDate(date.toLocaleString());
    }

    if (pedidoInfo?.status === "complete") {
      setPedidoStatus("Completo");
    } else if (pedidoInfo?.status === "expired") {
      setPedidoStatus("Cancelado");
    } else if (pedidoInfo?.status === "open") {
      setPedidoStatus("Em aberto");
    }
  }, [pedidoInfo]);

  const paymentFunction = () => {
    if (pedidoInfo && pedidoInfo?.status == "open") {
      window.location.href = pedidoInfo?.paymentUrl;
    } else if (
      pedidoInfo.status === `complete` ||
      pedidoInfo.status === `expired`
    ) {
      handlePayment();
    }
  };

  const cancelPedido = async () => {
    await axios
      .put(`http://localhost:3000/api/pedidos/${userInfo.id}/cancel`, {
        session_id: pedidoInfo.id,
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert(`Pedido ${pedidoInfo.id} cancelado com sucesso`);
          window.location.reload();
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const refound = async () => {
    await axios
      .put(`http://localhost:3000/api/pedidos/${userInfo.id}/refound`, {
        payment_intent: pedidoInfo.paymentIntent,
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert(`Reembolso realizado com sucesso`);
          window.location.reload();
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <>
      {/* PedidItem para telas grandes */}
      <StyledBox>
        <UpBox>
          <P>
            {detailsIsOpen ? (
              <FaChevronUp
                style={{ cursor: "pointer" }}
                onClick={() => setDetailsIsOpen(!detailsIsOpen)}
              />
            ) : (
              <FaChevronDown
                style={{ cursor: "pointer" }}
                onClick={() => setDetailsIsOpen(!detailsIsOpen)}
              />
            )}
            {pedidoDate}
          </P>
          <StatusP $status={pedidoInfo.status}>{pedidoStatus}</StatusP>
          <p>R${pedidoInfo?.subTotal},00</p>
          {pedidoInfo.status === `open` ? (
            <Button
              onClick={paymentFunction}
              variant="contained"
              sx={{ width: "70px" }}
              color={"info"}
            >
              Pagar
            </Button>
          ) : (
            <Button onClick={paymentFunction} variant="contained">
              {pedidoInfo.status === `complete`
                ? `Comprar Novamente`
                : `Tentar Novamente`}
            </Button>
          )}
        </UpBox>
        <DownBox>
          {pedidoInfo?.cart.map((item) => (
            <>
              {detailsIsOpen && <BlackLine />}

              <PedidoInfoDiv $isOpen={detailsIsOpen}>
                <ProductTitle>{item.name}</ProductTitle>
                <p>{item.number}</p>
                <ProductPrice>R${item.price * item.number},00</ProductPrice>
              </PedidoInfoDiv>
            </>
          ))}
          {pedidoInfo.status === `open` && detailsIsOpen && (
            <Button
              onClick={cancelPedido}
              color="warning"
              variant="contained"
              sx={{ width: `100%` }}
            >
              Cancelar pedido
            </Button>
          )}

          {pedidoInfo.status === `complete` && detailsIsOpen && (
            <Button
              onClick={refound}
              color="warning"
              variant="contained"
              sx={{ width: `100%` }}
            >
              Cancelar pedido
            </Button>
          )}
        </DownBox>
      </StyledBox>

      {/* PedidItem para telas pequenas */}

      <MobileStyledBox>
        <MobileUpBox>
          <MobileFlex>
            <P onClick={() => setDetailsIsOpen(!detailsIsOpen)}>{pedidoDate}</P>
            <StatusP $status={pedidoInfo.status}>{pedidoStatus}</StatusP>
            <p>R${pedidoInfo?.subTotal},00</p>
          </MobileFlex>
          <MobileFlex>
            {pedidoInfo.status === `open` ? (
              <Button
                onClick={paymentFunction}
                variant="contained"
                sx={{ width: "100%" }}
                color={"info"}
              >
                Pagar
              </Button>
            ) : (
              <Button
                sx={{ width: "100%" }}
                onClick={paymentFunction}
                variant="contained"
              >
                {pedidoInfo.status === `complete`
                  ? `Comprar Novamente`
                  : `Tentar Novamente`}
              </Button>
            )}
            <FaChevronDown
              onClick={() => setDetailsIsOpen(!detailsIsOpen)}
              size={20}
            />
          </MobileFlex>
        </MobileUpBox>
        <DownBox>
          {pedidoInfo?.cart.map((item) => (
            <>
              {detailsIsOpen && <BlackLine />}

              <PedidoInfoDiv $isOpen={detailsIsOpen}>
                <ProductTitle>{item.name}</ProductTitle>
                <p>{item.number}</p>
                <ProductPrice>R${item.price * item.number},00</ProductPrice>
              </PedidoInfoDiv>
            </>
          ))}
          {pedidoInfo.status === `open` && detailsIsOpen && (
            <Button
              onClick={cancelPedido}
              color="warning"
              variant="contained"
              sx={{ width: `100%` }}
            >
              Cancelar pedido
            </Button>
          )}

          {pedidoInfo.status === `complete` && detailsIsOpen && (
            <Button
              onClick={refound}
              color="warning"
              variant="contained"
              sx={{ width: `100%` }}
            >
              Cancelar pedido
            </Button>
          )}
        </DownBox>
      </MobileStyledBox>
    </>
  );
};

export default PedidoItem;
