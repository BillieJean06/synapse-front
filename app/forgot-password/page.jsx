"use client";
import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function send() {
    setMsg("");

    const r = await fetch(
      "https://back-neodits-szma.vercel.app/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await r.json();
    setMsg(data.success ? "Confira seu e-mail." : data.message);
  }

  return (
    <main style={box}>
      <h2>Esqueci minha senha</h2>
      <input
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={send}>Enviar</button>
      <p>{msg}</p>
    </main>
  );
}

const box = {
  minHeight: "100vh",
  background: "#000",
  color: "#fff",
  display: "grid",
  placeItems: "center",
};
