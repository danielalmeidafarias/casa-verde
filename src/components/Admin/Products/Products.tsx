import axios from "axios";
import { IProduct } from "../../Ofertas/OfertaProduct";
import { useEffect, useState } from "react";
import ProductItem from "./ItemAdmin";
import { TextField, Button, Checkbox, FormControlLabel, Table, TableHead, TableRow, TableCell, TableBody, Hidden } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa"
import { H1 } from "../../Home/SignInBox/SignInBox";

const Products = () => {
  const [plantas, setPlantas] = useState<IProduct[]>();

  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<number>(0);
  const [onSale, setOnSale] = useState<boolean>(false);
  const [imagem, setImagem] = useState<string | ArrayBuffer | null>('');

  const getPlantas = async () => {
    await axios.get(`http://localhost:3000/api/plantas`)
      .then(response => {
        setPlantas(response.data)
      })
  }

  const addPlanta = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    if(!nome) {
      window.alert('Nome faltando')
      return
    } else if (!preco) {
      window.alert('Preço faltando')
      return

    } else if(!imagem) {
      window.alert('Imagem faltando')
      return

    }

    await axios.post<IProduct>(`http://localhost:3000/api/plantas`, {
      name: nome,
      image: imagem,
      price: preco,
      onSale: onSale
    }).then((response) => {
      if (response.status === 200) {
        window.alert('Produto adicionado com sucesso!')

        setNome('')
        setPreco(0)
        setImagem('')

        getPlantas()
      }
    }).catch(e => {
      if (e.response.status === 409) {
        window.alert('Produto ja adicionado!')
      }
    })
  }

  const getImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {

      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        console.log(reader.result)
        setImagem(reader.result)
      }
      reader.readAsDataURL(file)
    } else return
  }

  useEffect(() => {

    getPlantas()

  }, [])

  return (
    <div>
      <H1 style={{width: '100vw', justifyContent: 'center', textAlign: 'center'}}>Admin Products</H1>
      <form action="">
        <TableRow>
          <TableCell>
            <TextField
              required
              variant="filled"
              onChange={e => setNome(e.target.value)}
              value={nome}
              label="Nome" />
          </TableCell>

          <TableCell>
            <TextField
              required
              label="Preço"
              variant="filled"
              value={preco}
              onChange={e => setPreco(Number(e.target.value))}
            />
          </TableCell>

          <TableCell>
            <Button component="label" variant="contained" startIcon={<FaCloudUploadAlt />}>
              Escolher Imagem
              <Hidden children={
                <input
                  required
                  style={{ display: 'none' }}
                  type="file"
                  onChange={e => getImage(e)}
                  // value={imagem}
                />
              } />

            </Button>
          </TableCell>

          <TableCell>
            <FormControlLabel label="Promoção?" control={
              <Checkbox
                onChange={e => setOnSale(e.target.checked)}
              />
            } />
          </TableCell>

          <TableCell>
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => addPlanta(e)}
            >Adiconar</Button>
          </TableCell>
        </TableRow>

      </form>

      <Table sx={{ width: '90%' }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Promoção</TableCell>
            <TableCell>Imagem</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {plantas?.map(planta => (
            <ProductItem
              getPlantas={getPlantas}
              key={planta.id}
              id={planta.id}
              name={planta.name}
              price={planta.price}
              onSale={planta.onSale}
              image={planta.image}
            />
          ))}
        </TableBody>

      </Table>


    </div>
  );
}

export default Products;