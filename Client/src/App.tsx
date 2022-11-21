import { Route, Routes } from 'react-router-dom';
import Test from './components/Test/Test';
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Test />} />
         </Routes>
         <Footer />
      </div>
   );
}

export default App;