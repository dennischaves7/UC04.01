import { UsuarioModel } from "../models/UsuarioModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export class UsuarioController {
    static listarUsuarios(req, res) {
        try {
            const usuarios = UsuarioModel.listarUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao listar usuários", detalhes: error.message });
        }
    }

    static async adicionarUsuario(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({ erro: "Nome, email, telefone e senha são obrigatórios" });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const novoUsuario = {
                id: uuidv4(),
                nome: nome,
                email: email,
                senha: senhaHash,
                dataCriacao: new Date().toISOString()
            };

            UsuarioModel.adicionarUsuario(novoUsuario);
            res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario:  novoUsuario });
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao criar usuário", detalhes: erro.message });
        }
    }

    static login(req, res) {
        const { email, senha } = req.body;
        const usuario = UsuarioModel.buscarUsuarioPorEmail(email);

        try {
             if(!email || !senha){
            return res.status(400).json({ erro: "Todos os campos devem serem preenchidos" });
        }

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        bcrypt.compare(senha, usuario.senha, (err, result) => {
            if (err || !result) {
                return res.status(400).json({ erro: "E-mail ou senha inválido" });
            }

            res.status(200).json({ mensagem: "Login realizado com sucesso", usuario: usuario });
        
        const token = jwt.sign(
            {id: usuario.id, email: usuario.email, nome: usuario.nome},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        res.status(200).json({ mensagem: "Login realizado com sucesso", usuario: usuario.nome, token: token });
    });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao realizar login", detalhes: error.message });
        }
       
}

    static buscarUsuarioPorId(req, res) {
        const { id } = req.params;
        const usuario = UsuarioModel.buscarUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.status(200).json(usuario);
    }

    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, telefone, senha } = req.body;

            let dadosAtualizados = {};

            if (nome) dadosAtualizados.nome = nome;
            if (email) dadosAtualizados.email = email;
            if (telefone) dadosAtualizados.telefone = telefone;

            if (senha) {
                dadosAtualizados.senha = await bcrypt.hash(senha, 10);
            }

            const usuarioAtualizado = UsuarioModel.atualizarUsuario(id, dadosAtualizados);

            if (!usuarioAtualizado) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            res.status(200).json({ mensagem: "Usuário atualizado com sucesso", usuarioAtualizado});
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar usuário", detalhes: erro.message });
        }
    }

    static atualizarParcialmente (req, res) {
        try {
            const { id } = req.params;
            const campos = {...req.body};

            if(!campos){
                return res.status(400).json({ erro: "Nenhum campo fornecido para atualização" });
            }

            const usuarioAtualizado = UsuarioModel.atualizarUsuario(id, campos);

            if (!usuarioAtualizado) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            res.status(200).json({ mensagem: "Usuário atualizado parcialmente com sucesso", usuarioAtualizado});
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao atualizar usuário parcialmente", detalhes: erro.message });
        }
    }

    static deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            const deletado = UsuarioModel.deleteUsuario(id);

            if (!deletado) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }

            res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
        }
        catch (error) {
            res.status(500).json({ erro: "Erro ao deletar usuário", detalhes: error.message });
        }

    }
}