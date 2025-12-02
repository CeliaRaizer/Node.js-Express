const db = require("../database/sqlite");

class ReviewsRepository {
    create({ livro_id, usuario_id, nota, comentario }) {
        const result = db.run(
            `INSERT INTO reviews (livro_id, usuario_id, nota, comentario)
             VALUES (?, ?, ?, ?)`,
            [livro_id, usuario_id, nota, comentario]
        );

        return db.get(
            `SELECT r.*, u.username AS usuarioNome
             FROM reviews r
             JOIN users u ON u.id = r.usuario_id
             WHERE r.id_review = ?`,
            [result.lastInsertRowid]
        );
    }

    getAll() {
        return db.all(`
            SELECT r.*, u.username AS usuarioNome, l.titulo AS livroTitulo
            FROM reviews r
            JOIN users u ON u.id = r.usuario_id
            JOIN livros l ON l.id = r.livro_id
            ORDER BY r.dataReview DESC
        `);
    }

    getByLivro(livro_id) {
        return db.all(
            `
            SELECT r.*, u.username AS usuarioNome
            FROM reviews r
            JOIN users u ON u.id = r.usuario_id
            WHERE r.livro_id = ?
            ORDER BY r.dataReview DESC
            `,
            [livro_id]
        );
    }

    delete(id_review) {
        return db.run(
            `DELETE FROM reviews WHERE id_review = ?`,
            [id_review]
        );
    }
}

module.exports = ReviewsRepository;
