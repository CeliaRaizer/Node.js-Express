# 📚 API Livraria 

Este projeto implementa uma **API RESTful** completa para gerenciar livros, usuários, avaliações e favoritos. Além disso, a arquitetura do frontend foi desenhada para suportar **upload de capas** e alternância de **tema claro/escuro**.

Foi desenvolvido como parte dos desafios práticos do curso de Desenvolvimento Web, incluindo operações completas de CRUD, autenticação com sessões, sistema de reviews, favoritos e gerenciamento de imagens.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando um *stack* Node.js, complementado por ferramentas essenciais:

* **Node.js** + **Express.js** – Servidor da aplicação.
* **SQLite** + **better-sqlite3** – Banco de dados leve e rápido.
* **Multer** – Middleware para manipulação e upload de imagens.
* **Cookies de sessão** – Mecanismo de autenticação persistente.
* **Morgan** – Módulo de log de requisições HTTP.
* **dotenv** – Gerenciamento de variáveis de ambiente.
* **Nodemon** – Ferramenta para monitoramento e auto-reload no ambiente de desenvolvimento.

---

## ⚙️ Funcionalidades da API

A API é estruturada em torno de cinco recursos principais: Livros, Autenticação, Avaliações, Favoritos e tema claro/escuro (gerenciado principalmente pelo frontend).

### 📘 1. CRUD de Livros + Upload de Capa

O usuário pode cadastrar livros, incluindo o upload de uma imagem de capa usando o Multer.

#### 📌 Rotas

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/livros` | Lista todos os livros. |
| `GET` | `/livros/:id` | Retorna um livro pelo ID. |
| `POST` | `/livros` | Cadastra um novo livro (com upload da capa). |
| `PUT` | `/livros/:id` | Atualiza um livro existente. |
| `DELETE` | `/livros/:id` | Remove um livro. |

#### 🖼️ Sobre o Upload

* As imagens são salvas no diretório `/uploads` do servidor.
* Apenas o **caminho** da imagem é armazenado no banco, mantendo-o leve.
* O frontend acessa a imagem via URL pública.

---

### 👤 2. Autenticação

Sistema completo baseado em cookies de sessão para gerenciamento de usuários e controle de acesso.

#### 📌 Rotas

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Cria um novo usuário. |
| `POST` | `/api/auth/login` | Realiza o login, estabelecendo o cookie de sessão. |
| `GET` | `/api/auth/me` | Retorna os dados do usuário autenticado (requer cookie válido). |
| `POST` | `/api/auth/logout` | Efetua o logout, invalidando o cookie de sessão. |

---

### ⭐ 3. Sistema de Avaliações (`/api/reviews`)

Gerenciamento das avaliações dos livros, com tabelas interligadas.

* **Relacionamentos:** `reviews` $\rightarrow$ `livros` (`book_id`) e `reviews` $\rightarrow$ `users` (`user_id`).

#### 📌 Rotas

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/reviews` | Lista todas as avaliações. |
| `GET` | `/api/reviews/minhas` | Lista avaliações feitas pelo usuário logado. |
| `POST` | `/api/reviews` | Cria uma nova avaliação. |
| `DELETE` | `/api/reviews/:id_review` | Remove uma avaliação específica. |

---

### ❤️ 4. Sistema de Favoritos (`/api/favorites`)

Permite que cada usuário mantenha uma lista pessoal de livros preferidos.

#### 📌 Rotas

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/favorites/:book_id` | Adiciona um livro aos favoritos. |
| `DELETE` | `/api/favorites/:book_id` | Remove o livro dos favoritos. |
| `GET` | `/api/favorites` | Lista todos os favoritos do usuário logado. |
| `GET` | `/api/favorites/check/:book_id` | Verifica se um livro está favoritado pelo usuário. |

#### ✔ Fluxo Frontend

* Botão de favoritar/desfavoritar com ícone de coração dinâmico.
* Página dedicada "Meus Favoritos".
* Atualização em tempo real das ações de favoritar.

---

### 🌗 5. Tema Claro/Escuro (Frontend)

Funcionalidade de usabilidade implementada no frontend (React).

* **Botão** para alternar entre os temas claro e escuro.
* A preferência do tema é salva no **localStorage** do navegador.
* O estilo é aplicado globalmente via **Context API**.

---

## 🗃️ Estrutura do Banco de Dados

O banco de dados possui quatro tabelas principais interligadas (`users`, `livros`, `reviews`, `favorites`), todas configuradas com **`ON DELETE CASCADE`** para garantir a integridade dos dados.

### 🧹 Comportamento Cascade Automático

O relacionamento `ON DELETE CASCADE` garante a limpeza automática de dados órfãos:

* Ao **excluir um livro** $\rightarrow$ suas avaliações + favoritos são removidos.
* Ao **excluir um usuário** $\rightarrow$ suas avaliações + favoritos são removidos.

---

## Estrutura Geral do Projeto

A aplicação está organizada em dois diretórios principais:

* `├── backend/` # Contém a API RESTful Node.js/Express.js
* `└── frontend/` # Contém a aplicação de cliente (React)

---

## 💻 Estrutura de Pastas (`backend`)

```backend/
├── server.js            # Inicialização do servidor
├── app.js               # Configurações principais
├── package.json
└── src/
    ├── config           # Configurações gerais
    ├── controllers      # Lógica das rotas
    ├── data             # Arquivos do banco
    ├── database         # Conexão SQLite
    ├── middleware       # Auth, uploads, validações, etc.
    ├── models           # Modelos de dados
    ├── repositories     # Consultas diretas ao banco
    ├── routes           # Arquitetura de rotas
    └── uploads          # Diretório para capas enviadas (Multer)
```


### Estrutura do Frontend (`frontend`)
O diretório `frontend/` segue a estrutura padrão de uma aplicação React:

```frontend/
├── public/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── assets
    ├── components        # Componentes reutilizáveis
    ├── contexts          # Context API (ex: Tema)
    ├── pages             # Páginas principais da aplicação
    ├── services          # Comunicação com o backend (API)
    ├── App.jsx
    └── main.jsx
```

---
## ▶️ Como Rodar a Aplicação

Para iniciar o projeto, você deve rodar o **backend** (API) e o **frontend** (Cliente) separadamente, seguindo os passos abaixo:

---

### 1. ⚙️ Rodar o Backend (API)

Entre no diretório `backend` e execute os seguintes comandos no seu terminal:

```bash
cd backend
npm install
npm run dev
```
O servidor estará rodando em http://localhost:3333

### 2. Rodar o Frontend (Cliente)

Entre no diretório `frontend` e execute os seguintes comandos no seu terminal:

```cd frontend
npm install
npm run dev
``` 
🖥️ Aplicação rodando em: http://localhost:3000/
