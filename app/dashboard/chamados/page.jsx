"use client";
import { useEffect, useState } from "react";

export default function Chamados() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ titulo:"", descricao:"", prioridade:"verde" });

  useEffect(() => {
    const token = localStorage.getItem("Neodits_token");
    fetch("https://back-neodits-szma.vercel.app/tickets", {
      headers:{ Authorization:`Bearer ${token}` }
    })
      .then(r=>r.json())
      .then(setTickets);
  }, []);

  function submit(e){
    e.preventDefault();
    const token = localStorage.getItem("Neodits_token");

    fetch("https://back-neodits-szma.vercel.app/tickets",{
      method:"POST",
      headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
      body:JSON.stringify(form)
    })
    .then(()=>location.reload());
  }

  return (
    <main style={{ background:"#000", minHeight:"100vh", padding:40, color:"#fff" }}>
      <h1>Chamados</h1>

      <form onSubmit={submit} style={{ marginBottom:30 }}>
        <input placeholder="Título" onChange={e=>setForm({...form,titulo:e.target.value})} required />
        <textarea placeholder="Descrição" onChange={e=>setForm({...form,descricao:e.target.value})} required />
        <select onChange={e=>setForm({...form,prioridade:e.target.value})}>
          <option value="verde">Baixa</option>
          <option value="amarelo">Média</option>
          <option value="vermelho">Alta</option>
          <option value="preto">Crítica</option>
        </select>
        <button>Abrir chamado</button>
      </form>

      <ul>
        {tickets.map(t=>(
          <li key={t.id} style={{ opacity: new Date(t.sla_vencimento) < new Date() ? .5 : 1 }}>
            #{t.id} — {t.titulo} ({t.prioridade}) — {t.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
