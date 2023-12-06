import styled from "styled-components";
import { IProduct } from "./OfertaProduct";
import { MdDelete } from 'react-icons/md'
import axios from "axios";

const StyledItemAdmin = styled.div`
  display: grid;
  grid-template-columns: 150px 150px 150px 150px 150px 150px;
`

interface Props extends IProduct {
  getPlantas: () => void
}

const ItemAdmin = ({ name, price, onSale, image, id, getPlantas }: Props) => {

  const deleteItem = async (id: number) => {

    await axios.delete(`http://localhost:3000/api/plantas/${id}`)
    .then(() => {
      getPlantas()
    })

  }

  return (
    <StyledItemAdmin>
      <h3>{name}</h3>
      <p>{price},00</p>
      <p>{`${onSale ? 'Promocao' : ''}`}</p>
      <p>{image}</p>
      <button>editar</button>
      <MdDelete
        onClick={() => deleteItem(id)}
        style={{cursor: 'pointer'}}
        color={'gray'}
        size={24}
      />
    </StyledItemAdmin>
  );
}

export default ItemAdmin;