import styled from "styled-components"
import Home from "./components/Home"
import MinhaPlanta from "./components/MinhaPlanta"
import Ofertas from "./components/Ofertas"

const StyledApp = styled.div`

`

function App() {
  return (
    <StyledApp>
      <Home />
      <MinhaPlanta />
      <Ofertas />
    </StyledApp>
  )
}

export default App
