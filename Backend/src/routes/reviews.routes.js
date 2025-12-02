const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviews.controller");

const controller = new ReviewsController();

// Middleware opcional para proteger a criação de reviews
function auth(req, res, next) {
    if (!req.session?.userId) {
        return res.status(401).json({ erro: "Você precisa estar logado." });
    }
    next();
}

// Criar review
router.post("/", auth, controller.create.bind(controller));

// Listar todos os reviews
router.get("/", controller.getAll.bind(controller));

// Listar reviews de um livro
router.get("/livro/:id", controller.getByLivro.bind(controller));

router.delete("/:id", (req, res, next) => controller.delete(req, res, next));

module.exports = router;
