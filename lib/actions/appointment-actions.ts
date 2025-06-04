// lib/actions/appointment-actions.ts
"use server";

import { zodFormDataSchema } from "../../components/validation/AdmissionFormValidation";

const API_URL = process.env.API_URL;

export async function submitAppointment(formData: zodFormDataSchema) {
  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined in environment variables.");
    }

    console.log(`POST ${API_URL}/appointments`);

    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        `Appointment submission failed: ${response.status} ${response.statusText}`
      );

      // Try to parse error response
      try {
        const parsedError = JSON.parse(errorData);
        throw new Error(
          parsedError.message || `Server error: ${response.status}`
        );
      } catch {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }
    }

    const result = await response.json();
    console.log("Appointment submitted successfully:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Appointment submission error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to submit appointment",
    };
  }
}
