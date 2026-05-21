import authImage from "../assets/mobile-care-auth.png";

export const showcaseProducts = [
  {
    _id: "demo-premium-screen",
    name: "Premium Display Replacement",
    category: "Repair Parts",
    brand: "MobileCare Select",
    price: 4599,
    discountPrice: 3999,
    stock: 12,
    image: authImage,
    description:
      "High-clarity display replacement with touch testing, brightness calibration, and post-repair quality checks.",
    highlights: ["Original-grade finish", "Touch tested", "Same-day fitment"],
  },
  {
    _id: "demo-fast-charger",
    name: "65W Fast Charging Kit",
    category: "Accessories",
    brand: "VoltMax",
    price: 2499,
    discountPrice: 1899,
    stock: 24,
    image: authImage,
    description:
      "Compact fast charger with braided Type-C cable, heat protection, and support for daily heavy use.",
    highlights: ["65W output", "Braided cable", "Heat protected"],
  },
  {
    _id: "demo-protection-pack",
    name: "Device Protection Pack",
    category: "Protection",
    brand: "ShieldPro",
    price: 1499,
    discountPrice: 999,
    stock: 31,
    image: authImage,
    description:
      "Tempered glass, camera lens guard, and soft-touch back case installed cleanly by our service desk.",
    highlights: ["Glass installed", "Camera guard", "Case included"],
  },
  {
    _id: "demo-battery-care",
    name: "Battery Health Service",
    category: "Service",
    brand: "MobileCare Lab",
    price: 2999,
    discountPrice: 2499,
    stock: 8,
    image: authImage,
    description:
      "Battery replacement package with diagnostics, safe installation, charging test, and performance report.",
    highlights: ["Diagnostics", "Safe install", "Health report"],
  },
  {
    _id: "demo-audio-kit",
    name: "Wireless Audio Kit",
    category: "Accessories",
    brand: "SoundLite",
    price: 3299,
    discountPrice: 2699,
    stock: 18,
    image: authImage,
    description:
      "Low-latency wireless earbuds with quick pairing, long battery life, and a pocket charging case.",
    highlights: ["Quick pairing", "Long battery", "Clear calls"],
  },
  {
    _id: "demo-care-plan",
    name: "Annual Care Plan",
    category: "Care Plan",
    brand: "MobileCare Hub",
    price: 1999,
    discountPrice: 1499,
    stock: 50,
    image: authImage,
    description:
      "Priority service plan with cleaning, diagnostics, service reminders, and faster queue handling.",
    highlights: ["Priority queue", "Cleaning", "Diagnostics"],
  },
];

export const serviceHighlights = [
  {
    title: "Screen and touch repair",
    text: "Display, touch, glass, and brightness issues handled with careful testing before delivery.",
  },
  {
    title: "Battery and charging",
    text: "Battery health checks, charging port cleaning, adapter testing, and replacement guidance.",
  },
  {
    title: "Water and performance care",
    text: "Moisture inspection, speaker checks, heating diagnosis, software cleanup, and performance tune-ups.",
  },
];
