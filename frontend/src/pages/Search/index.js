import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api.js';
import handleDeadline from '../../utils/handleDeadline.js';

import './styles.css';
import logoimg from '../../assets/logo.svg';

export default function Search() {

  const history = useHistory();
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);

  const volunteerName = localStorage.getItem('name');
  const volunteer_id = localStorage.getItem('id');

  useEffect(() => { 
    api.get("/search").then(response => {
      setIncidents(response.data);
      setTotalIncidents(response.data.length);
    });
  }, []);

  function handleWantHelp(incidentId, incidentsIndex) {
    api.post("/incidents/history", {
      incident_id: incidentId,
      volunteer_id,
      received_value: incidents[incidentsIndex].value
    });
    handleBackButton();
  }

  function handleBackButton() {
    history.push('/dashboard');
  }

  return (
    <div>
      <div className="Profile-container">
        <header>
          <img src={logoimg} alt="Be the Hero" />
          <span>Bem vindx, {volunteerName}</span>
          <button type="button" onClick={handleBackButton}>
            <FiArrowLeft size={18} color="#E02041" />
          </button>
        </header>
        <h1>Total de {totalIncidents} casos abertos encontrados</h1>
        <ul>
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
                  <div>
                    <strong>ONG:</strong>
                    <p>
                      {incident.name} de {incident.city}/{incident.uf}
                    </p>
                  </div>
                  <div>
                    <strong>EXPIRA EM:</strong>
                    <p>{handleDeadline( incident.deadline, incident.id )}</p>
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
                <div>
                  <button
                    value={incident.id}
                    onClick={event => handleWantHelp(event.target.value, index)}>
                    Quero ajudar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}