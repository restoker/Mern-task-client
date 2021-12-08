import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/autenticacion/authContext';
import {useNavigate} from 'react-router-dom';

const Barra = () => {
    const navigation = useNavigate();
    const {usuario, usuarioAutenticado, cerrarSesion} = useContext(AuthContext);
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])
    return (
        <header className='app-header'>
            {usuario&&<p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p>}
            <nav className="nav-principal">
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={_=> {
                        cerrarSesion();
                        navigation('/');
                    }}
                    style={{color: '#fff', fontWeight: "bold"}}
                >
                    Cerrar sesión
                </button>
            </nav>
        </header>
    ) 
}

export default Barra
