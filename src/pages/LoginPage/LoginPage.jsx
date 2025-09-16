import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Importa os estilos

function LoginPage() {
  // 1. Cria estados para guardar o email e a senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 3. Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    // --- LÓGICA DE LOGIN (SIMULADA) ---
    // No futuro, aqui você faria uma chamada para sua API
    console.log('Tentativa de login com:');
    console.log('Email:', email);
    console.log('Senha:', password);

    // Exemplo de feedback para o usuário
    alert(`Login bem-sucedido para o email: ${email}! Redirecionando...`);
    
    // Redireciona o usuário para a página principal após o login
    navigate('/'); 
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* O formulário chama a função handleSubmit ao ser enviado */}
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          
          {/* 2. Campo de Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 2. Campo de Senha */}
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;