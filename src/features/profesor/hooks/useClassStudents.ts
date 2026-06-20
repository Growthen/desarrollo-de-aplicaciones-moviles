import { useCallback, useEffect, useState } from "react";
import { Student } from "../types/types";
import { getStudentsByClassId } from "../services/courseService";

export function useClassStudents(classId?: number) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshStudents = useCallback(async () => {
    if (!classId) {
      setStudents([]);
      return;
    }

    setLoading(true);
    try {
      const data = await getStudentsByClassId(classId);
      setStudents(data);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    refreshStudents();
  }, [refreshStudents]);

  return { students, loading, refreshStudents };
}
