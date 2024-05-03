import LayoutBasic from "../layouts/LayoutBasic";
import './ProductMovement.scss';
import React, { useState ,useEffect} from 'react';
import Pagination from "../components/Paginacion";
import TableMovements from "../components/TableMovements";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { listarMovimientosProducto } from "../api/productos";
import Spinner from "../components/Spinner";
import { MOVEMENT_TYPES } from '../enum/enum';

const PRODUCTS_PER_PAGE = 8;
export default function ProductMovement() {
    const location = useLocation();
    const { product } = location.state || {};
    const [productInfo,setProductInfo]=useState(product);
    const [movements,setMovements]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredMovements, setFilteredMovements] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [movementType, setMovementType] = useState('');
    useEffect(() => {
        listarMovimientosProducto(productInfo.idProducto).then(data => {
            const movimientosProcesados = data.map(movimiento => {
                const fechaHora = new Date(movimiento.fechaMovimiento);
                return {
                    ...movimiento,
                    fecha: fechaHora.toLocaleDateString(), 
                    hora: fechaHora.toLocaleTimeString() 
                };
            });
            setMovements(movimientosProcesados);
            setFilteredMovements(movimientosProcesados);
            setIsLoading(false);
        });
    }, [productInfo.idProducto]);
    useEffect(() => {
        applyFilters();
    }, [movements]);

    const applyFilters = () => {
        console.log('Applying filters');
        const filtered = movements.filter(movement => {
            const date = new Date(movement.fechaMovimiento);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            return (!start || date >= start) && (!end || date <= end);
        }).filter(movement => {
            return !movementType || movement.tipoMovimiento === parseInt(movementType);
        });
        setFilteredMovements(filtered);
    };

     const [currentPage, setCurrentPage] = useState(1);
     const totalPages = Math.ceil(filteredMovements.length / PRODUCTS_PER_PAGE);
 
     const handlePageChange = (newPage) => {
         setCurrentPage(newPage);
     };
 
     const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
     const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
     const currentMovements = filteredMovements.length ? filteredMovements.slice(indexOfFirstProduct, indexOfLastProduct) : [];
     
     const navigate = useNavigate();

     const handleBack = () => {
        navigate(-1);
    };
    return (
        <LayoutBasic>
            <div className="products-container2">
                <div className="products-header2">
                <div className="title-with-stock">
                    <h1>Movimientos de inventario - {productInfo.nombre} {productInfo.marca.nombre}</h1>
                    <h2 className="stock-info"> Stock actual: {productInfo.stock} {productInfo.unidad.nombre}</h2>
                </div>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (<div>
                <div className="products-filters2">
                    <h2>Búsqueda</h2>
                    <div className="filter-item">
                        <label htmlFor="startDate">Fecha Inicio</label>
                        <input type="date"value={startDate} id="startDate" name="startDate"onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="endDate">Fecha Fin</label>
                        <input type="date"value={endDate} id="endDate" name="endDate"onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="movementType">Tipo de movimiento</label>
                        <select value={movementType} id="movementType" name="movementType" onChange={e => setMovementType(e.target.value)}>
                            <option value="">Seleccione el tipo</option>
                            {Object.entries(MOVEMENT_TYPES).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={applyFilters}className="search-btn">Buscar</button>
                </div>
                <div className="products-table">
                    <TableMovements movements = {currentMovements}/>
                </div>
                <div className="products-pagination-and-back2">
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                    <button onClick={handleBack} className="back-btn">Regresar</button>
                    </div>
            </div>)}
            </div>
        </LayoutBasic>
    );
}
