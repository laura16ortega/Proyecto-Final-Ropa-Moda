import { Route, Routes } from 'react-router-dom';
import Test from './components/Test/Test';
import Search from "./components/Search/Search";
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/search" element={<Search />} />
            <Route path='/' element={<Test />} />
         </Routes>
         <Footer />
      </div>
   );

}

export default App;
