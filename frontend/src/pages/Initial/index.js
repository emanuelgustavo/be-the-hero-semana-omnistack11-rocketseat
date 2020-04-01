import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import logoImage from '../../assets/logo.svg';
import peopleImage from '../../assets/heroes.png';

export default function Initial() {

  const history = useHistory();

  function handleIamVolunteer() {
    localStorage.setItem('type', 'volunteer');
    history.push('/logon/volunteer');
  };

  function handleIamONG() {
    localStorage.setItem('type', 'ong');
    history.push('/logon/ong');
  }

  return (
    <div className="initial-container">
      <section className="initial-section">
        <img src={logoImage} alt="Be the hero!" />
        <div className="initial-button-box">
          <button
            type="button"
            onClick={handleIamVolunteer }
            className="button"
          >
            Sou voluntário
          </button>
          <button
            type="button"
            onClick={handleIamONG }
            className="button"
          >
            Sou ONG
          </button>
        </div>
      </section>
      <img src={peopleImage} alt="We are the heroes!"/>
    </div>
  );
}