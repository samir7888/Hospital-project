import { NAME_REGEX, NAME_WITH_SPACE_REGEX } from "@/lib/utils";
import { z } from "zod";

// Define the valid departments as an enum
const DepartmentEnum = z.enum([
  "cardiology",
  "gastroenterology",
  "neurology",
  "pediatrics",
  "orthopedics",
  "gynecology",
  "dermatology",
  "general_medicine",
  "ophthalmology",
  "orthodontics",
]);

// Function to validate date is in the future
const validateFutureDate = (dateStr: string) => {
  if (isNaN(Date.parse(dateStr))) {
    return false;
  }
  const selectedDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

  return selectedDate >= today;
};

// Function to validate business hours (9 AM to 5 PM)
const validateBusinessHours = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours >= 9 && hours < 17; // 9 AM to 5 PM
};

export const appointmentSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(NAME_REGEX, "First name should only contain letters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(
      NAME_WITH_SPACE_REGEX,
      "Last name should only contain letters and spaces"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address format"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Please enter a valid phone number format, e.g. (123) 456-7890"
    ),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),

  preferredDate: z
    .string()
    .min(1, "Date is required")
    .refine(validateFutureDate, {
      message: "Appointment date must be today or in the future",
    }),

  specialization: DepartmentEnum, // Uses the enum validation

  message: z
    .string()
    .min(10, "Please provide more details (at least 10 characters)")
    .max(500, "Message is too long (maximum 500 characters)"),
});

export type zodFormDataSchema = z.infer<typeof appointmentSchema>;
