import { UsuarioModel } from "../models/UsuarioModel.js";
import axios from "axios";

export class UsuarioController{

    static listarUsuarios(req,res){
        try {
            const usuarios = UsuarioModel.lisatarUsuarios();
            if(!usuarios || usuarios.length === 0){
                res.status(404).json({msg: "Nenhum usuário cadastrado!"});
                return;
            }
            res.status(200).json({msg: "Usuários encontrados", usuarios});
        } catch (error) {
            res.status(500).json({msg: "Erro ao listar usuários", erro: error.message});
        }
    }

    //função assíncrona para buscar os dosado do viacep

    static async criarUsuario(req, res){
        try {
            const {nome, email, telefone, cep} = req.body;
            if(!nome || !email || !telefone || !cep){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos"});
                return
            }
            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if(buscaCep.erro){
                res.status(400).json({msg: "CEP inválido!"});
                return
            }
            console.log(buscaCep);
            const novoUsuario = {
                id: Date.now(),
                nome: nome,
                email: email,
                telefone: telefone,
                cep: cep,
                logradouro: buscaCep.data.logradouro,
                uf: buscaCep.data.uf
            }
            const userCriado = UsuarioModel.criarUsuario(novoUsuario);
            res.status(201).json({msg: "Usuário criado com sucesso!", userCriado});

        } catch (error) {
            res.status(500).json({msg: "Erro interno ao criar o usuário", erro: error.message});
        }
    }

    static buscarPorId(req,res){

        try {
             const {id} = req.params;
             const usuario = UsuarioModel.buscarPorId(id);

        if(!usuario){
            res.status(404).json({msg: "Usuário não encontrado!"});
            return;
        }
        res.status(200).json({msg: "Usuário encontrado!", usuario});
        } catch (error) {
            res.status(500).json({msg: "Erro ao buscar usuário", erro: error.message});   
        }
    }

    static async atualizarUsuario(req,res){ 
        try {
            const {id} = req.params;
            const {nome, email, telefone, cep} = req.body;
            if(!nome || !email || !telefone || !cep){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos"});
                return
            }
             const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if(buscaCep.erro){
                res.status(400).json({msg: "CEP inválido!"});
                return
            }
            console.log(buscaCep);
            const dadosAtualizados = {
                nome: nome,
                email: email,
                telefone: telefone,
                cep: cep,
                logradouro: buscaCep.data.logradouro,
                uf: buscaCep.data.uf
            }
            const usuarioAtualizado = UsuarioModel.atualizarUsuario(id, dadosAtualizados);
            if(!usuarioAtualizado){
                res.status(404).json({msg: "Usuário não encontrado para atualização!"});
                return;
            }
            res.status(201).json({msg: "Usuário atualizado com sucesso!", dadosAtualizados});
        } catch (error) {
            res.status(500).json({msg: "Erro ao atualizar usuário", erro: error.message});
        }
    }
    static deletarUsuario(req,res){
        try {
            const {id} = req.params;
            const usuarioDeletado = UsuarioModel.deletarUsuario(id);
            if(!usuarioDeletado){
                res.status(404).json({msg: "Usuário não encontrado para deletar!"});
                return;
            }
            
            res.status(200).json({msg: "Usuário deletado com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: "Erro ao deletar usuário", erro: error.message});
        }
    }
}