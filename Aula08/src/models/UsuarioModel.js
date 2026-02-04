import { usuarios } from "../data/banco.js";

export class UsuarioModel {
    static listarUsuarios() {
        return usuarios;
    }
    static adicionarUsuario(usuario) {
        usuarios.push(usuario);
    }
    static buscarUsuarioPorEmail(email) {
        return usuarios.find((usuario) => usuario.email === email);
    }
    static buscarUsuarioPorId(id) {
        return usuarios.find((usuario) => usuario.id === id);
    }
    static atualizarUsuario(id, dadosAtualizados) {
        const index = usuarios.findIndex((usuario) => usuario.id === id);
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...dadosAtualizados };
            return usuarios[index];
        }
    
        return null;
    }
    static deleteUsuario(id) {
        const index = usuarios.findIndex((usuario) => usuario.id === id);
        if (index !== -1) {
            usuarios.splice(index, 1);
            return true;
        }
        return false;
    }
}