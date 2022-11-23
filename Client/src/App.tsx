import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./components/Search/Search";
import "./App.css";
import Footer from "./components/Footer/Footer";
import DetailCard from "./components/DetailCard/DetailCard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/home/:id" element={<DetailCard />} />
      </Routes>
    </div>
  );
}

export default App;
