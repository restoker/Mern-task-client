import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoProyectos = () => {
    // extraer proyectos de state inicial
    const {proyectos, obtenerProyectos} = useContext(proyectoContext);
    // extraer las tareas de los proyectos
    const { obtenerTareas} = useContext(TareaContext);
    // revisar si state tiene contendido

    useEffect(() => {
      obtenerProyectos();
      obtenerTareas();
      //eslint-disable-next-line
    }, [])

    if(proyectos.length === 0) return <p>Agregue un proyecto para comenzar</p>
    return (
      <ul className="listado-proyectos">
         <TransitionGroup>
         {proyectos.map(proyecto => (
              <CSSTransition
                key={proyecto._id}
                timeout={400}
                classNames='proyecto'
              >
                <Proyecto 
                proyecto={proyecto} 
              />
              </CSSTransition>
          ))}
         </TransitionGroup>
      </ul>
    )
}

export default ListadoProyectos
