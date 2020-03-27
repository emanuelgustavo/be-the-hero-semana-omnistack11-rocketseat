import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api.js';
import './styles.css';
import logoimg from "../../assets/logo.svg";

export default function NewIncident() {

  const history = useHistory();
  
  const ongId = localStorage.getItem('ongID');
  
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentCost, setIncidentCost] = useState('');

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title: incidentTitle,
      description: incidentDescription,
      value: incidentCost
    };

    try{
      await api.post("incidents", data, {
        headers: {
          authorization: ongId
        }
      });

      history.push('/profile');      
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

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
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
          <input
            placeholder="Valor em R$"
            value={incidentCost}
            onChange={event => setIncidentCost(event.target.value)}
          />
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}