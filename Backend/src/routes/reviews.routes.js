const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviews.controller");

const controller = new ReviewsController();

// Criar review
router.post("/", (req, res, next) => controller.create(req, res, next));

// Listar todos os reviews
router.get("/", (req, res, next) => controller.getAll(req, res, next));

// Listar reviews de um livro
router.get("/livro/:id", (req, res, next) => controller.getByLivro(req, res, next));

module.exports = router;
