// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const resposta = {
    erro: err.message || "Erro interno do servidor",
    timestamp: new Date().toISOString(),
    url: req.originalUrl,
    method: req.method
  };

  if (err.details) {
    resposta.detalhes = err.details;
  }

  if (process.env.NODE_ENV === "development") {
    resposta.stack = err.stack;
  }

  res.status(statusCode).json(resposta);
};

module.exports = errorHandler;
