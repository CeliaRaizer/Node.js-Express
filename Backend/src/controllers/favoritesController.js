//src/controllers/favoritesController.js
const favoritesRepository = require("../repositories/favorites.repository");

const favoritesController = {

    async addFavorite(req, res) {
        try {
            const userId = req.user.id;
            const bookId = req.params.bookId;

            await favoritesRepository.addFavorite(userId, bookId);
            return res.json({ message: "Livro adicionado aos favoritos!" });
        } catch (error) {
            console.error("Erro ao adicionar favorito:", error);
            return res.status(500).json({ error: "Erro ao adicionar favorito" });
        }
    },

    async removeFavorite(req, res) {
        try {
            const userId = req.user.id;
            const bookId = req.params.bookId;

            await favoritesRepository.removeFavorite(userId, bookId);
            return res.json({ message: "Livro removido dos favoritos!" });
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
            return res.status(500).json({ error: "Erro ao remover favorito" });
        }
    },

    async getFavorites(req, res) {
        try {
            const userId = req.user.id;

            const favoritos = await favoritesRepository.listFavorites(userId);
            return res.json(favoritos);
        } catch (error) {
            console.error("Erro ao listar favoritos:", error);
            return res.status(500).json({ error: "Erro ao listar favoritos" });
        }
    },

    async checkFavorite(req, res) {
        try {
            const userId = req.user.id;
            const bookId = req.params.bookId;

            const fav = await favoritesRepository.isFavorite(userId, bookId);
            return res.json({ isFavorite: !!fav });
        } catch (error) {
            console.error("Erro ao verificar favorito:", error);
            return res.status(500).json({ error: "Erro ao verificar favorito" });
        }
    }
};

module.exports = favoritesController;
