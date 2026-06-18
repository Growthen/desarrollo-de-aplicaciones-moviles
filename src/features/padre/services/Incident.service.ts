import api from "@/features/auth/services/auth";
import type { ApiResponse } from "../types/Padre.types";
import { COLORS } from "@/shared";

//movido del mockIncidencias pq me daba dolor de cabeza
export type IconIncidencia = "health-and-safety" | "watch-later" | "block-flipped" | "call"

export type IconColoresInci = {
  icon: IconIncidencia;
  iconbgcolor: string;
  iconcolor: string;
}

//mas q nada UI
export type Incidencia = {
  icon: IconIncidencia;
  iconbgcolor: string;
  iconcolor: string;

  id: number;
  titulo: string;
  fecha: string;//iso
  profesor: string;
  descripcion: string;
  estado: "NO_LEIDA" | "LEIDA"; 
  nombre_alumno: string;     
  
};

//get del incidents-student-student.id
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

//del mockIncidencias
export function ObtenerIconxTitulo(titulo: string): IconColoresInci {
  const t = titulo.toLowerCase();

  if (t.includes("médica") || t.includes("medica") || t.includes("malestar") || t.includes("dolor")) {
    return { icon: "health-and-safety", iconbgcolor: "#cfe1d3", iconcolor: "#60bb70" };
  }
  if (t.includes("tardanza") || t.includes("demora") || t.includes("retraso")) {
    return { icon: "watch-later", iconbgcolor: "#f0eab4", iconcolor: "#dac82b" };
  }
  if (t.includes("falta") || t.includes("ausencia") || t.includes("infracción") ||
      t.includes("infraccion") || t.includes("transgresión") || t.includes("transgresion")) {
    return { icon: "block-flipped", iconbgcolor: "rgba(167,51,0,0.08)", iconcolor: COLORS.primary };
  }
  // alteracion del orden + cualquier otro caso
  return { icon: "call", iconbgcolor: "rgba(167,51,0,0.1)", iconcolor: "#a73300" };
}

//formatear fecha en front
/*export function formatFecha(fecha: string): string {
  const fechanueva = new Date(fecha);
  return fechanueva.toLocaleDateString("es-PE", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
}*/

//formatear la fecha a hora tmb
function formatFecha(incidentDate: string): string {
    const fecha= new Date(incidentDate);
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

//metodo para agarrar si esta realmente leido o no la incidencia noams
