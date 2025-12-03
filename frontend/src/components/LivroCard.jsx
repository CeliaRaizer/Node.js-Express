// frontend/src/components/LivroCard.jsx
import React from 'react';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete }) => {

  // Monta a URL da capa corretamente
 const capaURL = livro.capa
  ? `http://localhost:3333/${livro.capa}`
  : null;


  return (
    <div className="livro-card">

      {/* Exibir capa (se existir) */}
      {capaURL && (
        <img 
          src={capaURL} 
          alt={`Capa de ${livro.titulo}`} 
          className="capa-livro"
        />
      )}

      <h3>{livro.titulo}</h3>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Ano:</strong> {livro.ano}</p>
      {livro.editora && <p><strong>Editora:</strong> {livro.editora}</p>}

      <div className="card-actions">
        <button onClick={() => onEdit(livro)} className="btn btn-primary">
          ✏️ Editar
        </button>
        <button onClick={() => onDelete(livro.id)} className="btn btn-danger">
          🗑️ Remover
        </button>
      </div>
    </div>
  );
};

export default LivroCard;
