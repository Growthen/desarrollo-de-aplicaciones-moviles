import api from "@/features/auth/services/auth";

export async function getTeacherCourses() {
  const response = await api.get("/api/classes/my-classes");

  return response.data.data.map((course: any) => ({
    id: course.id,
    title: course.name,
    subtitle: `${course.students?.length || 0} alumnos`,
    students:
      course.students?.map((student: any) => ({
        id: student.id,
        name: student.fullName,
        dni: student.dni,
      })) || [],
  }));
}