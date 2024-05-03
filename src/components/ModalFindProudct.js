import React, { useState, useEffect } from 'react';
import './ModalAddBrand.scss';
import './ModalFindProduct.scss';
import ModalProductSelect from './ModalProductSelect';

const ModalFindProduct = ({ isOpen, onClose, onAdd, categories, brands, productslist }) => {
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(productslist); 
  }, [productslist, isOpen]);

  const filterProducts = () => {
    let tempProducts = productslist;
    if (category) {
      tempProducts = tempProducts.filter(product => String(product.categoria.idCategoria) === category);
    }
    if (brand) {
      tempProducts = tempProducts.filter(product => String(product.marca.idMarca) === brand);
    }
    if (brandName) {
      tempProducts = tempProducts.filter(product => product.nombre.toLowerCase().includes(brandName.toLowerCase()));
    }
    return tempProducts;
  };

  const handleAddClick = () => {
    const selectedProducts = filterProducts();
    onAdd(selectedProducts);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Buscar producto</h2>
        <div className="input-group">
          <label>Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Seleccione la categoría</option>
            {categories.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Marca</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Seleccione la marca</option>
            {brands.map((marca) => (
              <option key={marca.idMarca} value={marca.idMarca}>{marca.nombre}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
        <label>Nombre:</label>
        <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="brand-input" />
        </div>
        <div className="modal-buttons">

        <button onClick={onClose} className="cancel-button">Cancelar</button>
        <button onClick={handleAddClick} className="add-button">Buscar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalFindProduct;
