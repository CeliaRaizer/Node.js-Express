import React from 'react';
import './AvaliarCard.css';

const AvaliarCard = ({ review, onDelete }) => {
  if (!review) return null; // evita crash caso review não exista

  return (
    <div className="review-card">
      <h3>⭐ {review.nota}/5</h3>

      <p><strong>Usuário:</strong> {review.usuarioNome}</p>

      {review.livroTitulo && (
        <p><strong>Livro:</strong> {review.livroTitulo}</p>
      )}

      {review.comentario && (
        <p><strong>Comentário:</strong> {review.comentario}</p>
      )}

      <p className="data">
        {new Date(review.dataReview).toLocaleString()}
      </p>

      <button onClick={() => onDelete(review.id_review)} className="btn btn-danger">
        🗑️ Remover
      </button>
    </div>
  );
};

export default AvaliarCard;
