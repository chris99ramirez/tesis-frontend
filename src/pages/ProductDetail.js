import React from 'react';
import './ProductDetail.scss'; 
import LayoutBasic from '../layouts/LayoutBasic';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { disableProduct } from '../api/productos';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { useState } from 'react';

const ProductDetail = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); 
    };
    const handleButtonClickEdit = (product) => {
        navigate('/Edit', { state: { product }});
        
    };
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
    const handleDescontinuar =() =>{
        setIsConfirmationModalVisible(true);
    }


    const handleConfirmarModal = () => {
        disableProduct(product.idProducto)
            .then(response => {
                console.log('Respuesta del servidor:', response);
                if (response && !response.errMsg) {  
                    console.log('Producto desactivado:', response);
                    setIsConfirmationModalVisible(false);
                    setIsRegistrationModalVisible(true);
                } else {
                    console.error('Error en la desactivado:', response.errMsg);
                }
            })
            .catch(error => {
                console.error('Error al desactivado el producto:', error);
            });
    };
    const handleCancelarModal = () => {
        setIsConfirmationModalVisible(false);
        setIsRegistrationModalVisible(false);
    };

    const handleRegistroConfirmado = () => {
        setIsRegistrationModalVisible(false);
        navigate("/");
    };

    return (
        <LayoutBasic>
            <div className="detail-container">
                <div className="detail-header">
                    <h1>Detalle del producto</h1>
                    <button className="deactivate-btn" onClick={handleDescontinuar}>Descontinuar</button>
                </div>
                <div className="header-box">
                    Datos Generales del producto
                </div>
                <div className="product-general-info">
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Nombre de producto:</div>
                        <div className="info-value">{product.nombre}</div>
                        </div>
                        <div className="info-column">
                        <div className="info-label">Marca:</div>
                        <div className="info-value">{product.marca.nombre}</div>
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Categoría:</div>
                        <div className="info-value">{product.categoria.nombre}</div>
                        </div>
                        <div className="info-column">
                        <div className="info-label">Unidad:</div>
                        <div className="info-value">{product.unidad.nombre}</div>
                        </div>
                    </div>
                </div>
                <div className="header-box">
                    Datos de inventario
                </div>
                <div className="product-general-info">
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Stock:</div>
                        <div className="info-value">{product.stock} {product.unidad.simbolo}</div>
                        </div>
                        <div className="info-column">
                        <div className="info-label">Precio compra (S/.) :</div>
                        <div className="info-value">{product.precioCompra.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Precio Venta (S/.) :</div>
                        <div className="info-value">{product.precioVenta.toFixed(2)}</div>
                        </div>
                        <div className="info-column">
                        <div className="info-label">Stock mínimo:</div>
                        <div className="info-value">{product.stockMinimo} {product.unidad.simbolo}</div>
                        </div>
                    </div>
                </div>
                <div className="button-bar">
                        <button  onClick={handleBack} className="button-back" >Regresar</button>
                        <button onClick={()=>handleButtonClickEdit(product)} className="button-edit">Editar producto</button>
                </div>
                {isConfirmationModalVisible && (
                <ModalAdvert
                    title="Descontinuar producto"
                    bodyText="Estas seguro que quieres descontinuar el producto seleccionado?"
                    confirmButtonText="Confirmar"
                    cancelButtonText="Cancelar"
                    onConfirm={handleConfirmarModal}
                    onCancel={handleCancelarModal}
                />
            )}
            {isRegistrationModalVisible && (
                <ModalRegistro
                    title="Producto descontinuado"
                    buttonText="Volver a productos"
                    onConfirm={handleRegistroConfirmado}
                    redirectPath="/"
                />
            )}
            </div>
    </LayoutBasic>
    );
};

export default ProductDetail;
