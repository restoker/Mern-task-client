import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {
    const {obtenerTareasProyecto, seleccionarTareaActual} = useContext(TareaContext);
    // obtener la tareas del proyecto
    const {obtenerProyectoActual} = useContext(proyectoContext);

    const proyectoActual = proyecto => {
        obtenerProyectoActual(proyecto);//proyecto actual
        obtenerTareasProyecto(proyecto._id);
        seleccionarTareaActual(null);
    }

    return (
       <li>
           <button
            type='button'
            className='btn btn-blank'
            onClick={_ => proyectoActual(proyecto)}
           >
               {proyecto.nombre}
           </button>
       </li>
    )
}

export default Proyecto
