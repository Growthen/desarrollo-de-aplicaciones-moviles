import api from "@/features/auth/services/auth";

export async function getTeacherCourses() {
  const response = await api.get("/api/classes/my-classes");

  return response.data.data.map((course: any) => ({
    id: course.id,
    title: course.name,
    subtitle: `${course.students?.length || 0} alumnos`,
  }));
}

export async function getStudentsByClassId(classId: number) {
  const response = await api.get(`/api/classes/${classId}/students`);

  return response.data.data.map((student: any) => ({
    id: student.id,
    name: `${student.firstName} ${student.lastName}`,
    dni: student.dni,
  }));
}
