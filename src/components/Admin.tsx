import axios from "axios";
import { IProduct } from "./OfertaProduct";
import { useEffect, useState } from "react";
import ItemAdmin from "./ItemAdmin";

const Admin = () => {
  const [plantas, setPlantas] = useState<IProduct[]>();

  const [nome, setNome] = useState<string>();
  const [preco, setPreco] = useState<number>();
  const [onSale, setOnSale] = useState<boolean>();
  const [imagem, setImagem] = useState<string>();

  const getPlantas = async () => {
    await axios.get(`http://localhost:3000/api/plantas`)
      .then(response => {
        setPlantas(response.data)
      })
  }

  useEffect(() => {
    
    getPlantas()

  }, [nome])



  const addPlanta = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    await axios.post<IProduct>(`http://localhost:3000/api/plantas`, {
      name: nome,
      image: imagem,
      price: preco,
      onSale: onSale
    }).then((response) => {
      console.log(response.status)

      if(response.status === 200) {
        window.alert('Produto adicionado com sucesso!')
        getPlantas()
      }
    }).catch(e => {
      if(e.response.status === 409) {
        window.alert('Produto ja adicionado!')
      }
    })
  }

  return (
    <div>
      <h1>Administração</h1>
      <form action="">
        <input placeholder="Nome" type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input placeholder="Preco" type="text"
          value={preco}
          onChange={e => setPreco(Number(e.target.value))}
        />
        <input placeholder="Imagem" type="text"
          value={imagem}
          onChange={e => setImagem(e.target.value)}
        />
        <input placeholder="Em promoção" type="checkbox"
          onChange={e => setOnSale(e.target.checked)}
        />
        <button
          onClick={(e) => addPlanta(e)}
          type="submit"
        >Adiconar</button>
      </form>
      {plantas?.map(planta => (
        <ItemAdmin 
        getPlantas={getPlantas}
        key={planta.id}
        id={planta.id}
        name={planta.name}
        price={planta.price}
        onSale={planta.onSale}
        image={planta.image}
        />
      ))}
    </div>
  );
}

export default Admin;