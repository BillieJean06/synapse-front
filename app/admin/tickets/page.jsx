"use client";
import { useEffect, useState } from "react";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Neodits_token");
    fetch("https://back-neodits-szma.vercel.app/admin/tickets", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setTickets);
  }, []);

  return (
    <main style={{ padding: 40, background:"#000", minHeight:"100vh", color:"#fff" }}>
      <h1>Chamados</h1>
      <table style={{ width:"100%", marginTop:20 }}>
        <thead>
          <tr>
            <th>ID</th><th>Título</th><th>Status</th><th>Prioridade</th><th>SLA</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id} style={{ opacity: new Date(t.sla_vencimento) < new Date() ? .5 : 1 }}>
              <td>{t.id}</td>
              <td>{t.titulo}</td>
              <td>{t.status}</td>
              <td>{t.prioridade}</td>
              <td>{new Date(t.sla_vencimento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
