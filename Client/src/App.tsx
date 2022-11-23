import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./components/Search/Search";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SignInSide from "./pages/Login/SignInSide";
import DetailCard from "./components/DetailCard/DetailCard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/home/:id" element={<DetailCard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
