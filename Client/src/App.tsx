import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Footer,
  Navbar,
  DetailCard
} from './components/index';
import {
  Home,
  Cart,
  SignInSide,
  LandingPage,
  Register,
  Contact,
  CreateForm,
  ResetPassword,
  ForgotPassword,
  BuyConfirmed,
  FavoriteProducts,
  Profile
} from './pages/index';
import {AuthGuard,RoleGuard} from "./guards/index";
import { PublicRoutes, PrivateRoutes } from "./models/index";


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


function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  return (
    <div className="App">
      <Navbar />
      {/* SI NECESITAS CREAR NUEVAS RUTAS, CREALAS DE LA MANERA NROMAL/ANTERIOR Y DESPUES YO LAS REFACTORIZO */}
      <Routes>
        {/* PUBLIC ROUTES */}
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

        <Route path={PublicRoutes.PRODUCTS} element={<Home />} />
        <Route path={PublicRoutes.CART} element={<Cart />} />
        <Route path={PublicRoutes.LOGIN} element={<SignInSide />} />
        <Route path={PublicRoutes.PRODUCTS_ID} element={<DetailCard />} />
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
        <Route path={PublicRoutes.FORGOT} element={<ForgotPassword />} />
        <Route path={PublicRoutes.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={PublicRoutes.CONTACT} element={<Contact />} />
        
        {/* USER ROUTES */}
        <Route element={<AuthGuard privateValidation={true}/>}>
          <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
          <Route path={PrivateRoutes.FAVORITES} element={<FavoriteProducts /> } />
          <Route path={PrivateRoutes.CONFIRMED} element={<BuyConfirmed />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<RoleGuard isAdmin={true}/>}>
          <Route path={PrivateRoutes.CREATE} element={<CreateForm />}/>
        </Route>
        

        {/* CREAR RUTA Y PAGINA 404 NOT FOUND */}

      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;

