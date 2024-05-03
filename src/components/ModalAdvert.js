import React from 'react';
import PropTypes from 'prop-types';
import './ModalAdvert.scss'; 
import warningIcon from '../images/aviso.avif'; 

const ModalAdvert = ({title, bodyText, confirmButtonText, cancelButtonText, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <img src={warningIcon} alt="Advertencia" className="modal-warning-icon" />
          <div className="modal-text">
            <h2>{title}</h2>
            <p>{bodyText}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onCancel} className="modal-cancel-button">{cancelButtonText}</button>
          <button onClick={onConfirm} className="modal-confirm-button">{confirmButtonText}</button>
        </div>
      </div>
    </div>
  );
};


ModalAdvert.propTypes = {
  bodyText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ModalAdvert;
