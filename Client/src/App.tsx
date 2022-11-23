import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Search from "./components/Search/Search";
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SignInSide from './pages/Login/SignInSide';
import './App.css';

function App() {
   return (
      <div className="App">
         <Navbar />
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path="/search" element={<Search />} />
            <Route path='/login' element={<SignInSide />} />
         </Routes>
         <Footer />
      </div>
   );

}

export default App;
