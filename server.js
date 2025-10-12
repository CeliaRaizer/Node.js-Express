require('dotenv').config(); //carrega as variaves do arquivo .env

const app = require("./src/app"); //importa o módulo que esta no arquivo /src/app

const PORT = process.env.PORT || 3000; // Define a porta do servidor (usa .env ou 3000 por padrão)
const NODE_ENV = process.env.NODE_ENV || 'development'; // Define o ambiente 

app.listen(PORT, () =>{
    console.log(`Servidor iniciado na porta ${PORT} (${NODE_ENV})`);
});