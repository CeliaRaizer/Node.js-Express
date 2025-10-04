const express = require('express');
const app = express(); //instancia da aplicação express, express() é uma função que retorna um objeto (geralmente chamado de app).
//Esse objeto representa o seu servidor, través dele que você define as rotas, middlewares, e como o servidor vai responder às requisições.

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

let livros = [
  { id: 1, titulo: "Clean Code", autor: "Robert C. Martin", categoria: "Programação", ano: 2008 },
  { id: 2, titulo: "O Programador Pragmático", autor: "Andrew Hunt e David Thomas", categoria: "Programação", ano: 1999 },
  { id: 3, titulo: "Design Patterns", autor: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", categoria: "Programação", ano: 1994 },
]

//pagina inicial
app.get('/', (req, res) => { //criamos uma rta
    res.send(`
        <h1>Biblioteca Online</h1>
        <p>Use os endpoints:</p>
        <ul>
        <li>GET /livros → lista os livros</li>
        <li>GET /livros/id → lista livro por id </li>
        <li>GET /livro/categoria → lista livro por categoria</li>
        <li>POST /livros → adiciona um livro (JSON: {titulo, autor})</li>
        <li>DELETE /livros/:id → remove livro pelo id</li>
        </ul>
    `);
});

/*Listar livros
  Método: GET */
app.get('/livros', (req,res) => {
    res.status(200).json(livros); //define http 200 OK, converte array livros em json e manda como resposta
});

/*Adicionar um novo livro
  Método: POST */
app.post('/livros', (req, res) =>{ //app.post->Responde a requisiçoes POST; "/livros" → endpoint chamado (exemplo: POST http://localhost:3000/livros).
    const {titulo, autor, categoria, ano} = req.body; //Aqui usamos desestruturação para pegar os campos enviados no corpo da requisição JSON.

    if(!titulo || !autor || !categoria || !ano){ //verificação se algum campo esta faltando
        return res.status(400).json({erro: 'Preencha todos os campos'})
    }

    const novoLivro = {
        id: livros.length +1 , //gera automaticamente id (qntd livro+1)
        titulo,
        autor,
        categoria,
        ano
    };

    livros.push(novoLivro); //adiciona o novo livro ao array de livros
    res.status(201).json({mensagem: 'Livro adicionado com sucesso', livro: novoLivro}); //201 Created → código de sucesso para criação.
});

/*  Listar um livro pelo ID
    Método: GET */
app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id) //pega o parametro id da url
    const livro = livros.find(livro => livro.id === id) //procura livro com mesmo id

    if(!livro){
        return res.status(400).json({erro: 'Livro não encontrado'})
    }

    res.status(200).json(livro); //http 200 ok
});

/* Listar um livro por categoria
    Método: GET*/
app.get('/livro/:categoria', (req, res) => {
    const cat = req.params.categoria
    const livro = livros.filter(livro => livro.categoria === cat)

    if(!livro){
        return res.status(400).json({erro: 'Livro não encontrado'})
    }

    res.status(200).json(livro)
})

/*Atualizar um livro pelo ID
  Método: PUT */
app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {titulo, autor, categoria, ano} = req.body; // Pega os dados enviados no corpo da requisição (JSON)

    const livro = livros.find(livro => livro.id === id); // // Procura no array "livros" o livro com o ID correspondente
    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    if (!titulo || !autor || !categoria || !ano) {
        return res.status(400).json({ erro: "Preencha todos os campos" }); // HTTP 400 Bad Request
    }

    livro.titulo = titulo;
    livro.autor = autor;
    livro.categoria = categoria;
    livro.ano = ano

    res.status(200).json({mensagem : 'Livro atualizado com sucesso', livro});
});

/* Remover um livro pelo ID
   Método: DELETE */
app.delete('/livros/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const index = livros.findIndex(livro => livro.id === id); //Procura o índice do livro dentro do array "livros"
        
    if (index === -1){
        return res.status(404).json({erro:'Livro não encontrado'});
    }

    const removido = livros.splice(index, 1); //Remove o livro do array usando splice(), splice retorna um array com o item removido → [removido]
    res.status(200).json({mesagem:'Livro removido', livro: removido[0]});
});

module.exports = app;