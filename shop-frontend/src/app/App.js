import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import ProductsList from "./../features/products/ProductsList";
import Product from "../features/products/Product";
import ProductForm from "../features/products/ProductForm";
import AuthorizedRoute from "./../components/AuthorizedRoute";
import ProtectedRoute from "./../components/ProtectedRoute";
import OrdersList from "./../features/orders/OrdersList";
import OrderDetails from "./../features/orders/OrderDetails";
import UsersList from "./../features/users/UsersList";
import UserDetails from "./../features/users/UserDetails";
import CartList from "./../features/cart/CartList";
import LoginForm from "./../features/authentication/LoginForm";
import RegistrationForm from "./../features/authentication/RegistrationForm";
import NavBar from "../components/NavBar";
import Unauthorized from './../components/unauthorized/Unauthorized';
import Profile from './../features/authentication/Profile';

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="profile" element={<Profile />} />

          <Route path="cart">
            <Route element={<ProtectedRoute />}>
              <Route index element={<CartList />} />
            </Route>
          </Route>

          <Route path="products">
            <Route index element={<ProductsList />} />
            <Route element={<ProtectedRoute />}>
              <Route path=":id" element={<Product />} />
              <Route element={<AuthorizedRoute />}>
                <Route path="addproduct" element={<ProductForm />} />
              </Route>
            </Route>
          </Route>

          <Route path="orders">
            <Route element={<ProtectedRoute />}>
              <Route index element={<OrdersList />} />
              <Route element={<AuthorizedRoute />}>
                <Route path=":id" element={<OrderDetails />} />
              </Route>
            </Route>
          </Route>

          <Route path="users">
            <Route element={<ProtectedRoute />}>
              <Route element={<AuthorizedRoute />}>
                <Route index element={<UsersList />} />
                <Route path=":id" element={<UserDetails />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}
