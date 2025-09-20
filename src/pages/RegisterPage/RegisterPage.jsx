import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // 1. Habilitar a navegação
import "./RegisterPage.css";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // 2. Adicionar estado de loading
  const [error, setError] = useState(null);     // 2. Adicionar estado de erro
  const navigate = useNavigate();

  // Tornar a função assíncrona para esperar a resposta da API
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpa erros antigos

    // 3. Validação de senha antes de enviar
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    try {
      // 4. Usar o estado do React como fonte dos dados, não o FormData
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      // Espera a resposta do servidor
      await axios.post("http://localhost:3000/users", userData);

      // 5. Tratamento de sucesso
      alert("Cadastro realizado com sucesso!");
      navigate('/login'); // Redireciona para a página de login

    } catch (err) {
      // 5. Tratamento de erro
      console.error("Erro no cadastro:", err);
      setError("Não foi possível realizar o cadastro. Tente novamente.");
    } finally {
      setLoading(false); // Garante que o loading termine
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
              name="name" // 6. Adicionar o atributo "name"
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
              name="email" // 6. Adicionar o atributo "name"
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
              name="password" // 6. Adicionar o atributo "name"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirme sua Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword" // 6. Adicionar o atributo "name"
              placeholder="Digite a senha novamente"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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