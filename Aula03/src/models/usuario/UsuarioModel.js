import { usuarios } from "../../data/banco.js";

export class UsuarioModel {
  static listarTodos() {
    return usuarios;
  }

  static obterPorId(id) {
    return usuarios.find(u => u.id === parseInt(id));
  }

  static buscarPorEmail(email) {
    return usuarios.find(u => u.email === email);
  }

  static criar(dados) {
    const { nome, email, telefone } = dados;
    const novoUsuario = {
      id: usuarios.length + 1,
      nome: nome,
      email: email,
      telefone: telefone
    };
    usuarios.push(novoUsuario);
    return novoUsuario;
  }

  static atualizar(id, nome, email, telefone) {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      usuarios[index] = {
        id: parseInt(id),
        nome: nome,
        email: email,
        telefone: telefone
      };
      return usuarios[index];
    }
    return null;
  }

  static deletar(id) {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      usuarios.splice(index, 1);
      return true;
    }
    return false;
  }
}