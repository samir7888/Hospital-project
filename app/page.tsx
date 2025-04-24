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

import Head from 'next/head';
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
      <FAQ />
    </>
  );
};






export default Home;
