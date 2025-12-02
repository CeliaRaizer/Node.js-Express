// frontend/src/pages/Avaliar.jsx
import React, { useState, useEffect } from 'react';
import { avaliarService } from '../services/avaliarService';
import AvaliarCard from '../components/AvaliarCard';
import AvaliarForm from '../components/AvaliarForm';
import './Avaliar.css';
import { livrosService } from '../services/livrosService';


const Avaliar = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [livros, setLivros] = useState([]);


  useEffect(() => {
    carregarReviews();
    carregarLivros();
  }, []);

  const carregarReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await avaliarService.listar();
      setReviews(data);
    } catch (err) {
      setError('Erro ao carregar avaliações.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const carregarLivros = async () => {
  try {
    const data = await livrosService.listar();
    setLivros(data);
  } catch (err) {
    console.error("Erro ao carregar livros:", err);
  }
  };


  const handleCreate = () => {
    setEditingReview(null);
    setShowForm(true);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover esta avaliação?')) return;

    try {
      await avaliarService.remover(id);
      showSuccess('Avaliação removida com sucesso!');
      carregarReviews();
    } catch (err) {
      setError('Erro ao remover avaliação.');
      console.error(err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingReview) {
        await avaliarService.atualizar(editingReview.id_review, formData);
        showSuccess('Avaliação atualizada com sucesso!');
      } else {
        await avaliarService.criar(formData);
        showSuccess('Avaliação criada com sucesso!');
      }

      setShowForm(false);
      setEditingReview(null);
      carregarReviews();
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao salvar avaliação.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return <div className="loading">Carregando avaliações...</div>;
  }

  return (
    <div className="container">
      <div className="avaliar-header">
        <h1>Avaliações</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          ➕ Nova Avaliação
        </button>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma avaliação criada ainda.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            Criar primeira avaliação
          </button>
        </div>
      ) : (
        <div className="avaliar-grid">
          {reviews.map((review) => (
            <AvaliarCard
              key={review.id_review}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <AvaliarForm
          review={editingReview}
          livros={livros} 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Avaliar;
