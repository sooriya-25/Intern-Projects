// Array to store students
let students = [
  {
    id: 1,
    name: "Sooriya",
    age: 22,
    department: "CSE",
    email: "sooriya@gmail.com",
  },

  {
    id: 2,
    name: "Rahul",
    age: 21,
    department: "IT",
    email: "rahul@gmail.com",
  },

  {
    id: 3,
    name: "Priya",
    age: 20,
    department: "ECE",
    email: "priya@gmail.com",
  },

  {
    id: 4,
    name: "Ganesh",
    age: 23,
    department: "EEE",
    email: "ganesh@gmail.com",
  },

  {
    id: 5,
    name: "Anitha",
    age: 19,
    department: "Mechanical",
    email: "anitha@gmail.com",
  },
];

// Used while editing
let editStudentId = null;

// Next ID for newly added students
let nextId = 6;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET HTML ELEMENTS
const nameInput = document.getElementById("studentName");
const ageInput = document.getElementById("studentAge");
const departmentInput = document.getElementById("studentDepartment");
const emailInput = document.getElementById("studentEmail");
const saveButton = document.getElementById("saveBtn");
const studentTable = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const averageAge = document.getElementById("averageAge");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const sortButton = document.getElementById("sortBtn");
const detailsModal = document.getElementById("detailsModal");
const closeModal = document.getElementById("closeModal");
const studentDetails = document.getElementById("studentDetails");



// SAVE STUDENT
// Used for BOTH Add and Edit
const saveStudent = () => {
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const department = departmentInput.value;
    const email = emailInput.value.trim();
    
    // Validation
    if (name === "" || age === 0 || department === "" || email === "") {
        alert("Please fill all fields.");
        
        return;
    }
    
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // Student Object
    const student = {
        name,
        age,
        department,
        email,
    };
    
    // EDIT
    if (editStudentId !== null) {
        updateStudent(student);
    }
    // ADD
    else {
        addStudent(student);
    }
}

// ADD BUTTON EVENT
saveButton.addEventListener("click", saveStudent);

// ADD STUDENT
function addStudent(student) {
  students.push({
    id: nextId++,

    ...student,
  });

  alert("Student added successfully!");
  clearForm();
  displayStudents();
}

// UPDATE STUDENT
// Spread Operator

const updateStudent = (updatedStudent) => {

    const index = students.findIndex(
        student => student.id === editStudentId
    );

    students[index] = {
        ...students[index],
        ...updatedStudent
    };

    editStudentId = null;
    saveButton.textContent = "Add Student";
    alert("Student updated successfully!");
    clearForm();
    displayStudents();
};

// DISPLAY STUDENTS
// map()
// Template Literals

const displayStudents = (studentList = students) => {

    studentTable.innerHTML = studentList
        .map(student => `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.department}</td>
                <td>${student.email}</td>
                <td>
                    <button
                        class="action-btn edit-btn"
                        onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                    <button
                        class="action-btn view-btn"
                        onclick="showStudentDetails(${student.id})">
                        View
                    </button>
                </td>
            </tr>
        `)
        .join("");

    updateStatistics();

};

// EDIT STUDENT
// find()
// Destructuring
function editStudent(id) {
  const student = students.find(function (student) {
    return student.id === id;
  });

  if (!student) {
    return;
  }

  editStudentId = id;

  const { name, age, department, email } = student;

  nameInput.value = name;
  ageInput.value = age;
  departmentInput.value = department;
  emailInput.value = email;
  saveButton.textContent = "Update Student";
}

// DELETE STUDENT
// filter()
function deleteStudent(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this student?",
  );

  if (!confirmDelete) {
    return;
  }

  students = students.filter(function (student) {
    return student.id !== id;
  });

  displayStudents();
}

// CLEAR FORM
function clearForm() {
  nameInput.value = "";
  ageInput.value = "";
  departmentInput.value = "";
  emailInput.value = "";
}

// SEARCH STUDENT
// Whenever user types, search automatically

searchInput.addEventListener("input", searchStudents);

function searchStudents() {
  const searchText = searchInput.value.toLowerCase();
  const filteredStudents = students.filter(function (student) {
    return student.name.toLowerCase().includes(searchText);
  });
  displayStudents(filteredStudents);
}

// FILTER BY DEPARTMENT
departmentFilter.addEventListener("change", filterStudents);

function filterStudents() {
  const selectedDepartment = departmentFilter.value;

  if (selectedDepartment === "All") {
    displayStudents();
    return;
  }

  const filteredStudents = students.filter(function (student) {
    return student.department === selectedDepartment;
  });

  displayStudents(filteredStudents);
}

// SORT STUDENTS
sortButton.addEventListener("click", sortStudents);

function sortStudents() {
  students.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  displayStudents();
}

// UPDATE STATISTICS
// Total Students
// Average Age
// reduce()

function updateStatistics() {
  totalStudents.textContent = students.length;

  if (students.length === 0) {
    averageAge.textContent = 0;
    return;
  }

  const totalAge = students.reduce(function (sum, student) {
    return sum + student.age;
  }, 0);

  const average = totalAge / students.length;
  averageAge.textContent = average.toFixed(1);
}

// STUDENT DETAILS MODAL
// find()
// Optional Chaining
// Template Literals

function showStudentDetails(id) {
  const student = students.find(function (student) {
    return student.id === id;
  });

  studentDetails.innerHTML = `
        <p><strong>ID :</strong> ${student?.id}</p>
        <p><strong>Name :</strong> ${student?.name}</p>
        <p><strong>Age :</strong> ${student?.age}</p>
        <p><strong>Department :</strong> ${student?.department}</p>
        <p><strong>Email :</strong> ${student?.email}</p>
    `;

  detailsModal.style.display = "block";
  // Disable background scrolling
  document.body.classList.add("no-scroll");
}

// CLOSE MODAL
closeModal.addEventListener("click", function () {
  detailsModal.style.display = "none";
  // Enable scrolling again
  document.body.classList.remove("no-scroll");
});

// Close modal if user clicks outside it
window.addEventListener("click", function (event) {
  if (event.target === detailsModal) {
    detailsModal.style.display = "none";
    // Enable scrolling again
    document.body.classList.remove("no-scroll");
  }
});

// REST OPERATOR EXAMPLE
function printStudents(...studentList) {
  console.log("Rest Operator Example");

  console.log(studentList);
}

// Call once just to demonstrate Rest Operator
printStudents(...students);

// INITIAL DISPLAY
displayStudents();
