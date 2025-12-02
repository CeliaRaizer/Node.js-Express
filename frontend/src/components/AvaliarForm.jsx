import React, { useState, useEffect } from 'react';
import './LivroForm.css'; 

const AvaliarForm = ({ livros, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    livro_id: '',
    nota: 5,
    comentario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converte nota para número
    const payload = {
      livro_id: Number(formData.livro_id),
      nota: Number(formData.nota),
      comentario: formData.comentario
    };

    onSubmit(payload);
  };

  return (
    <div className="livro-form-overlay">
      <div className="livro-form-container">
        <h2>Nova Avaliação</h2>

        <form onSubmit={handleSubmit}>

          {/* Selecionar Livro */}
          <div className="input-group">
            <label>Livro </label>
            <select
              name="livro_id"
              value={formData.livro_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um livro</option>
              {livros.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.titulo} — {l.autor}
                </option>
              ))}
            </select>
          </div>

          {/* Nota */}
          <div className="input-group">
            <label>Nota (1 a 5)</label>
            <select
              name="nota"
              value={formData.nota}
              onChange={handleChange}
              required
            >
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n} ⭐</option>
              ))}
            </select>
          </div>

          {/* Comentário */}
          <div className="input-group">
            <label>Comentário</label>
            <textarea
              name="comentario"
              value={formData.comentario}
              onChange={handleChange}
              rows="3"
              placeholder="Escreva sua opinião sobre o livro..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>

            <button type="submit" className="btn btn-success">
              Enviar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvaliarForm;

