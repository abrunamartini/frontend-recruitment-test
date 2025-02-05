import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_ENTERPRISES = gql`
  query {
    enterprises {
      id
      name
      commercial_name
      cnpj
      description
    }
  }
`;

function Home() {
  const { loading, error, data, refetch } = useQuery(GET_ENTERPRISES);
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div className="text-center mt-5">Carregando...</div>;
  if (error) return <div className="alert alert-danger">Erro: {error.message}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-9"></div>
        <div className="col-12 col-md-3">
          <button className="btn btn-success" onClick={() => navigate('/create')}>
            Nova Empresa
          </button>
        </div>
      </div>
      <div className="row">
        <h1 className="text-center mb-4">Empresas</h1>
      </div>
      <div className="row">
        {data.enterprises.length === 0 ? (
          <h3 className="text-center mb-4">Não há empresas cadastradas</h3>
        ): (data.enterprises.map((enterprise) => (
          <div
            key={enterprise.id}
            className="col-12 col-md-4"
          >
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{enterprise.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{enterprise.commercial_name}</h6>
                <p className="card-text">
                  <strong>CNPJ:</strong> {enterprise.cnpj}<br />
                  <strong>Descrição:</strong> {enterprise.description}
                </p>
                <button className="btn btn-info mx-1" onClick={() => navigate(`/edit/${enterprise.id}`)}>
                  Editar
                </button>

                <button className="btn btn-danger mx-1" onClick={() => navigate(`/delete/${enterprise.id}`)}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}

export default Home;
