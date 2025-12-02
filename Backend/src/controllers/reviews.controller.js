const ReviewsRepository = require("../repositories/reviews.repository");

class ReviewsController {
    constructor() {
        this.repo = new ReviewsRepository();
    }

    async create(req, res, next) {
        try {
            if (!req.session.userId) {
                return res.status(401).json({ erro: "Você precisa estar logado." });
            }

            const { livro_id, nota, comentario } = req.body;

            if (!livro_id || !nota) {
                return res.status(400).json({ erro: "Livro e nota são obrigatórios." });
            }

            const review = await this.repo.create({
                livro_id,
                usuario_id: req.session.userId,
                nota,
                comentario
            });

            res.status(201).json({
                mensagem: "Review criada com sucesso",
                review
            });
        } catch (err) {
            next(err);
        }
    }

    async getByLivro(req, res, next) {
        try {
            const reviews = await this.repo.getByLivro(req.params.id);
            res.json(reviews);
        } catch (err) {
            next(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const reviews = await this.repo.getAll();
            res.json(reviews);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ReviewsController;
