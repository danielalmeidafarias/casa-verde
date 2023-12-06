import styled from "styled-components"
import Home from "./components/Home"
import MinhaPlanta from "./components/MinhaPlanta"
import Ofertas from "./components/Ofertas"
import { Route, Routes } from "react-router-dom"
import Admin from "./components/Admin"

const StyledApp = styled.div`
`

function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <MinhaPlanta />
            <Ofertas />
          </>
        } />
        <Route path="/admin" element={
          <Admin />
        }/>
      </Routes>

    </StyledApp>
  )
}

export default App
