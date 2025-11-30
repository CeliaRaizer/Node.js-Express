//backend/src/config/express.js
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

const app = express(); // Cria a instância principal do Express

//middleware básicos do Express
app.use(express.json()); //middleware para interpretar JSON
app.use(express.urlencoded({ extended: true})); //suporte para dados de formulários
app.use(morgan("common")); //Logging HTTP

app.use(session({
    secret: process.env.SESSION_SECRET || "livraria_secret_key",
    resave: false, // evita salvar sessões não modificadas
    saveUninitialized: false, // evita criar sessões vazias
    rolling: true, // renova a sessão a cada requisição
    cookie: {
        httpOnly: true,   // impede acesso via JS (mais seguro)
        secure: false,    // true apenas em produção HTTPS
        maxAge: 1000 * 60 * 60 * 2 // 2 horas
    }
}));

module.exports = app;