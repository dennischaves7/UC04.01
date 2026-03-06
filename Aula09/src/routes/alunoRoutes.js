import { AlunoController } from "../controllers/AlunoController.js";
import express from "express";
const router = express.Router();

router.get("/", AlunoController.listar);
router.get("/buscarPorNome/:nome", AlunoController.buscarPorNome);
router.get("/buscarPorMaiorNota/:nota", AlunoController.buscarPorNotaMaior);
router.get("/buscarPorNotaFiltrada/:min/:max", AlunoController.buscarPorNotaFiltrada);
router.get("/buscarPorMedia", AlunoController.buscarPorMedia);
router.get("/extremos", AlunoController.extremos);
router.get("/alunosPorCurso/:curso", AlunoController.alunosPorCurso);
router.get("/reprovados", AlunoController.listarReprovados);
router.get("/aprovados", AlunoController.listarAprovados);
router.get("/ordemAlfabetica", AlunoController.ordemAlfabetica);
router.get("/ranking", AlunoController.ranking);
router.get("/listarNota", AlunoController.listarNota);
router.get("/listarCursos", AlunoController.listarCursos);
router.get("/:id", AlunoController.buscarPorId);
router.post("/", AlunoController.criar);
router.delete("/:id", AlunoController.deletar);
router.put("/:id", AlunoController.atualizar);
router.get("/curso/:curso", AlunoController.buscarPorCurso);

export default router;
