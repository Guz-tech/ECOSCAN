import HomePage from "./pages/HomePage/HomePage.jsx";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResiduePage from "./pages/Residue/ResiduePage.jsx";
import { Login } from "./pages/Login/index.jsx";
import { Register } from "./pages/Register/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/adicionar-residuo" element={<ResiduePage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
