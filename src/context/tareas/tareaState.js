import React, { useReducer } from 'react'
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import { 
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    ELIMINAR_TAREAS_PROYECTO,
    ESTADO_TAREA,
    OBTENER_TAREA,
    OBTENER_TAREA_PROYECTO,
    TAREA_ACTUAL, 
} from '../../types';
import clienteAxios from '../../config/axios';

const TareaState = props => {
    // state principal

    const initialState = {
        tareasproyecto: [],
        tareaactual: null
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // funciones que modifican el state
    const obtenerTareas = _ => {
        // dispatch({
        //     type: OBTENER_TAREA,
        //     payload: tareasProyecto
        // })
    }

    const obtenerTareasProyecto = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            // console.log(resultado);
            dispatch({
                type: OBTENER_TAREA_PROYECTO,
                payload: resultado.data.tareas
            })   
        } catch (e) {
           console.log(e); 
        }
    }
    
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (e) {
            console.log(e);
        }
    }
    
    // eliminina la tarea seleccionada
    const eliminarTarea = async (id, proyecto) => {
      try {
          await clienteAxios.delete(`/api/tareas/${id}`, {params:{proyecto}})
          dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
      } catch (e) {
          
      }
    }

    // eliminar las tareas del state al eliminar el proyecto actual
    const eliminarTareasProyecto = _ => {
        dispatch({
            type: ELIMINAR_TAREAS_PROYECTO
        })
    }
    // cambiar el estado de una tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }
    // tarea seleccionada
    const seleccionarTareaActual = tarea => {
        dispatch({
           type: TAREA_ACTUAL,
           payload: tarea
        })
    }

    // tarea seleccionada
    const actualizarTarea = tarea => {
        // console.log(tarea);
        dispatch({
           type: ACTUALIZAR_TAREA,
           payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                tareaactual: state.tareaactual,
                obtenerTareas,
                obtenerTareasProyecto,
                agregarTarea,
                eliminarTarea,
                eliminarTareasProyecto,
                cambiarEstadoTarea,
                seleccionarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
