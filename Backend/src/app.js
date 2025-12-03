const express = require("express");
const app = require("./config/express");
const path = require('path');
const db = require("./database/sqlite");

// Inicializa o banco
db.init(); 

// Serve arquivos de upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
const routes = require("./routes");
app.use("/api", routes);

// Tratamento de erros
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// 404
app.use((req, res) => {
    res.status(404).json({ erro: "Endpoint não encontrado" });
});

module.exports = app;
