import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./RegisterPage.css";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length > 0 && newPassword.length < 6) {
      setPasswordError("Senha curta! Mínimo de 6 caracteres.");
    } else {
      setPasswordError("");
    }
    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword && password !== newConfirmPassword) {
      setConfirmPasswordError("As senhas não coincidem!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setPasswordError("");
    setConfirmPasswordError("");

    if (password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem!");
      return;
    }
    setLoading(true);

    try {
      const userData = { name, email, password };
      await axios.post(`${apiUrl}/users`, userData);
      alert("Cadastro realizado com sucesso!");
      navigate('/login');
    } catch (err) {
      console.error("Erro no cadastro:", err);
      if (err.response && err.response.status === 422) {
          setError("Dados inválidos. Verifique as informações.");
      } else {
          setError("Não foi possível realizar o cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Crie sua Conta</h2>
          <div className="input-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Crie uma senha (mín. 6 caracteres)"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="form-error-inline">{passwordError}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirme sua Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Digite a senha novamente"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmPasswordError && <p className="form-error-inline">{confirmPasswordError}</p>}
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;