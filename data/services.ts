export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
  }
  
  export const servicesData: Service[] = [
    {
      id: 1,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response teams and state-of-the-art equipment for critical care situations.",
      icon: "stethoscope"
    },
    {
      id: 2,
      title: "Specialized Surgery",
      description: "Advanced surgical procedures performed by expert surgeons in minimally invasive and traditional surgical techniques.",
      icon: "scissors"
    },
    {
      id: 3,
      title: "Laboratory Services",
      description: "Comprehensive diagnostic testing with quick, accurate results to help diagnose and monitor health conditions.",
      icon: "test-tube"
    },
    {
      id: 4,
      title: "Maternity Care",
      description: "Complete maternity care from prenatal to postpartum, with comfortable delivery rooms and expert OB/GYN services.",
      icon: "baby"
    },
    {
      id: 5,
      title: "Preventive Health",
      description: "Proactive health screenings and wellness programs designed to prevent illness and promote long-term health.",
      icon: "shield"
    },
    {
      id: 6,
      title: "Rehabilitation",
      description: "Physical, occupational, and speech therapy services to help patients recover from injury, surgery, or illness.",
      icon: "activity"
    }
  ];