import React, { useState } from 'react';
import './ModalAddBrand.scss'; 

const ModalAddBrand = ({ isOpen, onCancel, onAdd }) => {
  const [brandName, setBrandName] = useState('');

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleAddClick = () => {
    onAdd(brandName);
    setBrandName(''); 
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Añadir marca</h2>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={brandName} 
          onChange={handleBrandNameChange}
          className="brand-input"
        />
        <div className="modal-buttons">
          <button onClick={onCancel} className="cancel-button">Cancelar</button>
          <button onClick={handleAddClick} className="add-button">Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddBrand;
