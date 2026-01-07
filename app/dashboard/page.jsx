"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = () => {
      const raw = localStorage.getItem("neodits_user");
      if (!raw) return (window.location.href = "/login");
      setUser(JSON.parse(raw));
    };

    load();
  }, []);

  if (!user) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#fff",
        padding: 40,
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Neodits</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Sair
        </button>
      </header>

      <h2>Olá, {user.name}</h2>
      <p>Conta protegida e verificada.</p>
    </main>
  );
}
