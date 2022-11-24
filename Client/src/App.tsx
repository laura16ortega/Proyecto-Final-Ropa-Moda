import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from "./components/Search/Search";
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SignInSide from './pages/Login/SignInSide';
import LandingPage from './pages/LandingPage/LandingPage';
import Register from './pages/Register/Register';


function App() {
   return (
      <div className="App">
         <Navbar />
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path='/login' element={<SignInSide />} />
            <Route path='/landingPage' element={<LandingPage />} />
            <Route path='/register' element={<Register />} />
         </Routes>
         <Footer />
      </div>
   );

}

export default App;
