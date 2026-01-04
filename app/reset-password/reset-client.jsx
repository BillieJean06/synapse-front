"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetClient() {
  const token = useSearchParams().get("token");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function reset() {
    const r = await fetch(
      "https://back-neodits-szma.vercel.app/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }
    );

    const data = await r.json();
    setMsg(data.success ? "Senha alterada! Vá para o login." : data.message);
  }

  return (
    <main style={box}>
      <h2>Nova senha</h2>
      <input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={reset}>Alterar</button>
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
