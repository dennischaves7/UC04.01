import { veiculos } from './banco.js';

export class VeiculoModel {
    static listarTodos() {
        return veiculos;
    }
    static obterPorId(id) {
        return veiculos.find(v => v.id === parseInt(id));
    }
    static cadastrarVeiculo(dados) {
    const { modelo, marca, ano, placa } = dados;
    const novoVeiculo = {
      id: veiculos.length + 1,
      modelo: modelo,
      marca: marca,
      ano: ano,
      placa: placa
    };
    veiculos.push(novoVeiculo);
    return novoVeiculo;
  }
  static atualizarVeiculo(id, modelo, marca, ano, placa) {
    const index = veiculos.findIndex(v => v.id === parseInt(id));
    if (index !== -1) {
      veiculos[index] = {
        id: parseInt(id),
        modelo: modelo,
        marca: marca,
        ano: ano,
        placa: placa
      };
      return veiculos[index];
    }
    return null;
  }
  static deletarVeiculo(id) {
    const index = veiculos.findIndex(v => v.id === parseInt(id));
    if (index !== -1) {
      veiculos.splice(index, 1);
      return true;
    }
    return false;
  }
  static obterPorMarca(marca) {
    return veiculos.filter(v => v.marca === marca);
  }
}