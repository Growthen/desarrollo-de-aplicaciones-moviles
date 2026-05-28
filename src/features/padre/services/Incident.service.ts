import api from "@/features/auth/services/auth";
import type { ApiResponse } from "../types/Padre.types";
import { ObtenerIconxTitulo } from "../mockIncidencias";
import type { Incidencia } from "../mockIncidencias";

//get del student-student.id
export type IncidentResponse= {
    id: number;
    title: string;
    description: string;
    status: "NO_LEIDA" | "LEIDA";
    incidentDate: string; //tiene hr
    studentId: number;
    studentName: string;
    classId: number;
    className: string;
    teacherId: number;
    teacherName: string;
}

//formatear la fecha a hora tmb
function formatFecha(isoString: string): string {
    const fecha= new Date(isoString);
    return fecha.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: false
    });
}

//incidentes x el id para visual
export async function ObtenerIncixEstudiante(studentId: number): Promise<IncidentResponse[]> {
    const rpta = await api.get<ApiResponse<IncidentResponse[]>>(`/api/incidents/student/${studentId}`);
    return rpta.data.data;
}

//lo de arriba pero convertidos a visual
export async function ObtenerInciporEstudianteUI(studentId: number): Promise<Incidencia[]> {
  const incidencias = await ObtenerIncixEstudiante(studentId);

  return incidencias.map((inci) => ({id: inci.id, titulo: inci.title,fecha: formatFecha(inci.incidentDate), 
    profesor: inci.teacherName, descripcion: inci.description, estado: inci.status, nombre_alumno: inci.studentName,
    ...ObtenerIconxTitulo(inci.title),  // icon, iconbgcolor, iconcolor segun palabra en el titulo
  }));
}

//cambiar de no leida  aleida
export async function ActuInciaLeida( incidentId: number): Promise<void> {
    await api.patch(`/api/incidents/${incidentId}/read`);
}