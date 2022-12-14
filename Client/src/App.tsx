import { Route, Routes } from "react-router-dom";
import React from 'react';
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
import Dashboard from './components/Dashboard/MainDashboard/MainDashboard';
import AllUsers from "./components/Dashboard/AllUsers/AllUsers";
import ManageUsers from "./components/Dashboard/ManageUsers/ManageUsers";
import Sidebar from "./components/Dashboard/sidebar/Sidebar";
import DashboardHome from "./components/Dashboard/home/DashboardHome";
import ProductsDashboard from "./components/ProductsDashboard/ProductsDashboard";
import EditProduct from "./components/EditProduct/EditProduct";
import OrdersDashboard from "./components/OrdersDashboard/OrdersDashboard";
import OrdersDetail from "./components/OrdersDetail/OrdersDetail";
import { Man } from "@mui/icons-material";


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* SI NECESITAS CREAR NUEVAS RUTAS, CREALAS DE LA MANERA NROMAL/ANTERIOR Y DESPUES YO LAS REFACTORIZO */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path='/users' element={<ManageUsers />} />
        <Route path="/" element={<LandingPage />} />
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
          <Route path="/dashboard" element={<Dashboard/>}>
              <Route index element={<DashboardHome/>}/>
              <Route path="users" element={<ManageUsers />}/>
              <Route path="products" element={<ProductsDashboard/>}/>
              <Route path="editProduct/:id" element={<EditProduct/>}/>
              <Route path="orders" element={<OrdersDashboard/>}/>
              <Route path="orders/:id" element={<OrdersDetail/>}/>
              <Route path="informes" element={<><h1>informes Page</h1></>}/>
              <Route path="perfil" element={<><h1>perfil Page</h1></>}/>
              <Route path="analitica" element={<><h1>analitica Page</h1></>}/>
              <Route path="ventas" element={<><h1>ventas Page</h1></>}/>
          </Route>
        </Route>
        

        {/* CREAR RUTA Y PAGINA 404 NOT FOUND */}

      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;

