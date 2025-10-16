import HomePage from "./pages/HomePage/HomePage.jsx";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResiduePage from "./pages/Residue/ResiduePage.jsx";
import SobrePage from "./pages/SobrePage/SobrePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import LivePage from "./pages/LivePage/Live.jsx"; 


function App() {
  return (
    <BrowserRouter>
      <Header />
     

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/adicionar-residuo" element={<ResiduePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;