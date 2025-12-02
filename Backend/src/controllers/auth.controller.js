// src/controllers/auth.controller.js
const bcrypt = require('bcrypt'); //biblioteca usada para criptografar senhas.
const UsersRepository = require('../repositories/users.repository'); //camada que conversa com o banco (CRUD de usuários).

class AuthController {
    constructor() { //Cria uma instância do repositório
        this.usersRepo = new UsersRepository(); 
    }

    async register(req, res, next) { //Recebe os dados enviados via POST (JSON).
  try {
    const { username, email, password } = req.body;

    if (!username || !password) { //Valida se username e password existem.
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    // verifica se já existe o usuário
    const existingUser = await this.usersRepo.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ erro: 'Usuário já existe.' }); //Retorna 409 Conflict se sim.
    }

    // gera o hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // cria o usuário no banco
    const user = await this.usersRepo.create({ username, email, passwordHash });

    // salva a sessão
    req.session.userId = user.id;

    res.status(201).json({
      mensagem: 'Usuário registrado com sucesso!',
      user: user.toJSON ? user.toJSON() : user
    });

  } catch (err) {
    next(err);
  }
}


    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // aguarda a Promise ser resolvida
            const user = await this.usersRepo.findByEmail(email);
            if (!user) {
            return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
            }

            // aqui o campo certo é password_hash
            const valid = await bcrypt.compare(password, user.password_hash);
            if (!valid) {
            return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
            }

            req.session.userId = user.id;
            res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            user: user // ou user.toJSON(), se existir
            });

        } catch (err) {
            next(err);
        }
        //Busca o usuário no banco via username.
        //Compara a senha digitada com o password_hash salvo.
        // Se for válida, salva req.session.userId e retorna sucesso.
    }

    async me(req, res, next) {
        //Se não houver req.session.userId, o usuário não está logado.
        // Caso contrário, busca o usuário e retorna seus dados.
        try {
            if (!req.session.userId) {
                return res.status(401).json({ erro: 'Não autenticado.' });
            }
            const user = await this.usersRepo.findById(req.session.userId);
            if (!user) {
                return res.status(404).json({ erro: 'Usuário não encontrado.' });
            }
            res.status(200).json({ user: user.toJSON() });
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        //Destroi a sessão no servidor.
        // O cookie de sessão também perde validade no cliente.
        req.session.destroy(() => {
            res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
        });
    }


}
module.exports = AuthController;