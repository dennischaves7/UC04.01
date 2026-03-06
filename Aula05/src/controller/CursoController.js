import { CursoModel } from "../models/curso/cursoModel.js";

export class CursoController {

    static listarCursos(req, res) {
        try {
            const cursos = CursoModel.listarCursos();
            if (cursos.length === 0 || !cursos) {
                res.status(400).json({ msg: "Nenhum curso cadastrado no banco!" });
                return;
            }
            res.status(200).json({ msg: "Cursos encontrados.", cursos });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os cursos", erro: error.message });
        }
    }
    static buscarCursoPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ msg: "Nennhum id fornecido" });
                return;
            }
            const curso = CursoModel.buscarCursoId(id);
            if (!curso) {
                res.status(404).json({ msg: "Curso não encontrado!" });
                return;
            }
            res.status(200).json({ msg: "Curso encontrado!", curso });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar curso", erro: error.message });
        }
    }
    static criarCurso(req, res) {
        try {
            const curso = req.body;
            if (!curso) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const cursos = CursoModel.listarCursos();
            const buscarCurso = cursos.find(c => c.nome.toLowerCase() === curso.nome.toLowerCase());
            if (buscarCurso) {
                res.status(400).json({ msg: "Curso já cadastrado!" });
                return;
            }
            const novoCurso = CursoModel.criarCurso(curso.nome);
            res.status(201).json({ msg: "Curso criado com sucesso!", curso: novoCurso });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao criar o curso", erro: error.message });
        }
    }
    static atualizarCurso(req, res) {
        try {
            const { id } = req.params;

            const { nome } = req.body;
            if (!nome) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }//validar se o curso existe
            const curso = CursoModel.buscarCursoId(id);
            if (!curso) {
                res.status(404).json({ msg: "Curso não encontrado!" });
                return;
            }// validar se o novo nome já existe
            const cursos = CursoModel.listarCursos();
            const buscarCurso = cursos.find(c => c.nome.toLowerCase() === nome.toLowerCase());
            if (buscarCurso) {
                res.status(400).json({ msg: "Curso já cadastrado!" });
                return;
            }
            const cursoAtualizado = CursoModel.atualizarCurso(id, nome);
            if (!cursoAtualizado) {
                res.status(404).json({ msg: "Curso não encontrado!" });
                return;
            }
            res.status(200).json({ msg: "Curso atualizado com sucesso!", curso: cursoAtualizado });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao atualizar o curso", erro: error.message });
        }
    }
    static deletarCurso(req, res) {
        try {
            const { id } = req.params;
            const curso = CursoModel.buscarCursoId(id);
            if (!curso) {
                res.status(404).json({ msg: "Curso não encontrado!" });
                return;
            }
            CursoModel.deletarCurso(id);
            res.status(200).json({ msg: "Curso deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao deletar o curso", erro: error.message });
        }
    }
    static listarAlunosPorCurso(req, res){
        try {
            const { id } = req.params;
            const curso = CursoModel.buscarCursoId(id);
            if(!curso){
                res.status(404).json({msg: "Curso não encontrado!"});
                return;
            }
            const alunos = CursoModel.listarAlunosPorCurso(id);
            res.status(200).json({ msg: "Alunos encontrados!", alunos });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os alunos", erro: error.message });
        }
    }
}