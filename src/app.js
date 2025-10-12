const app = require ("./config/express");

const routes = require("./routes"); //todas as rotas da aplicação (centralizadas)
const errorHandler = require("./middleware/errorHandler") //configura o middleware de tratamento de erros

app.use("/api", routes); //configura as rotas com prefixo /api

app.use(errorHandler); //middleware de tratamento de erros

app.use((req, res) => { //handler para rotas não encontradas (404)
    res.status(404).json({erro: "Endpoint não encontrado"});
});

module.exports = app;