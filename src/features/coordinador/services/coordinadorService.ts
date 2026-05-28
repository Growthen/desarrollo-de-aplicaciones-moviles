import api from "@/features/auth/services/auth";

type CreateClassPayload = {
  name: string;
  teacherId: number;
  studentIds: number[];
};

type CreateStudentPayload = {
  firstName: string;
  lastName: string;
  dni: string;
  parentId: number;
};

type CreateUserPayload = {
  email: string;
  name: string;
  dni: string;
  password: string;
  role: "PADRE" | "PROFESOR";
};

export async function getStudents() {
  const response = await api.get("/api/students");
  return response.data?.data || [];
}

export async function getTeachers() {
  const response = await api.get("/api/users/teachers");
  return response.data?.data || [];
}

export async function getParents() {
  const response = await api.get("/api/users/parents");
  return response.data?.data || [];
}

export async function getUsers() {
  const response = await api.get("/api/users");
  return response.data?.data || [];
}

export async function getCourses() {
  const response = await api.get("/api/classes");
  return response.data?.data || [];
}

export async function updateClassStudents(
  classId: number,
  studentIds: number[],
) {
  const response = await api.put(`/api/classes/${classId}/students`, {
    studentIds,
  });
  return response.data;
}

export async function createClass(payload: CreateClassPayload) {
  const response = await api.post("/api/classes", payload);
  return response.data;
}

export async function createStudent(payload: CreateStudentPayload) {
  const response = await api.post("/api/students", payload);
  return response.data;
}

export async function createUser(payload: CreateUserPayload) {
  const response = await api.post("/api/users", payload);
  return response.data;
}

export async function getCoordinatorMetrics() {
  const [students, teachers, parents] = await Promise.all([
    getStudents(),
    getTeachers(),
    getParents(),
  ]);

  return {
    students: students.length,
    teachers: teachers.length,
    parents: parents.length,
  };
}
