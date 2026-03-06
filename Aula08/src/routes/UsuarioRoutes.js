import express from "express";
import { autenticarToken } from "../middleware/authMiddleware.js";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = express.Router();

router.post("/usuarios", UsuarioController.adicionarUsuario);
router.post("/usuarios/login", UsuarioController.login)

router.get("/usuarios", autenticarToken, UsuarioController.listarUsuarios);
router.get("/usuarios/:id", autenticarToken, UsuarioController.buscarUsuarioPorId);
router.put("/usuarios/:id", autenticarToken, UsuarioController.atualizarUsuario);
router.patch("/usuarios/:id/senha", autenticarToken, UsuarioController.atualizarParcialmente);
router.delete("/usuarios/:id", autenticarToken, UsuarioController.deletarUsuario);


export default router;
 