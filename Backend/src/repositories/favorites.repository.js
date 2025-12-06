//src/repositories/favorites.repository.js
const { run, get, all } = require("../database/sqlite");

const favoritesRepository = {
    
    // Adicionar favorito
    addFavorite(userId, bookId) {
        return run(
            `
            INSERT OR IGNORE INTO favorites (user_id, book_id)
            VALUES (?, ?)
            `,
            [userId, bookId]
        );
    },

    // Remover favorito
    removeFavorite(userId, bookId) {
        return run(
            `
            DELETE FROM favorites
            WHERE user_id = ? AND book_id = ?
            `,
            [userId, bookId]
        );
    },

    // Verificar favorito
    isFavorite(userId, bookId) {
        return get(
            `
            SELECT * FROM favorites
            WHERE user_id = ? AND book_id = ?
            `,
            [userId, bookId]
        );
    },

    // Listar todos os favoritos 
    listFavorites(userId) {
        return all(
            `
            SELECT l.*
            FROM livros l
            INNER JOIN favorites f ON l.id = f.book_id
            WHERE f.user_id = ?
            `,
            [userId]
        );
    }
};

module.exports = favoritesRepository;
