import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { 
    CERRAR_SESION,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    REGISTRO_ERROR,
    REGISTRO_EXITOSO 
} from "../../types";
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // registrar el usuario

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            // obtener el usuario
            usuarioAutenticado();
        } catch (e) {
            const alerta = {
                msg: e.response.data?.msg
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta,
            })
        }
    }
    
    // retorna el usuario autenticado
    const usuarioAutenticado = async _ => {
        const token = localStorage.getItem('token');
        if (token) {
            // TODO: funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (e) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // cuando el usuario inicia sesion

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            // obtener el usuario logeado
            usuarioAutenticado()
        } catch (e) {
            console.log(e.response?.data?.msg);
            const alerta = {
                msg: e.response?.data?.msg
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta,
            })
        }
    }
    // cierra la sesion del usuario
    const cerrarSesion = _ => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
