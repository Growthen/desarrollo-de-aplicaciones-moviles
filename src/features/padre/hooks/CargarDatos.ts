import { useCallback, useState } from "react";
import { type Incidencia, ObtenerInciporEstudianteUI } from "../services/Incident.service";
import { ObtenerHijos, type StudentResponse } from "../services/Student.service";

type IncidenciasxHijo= Record<number, Incidencia[]>;

export function useloadDatos(){
    //lista de hijos
    const [hijos, setHijos]= useState<StudentResponse[]>([]);
    //lista para guardar todas las incis por hijo
    const [IncidenciasxHijo, setIncidenciasxHijo] = useState<IncidenciasxHijo>({});
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //funcion async reutilizable
    const cargarDatos= useCallback(async () => {
        try{
            //limpia errores anteriores, activa el estado de loading
            setLoading(true);
            setError(null);

            //lista de hijos del backend
            const dataHijos= await ObtenerHijos();
            //obj q guarda las incis x cada hijo
            const inciMapeo: IncidenciasxHijo = {};

            //peticiones en paralelo, con el id, pide las incis y las guarda
            await Promise.all(
                dataHijos.map(async (hijo) => {
                    inciMapeo[hijo.id] = await ObtenerInciporEstudianteUI(hijo.id);
                })
            );

            //guardar
            setHijos(dataHijos);
            setIncidenciasxHijo(inciMapeo);
        } catch{
            setError("No se cargaron los datos");
        } finally{
            setLoading(false);
        }
    }, []);//no depende de valores externos del componente

    return {hijos, IncidenciasxHijo, loading, error, cargarDatos}


}