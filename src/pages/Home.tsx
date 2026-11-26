import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import PropertyMap from "../components/PropertyMap";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertyCategories from "../components/PropertyCategories";
import WhyDitiHomes from "../components/WhyDitiHomes";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

import { useProperties } from "../context/PropertyContext";

function Home() {
  const navigate = useNavigate();
  const { properties } = useProperties();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [purpose, setPurpose] = useState("");

  function handleViewAll() {
    setLocation("");
    setPropertyType("");
    setPurpose("");
    navigate("/properties");
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Property Search */}
      <section className="relative z-20 bg-(--dh-bg) px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SearchBar
            location={location}
            setLocation={setLocation}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            purpose={purpose}
            setPurpose={setPurpose}
          />
        </div>
      </section>

      {/* Property Discovery Map */}
      <section className="bg-(--dh-bg) px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-(--dh-gold)">
              Explore locations
            </p>

            <h2 className="text-2xl font-bold text-(--dh-white) sm:text-3xl">
              Discover Properties on the Map
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-(--dh-muted) sm:text-base">
              Explore available properties across different locations and find
              the right place for your next move.
            </p>
          </div>

          <PropertyMap properties={properties} height="450px" />
        </div>
      </section>

      {/* Featured Properties */}
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
