import React, { useContext } from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {
    const {proyectoactual, eliminarProyectoActual, obtenerProyectos} = useContext(proyectoContext);
    const {tareasproyecto, eliminarTareasProyecto, seleccionarTareaActual} = useContext(TareaContext);

    if(proyectoactual === null) return (<><h2>Seleccione un proyecto</h2></>)

    const handleDelete = id => {
        eliminarProyectoActual(id);
        eliminarTareasProyecto();
        seleccionarTareaActual(null);
        // obtenerProyectos();
    }

    return (
        <>
        <h2>Proyecto: {proyectoactual.nombre}</h2>
        <ul className='listado-tareas'>
            {tareasproyecto
                ?
                   <TransitionGroup>
                        {tareasproyecto.map((tarea) => (
                            <CSSTransition 
                                key={tarea._id}
                                timeout={400}
                                classNames='tarea'
                            >
                                <Tarea tarea={tarea} />
                            </CSSTransition>
                        ))}
                   </TransitionGroup>
                :
                <li className='tarea'>
                    <p>No hay Tareas</p>
                </li>
            }
        </ul>
        <button
            type='button'
            className='btn btn-eliminar'
            onClick={_ => handleDelete(proyectoactual._id)}
        >Eliminar Proyecto &times;</button>
        </>
    )
}

export default ListadoTareas
