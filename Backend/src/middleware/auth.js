//middleware/auth.js
function requireAuth(req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ erro: 'Acesso não autorizado. Faça login.' });
    }

    // se quiser disponibilizar user para as rotas:
    req.user = { id: req.session.userId };

    next();
}

module.exports = requireAuth;


