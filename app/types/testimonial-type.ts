


export interface ITestimonial {
  id: string;
  personName: string;
  personCompany: string;
  personRating: number;
  personMessage: string; 
  
  personImage: {
    id: string;
    url: string;
  } | null;
}

export type TestimonialResponse = ITestimonial[];
