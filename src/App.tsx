import styled from "styled-components"
import Home from "./components/Home/Home"
import Ofertas from "./components/Ofertas/Ofertas"
import { Route, Routes } from "react-router-dom"
import Admin from "./components/Admin/Admin"
import PaginaPadrao from "./components/PaginaPadrao/PaginaPadrao"
import { GoogleOAuthProvider } from "@react-oauth/google"

function App() {
  return (

    <Routes>
      <Route path="/" element={<PaginaPadrao />}>
        <Route path="/" element={
          <>
            <Home />
            {/* <MinhaPlanta /> */}
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
  )
}

export default App
