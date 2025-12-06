# 📚 API Livraria - Gerenciamento Completo

Este projeto implementa uma **API RESTful** para gerenciar livros, usuários, avaliações e favoritos. Foi desenvolvida como parte das atividades do curso de Desenvolvimento Web.

A API permite o **CRUD** completo de livros, autenticação de usuários, um sistema de avaliações, **gerenciamento de favoritos** e o **upload de imagens de capa**.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando um stack Node.js e ferramentas essenciais:

* **Node.js** & **Express.js** (Framework web)
* **SQLite** (Banco de dados leve, com o driver **Better-sqlite3**)
* **Multer** (Middleware para upload de arquivos)
* **JWT** ou **Cookies de sessão** (Para autenticação e controle de acesso)
* **Morgan** (Logger de requisições HTTP)
* **Nodemon** (Ferramenta para auto-reload em desenvolvimento)
* **dotenv** (Gerenciamento de variáveis de ambiente)

---

## ⚙️ Funcionalidades da API

A API é estruturada em torno de quatro recursos principais: Livros, Autenticação, Avaliações e Favoritos.

### 📘 Livros

Permite o **CRUD** completo e o gerenciamento da imagem de capa.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/livros` | Lista todos os livros. |
| `GET` | `/livros/:id` | Retorna um livro específico. |
| `POST` | `/livros` | Cadastra um novo livro (com upload da capa). |
| `PUT` | `/livros/:id` | Atualiza um livro existente. |
| `DELETE` | `/livros/:id` | Remove um livro. **Aciona o CASCADE para apagar avaliações e favoritos relacionados.** |

#### 🖼️ Upload de Capa

* As imagens são salvas no diretório `/uploads` do servidor.
* Apenas o **caminho** da imagem é armazenado no banco.
* O frontend acessa a imagem via URL pública (Exemplo: `http://localhost:3333/uploads/arquivo.jpg`).

---

### 👤 Autenticação

Gerenciamento de usuários e controle de acesso.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Cria um novo usuário. |
| `POST` | `/api/auth/login` | Realiza o login e retorna o token de autenticação. |
| `GET` | `/api/auth/me` | Retorna os dados do usuário autenticado (requer token). |
| `POST` | `/api/auth/logout` | Finaliza a sessão do usuário. |

---

### ⭐ Sistema de Avaliações (`/api/reviews`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/reviews` | Lista todas as avaliações registradas. |
| `GET` | `/api/reviews/minhas` | Lista avaliações feitas pelo usuário autenticado. |
| `POST` | `/api/reviews` | Cria uma nova avaliação para um livro. |
| `DELETE` | `/api/reviews/:id_review` | Remove uma avaliação específica. |

---

### ❤️ Favoritos (`/api/favorites`)

Nova funcionalidade que permite aos usuários gerenciar uma lista pessoal de livros favoritos.

#### 🌟 Rotas de Favoritos

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/favorites/:book_id` | Adiciona um livro aos favoritos do usuário logado. |
| `DELETE` | `/api/favorites/:book_id` | Remove o livro dos favoritos. |
| `GET` | `/api/favorites` | Lista todos os favoritos do usuário autenticado. |
| `GET` | `/api/favorites/check/:book_id` | Verifica se um livro específico está favoritado pelo usuário. |

#### ✔ Fluxo no Frontend

* Exibição de ícone de coração (vazio/preenchido) por livro.
* Página dedicada "Meus Favoritos" exibindo a lista pessoal do usuário.

---

## 🗃️ Estrutura do Banco (SQLite)

O banco de dados possui quatro tabelas principais interligadas com **`ON DELETE CASCADE`** para garantir a integridade dos dados:

* `users`
* `livros`
* `reviews`
* `favorites`

### 🧹 Comportamento Cascade Automático

O relacionamento `ON DELETE CASCADE` garante a limpeza automática de dados órfãos:

* Ao **excluir um livro** $\rightarrow$ suas avaliações + favoritos são removidos.
* Ao **excluir um usuário** $\rightarrow$ suas avaliações + favoritos são removidos.

### 🗂️ Tabela `favorites` (Exemplo)

```sql
favorites (
  user_id INTEGER,
  book_id INTEGER,
  PRIMARY KEY (user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES livros(id) ON DELETE CASCADE
)

/
├── /src
│   ├── /controllers      <- Lógica de negócio e manipulação de requisições.
│   ├── /repositories     <- Camada de acesso ao banco de dados.
│   ├── /routes           <- Definição de todas as rotas da API.
│   ├── /middlewares      <- Funções como autenticação e Multer.
│   └── /data/livraria.db <- Arquivo do banco de dados.
├── /uploads              <- Onde as imagens de capa são armazenadas.
└── server.js             <- Ponto de entrada da aplicação.