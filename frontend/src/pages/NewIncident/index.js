import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api.js';
import './styles.css';
import logoimg from "../../assets/logo.svg";

export default function NewIncident() {

  const history = useHistory();
  
  const ongId = localStorage.getItem('id');
  
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentCost, setIncidentCost] = useState('');
  const [incidentDeadline, setIncidentDeadline] = useState('');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title: incidentTitle,
      description: incidentDescription,
      value: incidentCost,
      create_at: Date.now(),
      deadline: Date.now()+((parseInt(incidentDeadline)+1)*24*60*60*1000),
      status: 'Aberto'
    };

    try{
      await api.post("incidents", data, {
        headers: {
          authorization: ongId
        }
      });

      history.push('/dashboard/ong');      
    } catch (error) {
      alert(`Erro! Tente novamente. 
            ${error}`);
    };
  }

  return (
    <div className="NewIncident-container">
      <div className="content">
        <section>
          <img src={logoimg} alt="Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/dashboard/ong">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para dashboard
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={incidentTitle}
            onChange={event => setIncidentTitle(event.target.value)}
          />
          <textarea
            placeholder="Descreva o caso"
            value={incidentDescription}
            onChange={event => setIncidentDescription(event.target.value)}
          />
          <div className="incident-deadline-value">
            <input
              placeholder="Valor em R$"
              value={incidentCost}
              onChange={event => setIncidentCost(event.target.value)}
            />          
            <input
              placeholder="Prazo em dias"
              value={incidentDeadline}
              onChange={event => setIncidentDeadline(event.target.value)}
            />
          </div> 
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}