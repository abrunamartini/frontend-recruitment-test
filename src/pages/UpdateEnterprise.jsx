import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_ENTERPRISE = gql`
  query GetEnterprise($id: ID!) {
    enterprise(id: $id) {
      id
      name
      commercial_name
      cnpj
      description
    }
  }
`;

const UPDATE_ENTERPRISE = gql`
  mutation UpdateEnterprise($id: ID!, $name: String!, $commercial_name: String!, $cnpj: String!, $description: String!) {
    updateEnterprise(id: $id, name: $name, commercial_name: $commercial_name, cnpj: $cnpj, description: $description) {
      id
      name
      commercial_name
      cnpj
      description
    }
  }
`;



function UpdateEnterprise() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ENTERPRISE, { variables: { id } });
  const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE);
  const [formData, setFormData] = useState({
    name: '',
    commercial_name: '',
    cnpj: '',
    description: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormData(data.enterprise);
    }
  }, [data]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEnterprise({ variables: { id, ...formData } })
      .then(() => {
        alert('Empresa atualizada com sucesso!');
        navigate('/');
      })
      .catch((err) => console.error('Erro ao atualizar:', err));
  };

  // const handleNewEmployee = () => {
  //   navigate(`/enterprise/${id}/new-employee`); 
  // };


  return (
    <div className="container mt-4">
      <h2>Editar Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome Fantasia</label>
          <input
            type="text"
            className="form-control"
            name="commercial_name"
            value={formData.commercial_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CNPJ</label>
          <input
            type="text"
            className="form-control"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
      {/* <button 
        className="btn btn-success mt-4"
        onClick={handleNewEmployee}
        >
        Novo Funcionário
      </button> */}
    </div>
  );
}

export default UpdateEnterprise;
