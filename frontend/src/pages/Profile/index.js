import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api.js';
import './styles.css';
import logoimg from '../../assets/logo.svg';

export default function Profile() {

  const history = useHistory();
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongID');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => { 
    api.get('/profile', {
      headers: {
        authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    }) 
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
    history.push('/');
  }

  return (
    <div>
      <div className="Profile-container">
        <header>
          <img src={logoimg} alt="Be the Hero" />
          <span>Bem vinda, {ongName}</span>

          <Link className="button" to="/incidents/new">
            Cadastrar novo caso
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            >
            <FiPower size={18} color="#E02041" />
          </button>
        </header>
        <h1>Casos Cadastrados</h1>
        <ul>
          {incidents.map(incident => {
            return (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>{
                  Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format( incident.value )
                }</p>

                <button
                  onClick={() => handleDeleteIncident(incident.id)}
                  type="button">
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}