import React from "react";
// Section Components
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Services from "../components/sections/Services";
import Specialists from "../components/sections/Specialists";
import Testimonials from "../components/sections/Testimonials";
import Appointment from "@/components/sections/Appointment";
import FAQ from "@/components/sections/ServerFaqs";
import NewsEventsPage from "@/components/sections/ServerNewsAndEvents";

const Home: React.FC = () => {
  return (
    <div className="">
      <Hero />
      <Specialists />
      <Features />
      <Services />
      <NewsEventsPage />
      <Testimonials />
      <Appointment />
      <FAQ />
    </div>
  );
};

export default Home;
