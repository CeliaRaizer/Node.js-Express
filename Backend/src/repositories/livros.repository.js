// src/repositories/livros.repository.js
const Livro = require("../models/livro.model");
const db = require("../database/sqlite");

class LivrosRepository {

    // ===============================
    // LISTAR TODOS
    // ===============================
    async findAll() {
        const rows = await db.all(`
            SELECT id, titulo, autor, categoria, ano, editora, numeroPaginas, capa
            FROM livros
            ORDER BY id ASC
        `);
        return rows.map(r => Livro.fromJSON(r));
    }

    // ===============================
    // BUSCAR POR ID
    // ===============================
    async findById(id) {
        const row = await db.get(`
            SELECT id, titulo, autor, categoria, ano, editora, numeroPaginas, capa
            FROM livros
            WHERE id = ?
        `, [id]);
        return row ? Livro.fromJSON(row) : null;
    }

    // ===============================
    // CRIAR LIVRO
    // ===============================
    async create(data) {
        const novo = new Livro({ id: null, ...data });

        const res = await db.run(`
            INSERT INTO livros (titulo, autor, categoria, ano, editora, numeroPaginas, capa)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            novo.titulo,
            novo.autor,
            novo.categoria,
            novo.ano,
            novo.editora,
            novo.numeroPaginas,
            novo.capa || null
        ]);

        return this.findById(res.lastInsertRowid);
    }

    // ===============================
    // ATUALIZAR LIVRO
    // ===============================
    async update(id, dados) {
        const atual = new Livro({ id, ...dados });

        await db.run(`
            UPDATE livros
            SET titulo = ?, autor = ?, categoria = ?, ano = ?, editora = ?, numeroPaginas = ?, capa = ?
            WHERE id = ?
        `, [
            atual.titulo,
            atual.autor,
            atual.categoria,
            atual.ano,
            atual.editora,
            atual.numeroPaginas,
            atual.capa || null,
            id
        ]);

        return this.findById(id);
    }

    // ===============================
    // REMOVER LIVRO
    // ===============================
    async delete(id) {
        const existente = await this.findById(id);
        if (!existente) {
            const e = new Error("Livro não encontrado");
            e.statusCode = 404;
            throw e;
        }

        await db.run("DELETE FROM livros WHERE id = ?", [id]);
        return existente;
    }
}

module.exports = LivrosRepository;
