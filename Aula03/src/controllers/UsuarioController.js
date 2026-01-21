import { UsuarioModel } from "../models/usuario/UsuarioModel.js";

export class UsuarioController {
  static listarUsuarios(req, res) {
    try {
      const usuarios = UsuarioModel.listarTodos();
      if (usuarios.length === 0 || !usuarios) {
        res.status(400).json({ message: "Nenhum usuário encontrado." });
      } else {
        res.status(200).json({ message: "Usuários encontrados.", usuarios: usuarios });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar usuários.", error: error.message });
    }
  }

  static obterUsuarioPorId(req, res) {
    try {
      const id = req.params.id;
      const usuario = UsuarioModel.obterPorId(id);
      if (!usuario) {
        res.status(400).json({ message: "Usuário não encontrado." });
      } else {
        res.status(200).json({ message: "Usuário encontrado.", usuario: usuario });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter usuário.", error: error.message });
    }
  }

   static buscarPorEmail(req, res) {
    try {
      const email = req.params.email;
      const usuario = UsuarioModel.buscarPorEmail(email);
      if (!usuario) {
        res.status(404).json({ message: "Usuário não encontrado." });
      } else {
        res.status(200).json({ message: "Usuário encontrado.", usuario: usuario });
      }} catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário por email.", error: error.message });
    }}

  static criarUsuario(req, res) {
    try {
      const { nome, email, telefone } = req.body;
      const novoUsuario = UsuarioModel.criar({ nome, email, telefone });
      res.status(201).json({ message: "Usuário criado com sucesso.", usuario: novoUsuario });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar usuário.", error: error.message });
    }
  }

  static atualizarUsuario(req, res) {
    try {
      const id = req.params.id;
      const { nome, email, telefone } = req.body;
      const usuarioAtualizado = UsuarioModel.atualizar(id, nome, email, telefone);
      if (!usuarioAtualizado) {
        res.status(404).json({ message: "Usuário não encontrado." });
      } else {
        res.status(200).json({ message: "Usuário atualizado com sucesso.", usuario: usuarioAtualizado });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário.", error: error.message });
    }
  }

  static deletarUsuario(req, res) {
    try {
      const id = req.params.id;
      const deletado = UsuarioModel.deletar(id);
      if (!deletado) {
        res.status(404).json({ message: "Usuário não encontrado." });
      } else {
        res.status(200).json({ message: "Usuário deletado com sucesso." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário.", error: error.message });
    }
  }

 
}
