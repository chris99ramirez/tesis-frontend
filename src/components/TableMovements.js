import React from 'react';
import './TableMovement.scss'
import { MOVEMENT_TYPES } from '../enum/enum';

const TableMovements = ({movements})=> {
    return(
            <div className="products-table">
            <table>
                <thead>
                <tr>
                    <th>Número</th>
                    <th>Fecha de registro</th>
                    <th>Hora de registro</th>
                    <th>Tipo de movimiento</th>
                    <th>Cantidad</th>
                    <th>Usuario</th>
                </tr>
                </thead>
                <tbody>
                    {movements.filter(movement => movement.cantidad !== 0)  
                    .map((movement, index) => (
                        <tr key={movement.id}>
                            <td>{index + 1}</td>
                            <td>{movement.fecha}</td>
                            <td>{movement.hora}</td>
                            <td>{MOVEMENT_TYPES[movement.tipoMovimiento] || 'Tipo desconocido'}</td>
                            <td>{movement.cantidad}</td>
                            <td>Admin1</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )
}
export default TableMovements;