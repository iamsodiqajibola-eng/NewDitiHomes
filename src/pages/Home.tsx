import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyCategories from "../components/PropertyCategories";
import WhyDitiHomes from "../components/WhyDitiHomes";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [purpose, setPurpose] = useState("");

  function clearSearch() {
    setLocation("");
    setPropertyType("");
    setPurpose("");
  }

  function handleViewAll() {
    clearSearch();
    navigate("/properties");
  }

  return (
    <>
      <Navbar />

      <Hero
        location={location}
        setLocation={setLocation}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        purpose={purpose}
        setPurpose={setPurpose}
      />

      <FeaturedProperties
        location={location}
        propertyType={propertyType}
        purpose={purpose}
        onViewAll={handleViewAll}
      />

      <PropertyCategories />

      <WhyDitiHomes />

      <CTA />

      <Footer />
    </>
  );
}

export default Home;
