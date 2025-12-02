import api from './api';

export const avaliarService = {
  // Listar todos os reviews
  async listar() {
    const response = await api.get('/reviews');
    return response.data;
  },

  // Buscar reviews de um livro específico
  async buscarPorLivro(livroId) {
    const response = await api.get(`/reviews/livro/${livroId}`);
    return response.data;
  },

  // Criar review
  async criar({ livro_id, nota, comentario }) {
    const response = await api.post('/reviews', {
      livro_id,
      nota,
      comentario
    });
    return response.data;
  },

  // Excluir review
  async remover(id) {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  }
};
