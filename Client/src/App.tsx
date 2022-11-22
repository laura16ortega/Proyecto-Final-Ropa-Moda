import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Cart from './components/Cart/Cart';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
         </Routes>
      </div>
   );
}

export default App;