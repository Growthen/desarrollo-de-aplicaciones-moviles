import api from "@/features/auth/services/auth";
import type { ApiResponse } from "../types/Padre.types";

export type StudentResponse = {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    studentCode: string;
    parentId: number;
    parentName: string;
};

//obtiene hijos
export async function ObtenerHijos(): Promise<StudentResponse[]> {
    const rpta = await api.get<ApiResponse<StudentResponse[]>>("/api/students/my-children");
    return rpta.data.data;
}