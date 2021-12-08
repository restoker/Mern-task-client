import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import {useFormik} from 'formik';
import * as Yup from 'yup';
// import {v4 as uid} from 'uuid';

import TareaContext from '../../context/tareas/tareaContext';
const FormTarea = () => {
    const {proyectoactual} = useContext(proyectoContext);
    const {agregarTarea, obtenerTareasProyecto, tareaactual, actualizarTarea} = useContext(TareaContext);

    const formik = useFormik({
        initialValues: {
            nombre: '',
            // nombreBoton: 'Agregar Tarea'
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .trim()
                        .required('El campo es obligatorio')
                        .min(3, 'Debe contener al menos 3 caracteres')
                        .max(50, 'No puede contener más de 50 caracteres')
        }),
        onSubmit: datos => {
            if (tareaactual) {
                tareaactual.nombre = datos.nombre;
                actualizarTarea(tareaactual);
            } else {
               // delete datos.nombreBoton; 
            //    datos.estado = false;
               datos.proyecto = proyectoactual._id;
            //    datos.id = uid();
               agregarTarea(datos);
               formik.resetForm();
            }
            obtenerTareasProyecto(proyectoactual._id);
        }
    })

    useEffect(() => {
        if(!tareaactual) {
            formik.resetForm();
            // formik.setFieldValue('nombreBoton', 'Agregar Tarea');
        } else {
            formik.setFieldValue('nombre', tareaactual.nombre);
            // formik.setFieldValue('nombreBoton', 'Editar Tarea');
        }
        //eslint-disable-next-line
    }, [tareaactual])

    if (proyectoactual === null) return null;
    
    return (
        <div className='formulario'>
            <form 
                action=""
                onSubmit={formik.handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Nombre tarea...'
                        name='nombre'
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.errors.nombre&&formik.touched.nombre&&<p className='mensaje error'>{formik.errors.nombre}</p> }
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-block'
                        value={tareaactual?'Editar Tarea':'Agregar Tarea'}
                        name='botonSubmit'
                    />
                </div>
            </form>
        </div>
    )
}

export default FormTarea
