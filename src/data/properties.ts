export type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  purpose: "For Sale" | "For Rent" | "Shortlet";
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  images?: string[];
  description: string;
  features: string[];
};

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦85,000,000",
    type: "Duplex",
    purpose: "For Sale",
    bedrooms: 4,
    bathrooms: 4,
    area: "450 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A beautifully designed modern duplex located in the heart of Lekki Phase 1. This spacious home offers comfortable living spaces, quality finishes and a great environment for families.",
    features: [
      "4 Spacious Bedrooms",
      "4 Bathrooms",
      "Modern Kitchen",
      "Parking Space",
      "Gated Estate",
      "24/7 Security",
    ],
  },
  {
    id: 2,
    title: "Luxury 3 Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦8,500,000 / year",
    type: "Apartment",
    purpose: "For Rent",
    bedrooms: 3,
    bathrooms: 3,
    area: "220 sqm",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A stylish and comfortable three-bedroom apartment in Victoria Island, offering modern interiors, spacious rooms and convenient access to major parts of Lagos.",
    features: [
      "3 Bedrooms",
      "3 Bathrooms",
      "Fitted Kitchen",
      "Parking Space",
      "24/7 Security",
      "Serviced Estate",
    ],
  },
  {
    id: 3,
    title: "Contemporary 5 Bedroom Home",
    location: "Ibadan, Oyo",
    price: "₦65,000,000",
    type: "House",
    purpose: "For Sale",
    bedrooms: 5,
    bathrooms: 5,
    area: "600 sqm",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A spacious contemporary home designed for comfortable family living. The property combines modern architecture with generous indoor and outdoor spaces.",
    features: [
      "5 Bedrooms",
      "5 Bathrooms",
      "Modern Kitchen",
      "Large Compound",
      "Parking Space",
      "Secure Environment",
    ],
  },
  {
    id: 4,
    title: "Modern 2 Bedroom Apartment",
    location: "Ikeja, Lagos",
    price: "₦4,500,000 / year",
    type: "Apartment",
    purpose: "For Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: "160 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A modern two-bedroom apartment in Ikeja with a clean interior, comfortable living spaces and easy access to businesses, restaurants and transportation.",
    features: [
      "2 Bedrooms",
      "2 Bathrooms",
      "Modern Kitchen",
      "Parking Space",
      "Good Road Access",
      "Secure Environment",
    ],
  },
  {
    id: 5,
    title: "Premium 4 Bedroom Home",
    location: "Ajah, Lagos",
    price: "₦72,000,000",
    type: "House",
    purpose: "For Sale",
    bedrooms: 4,
    bathrooms: 4,
    area: "500 sqm",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A premium four-bedroom home in Ajah featuring modern architecture, spacious rooms and a peaceful residential environment.",
    features: [
      "4 Bedrooms",
      "4 Bathrooms",
      "Fitted Kitchen",
      "Spacious Compound",
      "Parking Space",
      "Gated Community",
    ],
  },
  {
    id: 6,
    title: "Serviced 3 Bedroom Apartment",
    location: "Yaba, Lagos",
    price: "₦6,000,000 / year",
    type: "Apartment",
    purpose: "For Rent",
    bedrooms: 3,
    bathrooms: 3,
    area: "200 sqm",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A well-finished serviced apartment in Yaba, ideal for professionals and families looking for comfort and convenient access to the mainland.",
    features: [
      "3 Bedrooms",
      "3 Bathrooms",
      "Serviced Apartment",
      "Parking Space",
      "Security",
      "Good Location",
    ],
  },
  {
    id: 7,
    title: "Residential Land",
    location: "Ibadan, Oyo",
    price: "₦18,000,000",
    type: "Land",
    purpose: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: "600 sqm",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A residential land opportunity in a developing and accessible area of Ibadan, suitable for building a family home or investment property.",
    features: [
      "600 sqm",
      "Residential Land",
      "Good Road Access",
      "Developing Area",
      "Suitable for Building",
      "Investment Opportunity",
    ],
  },
  {
    id: 8,
    title: "Luxury Shortlet Apartment",
    location: "Lekki, Lagos",
    price: "₦120,000 / night",
    type: "Apartment",
    purpose: "Shortlet",
    bedrooms: 2,
    bathrooms: 2,
    area: "180 sqm",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A beautiful shortlet apartment in Lekki designed for comfortable stays, weekend getaways, business trips and holidays.",
    features: [
      "2 Bedrooms",
      "2 Bathrooms",
      "Fully Furnished",
      "Wi-Fi",
      "Parking Space",
      "24/7 Security",
    ],
  },
];
