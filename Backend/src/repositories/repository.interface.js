// src/repositories/repository.interface.js
const fs = require("fs").promises;
const path = require("path");

class RepositoryBase {
  constructor() {
    if (this.constructor === RepositoryBase) {
      throw new Error("Não é possível instanciar uma classe abstrata diretamente.");
    }
    this.caminhoArquivo = null;
  }

  async findAll() { throw new Error("Método findAll() deve ser implementado"); }
  async findById() { throw new Error("Método findById() deve ser implementado"); }
  async create() { throw new Error("Método create() deve ser implementado"); }
  async update() { throw new Error("Método update() deve ser implementado"); }
  async delete() { throw new Error("Método delete() deve ser implementado"); }

  async _lerArquivo() {
    try {
      const dados = await fs.readFile(this.caminhoArquivo, "utf-8");
      return dados;
    } catch (err) {
      if (err.code === "ENOENT") {
        await this._saveToFile([]);
        return "[]";
      }
      throw err;
    }
  }

  async _saveToFile(data) {
    await fs.writeFile(this.caminhoArquivo, JSON.stringify(data, null, 2), "utf-8");
  }

  async getNextId() {
    const dados = JSON.parse(await this._lerArquivo());
    if (dados.length === 0) return 1;
    return Math.max(...dados.map(item => item.id)) + 1;
  }
}

module.exports = RepositoryBase;
