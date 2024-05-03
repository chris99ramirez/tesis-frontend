import React from 'react';
import PropTypes from 'prop-types';
import checkIcon from '../images/success.png';
import './ModalRegistro.scss'
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalRegistro = ({ title, buttonText, onConfirm, redirectPath }) => {
  const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
          onConfirm();
          if (redirectPath !== "cerrar") {
            navigate(redirectPath);
          }
        }, 5000);
    

        return () => clearTimeout(timer);
      }, [onConfirm, navigate, redirectPath]);
    return (
      <div className="modal-overlay">
        <div className="modal-container">
        <div className="timer-bar"></div> 
          <div className="modal-content">
            <img src={checkIcon} alt="Confirmación" className="modal-check-icon" />
            <div className="modal-text-content">
              <h2>{title}</h2>
              <button onClick={onConfirm} className="modal-confirm-button">{buttonText}</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

ModalRegistro.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ModalRegistro;
