import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { criarTicket, meusTickets } from "./Ticket.controller.js";

const r = Router();
r.post("/", auth, criarTicket);
r.get("/", auth, meusTickets);
export default r;
