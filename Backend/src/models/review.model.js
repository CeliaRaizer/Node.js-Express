const db = require('../data/database');

const ReviewModel = {
    create: (livro_id, usuario_id, nota, comentario, callback) => {
        const sql = `
            INSERT INTO reviews (livro_id, usuario_id, nota, comentario)
            VALUES (?, ?, ?, ?)
        `;
        db.run(sql, [livro_id, usuario_id, nota, comentario], function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    getByLivro: (livro_id, callback) => {
        const sql = `
            SELECT r.*, u.nome AS usuarioNome
            FROM reviews r
            JOIN usuarios u ON r.usuario_id = u.id
            WHERE livro_id = ?
            ORDER BY dataReview DESC
        `;
        db.all(sql, [livro_id], callback);
    },

    getByUser: (usuario_id, callback) => {
        const sql = `
            SELECT r.*, l.titulo AS livroTitulo
            FROM reviews r
            JOIN livros l ON r.livro_id = l.id
            WHERE usuario_id = ?
            ORDER BY dataReview DESC
        `;
        db.all(sql, [usuario_id], callback);
    }
};

module.exports = ReviewModel;
