import{BASE_PATH} from './config';

export function listarCategorias() {
    const url = `${BASE_PATH}api/categorias`;
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
