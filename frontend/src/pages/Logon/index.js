import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api.js';
import './styles.css';

import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';

export default function Logon() {

  const [id, setID] = useState('');
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert("Erro!");
    }

  }

  return (
    <div className="Logon-container">
      <section className="form">
        <img src={logoimg} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={event => setID(event.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesimg} alt="We are the heroes!" />
    </div>
  );
}