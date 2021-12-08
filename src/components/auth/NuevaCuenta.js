import React, {useState, useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../context/autenticacion/authContext';
import { useContext } from 'react';

const NuevaCuenta = () => {
    const [mostraralerta, setMostraralerta] = useState(false);
    const navigation = useNavigate();
    const {mensaje, autenticado, registrarUsuario} = useContext(AuthContext);
    // en caso de que el usuario se haya autenticado o registardo o sea un uusario duplicado
    useEffect(() => {
        if (autenticado) {
            navigation('/proyectos');
        }
        if (mensaje) {
            setMostraralerta(true);
        }
    }, [mensaje, autenticado, navigation])
    
    const ocultarAlerta = _ => {
        setMostraralerta(false)
    }
    // validar el formulario con formik
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: '',
            confirmar: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                       .required('El nombre es obligatorio')
                       .min(3, 'El nombre debe contener al menos 3 caracteres')
                       .max(50, 'Ha superado el maximo número de carateres')
                       .trim(),
            email: Yup.string()
                      .email('Debe de contener un email valido')
                      .required('El email es obligatorio')
                      .max(50, 'Ha superado el maximo número de caracteres')
                      .trim(),
            password: Yup.string()
                      .required('El Password es obligatorio')
                      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'El password debe contener 8 caracteres, Una letra mayuscula, una letra minuscula, un numero y un caracter especial')
                      .trim(),
            confirmar: Yup.string()
                      .required('Este campo es obligatorio')
                      .trim()
                      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben de coincidir')
        }),
        onSubmit: datos => {
            registrarUsuario({
                nombre: datos.nombre,
                email: datos.email,
                password: datos.password
            });
            formik.resetForm();
        }
    });

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
            <h1>Registar usuario</h1>
            <form 
                action=""
                onSubmit={formik.handleSubmit}
            >
                <div className="campo-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id='nombre'
                        name='nombre'
                        placeholder='Tu nombre'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                        required
                    />
                </div>
                {formik.errors.nombre&&formik.touched.nombre&& <p className='formulario-error'>{formik.errors.nombre}</p> }
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
                    <label htmlFor="confirmar">Confirmar Password</label>
                    <input 
                        type="password"
                        id='confirmar'
                        name='confirmar'
                        placeholder='Confirma tu password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmar}
                        required
                    />
                </div>
                {formik.errors.confirmar&&formik.touched.confirmar&& <p className='formulario-error'>{formik.errors.confirmar}</p> }
                <div className="campo-form">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-block'
                        value='Registrarme'
                    />
                </div>
            </form>

            <NavLink 
                to='/' 
                className='enlace-cuenta'
                onClick={_ => ocultarAlerta()}
            >
                Iniciar Sesión
            </NavLink>

        </div>
    </div>
    )
}

export default NuevaCuenta

