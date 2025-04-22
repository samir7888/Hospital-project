export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    education: string;
    image: string;
    experience: number;
  }
  
  export const doctorsData: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      education: "MD, Harvard Medical School",
      image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600",
      experience: 12
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      education: "MD, Johns Hopkins University",
      image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600",
      experience: 15
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      education: "MD, Stanford University",
      image: "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=600",
      experience: 10
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      education: "MD, Yale University",
      image: "https://images.pexels.com/photos/5207065/pexels-photo-5207065.jpeg?auto=compress&cs=tinysrgb&w=600",
      experience: 14
    }
  ];