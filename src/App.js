import React from 'react';
import {Routes, Route} from 'react-router';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import tokenAuth from './config/tokenAuth';
import AuthState from './context/autenticacion/authState';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import RutaPrivada from './components/rutas/RutaPrivada';

function App() {

  // revizar si hay un token
  const token = localStorage.getItem('token');
  if (token) {
    tokenAuth(token)
  }

  return (
    <ProyectoState>
      <TareaState>
        <AuthState>
          <div>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/nueva-cuenta' element={<NuevaCuenta/>} />
              <RutaPrivada path='/proyectos' component={Proyectos} redirectTo='/' />
              {/* <Navigate to='/login' replace /> */}
            </Routes>
          </div>
        </AuthState>
      </TareaState>
     </ProyectoState>
  );
}

export default App;
