export interface NewsEvent {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  time?: string;
  type: 'news' | 'event';
  category: 'Awards' | 'Community' | 'Facilities' | 'Staff' | 'Education';
}


export   const newsEventsData: NewsEvent[] = [
  {
    id: 1,
    type: "news",
    title: "GastroCare Hospital Receives National Excellence Award",
    date: "April 15, 2025",
    image:
      "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt:
      "GastroCare Hospital has been recognized for its outstanding patient care and medical innovation with the prestigious National Healthcare Excellence Award.",
    category: "Awards",
  },
  {
    id: 2,
    type: "event",
    title: "Free Community Health Screening Day",
    date: "May 10, 2025",
    time: "9:00 AM - 3:00 PM",
    image:
      "https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt:
      "Join us for a day of free health screenings including blood pressure, diabetes, and cholesterol checks. Our medical professionals will be available to answer your health questions.",
    category: "Community",
  },
  {
    id: 3,
    type: "news",
    title: "New Cardiology Center Opening Next Month",
    date: "April 3, 2025",
    image: "https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt:
      "GastroCare Hospital is proud to announce the opening of our state-of-the-art Cardiology Center, featuring the latest diagnostic and treatment technologies.",
    category: "Facilities",
  },
  {
    id: 4,
    type: "event",
    title: "Blood Donation Drive",
    date: "April 28, 2025",
    time: "10:00 AM - 4:00 PM",
    image:
      "https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt:
      "Help save lives by donating blood at our upcoming blood drive. Each donation can save up to three lives!",
    category: "Community",
  },
  {
    id: 5,
    type: "news",
    title: "Dr. Sarah Johnson Joins Oncology Department",
    date: "March 30, 2025",
    image: "https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt:
      "We are pleased to welcome Dr. Sarah Johnson, a renowned oncologist, to our medical team. Dr. Johnson brings over 15 years of experience in cancer treatment and research.",
    category: "Staff",
  },
  {
    id: 6,
    type: "event",
    title: "Diabetes Management Workshop",
    date: "May 15, 2025",
    time: "2:00 PM - 4:00 PM",
    image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt:
      "Learn practical strategies for managing diabetes with our expert nutritionists and endocrinologists. Registration required.",
    category: "Education",
  },
];