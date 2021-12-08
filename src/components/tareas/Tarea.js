import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {
    const {eliminarTarea, obtenerTareasProyecto, cambiarEstadoTarea, seleccionarTareaActual} = useContext(TareaContext);
    const {proyectoactual} = useContext(proyectoContext);

    const handleDelete = _ => {
        eliminarTarea(tarea._id, proyectoactual._id);
        obtenerTareasProyecto(proyectoactual._id);
    }

    const handleChange = tarea => {
        tarea.estado = !tarea.estado
        cambiarEstadoTarea(tarea);
    }

    return (
        <li className='tarea sombra'>
            <p>
                {tarea.nombre}
            </p>
            <div className="estado">
             
                        <button
                            type='button'
                            className={tarea.estado?'completo':'incompleto'}
                            onClick={_ => handleChange(tarea)}
                        >
                            {tarea.estado?'Completo':'Incompleto'}
                        </button>
              
            </div>
            <div className="acciones">
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={_ => seleccionarTareaActual(tarea)}
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={handleDelete}
                >Eliminar</button>
            </div>
        </li>
       
    )
}

export default Tarea
