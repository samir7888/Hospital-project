export interface NewsEvent {
    id: number;
    title: string;
    date: string;
    summary: string;
    image: string;
    category: 'news' | 'event';
  }
  
  export const newsEventsData: NewsEvent[] = [
    {
      id: 1,
      title: "New Cardiac Wing Opening",
      date: "June 15, 2025",
      summary: "MedCare Hospital is proud to announce the opening of our state-of-the-art cardiac care wing, featuring the latest in diagnostic and treatment technology.",
      image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: 'news'
    },
    {
      id: 2,
      title: "Free Health Screening Day",
      date: "July 10, 2025",
      summary: "Join us for a day of complimentary health screenings including blood pressure, cholesterol, and diabetes testing. Registration required.",
      image: "https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: 'event'
    },
    {
      id: 3,
      title: "Dr. Rodriguez Receives Excellence Award",
      date: "May 28, 2025",
      summary: "Our very own Dr. Emily Rodriguez has been recognized with the National Pediatric Excellence Award for her contributions to children's healthcare.",
      image: "https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: 'news'
    }
  ];