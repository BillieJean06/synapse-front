import { calcularSLA } from "../sla/sla.engine.js";
import db from "../../db.js";

export async function criarTicket(req, res) {
  const { titulo, descricao, prioridade } = req.body;
  const sla = calcularSLA(prioridade);

  const r = await db.query(`
    INSERT INTO tickets(user_id,titulo,descricao,prioridade,sla_vencimento)
    VALUES($1,$2,$3,$4,$5) RETURNING *
  `, [req.user.id, titulo, descricao, prioridade, sla]);

  res.json(r.rows[0]);
}

export async function meusTickets(req,res){
  const r = await db.query("SELECT * FROM tickets WHERE user_id=$1", [req.user.id]);
  res.json(r.rows);
}
