import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api.js';
import './styles.css';
import logoimg from '../../assets/logo.svg';

export default function Search() {

  const history = useHistory();
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);

  const volunteerName = localStorage.getItem('volunteerName');
  const volunteer_id = localStorage.getItem('volunteerId');

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

  function handleDeadline(incidentDeadline) {

    const nowTime = Date.now();
    const deadline = incidentDeadline - nowTime;
    const deadlineDays = Math.floor((deadline / (24 * 60 * 60 * 1000)));
    
    let text = `${deadlineDays}`;

    if (deadlineDays === 1) {
      text += ` dia`;
    } else {
      text += ` dias`;
    }

    return text;
  }

  return (
    <div>
      <div className="Profile-container">
        <header>
          <img src={logoimg} alt="Be the Hero" />
          <span>Bem vinda, {volunteerName}</span>
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
                <div>
                  <button value={incident.id} onClick={event => handleWantHelp(event.target.value, index)}>
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