import React from 'react';
import './ProductDetail.scss'; 
import './ProductEdition.scss';
import LayoutBasic from '../layouts/LayoutBasic';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { updateProduct } from '../api/productos';

const ProductEdition = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); 
    };
    const [productoOriginal,setProductoOriginal]=useState(product)
    const [productoNuevo, setProductoNuevo] = useState(product);
    const handleNombreChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            nombre: event.target.value
        }));
    };
    const handleStockChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            stock: event.target.value
        }));
    };
    const handleCompraChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            precioCompra: event.target.value
        }));
    };
    const handleVentaChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            precioVenta: event.target.value
        }));
    };
    const handleMinimoChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            stockMinimo: event.target.value
        }));
    };
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);

    const handleGuardarClick = () => {
        setIsConfirmationModalVisible(true);
    };
    function prepareProductForUpdate(product) {
        const { marca, categoria, unidad, ...productToUpdate } = product;
        return productToUpdate;
    }
    function convertValues(productData) {
        if (typeof productData.stock === 'string') {
            productData.stock = parseInt(productData.stock, 10);
        }
    
        if (typeof productData.stockMinimo === 'string') {
            productData.stockMinimo = parseInt(productData.stockMinimo, 10);
        }
    
        if (typeof productData.precioVenta === 'string') {
            productData.precioVenta = parseFloat(productData.precioVenta);
        }
    
        if (typeof productData.precioCompra === 'string') {
            productData.precioCompra = parseFloat(productData.precioCompra);
        }
    
        return productData;
    }

    const handleConfirmarModal = () => {
        const productprepare = prepareProductForUpdate(productoNuevo);
        const productData = convertValues(productprepare);
        setProductoOriginal(product)
        const date = new Date();
        date.setHours(date.getHours() - 5); 
        const movementData = {
            idUsuario: 1, 
            tipoMovimiento: 2, 
            cantidad: productData.stock - productoOriginal.stock,
            fechaMovimiento: date.toISOString()
        };
    
        console.log('Datos a enviar al servidor:', productData,movementData);
    
        updateProduct(productData.idProducto, productData,movementData)
            .then(response => {
                console.log('Respuesta del servidor:', response);
                if (response && !response.errMsg) {  
                    console.log('Producto actualizado:', response);
                    setIsConfirmationModalVisible(false);
                    setIsRegistrationModalVisible(true);
                } else {
                    console.error('Error en la actualización:', response.errMsg);
                }
            })
            .catch(error => {
                console.error('Error al actualizar el producto:', error);
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
                    <h1>Detalle del producto - Editar</h1>
                </div>
                <div className="header-box">
                    Datos Generales del producto
                </div>
                <div className="product-general-info">
                    <div className="info-row">
                        <div className="info-column">
                            <div className="info-label">Nombre de producto:</div>
                            <input
                                type="text"
                                className="info-textbox"
                                value={productoNuevo.nombre}
                                onChange={handleNombreChange}
                            />
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
                        <input
                                type="text"
                                className="info-textbox"
                                value={productoNuevo.stock}
                                onChange={handleStockChange}
                            />
                        </div>
                        <div className="info-column">
                        <div className="info-label">Precio compra (S/.) :</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={productoNuevo.precioCompra}
                                onChange={handleCompraChange}
                            />
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Precio Venta (S/.) :</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={productoNuevo.precioVenta}
                                onChange={handleVentaChange}
                            />
                        </div>
                        <div className="info-column">
                        <div className="info-label">Stock mínimo:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={productoNuevo.stockMinimo}
                                onChange={handleMinimoChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="button-bar">
                        <button  onClick={handleBack} className="button-back" >Regresar</button>
                        <button onClick={handleGuardarClick} className="button-edit">Guardar producto</button>
                </div>
                {isConfirmationModalVisible && (
                <ModalAdvert
                    bodyText="Estas seguro de querer guardar el detalle de producto?"
                    confirmButtonText="Confirmar"
                    cancelButtonText="Cancelar"
                    onConfirm={handleConfirmarModal}
                    onCancel={handleCancelarModal}
                />
            )}
            {isRegistrationModalVisible && (
                <ModalRegistro
                    title="Producto editado"
                    buttonText="Volver a productos"
                    onConfirm={handleRegistroConfirmado}
                    redirectPath="/"
                />
            )}
            </div>
    </LayoutBasic>
    );
};

export default ProductEdition;
