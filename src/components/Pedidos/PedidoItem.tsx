import { IPedido } from "../../interfaces/IPedido";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyledBox as Box } from "../Cart/CartProduct";
import styled from "styled-components";
import { Button } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  id: string;
  userId: string;
}

const StyledBox = styled(Box)`
  height: auto;
  flex-direction: column;
  gap: 10px;
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

const PedidoInfoDiv = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};

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

  @media screen and (max-width: 768px) {
    width: 80vw;
    height: 60px;
  }
`;

const P = styled.p`
  overflow: hidden;
  font-weight: 500;
  display: flex;
  cursor: pointer;
`;

const ProductTitle = styled.h1`
width: 30%;
`
const ProductPrice = styled.p`
width: 30%;
display: flex;
justify-content: flex-end;
`

const PedidoItem = ({ id, userId }: Props) => {
  const [pedidoInfo, setPedidoInfo] = useState<IPedido>();
  const [pedidoDate, setPedidoDate] = useState<string>();
  const [pedidoStatus, setPedidoStatus] = useState<string>();
  const [detailsIsOpen, setDetailsIsOpen] = useState<boolean>(false)

  const getPedidoInfo = async () => {
    axios
      .get<IPedido>(`http://localhost:3000/api/pedidos/${userId}/${id}`)
      .then((response) => {
        setPedidoInfo(response.data);
      });
  };

  useEffect(() => {
    getPedidoInfo();
  }, []);

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
    } else {
      setDetailsIsOpen(!detailsIsOpen)
    }
  };

  // console.log(pedidoInfo?.date);

  return (
    <>
      {pedidoInfo?.status !== "expired" && (
        <StyledBox>
          <UpBox>
            <P
            onClick={() => setDetailsIsOpen(!detailsIsOpen)}
            >
              <FaChevronDown />
              {pedidoDate}
            </P>
            <p>{pedidoStatus}</p>
            <p>R${pedidoInfo?.subTotal},00</p>
            <Button
              onClick={paymentFunction}
              variant="contained"
              sx={{ width: "70px" }}
              // disabled={pedidoInfo?.status == "complete"}
              color={pedidoInfo?.status == "complete" ? "success" : "info"}
            >
              {pedidoInfo?.status == "complete" ? "Pago" : "Pagar"}
            </Button>
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
          </DownBox>
        </StyledBox>
      )}
    </>
  );
};

export default PedidoItem;
