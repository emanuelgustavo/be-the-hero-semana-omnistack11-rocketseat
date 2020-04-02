import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api.js';
import './styles.css';
import logoimg from '../../assets/logo.svg';

export default function Register() {

  const registerType = localStorage.getItem('type'); 
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      
      const registerRoute = registerType === 'ong' ? 'ongs' : 'volunteer';

      const response = await api.post(registerRoute, data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push(`/logon/${registerType}`);
      
    } catch (error) {
      alert(`Erro! Tente novamente. 
            ${error}`);
    };
  }

  return (
    <div className='Register-content'>
      <div className='content'>
        <section>
          <img src={logoimg} alt='Be the Hero' />
          <h1>Cadastro</h1>
          { registerType === 'ong' &&
          <p>
            Faça seu cadastro na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          }
          {registerType === 'volunteer' &&
            <p>
              Faça seu cadastro na plataforma e ajude ONG's a resolverem
              casos.
          </p>
          }
          <Link className='back-link' to={`/logon/${registerType}`}>
            <FiArrowLeft size={16} color='#E02041' />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder='Nome'
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            placeholder="Número de What\'s app"
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)}
          />
          <div className='input-group'>
            <input
              placeholder='Cidade'
              value={city}
              onChange={event => setCity(event.target.value)}
            />
            <input
              placeholder='UF'
              style={{ width: 80 }}
              value={uf}
              onChange={event => setUf(event.target.value)}
            />
          </div>
          <button type='submit' className='button'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}