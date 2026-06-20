import { useCallback, useEffect, useState } from "react";
import { Course } from "../types/types";
import { getTeacherCourses } from "../services/courseService";

export function useTeacherCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTeacherCourses();
      setCourses(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCourses();
  }, [refreshCourses]);

  return { courses, loading, refreshCourses };
}
