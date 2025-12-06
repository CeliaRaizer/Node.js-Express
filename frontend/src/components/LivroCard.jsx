import React, { useEffect, useState } from 'react';
import './LivroCard.css';
import { favoritesService } from '../services/favoritesService';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LivroCard = ({ livro, onEdit, onDelete }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  // Verifica se já é favorito
  useEffect(() => {
    const loadFavorite = async () => {
      try {
        const res = await favoritesService.check(livro.id);

        setIsFavorite(res.isFavorite);
      } catch (error) {
        console.error("Erro ao verificar favorito:", error);
        setIsFavorite(false);
      }
    };

    loadFavorite();
  }, [livro.id]);

  // Alternar favorito
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favoritesService.remove(livro.id);
        setIsFavorite(false);
      } else {
        await favoritesService.add(livro.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };


  const capaURL = livro.capa
    ? `http://localhost:3333/${livro.capa}`
    : null;

  return (
    <div className="livro-card">

      <button
        className="favorite-btn"
        onClick={toggleFavorite}
        title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >

        {isFavorite ? (
          <FaHeart size={22} color="red" />
        ) : (
          <FaRegHeart size={22} />
        )}
      </button>

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
