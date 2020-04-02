import React, { useState, useEffect }  from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api.js';
import handleDeadline from '../../utils/handleDeadline.js';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import Barstackchart from '../../components/Backstackchart';

export default function Dashboard() {
  
  //hooks de historico de navegação
  const history = useHistory();
  //carrega todos os incidents
  const [incidents, setIncidents] = useState([]);
  //recupera os dados armazenados no storage
  const dashboardType = localStorage.getItem('type');
  const dashboardName = localStorage.getItem('name');
  const id = localStorage.getItem('id');

  useEffect(() => {
    api.get('/dashboard', {
      headers: {
        dashboardType,
        id
      }  
    }).then(response => {
      setIncidents(response.data);
    });
   }, [history]);

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  };

  async function handleDeleteIncident(incidentId) {

    const response = await api.delete(`/incidents/${incidentId}`, {
      headers: {
        Authorization: id
      }
    });

    console.log(response);

    setIncidents(incidents.filter(incident => incident.id !== incidentId));

  }
  
  return (
    <div className="dashboard-container">
      <header>
        <img src={logoImg} />
        <span>Bem vindo, {dashboardName}</span>
        <Link
          className="dashboard-button"
          to={
            dashboardType === "volunteer"
              ? "/volunteer/search"
              : "/incidents/new"
          }
        >
          <p>{dashboardType === "volunteer" ? "Buscar casos" : "Novo caso"}</p>
        </Link>
        <button onClick={() => handleLogout()}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1 className="dashboard-status">Casos por status</h1>
      <div className="dashboard-graphics">
        <Barstackchart />
        <div className="dashboard-total">
          <strong>
            {dashboardType === "volunteer" ? "Total doado" : "Total arrecadado"}
          </strong>
          <p>R$ 1.500,00</p>
        </div>
      </div>
      <h1 className="dashboard-incidents">
        {dashboardType === "volunteer" ? "Meus casos" : "Casos cadastrados"}
      </h1>
      <ul className="dashboard-list">        
        {incidents.map((incident, index) => {
          return (
            <li key={incident.id} className="list-item">
              <div className="case-incident">
                <div>
                  <strong>CASO:</strong>
                  <p>{incident.title}</p>
                </div>
                <div>
                  <strong>STATUS:</strong>
                  <p>{incident.status}</p>
                </div>
              </div>
              <div className="ong-date">
                {dashboardType === 'volunteer' &&
                  <div>
                    <strong>ONG:</strong>
                    <p>
                      {incident.name} de {incident.city}/{incident.uf}
                    </p>
                
                  </div>
                }
                <div>
                  <strong>EXPIRA EM:</strong>
                  <p>{handleDeadline(incident.deadline)}</p>
                </div>
              </div>
              <div className="description">
                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>
              </div>
              <div className="value">
                <strong>VALOR:</strong>
                <p>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(incident.value)}
                </p>
              </div>
              {dashboardType === 'ong' &&
                <button 
                  className="delete-incident"
                  onClick={ () => handleDeleteIncident(incident.id)}
                >
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
}