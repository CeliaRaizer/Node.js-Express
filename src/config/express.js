const express = require("express");
const morgan = require("morgan");

const app = express(); // Cria a instância principal do Express

//middleware básicos do Express
app.use(express.json()); //middleware para interpretar JSON
app.use(express.urlencoded({ extended: true})); //suporte para dados de formulários
app.use(morgan("combined")); //Logging HTTP

module.exports = app;