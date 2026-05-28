export interface Student {
  id: number;
  name: string;
  dni: string;
}

export interface Course {
  id: number;
  title: string;
  subtitle?: string;
  classroom?: string;
  students?: Student[];
}

export interface Incidence {
  id: number;
  title: string;
  description: string;

  course: string;
  student: string;

  timestamp: string;
  status: string;
}
