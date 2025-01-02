import * as yup from "yup";

// Login Schema
export const loginSchema = yup.object({
  id: yup.string().required("Id is required"),
  password: yup.string().min(8).max(50).required(),
});

// Verification Schema
export const verificationSchema = yup.object({
  verificationCode: yup.string().min(4).max(10).required(),
});

// New Password Schema
export const newPasswordSchema = yup.object({
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

// Forgot Password Schema
export const forgotPassword = yup.object({
  email: yup.string().required("Id is required"),
});

// Personal Info Schema (Empty, for customization)
export const personalInfoSchema = yup.object({});

// Profile Picture Schema
export const personalProfilePic = yup.object({
  profilePic: yup.string().required("Profile picture is required"),
});

// Change Password Schema
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

// Announcement Schema
export const announcement = yup.object({
  image: yup.string().required("Image is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});
