import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    AGREGAR_PROYECTO,
    MOSTRAR_OCULTAR_FORMULARIO,
    OBTENER_PROYECTO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        proyectoactual: null,
        mensaje: null,
    }
    // dispatch para ejecutar las acciones 
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // funciones que modifican el state
    const mostrarOcultarFormulario = _ => {
        dispatch({
            type: MOSTRAR_OCULTAR_FORMULARIO
        })
    }
    // funcion que obtiene los proyecto
    const obtenerProyectos = async _ => {
     try {
         const resultado = await clienteAxios.get('/api/proyectos');
        dispatch({
            type: OBTENER_PROYECTO,
            payload: resultado.data.proyectos
        }) 
     } catch (e) {
         console.log(e);
     }
    }

    const agregarProyecto = async proyecto => {
       try {
           const resultado = await clienteAxios.post('/api/proyectos', proyecto);
           dispatch({
               type: AGREGAR_PROYECTO,
               payload: resultado.data
           })
       } catch (e) {
           console.log(e);
       }
    }
    const obtenerProyectoActual = proyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        })
    }
    const eliminarProyectoActual = async id => {
       try {
           await clienteAxios.delete(`/api/proyectos/${id}`)
           dispatch({
                type: ELIMINAR_PROYECTO,
                payload: id
            })
       } catch (e) {
           console.log(e);
           const alerta = {
               msg: 'Hubo un error',
               categoria: 'alert-error'
           }
           dispatch({
               type: PROYECTO_ERROR,
            //    payload: 
           })
       }
    } 
    return (
        <proyectoContext.Provider
            value = {{
                proyectos: state.proyectos,
                formulario: state.formulario,
                proyectoactual: state.proyectoactual,
                mensaje: state.mensaje,
                mostrarOcultarFormulario,
                obtenerProyectos,
                agregarProyecto,
                obtenerProyectoActual,
                eliminarProyectoActual
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState
