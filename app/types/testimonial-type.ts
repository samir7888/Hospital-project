


export interface ITestimonial {
  id: string;
  personName: string;
  personCompany: string;
  personRating: number;
  personMessage: string;    
}

export type TestimonialResponse = ITestimonial[];
