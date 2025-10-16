import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContex.jsx";
import "./DashboardPage.css";
import { FaRecycle, FaShoppingBag, FaWineBottle, FaCog, FaHistory } from "react-icons/fa";

const dashboardItems = [
  { title: "Papel", icon: <FaRecycle />, path: "/papel" },
  { title: "Plástico", icon: <FaShoppingBag />, path: "/plastico" },
  { title: "Vidro", icon: <FaWineBottle />, path: "/vidro" },
  { title: "Metal", icon: <FaCog />, path: "/metal" },
  { title: "Eletrônico", icon: <FaCog />, path: "/eletronico" },
  { title: "Orgânico", icon: <FaRecycle />, path: "/organico" },
];

function DashboardPage() {
  const { user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [materialCounts, setMaterialCounts] = useState({});

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(`${apiUrl}/history`, {
            withCredentials: true,
          });
          setHistory(response.data);
        } catch (err) {
          console.error("Erro ao buscar histórico:", err);
          setError("Não foi possível carregar o seu histórico.");
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    } else {
      setHistory([]);
      setLoading(false);
    }
  }, [user, apiUrl]);

  useEffect(() => {
    if (history.length > 0) {
      const counts = history.reduce((acc, item) => {
        acc[item.material_type] = (acc[item.material_type] || 0) + 1;
        return acc;
      }, {});
      setMaterialCounts(counts);
    } else {
      setMaterialCounts({});
    }
  }, [history]);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Seu Dashboard</h1>
      
      <div className="dashboard-grid">
        {dashboardItems.map((item) => {
          const count = materialCounts[item.title] || 0;
          return (
            <div key={item.title} className="category-card">
              <div className="card-icon">{item.icon}</div>
              <p className="card-title">{item.title}</p>
              <div className="card-count-container">
                <span className="card-count-label">Scans:</span>
                <span className="card-count-value">{count}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="history-section">
        <h2 className="history-title">
          <FaHistory /> Histórico de Scans
        </h2>
        {loading && <p>Carregando histórico...</p>}
        {error && <p className="history-error">{error}</p>}
        {!loading && !error && (
          history.length > 0 ? (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id_scan} className="history-item">
                  <span className="history-material">{item.material_type}</span>
                  <span className="history-date">
                    {new Date(item.scanned_at).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="history-empty">Nenhum scan encontrado. Inicie sessão para ver o seu histórico!</p>
          )
        )}
      </div>
    </div>
  );
}

export default DashboardPage;