import axios from "axios";
import "./styles.css";

export function Login() {

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Faz login e envia cookie HttpOnly
      await axios.post("http://localhost:3000/login", data, { withCredentials: true });

      // Pega os dados do usuário via cookie
      const response = await axios.get("http://localhost:3000/auth/me", { withCredentials: true });
      alert(`Login bem-sucedido! Bem-vindo, ${response.data.name}`);
      console.log("Usuário logado:", response.data);
    } catch (err) {
      console.error("Erro no login:", err);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit">Entrar</button>
      </form>

    </main>
  );
}
