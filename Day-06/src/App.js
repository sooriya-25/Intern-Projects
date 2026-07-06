import { useState } from "react";
import { Layout, Typography, message } from "antd";

import "./App.css";

import DashboardStats from "./components/DashboardStats";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import initialStudents from "./data/students";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  // State
  const [students, setStudents] = useState(initialStudents);

  // Add Student
const addStudent = (student) => {
  const nameExists = students.some(
    (s) => s.name.trim().toLowerCase() === student.name.trim().toLowerCase()
  );

  if (nameExists) {
    return {
      success: false,
      field: "name",
      message: "Student name already exists.",
    };
  }

  const rollExists = students.some(
    (s) => s.roll.trim().toLowerCase() === student.roll.trim().toLowerCase()
  );

  if (rollExists) {
    return {
      success: false,
      field: "roll",
      message: "Roll number already exists.",
    };
  }

  const newStudent = {
    id: Date.now(),
    ...student,
    present: false,
  };

  setStudents((prevStudents) => [...prevStudents, newStudent]);

  return {
    success: true,
  };
};

  // Delete Student
  const deleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );

    message.success("Student deleted successfully!");
  };

  // Toggle Attendance
  const toggleAttendance = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              present: !student.present,
            }
          : student,
      ),
    );

    message.success("Attendance updated successfully!");
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={2} style={{ color: "#fff", margin: 0 }}>
          Student Management Dashboard
        </Title>
      </Header>

      <Content className="content">
        {/* Dashboard Cards */}
        <DashboardStats students={students} />

        {/* Add Student Form */}
        <StudentForm addStudent={addStudent} />

        {/* Student Table */}
        <StudentTable
          students={students}
          deleteStudent={deleteStudent}
          toggleAttendance={toggleAttendance}
        />
      </Content>
    </Layout>
  );
}

export default App;
