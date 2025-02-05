import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

const DELETE_ENTERPRISE = gql`
  mutation DeleteEnterprise($id: ID!) {
    deleteEnterprise(id: $id) {
      id
    }
  }
`;

function DeleteEnterprise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteEnterprise] = useMutation(DELETE_ENTERPRISE);

  const handleDelete = () => {
    deleteEnterprise({ variables: { id } })
      .then(() => {
        alert('Empresa excluída com sucesso!');
        navigate('/');
      })
      .catch((err) => console.error('Erro ao excluir:', err));
  };

  return (
    <div className="container mt-4">
      <h2>Excluir Empresa</h2>
      <p>Tem certeza de que deseja excluir empresa?</p>
      <button className="btn btn-danger mx-2" onClick={handleDelete}>
        Excluir
      </button>
      <button className="btn btn-secondary mx-2" onClick={() => navigate('/')}>
        Cancelar
      </button>
    </div>
  );
}

export default DeleteEnterprise;
