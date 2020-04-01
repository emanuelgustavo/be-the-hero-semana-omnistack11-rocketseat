import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api.js';
import './styles.css';
import logoimg from '../../assets/logo.svg';

export default function Search() {

  const history = useHistory();
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongID');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => { 
    api.get("/search").then(response => {
        setIncidents(response.data);
      }); 
  }, [ongId]);

  async function handleDeleteIncident(incidentId) {
    try {
      await api.delete(`incidents/${incidentId}`, {
        headers: {
          authorization: ongId
        }
      });

      setIncidents(incidents.filter( incident => incident.id !== incidentId));
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  };

  function handleLogout() {
    localStorage.clear();
    history.push('/dashboard');
  }

  return (
    <div>
      <div className="Profile-container">
        <header>
          <img src={logoimg} alt="Be the Hero" />
          <span>Bem vinda, {ongName}</span>
          <button type="button" onClick={handleLogout}>
            <FiArrowLeft size={18} color="#E02041" />
          </button>
        </header>
        <h1>Casos encontrados</h1>
        <ul>
          {incidents.map(incident => {
            return (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
                
                <strong>ONG:</strong>
                <p>APAD</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(incident.value)}
                </p>
                <button>Quero ajudar</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}