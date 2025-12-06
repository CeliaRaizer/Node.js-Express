// src/pages/Favoritos.jsx
import React, { useEffect, useState } from "react";
import { favoritesService } from "../services/favoritesService";
import LivroCard from "../components/LivroCard";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    favoritesService.list().then(data => {
      setFavoritos(data); 
    });
  }, []);

  return (
    <div>
      <h2>Meus Favoritos ❤️</h2>

      <div className="livros-grid">
        {favoritos.length === 0 ? (
          <p>Você ainda não favoritou nenhum livro.</p>
        ) : (
          favoritos.map(livro => (
            <LivroCard 
              key={livro.id} 
              livro={livro} 
              onEdit={() => {}} 
              onDelete={() => {}} 
            />

          ))
        )}
      </div>
    </div>
  );
};

export default Favoritos;
