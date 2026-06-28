import api from "@/features/auth/services/auth";

export async function getIncidences() {
  const response = await api.get("/api/incidents/my-incidents");

  return response.data.data.map((incident: any) => ({
    id: incident.id,
    title: incident.title,
    description: incident.description,
    status: incident.status,
    timestamp: incident.incidentDate,
    course: incident.className,
    student: incident.studentName,
    studentId: incident.studentId,
    classId: incident.classId,
  }));
}

export async function createIncidence(data: {
  title: string;
  description: string;
  studentId: number;
  classId: number;
}) {
  const response = await api.post("/api/incidents", data);

  return response.data.data;
}
