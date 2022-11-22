import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from "./components/Search/Search";
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/search" element={<Search />} />
         </Routes>
         <Footer />
      </div>
   );

}

export default App;
