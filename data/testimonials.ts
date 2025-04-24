export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  image: string;
  rating: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Robert Thompson",
    quote: "My experience at GastroCare Hospital was exceptional. The staff was attentive and Dr. Johnson's expertise in cardiac care saved my life.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5
  },
  {
    id: 2,
    name: "Maria Garcia",
    quote: "After struggling with migraines for years, Dr. Chen provided a treatment plan that has significantly improved my quality of life.",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5
  },
  {
    id: 3,
    name: "David Williams",
    quote: "The pediatric department at GastroCare Hospital is outstanding. Dr. Rodriguez made my daughter feel comfortable during her entire stay.",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4
  }
];