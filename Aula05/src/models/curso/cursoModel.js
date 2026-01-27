import { cursos } from "../../data/cursos.data.js";
import { alunos } from "../../data/alunos.data.js";

export class CursoModel {
   static listarCursos() {
       return cursos;
   }
 static buscarCursoPorId(id) {
       return cursos.find(curso => curso.id === id);
   }

   static criarCurso(nome) {
       const id = cursos.length + 1;
       const curso = { id, ...nome };
       cursos.push(curso);
       return curso;
   }

   static atualizarCurso(id, dadosAtualizados) {
       const cursoIndex = cursos.findIndex(curso => curso.id === id);
         if (cursoIndex === -1) {
              return false;
         }
         cursos ={
            id: id,
            nome: nome
         }
         return cursos[cursoIndex];
}

    static deletarCurso(id) {
        const cursoIndex = cursos.findIndex(curso => curso.id === id);
        if (cursoIndex === -1) {
            return false;
        }
        cursos.splice(cursoIndex, 1);
        return true;
}
static listarAlunosPorCurso(idCurso) {
    return alunos.filter(aluno => aluno.curso === parseInt(idCurso));

}}
  