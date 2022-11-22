import { Route, Routes } from 'react-router-dom';
// import Test from './components/Test/Test';
import Search from "./components/Search/Search";
import './App.css';
// import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/search" element={<Search />} />
            {/* <Route path='/' element={<Test />} /> */}
            <Route path='/landingPage' element={<LandingPage />} />
         </Routes>
         {/* <Footer /> */}
      </div>
   );

}

export default App;
