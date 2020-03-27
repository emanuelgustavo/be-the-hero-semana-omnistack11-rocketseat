import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';

export default function Logon() {
  return (
    <div className="Logon-container">
      <section className="form">
        <img src={logoimg} alt="Be the Hero" />
        <form>
          <h1>Faça seu Logon</h1>

          <input placeholder="Sua ID" />
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