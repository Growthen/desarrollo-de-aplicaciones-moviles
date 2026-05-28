import api from "@/features/auth/services/auth";

export async function getStudentsByClass(classId: number) {
  const response = await api.get(`/api/classes/${classId}/students`);

  return response.data.data.map((student: any) => ({
    id: student.id,
    name: `${student.firstName} ${student.lastName}`,
    dni: student.studentCode,
  }));
}
