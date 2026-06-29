import { useEffect, useMemo, useState } from "react";
import { Course, Student } from "../types/types";
import { getTeacherCourses } from "../services/courseService";
import { getStudentsByClass } from "../services/studentService";

export function useIncidenceForm(
  initialCourse?: Course | null,
  initialStudent?: Student | null,
) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<Course | null>(initialCourse ?? null);
  const [student, setStudent] = useState<Student | null>(
    initialStudent ?? null,
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [studentQuery, setStudentQuery] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (course) {
      loadStudents(course.id);
    }
  }, [course]);

  async function loadCourses() {
    const data = await getTeacherCourses();
    setCourses(data);
  }

  async function loadStudents(classId: number) {
    const data = await getStudentsByClass(classId);
    setStudents(data);
  }

  const filteredStudents = useMemo(() => {
    const q = studentQuery.trim().toLowerCase();

    if (!q) return students;

    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.dni.toLowerCase().includes(q),
    );
  }, [students, studentQuery]);

  function selectCourse(selectedCourse: Course) {
    setCourse(selectedCourse);
    setStudent(null);
    setStudentQuery("");
    setCourseModalVisible(false);
  }

  function selectStudent(selectedStudent: Student) {
    setStudent(selectedStudent);
    setStudentModalVisible(false);
    setStudentQuery("");
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    course,
    student,
    courses,
    students,
    courseModalVisible,
    setCourseModalVisible,
    studentModalVisible,
    setStudentModalVisible,
    studentQuery,
    setStudentQuery,
    filteredStudents,
    selectCourse,
    selectStudent,
  };
}
