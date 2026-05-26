import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Admin/Admin/admin";
import Home from "./Website/pages/index";
import Menu from "./Website/pages/menu";
import About from "./Website/pages/aboutus";
import AddFood from "./Admin/Admin/addfood";
import EditFood from "./Admin/Admin/editFood";
import EditItem from "./Admin/Admin/editItem";
import Login from "./Auth/login";
import Signup from "./Auth/signup";
import Cart from "./Website/pages/cart";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/add" element={<AddFood />} />
      <Route path="/admin/edit" element={<EditFood />} />
      <Route path="/admin/edit/:id" element={<EditItem />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;