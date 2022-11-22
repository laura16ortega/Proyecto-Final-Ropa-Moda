import { Route, Routes } from 'react-router-dom';

import Search from "./components/Search/Search";
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function App() {
   return (
      <div className="App">
         <Navbar />
         <Routes>
            <Route path="/search" element={<Search />} />
            
         </Routes>
         <Footer />
      </div>
   );

}

export default App;
