import { useMemo, useState } from "react";
import { Layout, Typography, notification } from "antd";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StudentStats from "./components/StudentStats";
import SearchFilter from "./components/SearchFilter";
import StudentModal from "./components/StudentModal";

import initialStudents from "./data/initialStudents";

import {
  calculateAverageAge,
  searchStudents,
  filterStudents,
  sortStudents,
} from "./utils/helpers";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [department, setDepartment] = useState("All");

  const [api, contextHolder] = notification.useNotification();

  // Filter students
  const displayedStudents = useMemo(() => {
    let data = searchStudents(students, searchText);
    data = filterStudents(data, department);
    return data;
  }, [students, searchText, department]);

  // Notification Helper
  const showNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  // Add Student
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1,
    };

    setStudents([...students, newStudent]);

    showNotification(
      "success",
      "Student Added",
      "Student has been added successfully.",
    );
  };

  // Update Student
  const updateStudent = (student) => {
    setStudents(
      students.map((s) =>
        s.id === editingStudent.id ? { ...student, id: editingStudent.id } : s,
      ),
    );

    setEditingStudent(null);

    showNotification(
      "success",
      "Student Updated",
      "Student details updated successfully.",
    );
  };

  // Delete Student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));

    showNotification(
      "success",
      "Student Deleted",
      "Student removed successfully.",
    );
  };

  // Edit Student
  const editStudent = (student) => {
    setEditingStudent(student);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // View Student
  const viewStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Sort Students
  const handleSort = () => {
    const sortedStudents = [...students].sort((a, b) => {
      return sortAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    setStudents(sortedStudents);

    showNotification(
      "info",
      "Students Sorted",
      sortAscending ? "Students sorted A → Z" : "Students sorted Z → A",
    );

    setSortAscending(!sortAscending);
  };

  return (
    <>
      {contextHolder}

      <Layout
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          padding: "10px 20px",
        }}
      >
        <Content
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Title
            level={1}
            style={{
              textAlign: "center",
              color: "#1976d2",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            🎓 Student Management System
          </Title>

          <div style={{ marginBottom: 25 }}>
            <StudentForm
              addStudent={addStudent}
              updateStudent={updateStudent}
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
            />
          </div>

          <div style={{ marginBottom: 25 }}>
            <SearchFilter
              searchText={searchText}
              setSearchText={setSearchText}
              department={department}
              setDepartment={setDepartment}
              handleSort={handleSort}
              sortAscending={sortAscending}
            />
          </div>

          <div style={{ marginBottom: 25 }}>
            <StudentStats
              totalStudents={students.length}
              averageAge={calculateAverageAge(students)}
            />
          </div>

          <StudentTable
            students={displayedStudents}
            editStudent={editStudent}
            deleteStudent={deleteStudent}
            viewStudent={viewStudent}
          />

          <StudentModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            student={selectedStudent}
          />
        </Content>
      </Layout>
    </>
  );
}

export default App;
