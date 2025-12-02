// src/routes/index.js
const express = require("express");
const router = express.Router();

// Rotas de livros
const livrosRoutes = require("./livros.routes");
const authRoutes = require('./auth.routes'); 
const reviewsRoutes = require("./reviews.routes"); 

// Rota inicial (explicação do sistema)
router.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Bem-vindo à API da Livraria! Use /livros para gerenciar os livros.",
    });
});

// Usa as rotas
router.use("/livros", livrosRoutes);
router.use("/auth", authRoutes);
router.use("/reviews", reviewsRoutes); 

module.exports = router;
