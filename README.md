# 📚 API Livraria

Este projeto foi desenvolvido com **Node.js** e **Express.js** e faz parte das atividades do curso de Desenvolvimento Web.  
A API permite gerenciar **livros**, **avaliações** e **autenticação de usuários**, possibilitando operações de listar, buscar, cadastrar, atualizar e excluir.

---

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **SQLite**  (banco de dados leve e integrado)
- **Morgan** (para logs de requisições)
- **Nodemon** (para execução automática em desenvolvimento)
- **Postman** (para testar e documentar as rotas)
- **dotenv** (para variáveis de ambiente)

---

## ⚙️ Funcionalidades

**Livros**
| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/livros` | Lista todos os livros |
| `GET` | `/livros/:id` | Busca um livro pelo ID |
| `POST` | `/livros` | Cadastra um novo livro |
| `PUT` | `/livros/:id` | Atualiza os dados de um livro |
| `DELETE` | `/livros/:id` | Remove um livro |

**Autenticação**
| Método | Rota               | Descrição                             |
| ------ | ------------------ | ------------------------------------- |
| POST   | /api/auth/register | Cadastra um novo usuário              |
| POST   | /api/auth/login    | Realiza login do usuário              |
| GET    | /api/auth/me       | Retorna informações do usuário logado |
| POST   | /api/auth/logout   | Realiza logout do usuário             |

**Avaliações**
| Método | Rota            | Descrição                        |
| ------ | --------------- | -------------------------------- |
| GET    | /avaliacoes     | Lista todas as avaliações        |
| GET    | /avaliacoes/:id | Busca uma avaliação pelo ID      |
| POST   | /avaliacoes     | Cadastra uma nova avaliação      |
| DELETE | /avaliacoes/:id | Remove uma avaliação             |

---

