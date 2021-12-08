import { 
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    ELIMINAR_TAREAS_PROYECTO,
    ESTADO_TAREA,
    OBTENER_TAREA, 
    OBTENER_TAREA_PROYECTO,
    TAREA_ACTUAL
 } from "../../types";

export default (state, action) => {
    switch (action.type) {

        case OBTENER_TAREA:
            return {
                ...state,
                tareas: [...action.payload]
            }

        case OBTENER_TAREA_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload
            }
            
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [action.payload, ...state.tareasproyecto]
        }

        case ESTADO_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload : tarea)
        }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload),
        }

        case ELIMINAR_TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: []
        }
        
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaactual: action.payload
        }

        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? action.payload:tarea),
                tareaactual: null
        }

        default:
            return state;
    }
}