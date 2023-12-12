import styled from "styled-components"
import Home from "./components/Home/Home"
import MinhaPlanta from "./components/Home/MinhaPlanta/MinhaPlanta"
import Ofertas from "./components/Ofertas/Ofertas"
import { Route, Routes } from "react-router-dom"
import Admin from "./components/Admin/Admin"
import PaginaPadrao from "./components/PaginaPadrao/PaginaPadrao"

const StyledApp = styled.div`
`

function App() {
  return (
    <StyledApp>
      <Routes>

        <Route path="/" element={<PaginaPadrao />}>
          <Route path="/" element={
            <>
              <Home />
              <MinhaPlanta />
            </>
          } />

          <Route path="/ofertas" element={<>
            <Ofertas />
          </>} />
        </Route>





        <Route path="/admin" element={
          <Admin />
        } />
      </Routes>

    </StyledApp>
  )
}

export default App
