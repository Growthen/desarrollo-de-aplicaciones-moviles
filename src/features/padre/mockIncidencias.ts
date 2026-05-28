import { COLORS } from "@/shared";

export type IconIncidencia = "health-and-safety" | "watch-later" | "block-flipped" | "call"

export type IconColoresInci = {
  icon: IconIncidencia;
  iconbgcolor: string;
  iconcolor: string;
}

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

export type Hijo = {
  id: number;
  alum_nom: string;
  alum_grado: string;
  alum_code: string;
  inci: Incidencia[];
  //numeros de incidencias pending y solved se calcularan desde inci
};

//funcion para obtenericonoxtitulo
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
export function formatFecha(isoString: string): string {
  const fecha = new Date(isoString);
  return fecha.toLocaleDateString("es-PE", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
}

export const MOCK_INCIDENCIAS_HIJO_1: Incidencia[] = [
  {
    id: 1, titulo: "Alteración del orden", fecha: "2025-05-12T08:00:00",
    profesor: "Prof. García", descripcion: "El alumno interrumpió la clase repetidamente asdasda asdasdasd asdasdasd, asdasd asdasdasd asdasdas ass asas sadasdasdasd asdasdasd.",
    estado: "NO_LEIDA", nombre_alumno: "Mia Auditore Firenze",
    ...ObtenerIconxTitulo("Alteración del orden"),
  },
  {
    id: 2, titulo: "Tardanza", fecha: "2025-05-10T08:25:36",
    profesor: "Prof. Torres", descripcion: "Llegó 20 minutos tarde sin justificación.",
    estado: "NO_LEIDA", nombre_alumno: "Mia Auditore Firenze",
    ...ObtenerIconxTitulo("Tardanza"),
  },
  {
    id: 3, titulo: "Incidencia Médica", fecha: "2025-05-08T13:45:03",
    profesor: "Prof. Ríos", descripcion: "Se sintió mal durante educación física. Asafdasdasd asdasdasd asdasdsad. asdda asdasd asdsdsda adda asdas asdasds, asdsda asdasdasd asdad asdasd asdadas asdada sdada dad asda dad ada adba  adasda dasdad ad.",
    estado: "NO_LEIDA", nombre_alumno: "Mia Auditore Firenze",
    ...ObtenerIconxTitulo("Incidencia Médica"),
  },
  {
    id: 4, titulo: "Alteración del orden", fecha: "2025-05-05T11:20:28",
    profesor: "Prof. García", descripcion: "Discusión con un compañero de aula. Aasdas asdad asdasd asd  ad asdasd a sd asdasd asdad sdasda dsasda sdasdadadasd asd asdada s sdasd asda d asdas dasd asd as d asd a s ad asd a sd.",
    estado: "NO_LEIDA", nombre_alumno: "Mia Auditore Firenze",
    ...ObtenerIconxTitulo("Alteración del orden"),
  },
  {
    id: 5, titulo: "Tardanza", fecha: "2025-05-01T08:45:23",
    profesor: "Prof. Torres", descripcion: "Llegó tarde por segunda vez en el mes.",
    estado: "NO_LEIDA", nombre_alumno: "Mia Auditore Firenze",
    ...ObtenerIconxTitulo("Tardanza"),
  },
  {
    id: 6, titulo: "Alteración del orden", fecha: "2025-04-28T14:28:13",
    profesor: "Prof. García", descripcion: "Usó el celular durante el examen.",
    estado: "NO_LEIDA", nombre_alumno: "Mia Auditore Firenze",
    ...ObtenerIconxTitulo("Alteración del orden"),
  },
];

export const MOCK_INCIDENCIAS_HIJO_2: Incidencia[] = [
  {
    id: 7, titulo: "Tardanza", fecha: "2025-05-11T08:23:45",
    profesor: "Prof. Lara", descripcion: "Segunda tardanza consecutiva.",
    estado: "NO_LEIDA", nombre_alumno: "Ezio Auditore Firenze",
     ...ObtenerIconxTitulo("Tardanza"),
  },
  {
    id: 8, titulo: "Incidencia Médica", fecha: "2025-05-09T13:12:33",
    profesor: "Prof. Ríos", descripcion: "Dolor de cabeza durante matemáticas.",
    estado: "NO_LEIDA", nombre_alumno: "Ezio Auditore Firenze",
     ...ObtenerIconxTitulo("Incidencia Médica"),
  },
];



export const MOCK_HIJOS: Hijo[] = [
  {
    id: 1,
    alum_nom: "Mia Auditore Firenze",
    alum_grado: "3° Secundaria A",
    alum_code: "STU00001",
    inci: MOCK_INCIDENCIAS_HIJO_1,
  },
  {
    id: 2,
    alum_nom: "Ezio Auditore Firenze",
    alum_grado: "1° Secundaria B",
    alum_code: "STU00002",
    inci: MOCK_INCIDENCIAS_HIJO_2,
  },
];