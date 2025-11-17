
const express = require('express'); //cria um mini roteador que agrupa rotas relacionadas.
const router = express.Router();
const AuthController = require('../controllers/auth.controller'); //classe com os métodos (register, login, etc.).
const { requireAuth } = require('../middleware/auth'); //middleware que impede acesso a rotas privadas se o usuário não estiver logado.

const authController = new AuthController(); //instância usada para chamar os métodos.

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.get('/me', requireAuth, (req, res, next) => authController.me(req, res, next));
router.post('/logout', requireAuth, (req, res, next) => authController.logout(req, res, next));

module.exports = router;

