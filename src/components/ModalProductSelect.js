import React from 'react';
import './ModalProductSelect.scss'; 

const ModalProductSelect = ({ isOpen, onClose, products, onProductSelect }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Seleccionar producto</h2>
        {products.length > 0 ? (
          <div className="product-list-modal">
            <table>
              <thead>
                <tr>
                  <th>Nombre de producto</th>
                  <th>Marca</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.marca.nombre}</td>
                    <td>
                      <button onClick={() => onProductSelect(product)}>Seleccionar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay productos disponibles.</p>
        )}
        <div className="modal-footer">
          <button onClick={onClose} className="button-close">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalProductSelect;
