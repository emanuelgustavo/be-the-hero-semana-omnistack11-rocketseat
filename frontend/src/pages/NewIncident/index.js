import React from 'react';
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import './styles.css';
import logoimg from "../../assets/logo.svg";

export default function NewIncident() {
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
        <form action="">
          <input placeholder="Título do caso" />
          <textarea placeholder="Descreva o caso" />
          <input placeholder="Valor em R$" />         
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}