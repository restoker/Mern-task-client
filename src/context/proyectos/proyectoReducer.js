import { 
    AGREGAR_PROYECTO,
    ELIMINAR_PROYECTO,
    MOSTRAR_OCULTAR_FORMULARIO, 
    OBTENER_PROYECTO,
    PROYECTO_ACTUAL,
    PROYECTO_ERROR, 
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_OCULTAR_FORMULARIO:
            return {
                ...state,
                formulario: !state.formulario
            }
        case OBTENER_PROYECTO:
            return {
                ...state,
                proyectos: action.payload
            }

        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [ action.payload ,...state.proyectos]
            }

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoactual: action.payload
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyectoactual: null
            }
        case PROYECTO_ERROR: 
            return {
                ...state,
                mensaje: action.payload
            }
    
        default:
            return state;
    }

}