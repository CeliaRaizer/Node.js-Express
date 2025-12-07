// frontend/src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>📚 Livraria</h1>
        </Link>
        
        <nav className="nav">
          {user ? (
            <>
              <Link to="/" className="nav-link">Início</Link>
              <Link to="/livros" className="nav-link">Livros</Link>
              <Link to="/avaliar" className="nav-link">Avaliações</Link>
              <Link to="/favoritos" className="nav-link">Meus Favoritos</Link>

              <div className="user-info">
               <span>Olá, {user.username || user.email}!</span>

                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                >
                  Sair
                </button>

                <button onClick={toggleTheme} className="theme-btn">
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
              </div>

            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Registrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
