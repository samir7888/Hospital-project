"use server";

import { zodFormDataSchema } from "./../../components/validation/AdmissionFormValidation";
import axios, { AxiosError } from "axios";
const API_URL = process.env.API_URL;

export async function submitAppointment(formData: Partial<zodFormDataSchema>) {
  console.log(formData);

  try {
    if (!API_URL) {
      throw new Error("API_URL is not defined in environment variables.");
    }

    const endpoint = `${API_URL}appointments`;
    const response = await axios.post(endpoint, formData);

    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const msg = error.response?.data?.message || error.message;

      if (typeof msg === "string") {
        throw new Error(msg);
      }

      if ("message" in msg) {
        throw new Error(msg.message);
      }
    }

    throw new Error("Failed to submit appointment.");
  }
}
