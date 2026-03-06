import { veiculos } from "./banco.js";
import { VeiculoModel } from "./VeiculoModel.js";


let anoVeiculo = new Date().getFullYear();


export class VeiculoController {

  static listarVeiculos(req, res) {
    try {
      const veiculos = VeiculoModel.listarTodos();
      if (veiculos.length === 0 || !veiculos) {
        res.status(400).json({ message: "Nenhum veículo encontrado." });
      } else {
        res.status(200).json({ message: "Veiculos encontrados.", veiculos: veiculos });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar veiculos.", error: error.message });
    }
  } 
  static obterVeiculoPorId(req, res) {
    try {
      const id = req.params.id;
      const veiculos = VeiculoModel.obterPorId(id);
      if (!veiculos) {
        res.status(400).json({ msg: "Veiculo não encontrado" })
      } else {
        res.status(200).json({ message: "Veiculo encontrado.", Veiculo: veiculos });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter veiculo.", error: error.message });
    }
  }

  static obterPorMarca(req, res) {
    try {
      const marca = req.params.marca;
      const veiculos = VeiculoModel.obterPorMarca(marca);
      if (!veiculos) {
        res.status(404).json({ message: "Veiculo não encontrado." });
      } else {
        res.status(200).json({ message: "Veiculo encontrado.", veiculos: veiculos });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar veiculo por marca.", error: error.message });
    }
  }

  static cadastrarVeiculo(req, res) {
  try {
    const { modelo, marca, ano, placa } = req.body;

    const anoAtual = new Date().getFullYear();

    if (ano > anoAtual) {
      return res
        .status(400)
        .json({ message: "Ano do veículo não pode ser maior que o ano atual." });
    }

    const placaJaExiste = veiculos.find(v => v.placa === placa);

    if (placaJaExiste) {
      return res.status(400).json({ message: "Placa já existente." });
    }

    const novoVeiculo = VeiculoModel.cadastrarVeiculo({ modelo, marca, ano, placa });

    return res
      .status(201)
      .json({ msg: "Veiculo criado com sucesso!", veiculo: novoVeiculo });

  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Erro ao cadastrar veiculo", error: error.message });
  }
}


  static atualizarVeiculo(req, res){
    try {
      const id = req.params.id;
      const {modelo, marca, placa, ano} = req.body;
      if (ano > anoVeiculo) {
        res.status(400).json({ message: "Ano do veículo não pode ser maior que o ano atual." });
        return;
      }
      const placaJaExiste = veiculos.find(v => v.placa === placa);
      
      if (placaJaExiste) {
      return res.status(400).json({ message: "Placa já existente." });
    }
      if(!modelo || !marca || !ano || !placa){
         res.status(400).json({ message: "Adicione todos os dados necessários." });
      }
      const veiculoAtualizado = VeiculoModel.atualizarVeiculo(id, modelo, marca, ano, placa);
      if(!veiculoAtualizado){
        res.status(404).json({ message: "Veiculo não encontrado." });
      }else{
        res.status(200).json({msg: "Veiculo atualizado com sucesso", veiculo: veiculoAtualizado})
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar veiculo.", error: error.message });
    }
    }

    static deletarVeiculo(req, res ){
      try {
        const id = req.params.id;
        const deletado = VeiculoModel.deletarVeiculo(id);
        if (!deletado) {
         res.status(404).json({ message: "Veículo não encontrado." });
      } else {
        res.status(200).json({ message: "Veículo deletado com sucesso." });
      }
      } catch (error) {
        res.status(500).json({ message: "Erro ao deletar veículo.", error: error.message });
      }
    }
  }
