import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import Barstackchart from '../../components/Backstackchart';

export default function Dashboard() {
  
  const history = useHistory();

  const dashboardType = localStorage.getItem('type');
  const dashboardName = localStorage.getItem('name');

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  };
  
  return (
    <div className="dashboard-container">
      <header>
        <img src={logoImg} />
        <span>Bem vindo, {dashboardName}</span>
        <Link
          className="dashboard-button"
          to={
            dashboardType === "volunteer"
              ? "/volunteer/search"
              : "/incidents/new"
          }
        >
          <p>{dashboardType === "volunteer" ? "Buscar casos" : "Novo caso"}</p>
        </Link>
        <button onClick={() => handleLogout()}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1 className="dashboard-status">Casos por status</h1>
      <div className="dashboard-graphics">
        <Barstackchart />
        <div className="dashboard-total">
          <strong>
            {dashboardType === "volunteer" ? "Total doado" : "Total arrecadado"}
          </strong>
          <p>R$ 1.500,00</p>
        </div>
      </div>
      <h1 className="dashboard-incidents">
        {dashboardType === "volunteer" ? "Meus casos" : "Casos cadastrados"}
      </h1>
      <ul className="dashboard-list">
        <li>
          <div className="incident">
            <strong>CASO:</strong>
            <p>Cadelinha Atrolepada</p>
            <strong>STATUS:</strong>
            <p>Aberto</p>
            <strong>DESCRIÇÃO:</strong>
            <p>
              A cadelinha Jolie foi atropelada por um carro no bairro Santana e
              teve que passar por uma cirurgia às pressas.
            </p>
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
            <p>
              A cadelinha Jolie foi atropelada por um carro no bairro Santana e
              teve que passar por uma cirurgia às pressas.
            </p>
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
            <p>
              A cadelinha Jolie foi atropelada por um carro no bairro Santana e
              teve que passar por uma cirurgia às pressas.
            </p>
            <strong>VALOR:</strong>
            <p>R$ 120,00</p>
            <button>
              <FiTrash2 size={20} color="#a8a8b3" />
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
            <p>
              A cadelinha Jolie foi atropelada por um carro no bairro Santana e
              teve que passar por uma cirurgia às pressas.
            </p>
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