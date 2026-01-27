import { CursoModel } from "../models/curso/cursoModel.js";

export class CursoController {
    static listarAlunos(req, res) {
        try {
            const cursos = CursoModel.listarCursos();
            if (cursos.length === 0) {
                return res.status(404).json({ message: "Nenhum curso encontrado." });
            }
            return res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar os cursos.", erro: error.message });
        }
        
    }}