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
          <Route path="/services/detail/:id" element={<DetailService />} />
          <Route path="/services" element={<ServicesProducts />} />
          <Route path="/services/add" element={<AddService />} />
          <Route path="/services/add/:id" element={<AddService />} />
          <Route path="/services/edit/:id" element={<EditService />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
