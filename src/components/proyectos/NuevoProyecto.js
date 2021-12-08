import React, { useContext } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import proyectoContext from '../../context/proyectos/proyectoContext';
// import {v4 as uid} from 'uuid';

const NuevoProyecto = () => {
    const {formulario, mostrarOcultarFormulario, agregarProyecto} = useContext(proyectoContext);
    // validacion y leer los datos del formulario

    const formik = useFormik({
        initialValues: {
            nombre: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                            .min(3, 'El nombre es demasiado corto')
                            .required('El nombre es obligatorio')
                            .max(50,'El nombre es demasido largo')
                            .trim()
        }),
        onSubmit: datos => {
            // datos.id = uid();
            // console.log(datos);
            agregarProyecto(datos)
            formik.resetForm();
        }
    })

    return (
        <>
        <button
            type='button'
            className='btn btn-primario btn-block'
            onClick={_ => {
                mostrarOcultarFormulario()
                formik.resetForm();
            }}
        >
            {formulario ? 'Cancelar' : 'Nuevo Proyecto' }
        </button>
        {formulario&&<form 
            action="" 
            method="post"
            className='formulario-nuevo-proyecto'
            onSubmit={formik.handleSubmit}
        >
            <input 
                type="text" 
                className='input-text'
                placeholder='Nombre Proyecto'
                name='nombre'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.nombre&&formik.errors.nombre&& <p className='mensaje error' role='alert'>{formik.errors.nombre}</p> }
            <input 
                type="submit" 
                value="Agregar proyecto"
                className='btn btn-primario btn-block'
            />
        </form>}
        </>
    )
}

export default NuevoProyecto
