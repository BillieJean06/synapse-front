import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { onlyAdmin } from "../../middlewares/role.js";
import db from "../../db.js";

const r = Router();
r.get("/", auth, onlyAdmin, async (req,res)=>{
  const t = await db.query("SELECT * FROM tickets");
  res.json(t.rows);
});
export default r;
