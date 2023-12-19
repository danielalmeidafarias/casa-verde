import Home from "./components/Home/Home"
import Ofertas from "./components/Ofertas/Ofertas"
import { Route, Routes } from "react-router-dom"
import Admin from "./components/Admin/Products/Products"
import PaginaPadrao from "./components/PaginaPadrao/PaginaPadrao"
import SendEmail from "./components/Admin/SendEmail/SendEmail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPadrao />}>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/ofertas" element={<>
          <Ofertas />
        </>} />
      </Route>
      {/* <Route path="/admin" element={
        <Admin />
      } /> */}

      <Route path="/admin">

        <Route path="/admin/products" element={
          <Admin />
        }/>

        <Route path="/admin/sendemail" element={
          <SendEmail />
        }/>

      </Route>
    </Routes>
  )
}

export default App
