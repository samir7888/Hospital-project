import { ImageResponse } from "./global-types";


export interface ITestimonial {
  id: string;
  personName: string;
  personCompany: string;
  personRating: number;
  personMessage: string;    
 personImage: ImageResponse | null;
}

export type TestimonialResponse = ITestimonial[];
