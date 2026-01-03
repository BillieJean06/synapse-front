"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function setField(k, v) {
    setForm({ ...form, [k]: v });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("https://back-synapse.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Erro ao criar conta");
        setLoading(false);
        return;
      }

      setSuccess("Conta criada. Verifique seu email para ativar.");
      setForm({ name: "", username: "", email: "", password: "" });
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap">
      <form className="card" onSubmit={handleRegister}>
        <h1 className="logo">SYNAPSE</h1>
        <h3>REGISTRAR</h3>

        {error && <div className="error-float">{error}</div>}
        {success && <div className="success-float">{success}</div>}

        <input
          placeholder="Nome completo"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          required
        />
        <input
          placeholder="Usuário"
          value={form.username}
          onChange={(e) => setField("username", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setField("password", e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Criando..." : "Criar conta"}
        </button>

        <p className="register">
          Já tem conta? <a href="/login">Entrar</a>
        </p>
      </form>

      <style jsx>{`
        .wrap {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card {
          width: 360px;
          padding: 40px;
          border-radius: 24px;
          background: #ffffffff;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: center;
        }

        .logo {
          letter-spacing: 3px;
          color: #757575ff;
          margin: 0;
        }

        h3 {
          color: #757575ff;
          letter-spacing: 2px;
        }

        input {
          border-radius: 999px;
          border: 1px solid #000000ff;
          padding: 12px 18px;
        }

        button {
          border-radius: 999px;
          border: 1px solid #000000ff;
          padding: 10px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
        }

        button:hover {
          background: #000;
          color: #0c0909ff;
        }

        .error-float {
          background: #ffecec;
          color: #ff4d4d;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
        }

        .success-float {
          background: #e7fff1;
          color: #10b981;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
        }

        .register {
          font-size: 12px;
          color: #000000ff;
        }

        .register a {
          color: #000000ff;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
