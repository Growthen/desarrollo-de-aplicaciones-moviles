import { COLORS } from "@/shared";

export type Incidencia = {
  icon: "health-and-safety" | "watch-later" | "block-flipped" | "call"; // íconos válidos
  iconbgcolor: string;
  iconcolor: string;

  id: string;
  titulo: string;
  fecha: string;
  profesor: string;
  descripcion: string;
  estado: string;       // después será boolean o enum
  
};

export const MOCK_INCIDENCIAS_HIJO_1: Incidencia[] = [
  {
    id: "1", titulo: "Alteración del orden", fecha: "12/05/2025",
    profesor: "Prof. García", descripcion: "El alumno interrumpió la clase repetidamente asdasda asdasdasd asdasdasd, asdasd asdasdasd asdasdas ass asas sadasdasdasd asdasdasd.",
    estado: "#0075d8",
    icon: "call", iconbgcolor: "rgba(167,51,0,0.1)", iconcolor: COLORS.primary,
  },
  {
    id: "2", titulo: "Tardanza", fecha: "10/05/2025",
    profesor: "Prof. Torres", descripcion: "Llegó 20 minutos tarde sin justificación.",
    estado: "#0075d8",
    icon: "watch-later", iconbgcolor: "#f0eab4", iconcolor: "#dac82b",
  },
  {
    id: "3", titulo: "Incidencia Médica", fecha: "08/05/2025",
    profesor: "Prof. Ríos", descripcion: "Se sintió mal durante educación física. Asafdasdasd asdasdasd asdasdsad. asdda asdasd asdsdsda adda asdas asdasds, asdsda asdasdasd asdad asdasd asdadas asdada sdada dad asda dad ada adba  adasda dasdad ad.",
    estado: "#0075d8",
    icon: "health-and-safety", iconbgcolor: "#cfe1d3", iconcolor: "#60bb70",
  },
  {
    id: "4", titulo: "Alteración del orden", fecha: "05/05/2025",
    profesor: "Prof. García", descripcion: "Discusión con un compañero de aula. Aasdas asdad asdasd asd  ad asdasd a sd asdasd asdad sdasda dsasda sdasdadadasd asd asdada s sdasd asda d asdas dasd asd as d asd a s ad asd a sd.",
    estado: "#0075d8",
    icon: "call", iconbgcolor: "rgba(167,51,0,0.1)", iconcolor: "#a73300",
  },
  {
    id: "5", titulo: "Tardanza", fecha: "01/05/2025",
    profesor: "Prof. Torres", descripcion: "Llegó tarde por segunda vez en el mes.",
    estado: "#0075d8",
    icon: "watch-later", iconbgcolor: "#f0eab4", iconcolor: "#dac82b",
  },
  {
    id: "6", titulo: "Alteración del orden", fecha: "28/04/2025",
    profesor: "Prof. García", descripcion: "Usó el celular durante el examen.",
    estado: "#0075d8",
    icon: "call", iconbgcolor: "rgba(167,51,0,0.1)", iconcolor: "#a73300",
  },
];

export const MOCK_INCIDENCIAS_HIJO_2: Incidencia[] = [
  {
    id: "1", titulo: "Tardanza", fecha: "11/05/2025",
    profesor: "Prof. Lara", descripcion: "Segunda tardanza consecutiva.",
    estado: "#0075d8", 
    icon: "watch-later", iconbgcolor: "#f0eab4", iconcolor: "#dac82b",
  },
  {
    id: "2", titulo: "Incidencia Médica", fecha: "09/05/2025",
    profesor: "Prof. Ríos", descripcion: "Dolor de cabeza durante matemáticas.",
    estado: "#0075d8",
    icon: "health-and-safety", iconbgcolor: "#cfe1d3", iconcolor: "#60bb70",
  },
];

export type Hijo = {
  id: string;
  alum_nom: string;
  alum_grado: string;
  alum_code: string;
  pending_alum: number;
  solved_alum: number;
  inci: Incidencia[];
};

export const MOCK_HIJOS: Hijo[] = [
  {
    id: "h1",
    alum_nom: "Carlos Díaz",
    alum_grado: "3° Secundaria A",
    alum_code: "STU00001",
    pending_alum: 3,
    solved_alum: 2,
    inci: MOCK_INCIDENCIAS_HIJO_1,
  },
  {
    id: "h2",
    alum_nom: "Sofía Díaz",
    alum_grado: "1° Secundaria B",
    alum_code: "STU00002",
    pending_alum: 1,
    solved_alum: 1,
    inci: MOCK_INCIDENCIAS_HIJO_2,
  },
];