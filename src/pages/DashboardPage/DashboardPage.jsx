import React from "react";
import "./DashboardPage.css";
import { FaRecycle, FaShoppingBag, FaWineBottle, FaCog } from "react-icons/fa";

const dashboardItems = [
  { title: "Papel", icon: <FaRecycle />, path: "/papel" },
  { title: "Plástico", icon: <FaShoppingBag />, path: "/plastico" },
  { title: "Vidro", icon: <FaWineBottle />, path: "/vidro" },
  { title: "Metal", icon: <FaCog />, path: "/metal" },
];

function DashboardPage() {
  return (
    <div className="categories-page">
      <h1 className="page-title">Dashboard de Categorias</h1>
      <div className="categories-grid">
        {dashboardItems.map((item) => (
          <div key={item.title} className="category-card">
            <div className="card-icon">{item.icon}</div>
            <p className="card-title">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
