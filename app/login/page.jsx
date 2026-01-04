"use client";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://back-neodits-szma.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Usuário ou senha inválidos");
        setLoading(false);
        return;
      }

      localStorage.setItem("Neodits_user", JSON.stringify(data.user));
      localStorage.setItem("Neodits_token", data.token);
      document.cookie = `Neodits_token=${data.token}; path=/; max-age=7200; SameSite=Lax`;

      window.location.href = "/dashboard";
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleLogin}>
        <h1 className="logo">Neodits</h1>
        <h3>LOGIN</h3>

        {error && <div className="error-float">{error}</div>}

        <input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={error ? "input error" : "input"}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? "input error" : "input"}
        />

        <a href="/forgot-password" className="forgot">
          Esqueceu sua senha?
        </a>

        <button disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>

        <p className="register">
          Ainda não tem uma conta? <a href="/register">Registre-se</a>
        </p>
      </form>

      <style jsx>{`
        .login-wrap {
          height: 100vh;
          background: #ffffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-card {
          width: 360px;
          padding: 40px;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 10px 35px rgba(78, 53, 187, 0.75);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .logo {
          letter-spacing: 3px;
          color: #999;
          margin: 0;
        }

        h3 {
          color: #888;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .input {
          border-radius: 999px;
          border: 1px solid #000000ff;
          padding: 12px 18px;
          font-size: 14px;
          outline: none;
        }

        .input:focus {
          border-color: #000000ff;
        }

        .input.error {
          border-color: #ff4d4d;
          box-shadow: 0 0 0 2px rgba(255, 77, 77, 0.15);
        }

        .error-float {
          background: #ffecec;
          color: #ff4d4d;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
        }

        .forgot {
          font-size: 12px;
          color: #000000ff;
          text-decoration: none;
        }

        button {
          border-radius: 999px;
          border: 1px solid #000000ff;
          padding: 10px;
          background: transparent;
          font-weight: 700;
          cursor: pointer;
        }

        button:hover {
          background: #000;
          color: #fff;
        }

        .register {
          font-size: 12px;
          color: #000000ff;
        }

        .register a {
          color: #000;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
