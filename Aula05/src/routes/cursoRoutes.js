import { CursoController } from "../controller/CursoController.js";
import { AlunoController } from "../controller/AlunoController.js";
import express from "express";

export const router = express.Router();

router.get("/", CursoController.listarCursos);
router.get("/:id", CursoController.buscarCursoPorId);
router.post("/", CursoController.criarCurso);
router.put("/:id", CursoController.atualizarCurso);
router.get("/curso/:idCurso", CursoController.listarAlunosPorCurso); 
router.delete("/:id", CursoController.deletarCurso);

router.get("/alunos", AlunoController.listarAlunos);
router.get("/alunos/:id", AlunoController.buscarAlunoId);
router.post("/alunos", AlunoController.criarAluno);
router.put("/alunos/:id", AlunoController.atualizarAluno);
router.delete("/alunos/:id", AlunoController.deletarAluno);

export default router;