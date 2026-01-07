"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = () => {
      const raw = localStorage.getItem("neodits_user");
      if (!raw) return (window.location.href = "/login");

      const u = JSON.parse(raw);
      if (u.role !== "admin") return (window.location.href = "/login");

      setUser(u);
    };

    load();
  }, []);

  if (!user) return null;

  return (
    <main style={{ padding: 40 }}>
      <h1>Painel Administrativo</h1>
      <p>Bem-vindo, {user.name}</p>
    </main>
  );
}
