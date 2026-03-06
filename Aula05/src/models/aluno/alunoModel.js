import { cursos } from "../../data/cursos.data.js";
import { alunos } from "../../data/alunos.data.js";

export class AlunoModel {
    static listarAlunos() {
        return alunos;
    }
    static buscarAlunoId(id) {
        return alunos.find(a => a.id === parseInt(id));
    }
    static criarAluno(matricula, nome, email, cursoId) {
        const novoAluno =
            { id: alunos.length + 1, matricula, nome, email, cursoId };
        return novoAluno;
    }
    static atualizarAluno(id, matricula, nome, email, cursoId) {
        const index = alunos.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            alunos[index] = { id: parseInt(id), matricula, nome, email, cursoId };
            return alunos[index];
        }
        return null;
    }
    static cursoExite(cursoId) {
        return cursos.some(c => c.id === parseInt(cursoId));
    }
    static deletarAluno(id) {
        const index = alunos.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            alunos.splice(index, 1);
        }
    }
}