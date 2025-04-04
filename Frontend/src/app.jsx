import { Button, button } from "@material-tailwind/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from './pages/Home/homepage';
import Nopage from './pages/Nopages/nopage';
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./Components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";
import Admin from "./pages/Admin";

import FashionCategoryPage from "./Components/Categoryinside/fashion";

export function App() {
  return (
    <MyState>
    <Router>
      <ScrollTop/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/*" element={<Nopage/>}/>
        <Route path="/productinfo/:id" element={<ProductInfo/>}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/allproduct" element={<AllProduct />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* <Route path="/category/:categoryname" element={<CategoryPage />} /> */}
        <Route path='/category/Fashion' element={<FashionCategoryPage />} />
        <Route path="/user-dashboard" element={
          <ProtectedRouteForUser>
            <UserDashboard/>
          </ProtectedRouteForUser>
        }/>
        <Route path="/admin-dashboard" element={
          <ProtectedRouteForAdmin>
            <AdminDashboard/>
          </ProtectedRouteForAdmin>
        }/>
        <Route path="/addproduct" element={
          <ProtectedRouteForAdmin>
            <AddProductPage/>
          </ProtectedRouteForAdmin>
        }/>
        <Route path="/updateproduct/:id" element={
          <ProtectedRouteForAdmin>
            <UpdateProductPage/>
          </ProtectedRouteForAdmin>
        }/>
      </Routes>
      <Toaster/>
    </Router>
    </MyState>
  );
}