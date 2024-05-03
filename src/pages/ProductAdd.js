import React from 'react';
import './ProductDetail.scss'; 
import './ProductEdition.scss';
import LayoutBasic from '../layouts/LayoutBasic';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { listarCategorias } from "../api/categoria";
import { crearMarca, listarMarcas } from "../api/marca";
import { listarUnidades } from '../api/unidad';
import ModalAddBrand from '../components/ModalAddBrand';
import { crearProducto } from '../api/productos';
const ProductAdd = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); 
    };
    const [productoNuevo, setProductoNuevo] = useState({
        nombre:"",
        stock:0,
        stockMinimo:0,
        precioCompra:0.0,
        precioVenta:0.0,
        idMarca:0,
        idUnidad:0,
        idCategoria:0,
        estado:1
    });
    const [brandName, setBrandName] = useState(""); 

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
    const [isAdvertModalVisible, setIsAdvertModalVisible] = useState(false);
    const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    

    const addBrand = (brandName) => {
        setBrandName(brandName);
        setIsAdvertModalVisible(true);
        closeModal();
      };

    const handleConfirmAdvertModal = () => {
        crearMarca(brandName)
        .then(brand => {
            setIsAdvertModalVisible(false);
            setIsRegistrationModalVisible(true);
            setMarcas(prevMarcas => [...prevMarcas, brand])
        })
        .catch(error => {
        });

    };

    const handleCancelAdvertModal = () => {
        setIsAdvertModalVisible(false);
    };

    const handleRegistrationConfirmed = () => {
        setIsRegistrationModalVisible(false);
    };


    function convertValues(productData) {
        const fieldsToParseInt = ['stock', 'stockMinimo', 'idMarca', 'idCategoria', 'idUnidad'];
        fieldsToParseInt.forEach(field => {
            if (typeof productData[field] === 'string') {
                productData[field] = parseInt(productData[field], 10);
            }
        });
    
        const fieldsToParseFloat = ['precioVenta', 'precioCompra'];
        fieldsToParseFloat.forEach(field => {
            if (typeof productData[field] === 'string') {
                productData[field] = parseFloat(productData[field]);
            }
        });
    
        return productData;
    }
    

    const handleCategoryChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            idCategoria: event.target.value
        }));
    };
    const handleBrandChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            idMarca: event.target.value
        }));
    };
    const handleUnitChange = (event) => {
        setProductoNuevo(prevProducto => ({
            ...prevProducto,
            idUnidad: event.target.value
        }));
    };
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [unidades,setUnidades]=useState([]);
    useEffect(() => {
        listarCategorias().then(data => setCategorias(data));
        listarMarcas().then(data => setMarcas(data));
        listarUnidades().then(data=> setUnidades(data));
    }, []);
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [isRegistrationProductModalVisible, setIsRegistrationProductModalVisible] = useState(false);

    const handleGuardarClick = () => {
        setIsSaveModalVisible(true);
    };
    const handleRegistrationProductConfirmed = () => {
        setIsRegistrationProductModalVisible(false);
        navigate("/");  
    };
    const handleConfirmSave = () => {
        setIsSaveModalVisible(false);
        const productValidado=convertValues(productoNuevo);
        const date = new Date();
        date.setHours(date.getHours() - 5); 

        const movementData = {
            idUsuario: 1, 
            tipoMovimiento: 3, 
            cantidad: productoNuevo.stock,
            fechaMovimiento: date.toISOString()
        };
        crearProducto(productValidado,movementData) 
            .then(response => {
                setIsRegistrationProductModalVisible(true);
            })
            .catch(error => {
                console.error('Error guardando el producto:', error);
            });
    };
    return (
        <LayoutBasic>
            <div className="detail-container">
                <div className="detail-header">
                    <h1>Nuevo producto</h1>
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
                        <div className="info-column-marca">
                            <div className="info-label">Marca:</div>
                            <div className="select-with-button">
                                <select id="brand" name="brand" onChange={handleBrandChange}>
                                    <option value="" selected>Seleccione la marca</option>
                                    {marcas.map((marca, index) => (
                                        <option key={index} value={marca.idMarca}>
                                            {marca.nombre}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={openModal} className="add-button">Añadir marca</button>
                                <ModalAddBrand 
                                    isOpen={isModalOpen}
                                    onCancel={closeModal}
                                    onAdd={addBrand}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="info-row">
                        <div className="info-column">
                        <div className="info-label">Categoría:</div>
                        <div className="info-value">                               
                            <select id="category" name="category"  onChange={handleCategoryChange}>
                                    <option value=""selected>Seleccione la categoría</option>
                                    {categorias.map((categoria,index) => (
                                        <option key={index} value={categoria.idCategoria}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                            </select></div>
                        </div>
                        <div className="info-column">
                        <div className="info-label">Unidad:</div>
                        <div className="info-value">                            
                            <select id="unit" name="unit"  onChange={handleUnitChange}>
                                <option value=""  selected>Seleccione la unidad</option>
                                    {unidades.map((unidad,index) => (
                                        <option key={index} value={unidad.idUnidad}>
                                            {unidad.nombre}
                                        </option>
                                ))}
                            </select></div>
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
                {isAdvertModalVisible && (
                <ModalAdvert
                    title="Añadir marca"
                    bodyText="Estas seguro de querer añadir una nueva marca?"
                    confirmButtonText="Confirmar"
                    cancelButtonText="Cancelar"
                    onConfirm={handleConfirmAdvertModal}
                    onCancel={handleCancelAdvertModal}
                />
            )}
            {isRegistrationModalVisible && (
                <ModalRegistro
                    title="Marca añadida"
                    buttonText="Volver"
                    onConfirm={handleRegistrationConfirmed}
                    redirectPath="cerrar"
                />
            )}
            {isSaveModalVisible && (
                    <ModalAdvert
                        title="Añadir nuevo producto"
                        bodyText="¿Está seguro de que desea añadir este nuevo producto?"
                        confirmButtonText="Confirmar"
                        cancelButtonText="Cancelar"
                        onConfirm={handleConfirmSave}
                        onCancel={() => setIsSaveModalVisible(false)}
                    />
                )}
                {isRegistrationProductModalVisible && (
                    <ModalRegistro
                        title="Producto Añadido"
                        buttonText="Volver a productos"
                        onConfirm={handleRegistrationProductConfirmed}
                        redirectPath="/"
                    />
                )}
            </div>
    </LayoutBasic>
    );
};

export default ProductAdd;
