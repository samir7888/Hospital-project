import React from "react";
// Section Components
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Services from "../components/sections/Services";
import Specialists from "../components/sections/Specialists";
import NewsEvents from "../components/sections/NewsEvents";
import Testimonials from "../components/sections/Testimonials";
import Appointment from "@/components/sections/Appoinment";
import FAQ from "@/components/sections/FAQ";


const Home: React.FC = () => {

  return (
    <>

      <Hero />
      <Specialists />
      <Features />
      <Services />
      <NewsEvents />
      <Testimonials />
      <Appointment />
      <FAQ />
    </>
  );
};






export default Home;
