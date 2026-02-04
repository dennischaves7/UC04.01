import express from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = express.Router();

router.get("/usuarios", UsuarioController.listarUsuarios);
router.post("/usuarios", UsuarioController.adicionarUsuario);
router.post("/usuarios/login", UsuarioController.login)
router.get("/usuarios/:id", UsuarioController.buscarUsuarioPorId);
router.put("/usuarios/:id", UsuarioController.atualizarUsuario);
router.delete("/usuarios/:id", UsuarioController.deletarUsuario);

export default router;
