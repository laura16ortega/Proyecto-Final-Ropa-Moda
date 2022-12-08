import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Footer,
  Navbar,
  DetailCard,
  Profile
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
  FavoriteProducts
} from './pages/index';
import {AuthGuard,RoleGuard} from "./guards/index";
import { PublicRoutes, PrivateRoutes } from "./models/index";


function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  return (
    <div className="App">
      <Navbar />
      {/* SI NECESITAS CREAR NUEVAS RUTAS, CREALAS DE LA MANERA NROMAL/ANTERIOR Y DESPUES YO LAS REFACTORIZO */}
      <Routes>
        {/* PUBLIC ROUTES */}
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
        </Route>
        

        {/* CREAR RUTA Y PAGINA 404 NOT FOUND */}
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;

