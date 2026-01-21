import express from 'express';
import { UsuarioController } from '../../controllers/UsuarioController.js';

const router = express.Router();

router.post('/', UsuarioController.criarUsuario);

router.get('/', UsuarioController.listarUsuarios);

router.get('/:id', UsuarioController.obterUsuarioPorId);

router.get('/e/:email', UsuarioController.buscarPorEmail);

router.put('/:id', UsuarioController.atualizarUsuario);

router.delete('/:id', UsuarioController.deletarUsuario);

export default router;