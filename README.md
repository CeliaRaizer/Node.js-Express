# 📚 API Livraria

Este projeto implementa uma API RESTful para gerenciar livros, usuários e avaliações, desenvolvida como parte das atividades do curso de Desenvolvimento Web.

A API permite o **CRUD** completo de livros, autenticação de usuários e um sistema de avaliações, incluindo o **upload de imagens** de capa.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

* **Node.js**
* **Express.js** (Framework web)
* **SQLite** (Banco de dados leve, integrado ao projeto)
* **Multer** (Middleware para upload de arquivos, utilizado para as capas)
* **Morgan** (Logger de requisições HTTP)
* **Nodemon** (Auto-reload em desenvolvimento)
* **Postman** (Utilizado para testes das rotas)
* **dotenv** (Gerenciamento de variáveis de ambiente)
* **Better-sqlite3** (Driver de banco de dados)

---

## ⚙️ Funcionalidades da API

A API oferece as seguintes rotas e funcionalidades:

### 📘 Livros

Permite o **CRUD** completo e o **upload de uma imagem de capa** por livro.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/livros` | Lista todos os livros. |
| `GET` | `/livros/:id` | Retorna um livro específico. |
| `POST` | `/livros` | Cadastra um novo livro (incluindo o upload da capa). |
| `PUT` | `/livros/:id` | Atualiza um livro existente. |
| `DELETE` | `/livros/:id` | Remove um livro (com exclusão automática das avaliações relacionadas, devido ao `ON DELETE CASCADE`). |

#### 🖼️ Gerenciamento de Capa

* O arquivo da imagem é recebido via **Multer**.
* A API salva a imagem na pasta `/uploads` do projeto.
* Apenas o **caminho** da imagem é armazenado no banco de dados.
* O frontend exibe a imagem via **URL pública** do servidor.

**Exemplo de dado salvo no campo `capa` do banco:**
> `"capa": "uploads/1764728171247-380539562.jpg"`

---

### 👤 Autenticação

A autenticação é baseada em usuários armazenados no banco de dados SQLite.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Cadastra um novo usuário. |
| `POST` | `/api/auth/login` | Realiza o login e retorna o token de autenticação. |
| `GET` | `/api/auth/me` | Retorna os dados do usuário autenticado (requer token). |
| `POST` | `/api/auth/logout` | Finaliza a sessão (se aplicável ao tipo de token/sessão). |

---

### ⭐ Avaliações de Livros

As avaliações são gerenciadas sob a rota `/api/reviews`.

* **Comportamento `ON DELETE CASCADE`:**
    * **Ao excluir um livro**, todas as avaliações associadas a ele são **apagadas automaticamente**.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/reviews` | Lista todas as avaliações. |
| `GET` | `/api/reviews/minhas` | Lista as avaliações do usuário logado. |
| `POST` | `/api/reviews` | Cadastra uma nova avaliação. |
| `DELETE` | `/api/reviews/:id_review` | Remove uma avaliação específica. |

---

## 🗃️ Estrutura do Banco (SQLite)

O banco de dados possui três tabelas principais, com as seguintes chaves estrangeiras para garantir integridade e o comportamento CASCADE:

* **`livros`**: Contém informações dos livros e o caminho da imagem de capa.
* **`users`**: Guarda os dados de autenticação dos usuários.
* **`reviews`**: Contém as avaliações, com as seguintes referências:
    * `FOREIGN KEY (livro_id) REFERENCES livros(id) **ON DELETE CASCADE**`
    * `FOREIGN KEY (usuario_id) REFERENCES users(id) **ON DELETE CASCADE**`

---

## 📁 Estrutura de Pastas Simplificada

```
/ ├── /src 
│ ├── /controllers 
│ ├── /repositories 
│ ├── /routes 
│ ├── /middlewares 
│ └── /data/livraria.db 
├── /uploads <- Onde as imagens de capa são salvas. 
└── server.js

```

---

## ✅ Conclusão do Projeto

A API encontra-se completa e funcional, englobando:

* **CRUD** de livros.
* **Upload de capas** integrado.
* **Autenticação** de usuários.
* Sistema de **avaliações com `ON DELETE CASCADE`**.
* **Integração completa** com um frontend **React** para exibição e gerenciamento.