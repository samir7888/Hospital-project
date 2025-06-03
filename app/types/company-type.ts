import { ESocialNetwork } from "./enums";

export type CompanyInfoResponse = {
  id: string;
  city: string;
  address: string;
  phone: string[];
  emergencyPhone: string;
  workingHours: string;
  mapLink: string;
  email: string[];
  socialProfiles: {
    link: string;
    network: ESocialNetwork;
  }[];
};