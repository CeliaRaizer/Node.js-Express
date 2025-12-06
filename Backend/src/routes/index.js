// src/routes/index.js
const express = require("express");
const router = express.Router();

const livrosRoutes = require("./livros.routes");
const authRoutes = require("./auth.routes");
const reviewsRoutes = require("./reviews.routes");
const favoritesRoutes = require("./favorites.routes");

// Rota inicial
router.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Bem-vindo à API da Livraria! Use /livros para gerenciar os livros.",
    });
});

//rotas
router.use("/livros", livrosRoutes);
router.use("/auth", authRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/favorites", favoritesRoutes);

module.exports = router;
