import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($name: String!, $position: String!, $enterprise_id: ID!) {
    createEmployee(name: $name, position: $position, enterprise_id: $enterprise_id) {
      id
      name
      position
      enterprise_id
    }
  }
`;

function CreateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const [formData, setFormData] = useState({
    name: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEmployee({ variables: { ...formData, enterprise_id: id } })
      .then(() => {
        alert('Funcionário criado com sucesso!');
        navigate(`/enterprise/${id}`); 
      })
      .catch((err) => console.error('Erro ao criar funcionário:', err));
  };

  return (
    <div className="container mt-4">
      <h2>Novo Funcionário</h2>
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
          <label className="form-label">Cargo</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
}

export default CreateEmployee;
