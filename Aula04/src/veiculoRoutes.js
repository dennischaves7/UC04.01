import express from 'express';
import { VeiculoController } from './VeiculoController.js';

const router = express.Router();

router.post('/', VeiculoController.cadastrarVeiculo);
router.get('/', VeiculoController.listarVeiculos);
router.get('/:id', VeiculoController.obterVeiculoPorId);
router.get('/marca/:marca', VeiculoController.obterPorMarca);
router.put('/:id', VeiculoController.atualizarVeiculo);
router.delete('/:id', VeiculoController.deletarVeiculo);

export default router; 