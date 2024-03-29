import { IProduct } from "../../../interfaces/IProduct";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import axios from "axios";
import {
  Button,
  Checkbox,
  Hidden,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { useUserInfo } from "../../../hooks/useUserInfo";

interface Props extends IProduct {
  getPlantas: () => void;
}

const ProductItem = ({
  name,
  price,
  number,
  onSale,
  image,
  id,
  getPlantas,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);

  const [editName, setEditName] = useState<string>(name);
  const [editPrice, setEditPrice] = useState<number>(price);
  const [editImage, setEditImage] = useState<string | ArrayBuffer | null>(
    image
  );
  const [editOnSale, setEditOnSale] = useState<boolean | undefined>(onSale);
  const [editNumber, setEditNumber] = useState<number>(number);

  const userInfo = useUserInfo();

  const deleteItem = async (id: number) => {
    await axios
      .delete(
        `${import.meta.env.VITE_API_URL}/admin/plantas?id=${id}&adminId=${userInfo?.id}`
      )
      .then(() => {
        getPlantas();
      });
  };

  const editItem = async () => {
    if (edit) {
      await axios
        .put(
          `${import.meta.env.VITE_API_URL}/admin/plantas?id=${id}&adminId=${userInfo?.id}`,
          {
            plantaAtualizada: {
              name: editName,
              image: editImage,
              price: editPrice,
              number: editNumber,
              onSale: editOnSale,
            },
          }
        )
        .then(() => {
          getPlantas();
        });
    }

    setEdit(!edit);
  };

  const revertChanges = () => {
    setEditName(name);
    setEditImage(image);
    setEditOnSale(onSale);
    setEditPrice(price);
    setEditNumber(number);
  };

  const getImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else return;
  };

  return (
    <>
      {!edit ? (
        <TableRow>
          <TableCell>{name}</TableCell>
          <TableCell>{price},00</TableCell>
          <TableCell>{number}</TableCell>
          <TableCell>{`${onSale ? "Sim" : "Não"}`}</TableCell>
          <TableCell>
            <img style={{ width: "40px" }} src={image} alt="" />
          </TableCell>
          <TableCell>
            <Button
              onClick={editItem}
              variant="contained"
              startIcon={<MdEdit />}
            >
              Editar
            </Button>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => deleteItem(id)}
              startIcon={<MdDelete />}
            >
              Excluir
            </Button>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell>
            <TextField
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </TableCell>

          <TableCell>
            <TextField
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
            />
          </TableCell>

          <TableCell>
            <TextField
              placeholder="Adicionar"
              // value={editNumber}
              onChange={(e) => setEditNumber(Number(e.target.value))}
            />
          </TableCell>

          <TableCell>
            <Checkbox
              defaultChecked={onSale && true}
              value={editOnSale}
              onChange={(e) => {
                setEditOnSale(e.target.checked);
              }}
            />
          </TableCell>

          <TableCell>
            <Button
              component="label"
              variant="contained"
              startIcon={<FaCloudUploadAlt />}
            >
              <Hidden
                children={
                  <input
                    required
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => getImage(e)}
                  />
                }
              />
            </Button>
          </TableCell>

          <TableCell>
            <Button
              onClick={editItem}
              variant="contained"
              startIcon={<MdSave />}
            >
              Salvar
            </Button>
          </TableCell>

          <TableCell>
            <Button
              onClick={revertChanges}
              variant="contained"
              startIcon={<GrRevert />}
            >
              Reverter
            </Button>
          </TableCell>

          <TableCell>
            <Button onClick={() => setEdit(false)}>
              <IoMdClose size={30} />
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ProductItem;
