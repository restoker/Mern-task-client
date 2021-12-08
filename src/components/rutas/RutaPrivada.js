import React, {useContext, useEffect} from 'react';
import {Navigate, Route} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({component: Component, redirectTo, ...props }) => {
    const {autenticado, cargando, usuarioAutenticado} = useContext(AuthContext);
    useEffect(() => {
        usuarioAutenticado();
    }, []) 
    if (!autenticado && !cargando) {
        return <Navigate to={redirectTo}/>
    }
    return (
        <Route {...props}  element={<Component {...props} />} />
    )
}

export default RutaPrivada


// https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6