import{BASE_PATH} from './config';

export function listarProductosInventario() {
    const url = `${BASE_PATH}api/products`;
    const params = {
        method: "GET"
    };
    return fetch(url, params)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error al listar categorías: ", error);
        return {
            errMsg: error.message,
            success: false
        };
    });
    
}

export function updateProduct(productId, productData,movementData) {
    const url = new URL(`${BASE_PATH}api/products/${productId}`);
    const params = new URLSearchParams(movementData);
    url.search = params.toString();

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(errMsg => {
        return {
            errMsg: errMsg.message,
            success: false
        };
    });
}

export function disableProduct(productId) {
    return fetch(`${BASE_PATH}api/products/disable/${productId}`, {
        method: 'PATCH',  // Cambio de 'GET' a 'PATCH'
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(errMsg => {
        return {
            errMsg: errMsg.message,
            success: false
        };
    });
}
export function addProducts(productId,productData,movementData) {
    const url=new URL(`${BASE_PATH}api/products/add/${productId}`);
    const params = new URLSearchParams(movementData);
    url.search = params.toString();
    return fetch(url, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)

    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(errMsg => {
        return {
            errMsg: errMsg.message,
            success: false
        };
    });
}
export function listarMovimientosProducto(productId) {
    const url = `${BASE_PATH}api/movimientos/producto/${productId}`;
    const params = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error al listar movimientos del producto: ", error);
            return {
                errMsg: error.message,
                success: false
            };
        });
}

export function crearProducto(productData,movementData) {
    const url = new URL(`${BASE_PATH}api/products`);
    const params = new URLSearchParams(movementData);
    url.search = params.toString();
    return fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto creado:', data);
        return data;
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
    });
}

