import axios from "axios";
import { IProduct } from "../../../interfaces/IProduct";
import { useEffect, useState } from "react";
import ProductItem from "./ItemAdmin";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Hidden,
} from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { H1 } from "../../Home/SignInBox/SignInBox";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [plantas, setPlantas] = useState<IProduct[]>();

  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<number>();
  const [onSale, setOnSale] = useState<boolean>(false);
  const [imagem, setImagem] = useState<string | ArrayBuffer | null>("");
  const [number, setNumber] = useState<number>();

  const userInfo = useUserInfo();

  const navigate = useNavigate()

  const getPlantas = async () => {
    await axios
      .get(`http://localhost:3000/admin/plantas/?adminId=${userInfo?.id}`, {
        data: {
          adminId: userInfo?.id,
        },
      })
      .then((response) => {
        setPlantas(response.data);
      }).catch(() => {
        navigate("/")
      })
  };

  const addPlanta = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!nome) {
      window.alert("Nome faltando");
      return;
    } else if (!preco) {
      window.alert("Preço faltando");
      return;
    } else if (!imagem) {
      window.alert("Imagem faltando");
      return;
    }

    await axios
      .post<IProduct>(
        `http://localhost:3000/admin/plantas`,
        {
          adminId: userInfo?.id,
          planta: {
            name: nome,
            image: imagem,
            price: preco,
            onSale: onSale,
            number: number
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          window.alert("Produto adicionado com sucesso!");

          setNome("");
          setPreco(0);
          setImagem("");

          getPlantas();
        }
      })
      .catch((e) => {
        if (e.response.status === 409) {
          window.alert("Produto ja adicionado!");
        }
      });
  };

  const getImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    } else return;
  };

  useEffect(() => {
    getPlantas();
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>
      <H1
        style={{
          width: "100vw",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Admin Products
      </H1>
      <form action="">
        <TableRow>
          <TableCell>
            <TextField
              required
              variant="filled"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              label="Nome"
            />
          </TableCell>

          <TableCell>
            <TextField
              required
              label="Preço"
              variant="filled"
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
            />
          </TableCell>

          <TableCell>
            <TextField
              required
              label="Estoque"
              variant="filled"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
            />
          </TableCell>

          <TableCell>
            <Button
              component="label"
              variant="contained"
              startIcon={<FaCloudUploadAlt />}
            >
              Escolher Imagem
              <Hidden
                children={
                  <input
                    required
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => getImage(e)}
                    // value={imagem}
                  />
                }
              />
            </Button>
          </TableCell>

          <TableCell>
            <FormControlLabel
              label="Promoção?"
              control={
                <Checkbox onChange={(e) => setOnSale(e.target.checked)} />
              }
            />
          </TableCell>

          <TableCell>
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => addPlanta(e)}
            >
              Adiconar
            </Button>
          </TableCell>
        </TableRow>
      </form>

      <Table sx={{ width: "90%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Estoque</TableCell>
            <TableCell>Promoção</TableCell>
            <TableCell>Imagem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plantas?.map((planta) => (
            <ProductItem
              getPlantas={getPlantas}
              key={planta.id}
              id={planta.id}
              name={planta.name}
              price={planta.price}
              number={planta.number}
              onSale={planta.onSale}
              image={planta.image}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
