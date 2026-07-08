export const calculateAverageAge = (students) => {
  if (students.length === 0) return 0;

  const total = students.reduce((sum, student) => sum + student.age, 0);

  return (total / students.length).toFixed(1);
};

export const searchStudents = (students, searchText) => {
  return students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase()),
  );
};

export const filterStudents = (students, department) => {
  if (department === "All") return students;

  return students.filter((student) => student.department === department);
};

export const sortStudents = (students) => {
  return [...students].sort((a, b) => a.name.localeCompare(b.name));
};
