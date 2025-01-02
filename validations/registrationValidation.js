import * as yup from "yup";

// Officer Registration Schema
export const registerOfficerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle name is required"),
  lastName: yup.string().required("Last name is required"),
  officerId: yup.string().required("Officer id is required"),
  // collegeName: yup.string().required("College name is required"), // Removed
});

// Office Registration Schema
export const registerOfficeSchema = yup.object({
  officeId: yup.string().required("Office id is required"),
});

// Day for Clearance Schema
export const registerDayForClearance = yup.object({
  day: yup.string().required("Day is required"),
});

// Admin Registration Schema
export const registerAdminSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle name is required"),
  lastName: yup.string().required("Last name is required"),
  adminId: yup.string().required("Admin id is required"),
  officeName: yup.string().required("Office name is required"),
});

// Staff Registration Schema
export const registerStaffSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle name is required"),
  lastName: yup.string().required("Last name is required"),
  staffId: yup.string().required("Staff id is required"),
  // officeName: yup.string().required("Office name is required"), // Removed
});

// Personal Info Schema
export const personalInfoSchema = yup.object({
  email: yup.string().email().required("Email is required"),
});

// Password Change Schema
export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Old password required")
    .min(8, "Incorrect password")
    .max(50, "Incorrect password"),

  newPassword: yup
    .string()
    .required("Enter new password")
    .min(8, "New password must be at least 8 characters")
    .max(50, "New password must be at most 50 characters"),

  confirmPassword: yup
    .string()
    .required("Re-enter your new password")
    .min(8, "New password must be at least 8 characters")
    .max(50, "New password must be at most 50 characters"),
});

// Rejection Reason Schema
export const rejectReasonSchema = yup.object({
  rejectionReason: yup.string().required("Rejection reason is required"),
});
