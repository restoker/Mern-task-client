import React, { useContext, useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import AuthContext from '../../context/autenticacion/authContext';
import {useNavigate} from 'react-router-dom'


function Login() {
    const navigation = useNavigate();
    const [mostraralerta, setMostraralerta] = useState(false);
    const {mensaje, autenticado, iniciarSesion} = useContext(AuthContext);

    // en caso de que el usuario se haya autenticado o registardo o sea un uusario duplicado
    useEffect(() => {
        if (autenticado) {
            navigation('/proyectos');
        }
        if (mensaje) {
            setMostraralerta(true);
        }
       if (mostraralerta) {
            return () => {
                setMostraralerta(false)
            }
       }
       //eslint-disable-next-line
    }, [mensaje, autenticado ,navigation])

    const ocultarAlerta = _ => {
        setMostraralerta(false)
    }

    // personalizando el crouton
    // TODO: validando los campos: email y password
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .required('El EMAIL es obligatorio')
                    .email('Debe ingresar un email valido')
                    .trim()
                    ,
                    password: Yup.string()
                    .required('El PASSWORD es obligatorio')
                    .trim()
                    .min(6, 'Contraseña no valida')
            })
        ,
        onSubmit: datos => {
            // console.log(datos);
            iniciarSesion({
                email: datos.email,
                password: datos.password,
            })
            // formik.resetForm();
        }
    })

    return (
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                {mostraralerta&& 
                <div className='alert-error'>
                    <p className='mensaje' style={{color: 'red', borderBottom: '3px solid red', marginTop: 0 }}>{mensaje?.msg||'Servidor no conectado'}</p>
                    <button
                        type='button' 
                        onClick={_ => ocultarAlerta()}
                        className='alert-error boton-sesion'
                    >
                        cerrar
                    </button>
                </div> }
                <h1>Iniciar Sesion</h1>
                <form 
                    action=""
                    onSubmit={formik.handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Tu email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            required
                        />
                    </div>
                    {formik.errors.email&&formik.touched.email&& <p className='formulario-error'>{formik.errors.email}</p> }
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Tu password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            required
                        />
                    </div>
                    {formik.errors.password&&formik.touched.password&& <p className='formulario-error'>{formik.errors.password}</p> }
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Iniciar Sesión'
                        />
                    </div>
                </form>
                <NavLink 
                    to='/nueva-cuenta' 
                    className='enlace-cuenta'
                    onClick={_ => ocultarAlerta()}
                >
                    Obtener Cuenta
                </NavLink>
            </div>
        </div>
    )
}

export default Login
