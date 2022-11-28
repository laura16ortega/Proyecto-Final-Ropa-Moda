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

function App() {
  useEffect(() => {
    const findCart = localStorage.getItem("cart");
    if (!findCart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/products/:id" element={<DetailCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create" element={<CreateForm />} />
        {/*<Route path="/confirmed" element={<BuyConfirmed />} />*/}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
