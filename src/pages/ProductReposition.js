import React, { useState } from 'react';
import './ProductReposition.scss';
import LayoutBasic from '../layouts/LayoutBasic';
import ProductTable from '../components/ProductTable';
import addIcon from '../images/add.svg'; 
import { ReactComponent as AddIcon } from '../images/add.svg';
import ModalFindProduct from '../components/ModalFindProudct';
import { useLocation } from 'react-router-dom';
import ModalProductSelect from '../components/ModalProductSelect';
import { addProducts } from '../api/productos';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { useNavigate } from 'react-router-dom';
import ToastPanda from '../components/ToastPanda';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ReposicionProductos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, categories, brands } = location.state || { products: [], categories: [], brands: [] };
  const [productsNew, setProductsNew] = useState([]);
  const [isFindProductModalOpen, setIsFindProductModalOpen] = useState(false);
  const [isProductSelectModalOpen, setIsProductSelectModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [isAddConfirmModalOpen, setIsAddConfirmModalOpen] = useState(false);
  const [isProductsAddedModalOpen, setIsProductsAddedModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddProductModal = () => {
    setIsFindProductModalOpen(true);
  };

  const handleCloseFindProductModal = () => {
    setIsFindProductModalOpen(false);
  };

  const handleProductSelected = (product) => {
    setIsProductSelectModalOpen(false); 
    setProductsNew(prevProducts => [...prevProducts, product]);
  };
  const handleRemoveProduct = (productId) => {
    setProductsNew(currentProducts => currentProducts.filter(product => product.idProducto !== productId));
    console.log(productsNew);

  };
  const handleUpdateQuantity = (productId, newQuantity) => {
    const newProducts = productsNew.map(product => {
      if (product.idProducto === productId) {
        return { ...product, cantidad: newQuantity };
      }
      return product;
    });
    setProductsNew(newProducts);
  };
  const handleConfirmAddition = () => {
    if (productsNew.length === 0) {
      toast.warning(`Se necesita seleccionar algun producto para empezar`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }); 
      return;  
    }
    setIsAddConfirmModalOpen(true);
  };
  const handleAddProductos = () => {
    setIsAddConfirmModalOpen(false); 

    Promise.all(productsNew.map(product => {
      const productData = product; 
      const movementData = { 
        idUsuario: 1, 
        tipoMovimiento: 3, 
        cantidad:product.cantidad,
        fechaMovimiento: new Date().toISOString() 
      }; 
      return addProducts(product.idProducto, productData, movementData);
    })).then(results => {
      setIsProductsAddedModalOpen(true); 
    }).catch(error => {
      console.error('Error al añadir productos:', error);
    });
  };
  const handleRegistroConfirmado = () => {
    setIsProductsAddedModalOpen(false);
    navigate("/");
};
  
  return (
    <LayoutBasic>
      <ToastContainer/>

      <div className="detail-container">
        <div className="detail-header">
          <h1>Reposición de productos</h1>
          <button className="add-product-btn"  onClick={() => setIsFindProductModalOpen(true)}>
            <AddIcon className="add-icon" />
            Añadir producto
          </button>
        </div>
        <div className="table-container">
        {productsNew.length > 0 ? (
          <ProductTable products={productsNew} onRemove={handleRemoveProduct} onUpdateQuantity={handleUpdateQuantity} />
        ) : (
          <div className="empty-message">
            <p>No hay productos listados. <br /> Haz clic en 'Añadir producto' para empezar.</p>
          </div>
        )}
        </div>
        <div className="button-bar">
          <button className="button-back" onClick={() => navigate(-1)}>
            Regresar
          </button>
          <button className="button-edit" onClick={handleConfirmAddition}>
            Confirmar Reposición
          </button>
        </div>
        {isFindProductModalOpen && (
          <ModalFindProduct
            isOpen={isFindProductModalOpen}
            onClose={handleCloseFindProductModal}
            onAdd={(selectedProducts) => {
              setSelectedProducts(selectedProducts);
              setIsFindProductModalOpen(false); 
              setIsProductSelectModalOpen(true); 
            }}
            categories={categories}
            brands={brands}
            productslist={products}
          />
        )}
        {isProductSelectModalOpen && (
          <ModalProductSelect
            isOpen={isProductSelectModalOpen}
            onClose={() => setIsProductSelectModalOpen(false)}
            products={selectedProducts}
            onProductSelect={handleProductSelected}
          />
        )}
        {isAddConfirmModalOpen && (
                <ModalAdvert
                title="Reposición de productos"
                bodyText="Se ha realizado correctamente la reposición de los productos?"
                confirmButtonText="Confirmar"
                cancelButtonText="Cancelar"
                onConfirm={handleAddProductos}
                onCancel={() => setIsAddConfirmModalOpen(false)}
            />
        )}
        {isProductsAddedModalOpen && (
                <ModalRegistro
                title="Reposición registrada"
                buttonText="Volver a productos"
                onConfirm={handleRegistroConfirmado}
                redirectPath="/"
            />
        )}
      </div>
    </LayoutBasic>
  );
};

export default ReposicionProductos;
