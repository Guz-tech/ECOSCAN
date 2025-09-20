import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Importa os estilos
import axios from 'axios';

function LoginPage() {
  // 1. Estados para controlar os inputs, loading e erros
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginData = { email, password };

      await axios.post("http://localhost:3000/login", loginData, { withCredentials: true });

      const response = await axios.get("http://localhost:3000/auth/me", { withCredentials: true });
      
      alert(`Login bem-sucedido! Bem-vindo, ${response.data.name}`);
      navigate('/dashboard');

    } catch (err) {
      console.error("Erro no login:", err);
      setError("Email ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email" // 5. Adicionado atributo 'name'
              placeholder="Digite seu email"
              value={email} // Conectado ao estado 'email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password" // 5. Adicionado atributo 'name'
              placeholder="Digite sua senha"
              value={password} // Conectado ao estado 'password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;