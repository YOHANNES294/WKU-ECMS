// Define the roles available in the system
export const ROLES = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  HEAD: "HEAD", // Additional privilege for some staff
  OFFICER: "OFFICER", // Officer role added
};

// Define the steps for staff clearance process
export const STAFFSTEPS = [
  "HR", 
  "BOOKCIRCULATION", 
  "FINANCE", 
  "APPROVED"
];

// Data for colleges available in the system
export const CollegeData = [
  { id: "1", name: "College of Computing and Informatics" },
  { id: "2", name: "Engineering" },
  { id: "3", name: "Social Sciences and Humanities" },
  { id: "4", name: "College of Behavioral Science" },
];

// Data for departments within the colleges
export const DepartmentData = [
  { id: "1", name: "Software Engineering" },
  { id: "2", name: "Computer Science" },
  { id: "3", name: "Information System" },
  { id: "4", name: "Information Technology" },
  { id: "5", name: "English" },
  { id: "6", name: "Psychology" },
  { id: "7", name: "Nursing" },
  { id: "8", name: "Electrical Engineering" },
];

// Data for available privileges within the institution
export const privilegeData = [
  { id: "1", name: "College Dean" },
  { id: "2", name: "Head" },
  { id: "3", name: "Library Chief" },
  { id: "4", name: "Cafeteria" },
  { id: "5", name: "College Book Store" },
  { id: "6", name: "Sport And Recreation" },
  { id: "7", name: "Dormitory" },
  { id: "8", name: "Dean Of Student" },
  { id: "9", name: "Registrar" },
  { id: "10", name: "Money And Saving Officer" },
  { id: "11", name: "Finance Directorate Director" },
];
