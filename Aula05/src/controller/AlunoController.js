import { AlunoModel } from "../models/aluno/alunoModel.js";

export class AlunoController {

    static listarAlunos(req, res) {
        try {
            const alunos = AlunoModel.listarAlunos();
            if (alunos.length === 0 || !alunos) {
                res.status(400).json({ msg: "Nenhum aluno cadastrado no banco!" });
                return;
            }
            res.status(200).json({ msg: "Alunos encontrados.", alunos });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os alunos", erro: error.message });
        }
    }
    static buscarAlunoId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ msg: "Nennhum id fornecido" });
                return;
            }
            const aluno = AlunoModel.buscarAlunoId(id);
            if (!aluno) {
                res.status(404).json({ msg: "Aluno não encontrado!" });
                return;
            }
            res.status(200).json({ msg: "Aluno encontrado!", aluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar aluno", erro: error.message });
        }
    }
    static criarAluno(req, res) {
        try {
            const { matricula, nome, email, cursoId } = req.body;
            if (!matricula || !nome || !email || !cursoId) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const cursoExiste = AlunoModel.cursoExite(cursoId);
            if (!cursoExiste) {
                res.status(400).json({ msg: "Curso não existe!" });
                return;
            }
            const alunos = AlunoModel.listarAlunos();
            const buscarAluno = alunos.find(a => a.matricula === matricula);
            if (buscarAluno) {
                res.status(400).json({ msg: "Aluno já cadastrado!" });
                return;
            }
            const novoAluno = AlunoModel.criarAluno(matricula, nome, email, cursoId);
            res.status(201).json({ msg: "Aluno criado com sucesso!", aluno: novoAluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao criar o aluno", erro: error.message });
        }
    }
    static atualizarAluno(req, res) {
        try {
            const { id } = req.params;
            const { matricula, nome, email, cursoId } = req.body;
            if (!matricula || !nome || !email || !cursoId) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const alunos = AlunoModel.listarAlunos();
            const buscarAluno = alunos.find(a => a.matricula === matricula);
            if (buscarAluno) {
                res.status(400).json({ msg: "Aluno já cadastrado!" });
                return;
            }
            const alunoAtualizado = AlunoModel.atualizarAluno(id, matricula, nome, email, cursoId);
            if (!alunoAtualizado) {
                res.status(404).json({ msg: "Aluno não encontrado!" });
                return;
            }
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao atualizar o aluno", erro: error.message });
        }
    }
    static deletarAluno(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ msg: "Nennhum id fornecido" });
                return;
            }
            const alunoDeletado = AlunoModel.deletarAluno(id);
            if (!alunoDeletado) {
                res.status(404).json({ msg: "Aluno não encontrado!" });
                return;
            }
            res.status(200).json({ msg: "Aluno deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao deletar o aluno", erro: error.message });
        }
    }
}