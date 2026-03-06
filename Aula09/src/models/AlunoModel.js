import db from "../config/db.js";

export class AlunoModel {
    static listarTodos() {
        const sql = `select * from alunos`;
        return db.query(sql);
    }
    static criar(nome, curso, nota) {
        const sql = `insert into alunos (nome, curso, nota) values($1, $2, $3)`;
        return db.query(sql, [nome, curso, nota]);
    }
    static buscarPorId(id) {
        const sql = `select * from alunos where id = $1`;
        return db.query(sql, [id]);
    }
    static deletar(id) {
        const sql = `delete from alunos where id = $1`;
        return db.query(sql, [id]);
    }
    static atualizar(id, nome, curso, nota) {
        const sql = `update alunos set nome = $1, curso = $2, nota = $3 where id = $4`;
        return db.query(sql, [nome, curso, nota, id]);
    }

    static buscarPorCurso(curso) {
        const sql = `select * from alunos where curso = $1`;
        return db.query(sql, [curso]);
    }
    static listarAprovados() {
        const sql = `select * from alunos where nota >= 7`;
        return db.query(sql);
    }
    static listarReprovados() {
        const sql = `select * from alunos where nota < 7`;
        return db.query(sql);
    }
    static melhorNota() {
        const sql = `select max(nota) from alunos`;
        return db.query(sql);
    }

    static ordemAlfabetica() {
        const sql = `select * from alunos order by nome asc`;
        return db.query(sql);
    }

    static ranking() {
        const sql = `select * from alunos order by nota desc`;
        return db.query(sql);
    }

    static listarNota() {
        const sql = `select nome, nota from alunos`;
        return db.query(sql);
    }

    static listarCursos() {
        const sql = `select distinct curso from alunos`;
        return db.query(sql);
    }

    static buscarPorNome(nome) {
        const sql = `select * from alunos where nome like $1`;
        return db.query(sql, [`%${nome}%`]);
    }

    static buscarPorNotaMaior(nota) {
        const sql = `select * from alunos where nota > $1`;
        return db.query(sql, [nota]);
    }

    static buscarPorNotaFiltrada(min, max) {
        const sql = `select * from alunos where nota between $1 and $2`;
        return db.query(sql, [min, max]);
    }
    static buscarPorNome(nome) {
        const sql = `select * from alunos where nome like $1`;
        return db.query(sql, [`%${nome}%`]);
    }

    static buscarPorMedia() {
        const sql = `select avg(nota) from alunos`
        return db.query(sql);
    }

    static extremos() {
        const sql = `select max(nota), min(nota) from alunos`
        return db.query(sql);
    }

    static alunosPorCurso(curso) {
        const sql = `SELECT COUNT(*) as total_alunos FROM alunos WHERE curso ILIKE $1`;
        return db.query(sql, [curso]);
    }

}