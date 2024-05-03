import LayoutBasic from "../layouts/LayoutBasic";
import './Products.scss';
import React, { useState,useEffect  } from 'react';
import TableProducts from "../components/TableProduct";
import Pagination from "../components/Paginacion";
import { listarCategorias } from "../api/categoria";
import { listarMarcas } from "../api/marca";
import { listarProductosInventario } from "../api/productos";
import Spinner from "../components/Spinner";
import { useNavigate } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 8;
export default function Products() {

    const [isLoading, setIsLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts]=useState([])
    
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchName, setSearchName] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    useEffect(() => {
        listarCategorias().then(data => setCategorias(data));
        listarMarcas().then(data => setMarcas(data));
        listarProductosInventario().then(data => {
            const productosActivos = data.filter(producto => producto.estado === 1);
            setProducts(productosActivos);
            setFilteredProducts(productosActivos); 
            setIsLoading(false);
        });
    }, []);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleNameChange = (event) => {
        setSearchName(event.target.value);
    };

     const handlePageChange = (newPage) => {
         setCurrentPage(newPage);
     };
     const [isLowStockChecked, setIsLowStockChecked] = useState(false);

     const handleLowStockChange = (event) => {
        setIsLowStockChecked(event.target.checked);
    };
    const navigate = useNavigate();
    const handleNewProduct = () => {
        navigate('/New'); 
    };
    
     const applyFilters = () => {
        let result = products;
        console.log(result);
    
        if (selectedCategory) {
            result = result.filter(product => String(product.categoria.idCategoria) === selectedCategory);
        }
    
        if (selectedBrand) {
            result = result.filter(product => String(product.marca.idMarca) === selectedBrand);
        }
    
        if (searchName) {
            result = result.filter(product => product.nombre.toLowerCase().includes(searchName.toLowerCase()));
        }
    
        if (isLowStockChecked) {
            result = result.filter(product => (product.stock - product.stockMinimo) <= 0);
        }
    
        setFilteredProducts(result);
        setCurrentPage(1); 
    };
    
 
     const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
     const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
     const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
 
    return (
        <LayoutBasic>
            <div className="products-container">
                <div className="products-header">
                    <h1>Inventario - Productos</h1>
                    <button onClick={()=>navigate('Reposition', {
                        state: { products, categories: categorias, brands: marcas }
                    })} className="add-merchandise-btn">Añadir mercadería</button>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div>
                        <div className="products-filters">
                            <div className="filter-item">
                                <label htmlFor="category">Categoría</label>
                                <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value=""selected>Seleccione la categoría</option>
                                    {categorias.map((categoria,index) => (
                                        <option key={index} value={categoria.idCategoria}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-item">
                                <label htmlFor="brand">Marca</label>
                                <select id="brand" name="brand" value={selectedBrand} onChange={handleBrandChange}>
                                    <option value=""  selected>Seleccione la marca</option>
                                        {marcas.map((marca,index) => (
                                            <option key={index} value={marca.idMarca}>
                                                {marca.nombre}
                                            </option>
                                        ))}
                                </select>
                                
                            </div>
                            <div className="filter-item">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" name="name" value={searchName} onChange={handleNameChange} />
                            </div>
                            <div className="filter-item checkbox">
                                <input type="checkbox" 
                                        id="lowStock" 
                                        name="lowStock"
                                        checked={isLowStockChecked} 
                                        onChange={handleLowStockChange} />
                                <label htmlFor="lowStock">Stock bajo</label>
                            </div>
                            <button className="search-btn" onClick={applyFilters}>Buscar</button>

                        </div>
                        <div className="products-table">
                            <TableProducts products = {currentProducts}/>
                        </div>
                        <div className="products-pagination">
                            <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                            />
                            <button onClick={handleNewProduct} className="new-btn">Nuevo producto</button>
                        </div>
                    </div>
                )}
        </div>
        </LayoutBasic>
    );
}
