import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from "./components/Search/Search";
import './App.css';
// import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';



function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path='/landingPage' element={<LandingPage />} />
         </Routes>
         {/* <Footer /> */}
      </div>
   );

}

export default App;
