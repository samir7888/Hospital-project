import React from 'react';

// Section Components
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Services from '../components/sections/Services';
import Specialists from '../components/sections/Specialists';
import NewsEvents from '../components/sections/NewsEvents';
import Testimonials from '../components/sections/Testimonials';
import Appointment from '@/components/sections/Appoinment';


const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <Specialists />
      <NewsEvents />
      <Testimonials />
      <Appointment />
    </>
  );
};

export default Home;