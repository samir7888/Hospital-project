import { ELanguages, ESpecialization, EWeekDays } from "./enums";
import { ImageResponse } from "./global-types";

export type Doctor = {
  id: string;
  createdAt: string;
  name: string;
  specializations: ESpecialization[];
  experience: number;
  availability: EWeekDays[];
  email: string;
  phone: string;
  about:string;
  address: string;
  languagesKnown: ELanguages[];
  degree: string;
  certifications: string[];
  profileImage: ImageResponse | null;
};

export type Meta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type DoctorsResponse = {
  data: Doctor[];
  meta: Meta;
};

export type TSingleDoctor = Doctor & {
  about: string;
};
