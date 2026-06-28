import { Course, Incidence } from "../types/types";

export const mockCourses: Course[] = [
  {
    id: 1,
    title: "Matemáticas - 1A",
    subtitle: "25 alumnos",
    classroom: "1A",
    students: [
      {
        id: 101,
        name: "Juan Pérez",
        dni: "74839211",
      },
      {
        id: 102,
        name: "María Gómez",
        dni: "71592833",
      },
    ],
  },
  {
    id: 2,
    title: "Ciencias - 2B",
    subtitle: "22 alumnos",
    classroom: "2B",
    students: [
      {
        id: 103,
        name: "Ana Torres",
        dni: "76283911",
      },
    ],
  },
  {
    id: 3,
    title: "Historia - 3C",
    subtitle: "18 alumnos",
    classroom: "3C",
    students: [],
  },
];

export const mockIncidences: Incidence[] = [
  {
    id: 1,
    title: "Retraso en la clase",
    description:
      "El alumno llegó tarde a clase y pidió permiso después de que la clase ya había comenzado.",
    course: "Matemáticas - 1A",
    student: "Juan Pérez",
    timestamp: "2026-05-20T08:15:00Z",
    status: "No leída",
  },
  {
    id: 2,
    title: "Falta de tarea",
    description: "María no entregó la tarea de fin de semana.",
    course: "Ciencias - 2B",
    student: "María Gómez",
    timestamp: "2026-05-19T17:40:00Z",
    status: "Leída",
  },
];
