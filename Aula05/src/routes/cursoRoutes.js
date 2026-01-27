import { CursoController } from "../controller/CursoController";
import express from "express";

export const router = express.Router();

router.get("/", CursoController.listarAlunos);

export default router;