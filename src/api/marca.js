import{BASE_PATH} from './config';

export function listarMarcas() {
    const url = `${BASE_PATH}api/marcas`;
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
export function crearMarca(brandName) {
    return fetch(`${BASE_PATH}api/marcas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre: brandName })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Marca creada con éxito:', data);
      return data;
    })
    .catch(error => {
      console.error('Error al crear la marca:', error);
    });
  }
