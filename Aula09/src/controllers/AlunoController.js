import { json } from "express";
import {AlunoModel } from "../models/AlunoModel.js";

export class AlunoController{

    static async listar(req, res){
        try {
            const result = await AlunoModel.listarTodos();
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno no banco."});
                return;
            }
            res.status(200).json({msg: "Alunos encontrados!", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao listar os alunos", erro : error.message});
        }
    }
    static async buscarPorId(req, res){
        try {
            const {id} = req.params;
            const result = await AlunoModel.buscarPorId(id);
            if(result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado com este ID"});
                return;
            }
            res.status(200).json({msg: "Aluno encontrado", Aluno: result.rows[0]});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar aluno por ID", erro: error.message});
        }
    }

    static async criar(req, res){
        try {
            const {nome, idade, curso} = req.body;
            if(!nome || !idade || !curso){
                res.status(400).json({msg: "Nome, idade e curso são obrigatórios para criar um aluno"});
                return;
            }
            const result = await AlunoModel.criar(nome, idade, curso);
            res.status(201).json({msg: "Aluno criado com sucesso!", aluno: {id: result.rows[0].id, nome, idade, curso}});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao criar aluno", erro: error.message});
        }
    }
    static async deletar(req, res){
        try {
            const {id} = req.params;
            const result = await AlunoModel.deletar(id);
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado com este ID para deletar"});
                return;
            }
            res.status(200).json({msg: "Aluno deletado com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao deletar aluno", erro: error.message});
        }
    }

    static async atualizar(req, res){
        try {
            const {id} = req.params;
            const {nome, idade, curso} = req.body;
            if(!nome || !idade || !curso){
                res.status(400).json({msg: "Nome, idade e curso são obrigatórios para atualizar um aluno"});
                return;
            }
            const result = await AlunoModel.atualizar(id, nome, idade, curso);
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado com este ID para atualizar"});
                return;
            }
            res.status(201).json({msg: "Aluno atualizado com sucesso!", aluno: {id, nome, idade, curso}});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao atualizar aluno", erro: error.message}); 
        }
    }

    static async buscarPorCurso(req, res){
        try {
            const {curso} = req.params;
            const result = await AlunoModel.buscarPorCurso(curso);
            if(result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado para este curso"});
                return;
            }
            res.status(200).json({msg: "Alunos encontrados", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar alunos por curso", erro: error.message});
        }
    }
    static async listarAprovados(req, res){
        try {
            const result = await AlunoModel.listarAprovados();
            if(result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno aprovado encontrado"});
                return;
            }
            res.status(200).json({msg: "Alunos aprovados encontrados", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao listar alunos aprovados", erro: error.message});
        }
    }
    static async listarReprovados(req, res){
        try {
            const result = await AlunoModel.listarReprovados();
            if (result.rowCount === 0) {
                res.status(404).json({msg: "Nenhum aluno reprovado encontrado"})
                return
            }
            res.status(200),json({msg: "Alunos reprovados encontrados", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao listar alunos aprovados", erro: error.message})
        }
    }
    static async maiorNota(req, res){
        try {
            const result = await AlunoModel.maiorNota();
            if (result.rows.length === 0) {
                res.status(404).json({msg: "Nenhum aluno encontrado"})
                return
            }
            res.status(200),json({msg: "Alunos reprovados encontrados", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao listar alunos aprovados", erro: error.message})
        }
    }
    static async ordemAlfabetica(req, res){
        try {
            const result = await AlunoModel.ordemAlfabetica();
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado"});
                return;
            }
            res.status(200).json({msg: "Alunos ordenados alfabeticamente", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao listar alunos em ordem alfabética", erro: error.message});
        }
    }
    static async ranking(req, res){
        try {
            const result = await AlunoModel.ranking();
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado"});
                return;
            }
            res.status(200).json({msg: "Ranking dos Alunos", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir o ranking dos alunos", erro: error.message});
        }
    }
    static async listarNota(req, res){
        try {
            const result = await AlunoModel.listarNota();
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado"});
                return;
            }
            res.status(200).json({msg: "Ranking dos Alunos", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir o ranking dos alunos", erro: error.message});
        }
    }
    static async listarCursos(req, res){
        try {
            const result = await AlunoModel.listarCursos();
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado"});
                return;
            }
            res.status(200).json({msg: "Ranking dos Alunos", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir", erro: error.message});
        }
    }
    static async buscarPorNome(req, res){
        try {
            const { nome } = req.params
            const result = await AlunoModel.buscarPorNome(nome);
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno"});
                return;
            }
            res.status(200).json({msg: "Todos os alunos com esse nome", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir", erro: error.message});
        }
    }
    static async buscarPorNotaMaior(req, res){
        try {
            const { nota } = req.params
            const result = await AlunoModel.buscarPorNotaMaior(nota);
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno"});
                return;
            }
            res.status(200).json({msg: "Todos os alunos com a nota acima de", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir", erro: error.message});
        }
    }
    static async buscarPorNotaFiltrada(req, res){
        try {
            const { min, max } = req.params
            const result = await AlunoModel.buscarPorNotaMaior(min, max);
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno"});
                return;
            }
            res.status(200).json({msg: "Todos os alunos com a nota acima de", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir", erro: error.message});
        }
    }
    static async buscarPorMedia(req, res){
        try {
            const result = await AlunoModel.buscarPorMedia();
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado"});
                return;
            }
            res.status(200).json({msg: "Média dos alunos cadastrados", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir", erro: error.message});
        }
    }
    static async extremos(req, res){
        try {
            const result = await AlunoModel.extremos();
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado"});
                return;
            }
            res.status(200).json({msg: "Média dos alunos cadastrados", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir", erro: error.message});
        }
    }
    static async alunosPorCurso(req, res){
        try {
            const { curso } = req.params
            const result = await AlunoModel.alunosPorCurso(curso);
            if(!result.rows || result.rows.length === 0){
                res.status(404).json({msg: "Nenhum aluno encontrado neste curso"});
                return;
            }
            res.status(200).json({msg: "Todos os alunos deste curso", alunos: result.rows[0]});
        } catch (error) {
            res.status(500).json({msg: "Erro ao abrir este curso", erro: error.message});
        }
    }
}