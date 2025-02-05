import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_ENTERPRISE = gql`
  mutation CreateEnterprise($name: String!, $commercial_name: String!, $cnpj: String!, $description: String!) {
    createEnterprise(name: $name, commercial_name: $commercial_name, cnpj: $cnpj, description: $description) {
      id
      name
      commercial_name
      cnpj
      description
    }
  }
`;

function CreateEnterprise() {
  const [formData, setFormData] = useState({
    name: '',
    commercial_name: '',
    cnpj: '',
    description: ''
  });

  const navigate = useNavigate();
  const [createEnterprise] = useMutation(CREATE_ENTERPRISE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEnterprise({ variables: formData })
      .then(() => {
        alert('Empresa criada com sucesso!');
        navigate('/');
      })
      .catch((err) => console.error('Erro ao criar:', err));
  };

  return (
    <div className="container mt-4">
      <h2>Criar Nova Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome Comercial</label>
          <input
            type="text"
            className="form-control"
            name="commercial_name"
            value={formData.commercial_name}
            onChange={handleChange}
            required
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
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default CreateEnterprise;
