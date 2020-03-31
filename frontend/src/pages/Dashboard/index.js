import React from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  
  const dashboardType = localStorage.getItem('type');
  
  return (
    <div className="dashboard-container">
      <header>
        <img src={logoImg} />
        <span>Bem vindo, {dashboardType}</span>
        <Link
          className="dashboard-button"
          to="/register"
        >
          <p>
            {dashboardType === 'volunteer' ? 'Buscar casos' : 'Novo caso'}
          </p>
        </Link>
        <button>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <div className="dashboard-graphics">
        <div className="graphic-box">
          <span>Casos abertos: </span>
          <div className="graphic"></div>
        </div>
        <div className="graphic-box">
          <span>Casos abertos: </span>
          <div className="graphic"></div>
        </div>
        <div className="graphic-box">
          <span>Casos abertos: </span>
          <div className="graphic"></div>
        </div>
      </div>
      <h1 className="dashboard-incidents">
        { dashboardType === 'volunteer' ? 'Minhas causas' : 'Casos cadastrados'}
      </h1>
      <ul className="dashboard-list">
        <li>
          <div className="incident">
            <strong>CASO:</strong>
            <p>Cadelinha Atrolepada</p>
            <strong>STATUS:</strong>
            <p>Aberto</p>    
            <strong>DESCRIÇÃO:</strong>
            <p>A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.</p>
            <strong>VALOR:</strong>
            <p>R$ 120,00</p>
            <button>
              <FiTrash2 size={20} color="#d5d5d5" />
            </button>
          </div>
        </li>
        <li>
          <div className="incident">
            <strong>CASO:</strong>
            <p>Cadelinha Atrolepada</p>
            <strong>STATUS:</strong>
            <p>Aberto</p>
            <strong>DESCRIÇÃO:</strong>
            <p>A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.</p>
            <strong>VALOR:</strong>
            <p>R$ 120,00</p>
            <button>
              <FiTrash2 size={20} color="#d5d5d5" />
            </button>
          </div>
        </li>
        <li>
          <div className="incident">
            <strong>CASO:</strong>
            <p>Cadelinha Atrolepada</p>
            <strong>STATUS:</strong>
            <p>Aberto</p>
            <strong>DESCRIÇÃO:</strong>
            <p>A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.</p>
            <strong>VALOR:</strong>
            <p>R$ 120,00</p>
            <button>
              <FiTrash2 size={20} color="#d5d5d5" />
            </button>
          </div>
        </li>
        <li>
          <div className="incident">
            <strong>CASO:</strong>
            <p>Cadelinha Atrolepada</p>
            <strong>STATUS:</strong>
            <p>Aberto</p>
            <strong>DESCRIÇÃO:</strong>
            <p>A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas.</p>
            <strong>VALOR:</strong>
            <p>R$ 120,00</p>
            <button>
              <FiTrash2 size={20} color="#d5d5d5" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}