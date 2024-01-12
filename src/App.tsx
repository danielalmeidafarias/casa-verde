import Home from "./components/Home/Home";
import Ofertas from "./components/Ofertas/Ofertas";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Products/Products";
import PaginaPadrao from "./components/PaginaPadrao/PaginaPadrao";
import SendEmail from "./components/Admin/SendEmail/SendEmail";
import Cart from "./components/Cart/Cart";
import PaginaPadraoAdmin from "./components/Admin/PaginaPadraoAdmin";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import PaymentFailed from "./components/Payment/PaymentFailed";
import Unvaliable from "./components/Payment/Unvaliable";
import { useUserInfo } from "./hooks/useUserInfo";
import { H1 } from "./components/Home/SignInBox/SignInBox";
import Pedidos from "./components/Pedidos/Pedidos";

function App() {
  const userInfo = useUserInfo();

  if (!userInfo) {
    localStorage.clear();
  }

  return (
    <Routes>
      <Route path="/" element={<PaginaPadrao />}>
        <Route path="/" element={<Home />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/pedidos" element={<Pedidos />} />

        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfailed" element={<PaymentFailed />} />
        <Route path="/unvaliable" element={<Unvaliable />} />
      </Route>

      <Route path="/admin" element={<PaginaPadraoAdmin />}>
        <Route
          path="/admin"
          element={
            <Admin />
          }
        />
        <Route path="/admin/products" element={<Admin />} />
        <Route path="/admin/sendemail" element={<SendEmail />} />
      </Route>
    </Routes>
  );
}

export default App;
