export interface CompanyProfile {
  legalName: string;
  brandName: string;
  foundingYear: number;
  slogan: string;
  tagline: string;
  statement: string;
  leadership: {
    president: string;
    directors: string[];
  };
  contact: {
    packagingTel: string;
    headOfficeTel: string;
    fax: string;
    email: string;
    corporateEmail: string;
    poBox: string;
    address: string;
    industrialArea: string;
    city: string;
    country: string;
    fullLocationString: string;
    workingHours: string;
  };
  metrics: {
    awardsCount: number;
    machinesCount: number;
    enterpriseDeliveries: number;
    teamExperts: number;
    sustainabilityPercent: number;
    countriesServed: number;
  };
  portals: {
    clientLogin: string;
    brochurePdf: string;
  };
  social: {
    whatsapp: string;
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  coreValues: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const companyData: CompanyProfile = {
  legalName: "Arifa Packing & Packaging LLC",
  brandName: "Arifa Pack",
  foundingYear: 1997,
  slogan: "Think Bigger, Think Different, Be Better",
  tagline: "Sustainable Packaging Solutions for Global Food & Hospitality Leaders",
  statement:
    "Specializing in high-precision aluminium food containers, catering platters, commercial foil rolls, and microwave-safe packaging engineered with strict hygiene and ethical manufacturing standards.",
  leadership: {
    president: "Mr. Sulthanul Arifeen",
    directors: [
      "Mr. Hamdhan Sulthanul Arifeen",
      "Mr. Harun Sultanul Arifeen",
      "Mr. Hanif Sulthanul Arifeen",
    ],
  },
  contact: {
    packagingTel: "+971 6 7485384",
    headOfficeTel: "+971 6 747 7061",
    fax: "+971 6 7485385",
    email: "info@arifapack.com",
    corporateEmail: "info@arifagroup.com",
    poBox: "P.O. Box 7526",
    address: "Al Jurf Industrial Area 2",
    industrialArea: "Al Jurf 2",
    city: "Ajman",
    country: "United Arab Emirates",
    fullLocationString: "Al Jurf Industrial Area 2, P.O. Box 7526, Ajman, United Arab Emirates",
    workingHours: "Monday – Saturday: 8:00 AM – 6:00 PM (GST)",
  },
  metrics: {
    awardsCount: 143,
    machinesCount: 780,
    enterpriseDeliveries: 675,
    teamExperts: 457,
    sustainabilityPercent: 85,
    countriesServed: 42,
  },
  portals: {
    clientLogin: "https://shop.sultanhhh.com/login",
    brochurePdf: "https://www.arifapack.com/images/Arifapack-profile.pdf",
  },
  social: {
    whatsapp: "https://wa.me/97167477061",
    facebook: "https://www.facebook.com/arifapack/",
    instagram: "https://www.instagram.com/arifapack/",
    twitter: "https://twitter.com/arifapack",
    linkedin: "https://www.linkedin.com/company/arifa-packing-packaging/",
  },
  coreValues: [
    {
      title: "Quality Standards",
      description:
        "Every batch undergoes micrometer gauge verification, rim seal integrity inspection, and food-grade metallurgical purity analysis.",
      icon: "ShieldCheck",
    },
    {
      title: "Engineering Innovation",
      description:
        "Continuous investment in high-speed German and Swiss conversion presses, robotic stackers, and automated multi-cavity tooling.",
      icon: "Cpu",
    },
    {
      title: "Circular Sustainability",
      description:
        "100% recyclable aluminium alloys that can be remelted infinitely without property loss, reducing energy demand by 95% vs virgin ore.",
      icon: "Recycle",
    },
    {
      title: "Global Supply Chain",
      description:
        "Strategic proximity to major UAE sea ports (Jebel Ali, Port Khalid) ensuring prompt container freight across the Middle East, Africa, Europe, and Asia.",
      icon: "Globe",
    },
  ],
};
