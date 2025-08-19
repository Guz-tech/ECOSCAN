import axios from "axios";
export function Register() {
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        axios.post("http://localhost:3000/users", data);
    }
    return <>
        <main>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" required />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <br />
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" name="password" required />
                <br />
                <button type="submit">Registrar</button>
            </form>
        </main>
    </>
}