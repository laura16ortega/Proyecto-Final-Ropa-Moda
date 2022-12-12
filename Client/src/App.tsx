import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SignInSide from "./pages/Login/SignInSide";
import DetailCard from "./components/DetailCard/DetailCard";

import Profile from "./components/Profile/Profile";
import LandingPage from "./pages/LandingPage/LandingPage";
import Register from "./pages/Register/Register";
import Contact from "./pages/ContactUs/Contact";
import { useEffect } from "react";
import CreateForm from "./pages/CreateForm/CreateForm";
import {useAuth0} from '@auth0/auth0-react';
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import LoginButton from "./components/LoginButton/LoginButton";
import BuyConfirmed from "./pages/BuyConfirmed/BuyConfirmed";
import FavoriteProducts from './pages/FavoriteProducts/FavoriteProducts';
import Dashboard from './components/Dashboard/MainDashboard/MainDashboard';
import AllUsers from "./components/Dashboard/AllUsers/AllUsers";
import ManageUsers from "./components/Dashboard/ManageUsers/ManageUsers";

function App() {
  useEffect(() => {
    const findCart = localStorage.getItem("cart");
    if (!findCart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);
  useEffect(() => {
    const findFav = localStorage.getItem("fav");
    if (!findFav) {
      localStorage.setItem("fav", JSON.stringify([]));
    }
  },[])
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/products/:id" element={<DetailCard />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/confirmed' element={<BuyConfirmed />} />
        <Route path='/favoritos' element={<FavoriteProducts /> } />
        <Route path='/users' element={<ManageUsers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
