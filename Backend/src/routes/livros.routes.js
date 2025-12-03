const express = require('express');
const router = express.Router();

const LivrosController = require("../controllers/livros.controller");
const livrosController = new LivrosController();
const upload = require('../uploads/multer'); // <- Multer

const { validarLivro, validarParamId } = require("../middleware/validar/livros.validar");

router.get("/", livrosController.listarLivros.bind(livrosController));
router.get("/:id", validarParamId, livrosController.buscarLivroPorId.bind(livrosController));

// Aqui adicionamos o Multer
router.post("/", upload.single('capa'), validarLivro, livrosController.criarLivro.bind(livrosController));
router.put("/:id", upload.single('capa'), validarParamId, validarLivro, livrosController.atualizarLivro.bind(livrosController));

router.delete("/:id", validarParamId, livrosController.removerLivro.bind(livrosController));

module.exports = router;
