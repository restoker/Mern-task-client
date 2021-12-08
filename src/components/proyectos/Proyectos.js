import React, { useContext, useEffect } from 'react';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';

const Proyecto = () => {
    // extraer la informacion de autenticacion
    const {autenticado, usuarioAutenticado} = useContext(AuthContext);
    useEffect(() => {
        usuarioAutenticado()
        //eslint-disable-next-line
    }, [])
    if (!autenticado) return null;
    return ( 
       <div className="contenedor-app">
           <Sidebar />
           <div className="seccion-principal">
               <Barra />
               <main>
                   <FormTarea />
                   <div className="contenedor-tareas">
                        <ListadoTareas />
                   </div>
               </main>
           </div>
       </div>
     );
}
 
export default Proyecto;