import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ServicesProducts from "./pages/services/ServicesProducts";
import AddService from "./pages/services/AddService";
import EditService from "./pages/services/EditService";
import DetailBrg from "./pages/DetailBrg";
import DetailService from "./pages/services/DetailService";
import Bhp from "./pages/bhp/Bhp";
import AddBhp from "./pages/bhp/AddBhp";
import EditBhp from "./pages/bhp/EditBhp";
import DetailBhp from "./pages/bhp/DetailBhp";
import PrintProducts from "./pages/PrintProducts";
import PrintQrcodeProducts from "./pages/PrintQrcodeProducts";
import PrintBhp from "./pages/bhp/PrintBhp";
import PrintQrcodeBhp from "./pages/bhp/PrintQrcodeBhp";
import PrintServices from "./pages/services/PrintServices";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/detail/:id" element={<DetailBrg />} />
          <Route path="/services" element={<ServicesProducts />} />
          <Route path="/services/add" element={<AddService />} />
          <Route path="/services/add/:id" element={<AddService />} />
          <Route path="/services/edit/:id" element={<EditService />} />
          <Route path="/services/detail/:id" element={<DetailService />} />
          <Route path="/bhp" element={<Bhp />} />
          <Route path="/bhp/add" element={<AddBhp />} />
          <Route path="/bhp/edit/:id" element={<EditBhp />} />
          <Route path="/bhp/detail/:id" element={<DetailBhp />} />
          <Route path="/products/print" element={<PrintProducts />} />
          <Route path="/products/qrcode" element={<PrintQrcodeProducts />} />
          <Route path="/bhp/print" element={<PrintBhp />} />
          <Route path="/bhp/qrcode" element={<PrintQrcodeBhp />} />
          <Route path="/services/print" element={<PrintServices />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
