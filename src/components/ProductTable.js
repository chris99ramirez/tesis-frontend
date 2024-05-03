import './ProductTable.scss'; 
import React, { useState, useEffect } from 'react';

const ProductTable = ({ products, onRemove, onUpdateQuantity }) => {
  const [quantities, setQuantities] = useState({});


  useEffect(() => {
    const initialQuantities = {};
    products.forEach(product => {

      initialQuantities[product.idCategoria] = ''; 
    });
    setQuantities(initialQuantities);
  }, []);


  const handleQuantityChange = (id, value) => {
    const newQuantities = { ...quantities, [id]: value };
    setQuantities(newQuantities);
    if (value && !isNaN(value)) {
      onUpdateQuantity(id, parseFloat(value));
    }
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th></th>
          <th>Nombre de producto</th>
          <th>Marca</th>
          <th>Categoría</th>
          <th>Cantidad</th>
          <th>Unidad</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td className="remove-cell" onClick={() => onRemove(product.idProducto)}>X</td>
            <td>{product.nombre}</td>
            <td>{product.marca.nombre}</td>
            <td>{product.categoria.nombre}</td>
            <td>
              <input
                type="text"
                className="quantity-input"
                value={quantities[product.idProducto] || ''} 
                onChange={e => handleQuantityChange(product.idProducto, e.target.value)}
              />
            </td>
            <td>{product.unidad.nombre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
