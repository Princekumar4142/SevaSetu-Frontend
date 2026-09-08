/**
 * Comprehensive Catalog Data for all service categories across SevaSetu AI.
 * Tailored for Agriculture, FoodTech & Rural Development Cooperatives,
 * while retaining household and professional services under Extra Features.
 */

// ── Core Skilled Cooperative Federation Workforce (10 Essential Trades) ───
export const COOP_SKILLED_SERVICES = [
  { id: "electricians", label: "Electricians", icon: "bolt", badge: "POPULAR" },
  { id: "plumbers", label: "Plumbers", icon: "plumbing", badge: "POPULAR" },
  { id: "carpenters", label: "Carpenters", icon: "carpenter", badge: "CO-OP" },
  { id: "painters", label: "Painters", icon: "format_paint", badge: "POPULAR" },
  { id: "domestic-helpers", label: "Domestic Helpers", icon: "home_work", badge: "VERIFIED" },
  { id: "caregivers", label: "Caregivers", icon: "elderly", badge: "CERTIFIED" },
  { id: "drivers", label: "Drivers", icon: "directions_car", badge: "VERIFIED" },
  { id: "gardeners", label: "Gardeners", icon: "yard", badge: "POPULAR" },
  { id: "cleaners", label: "Cleaners", icon: "cleaning_services", badge: "CO-OP" },
  { id: "technicians", label: "Technicians", icon: "build", badge: "EXPERT" },
];

// ── Primary Theme: Agriculture, FoodTech & Rural Development ───────────────
export const AGRI_MECHANIZATION_SERVICES = [
  { id: "tractor-operator", label: "Tractor & Harvester Operator", icon: "agriculture", badge: "POPULAR" },
  { id: "solar-pump-repair", label: "Solar Pump & Tube-Well Tech", icon: "solar_power", badge: "TATKAL" },
  { id: "agri-drone-spray", label: "Agri-Drone Sprayer (Nano Urea/Pesticide)", icon: "flight", badge: "AI TECH" },
  { id: "soil-testing-compost", label: "Soil Testing & Bio-Compost Helper", icon: "compost" },
  { id: "drip-irrigation-fix", label: "Drip & Micro-Irrigation Technician", icon: "water_drop" },
];

export const FOODTECH_PROCESSING_SERVICES = [
  { id: "cold-storage-tech", label: "Cold Storage Chiller Technician", icon: "ac_unit", badge: "URGENT" },
  { id: "flour-oil-mill-op", label: "Atta, Dal & Oil Mill Operator", icon: "factory" },
  { id: "grain-sorting-grading", label: "Grain Sorter & Seed Grader", icon: "filter_alt", badge: "CO-OP" },
  { id: "agro-packaging-labor", label: "FPO Packaging & Quality Inspector", icon: "inventory_2" },
  { id: "jaggery-spice-proc", label: "Jaggery & Spice Processing Expert", icon: "local_dining" },
];

export const RURAL_INFRASTRUCTURE_SERVICES = [
  { id: "panchayat-sanitation", label: "Gram Panchayat Cleanliness Drive", icon: "cleaning_services", badge: "COMMUNITY" },
  { id: "rural-solar-rooftop", label: "Rural Solar Rooftop Installation", icon: "wb_sunny" },
  { id: "water-pipeline-repair", label: "Piped Drinking Water & Handpump Fix", icon: "plumbing" },
  { id: "rural-mason-biogas", label: "Rural Mason & Gobar Gas / Bio-digester", icon: "foundation" },
  { id: "rural-electrician", label: "Farm & Village Electrification", icon: "bolt" },
];

export const DAIRY_LIVESTOCK_SERVICES = [
  { id: "paravet-health-check", label: "Paravet / Pashu Sakhi (Health & AI)", icon: "pets", badge: "CERTIFIED" },
  { id: "dairy-farm-helper", label: "Cooperative Dairy Milking & Caretaker", icon: "water_damage" },
  { id: "poultry-goat-assistant", label: "Poultry & Goat Farm Assistant", icon: "egg" },
  { id: "cattle-feed-silage", label: "Silage Making & Fodder Specialist", icon: "grass" },
];

export const RURAL_EMERGENCY_SERVICES = [
  { id: "emergency-motor-burnout", label: "Burnt Tube-Well Motor (45-Min Tatkal)", icon: "electric_bolt", badge: "EMERGENCY" },
  { id: "emergency-water-burst", label: "Farm Irrigation Mainline Burst", icon: "emergency", badge: "45 MIN" },
  { id: "emergency-paravet", label: "Urgent Livestock Medical Care", icon: "medical_services", badge: "CRITICAL" },
];

export const INSTITUTIONAL_BULK_SERVICES = [
  { id: "fpo-harvest-team", label: "FPO Seasonal Harvest Crew (5-15 Workers)", icon: "groups", badge: "BULK B2B" },
  { id: "mandi-loading-crew", label: "Mandi Grain Loading & Storage Team", icon: "warehouse", badge: "CONTRACT" },
  { id: "panchayat-drainage-gang", label: "Panchayat Desilting & Drainage Squad", icon: "engineering", badge: "PANCHAYAT" },
];

// ── Some Extra Features: Additional Household & Urban Services ─────────────
export const PERSONAL_SERVICES = [
  { id: "salon-women", label: "Salon for Women", icon: "self_care" },
  { id: "spa-women", label: "Spa for Women", icon: "spa" },
  { id: "hair-skin", label: "Hair & Skin", icon: "face_retouching_natural", badge: "NEW" },
  { id: "salon-men", label: "Salon for Men", icon: "face" },
  { id: "manicure-pedicure", label: "Manicure & Pedicure", icon: "spa" },
];


export const HOME_SERVICES = [
  { id: "electrical-plumbing", label: "Electrical & Plumbing", icon: "plumbing" },
  { id: "cleaning-pest-1", label: "Cleaning & Pest", icon: "cleaning_services" },
  { id: "home-repairs", label: "Home repairs", icon: "engineering" },
  { id: "home-painting", label: "Home Painting", icon: "format_paint", badge: "SALE" },
  { id: "ac-repair", label: "AC & Appliance Repair", icon: "ac_unit" },
];

export const TRENDING_SERVICES = [
  { id: "bleach-detan", label: "Bleach & Detan", icon: "brightness_6" },
  { id: "tv-installing", label: "TV Installing", icon: "tv" },
  { id: "ac-repair", label: "AC Repair", icon: "ac_unit" },
  { id: "hair-care", label: "Hair care", icon: "content_cut" },
  { id: "head-massage", label: "Head Massage", icon: "spa" },
];

export const PROFESSIONAL_SERVICES = [
  { id: "ca-accounting", label: "CA & Accounting", icon: "account_balance" },
  { id: "legal-advisor", label: "Legal Advisor", icon: "gavel" },
  { id: "tax-consultant", label: "Tax Consultant", icon: "receipt_long" },
  { id: "insurance", label: "Insurance", icon: "health_and_safety" },
  { id: "interior-design", label: "Interior Design", icon: "design_services" },
];

export const HEALTH_WELLNESS_SERVICES = [
  { id: "physiotherapy", label: "Physiotherapy", icon: "physical_therapy" },
  { id: "nursing-care", label: "Nursing Care", icon: "medical_services" },
  { id: "elder-care", label: "Elder Care", icon: "elderly" },
  { id: "lab-tests", label: "Lab Tests", icon: "biotech" },
  { id: "yoga-trainer", label: "Yoga Trainer", icon: "self_improvement" },
];

export const EVENT_SERVICES = [
  { id: "event-planning", label: "Event Planning", icon: "celebration" },
  { id: "catering", label: "Catering", icon: "restaurant" },
  { id: "photography", label: "Photography", icon: "photo_camera" },
  { id: "decoration", label: "Decoration", icon: "window" },
  { id: "dj-music", label: "DJ & Music", icon: "music_note" },
];

export const CATEGORIES = {
  // ── 1. Agriculture & Farm Mechanization ────────────────────────────────
  "agri-mechanization": {
    id: "agri-mechanization",
    name: "Agri & Farm Mechanization",
    tag: "Certified Cooperative Operators & Mechanics",
    rating: 4.93,
    ratingCount: "42K",
    categoryType: "Agriculture & Mechanization",
    icon: "agriculture",
    chips: [
      { id: "tractor", label: "Tractor & Harvester", icon: "agriculture" },
      { id: "solar-pump", label: "Solar Pump & Irrigation", icon: "solar_power" },
      { id: "drone", label: "Agri-Drone Sprayer", icon: "flight" },
      { id: "soil-health", label: "Soil & Compost", icon: "compost" },
    ],
    sections: [
      {
        id: "tractor-machinery",
        title: "Tractor & Machinery Operations",
        services: [
          {
            id: "am-1",
            name: "Certified Tractor Operator (Daily / Sowing & Tillage)",
            icon: "agriculture",
            rating: 4.94,
            ratingCount: "18k",
            durationMins: 480,
            price: 799,
            originalPrice: 999,
            desc: "Experienced cooperative tractor driver for rotavator, disc plough, and sowing operations with verified license",
          },
          {
            id: "am-2",
            name: "Combine Harvester Operation & Field Tech",
            icon: "agriculture",
            rating: 4.91,
            ratingCount: "12k",
            durationMins: 480,
            price: 999,
            originalPrice: 1299,
            desc: "Expert harvester operator for wheat, paddy, and mustard with crop residue management check",
          },
          {
            id: "am-3",
            name: "Laser Land Leveller Operation & Calibrate",
            icon: "construction",
            rating: 4.88,
            ratingCount: "6k",
            durationMins: 360,
            price: 649,
            desc: "Precision laser guided land levelling operator to save up to 30% irrigation water",
          },
        ],
      },
      {
        id: "solar-irrigation",
        title: "Solar Pump & Irrigation Technology",
        services: [
          {
            id: "am-4",
            name: "Solar Submersible Pump Servicing & Controller Diagnostic",
            icon: "solar_power",
            rating: 4.96,
            ratingCount: "21k",
            durationMins: 90,
            price: 499,
            originalPrice: 699,
            desc: "Complete testing of PM-KUSUM solar panels, VFD inverter, MPPT controller, and pump motor",
          },
          {
            id: "am-5",
            name: "Drip & Sprinkler Micro-Irrigation Emitter Flush & Fix",
            icon: "water_drop",
            rating: 4.85,
            ratingCount: "9k",
            durationMins: 120,
            price: 399,
            desc: "De-clogging drippers, acid flush check, lateral line joints repair, and pressure filter cleaning",
          },
        ],
      },
      {
        id: "drone-soil",
        title: "Smart Agriculture & Agri-Drones",
        services: [
          {
            id: "am-6",
            name: "Agri-Drone Nano Urea / Bio-Pesticide Spray (Per Acre)",
            icon: "flight",
            rating: 4.98,
            ratingCount: "14k",
            durationMins: 25,
            price: 299,
            originalPrice: 399,
            desc: "DGCA-certified cooperative drone pilot for ultra-fast, uniform 1-acre liquid fertilizer/pest spray",
          },
          {
            id: "am-7",
            name: "Soil Sample Collection & Digital Soil Health Card",
            icon: "compost",
            rating: 4.89,
            ratingCount: "8k",
            durationMins: 45,
            price: 199,
            desc: "Scientific zig-zag field soil core sampling, NPK/pH parameter testing through affiliated cooperative lab",
          },
        ],
      },
    ],
  },

  // ── 2. FoodTech, Agro-Processing & Storage ──────────────────────────────
  "foodtech-processing": {
    id: "foodtech-processing",
    name: "FoodTech, Agro-Processing & Storage",
    tag: "Trained FoodTech & Warehouse Cooperative Technicians",
    rating: 4.91,
    ratingCount: "28K",
    categoryType: "FoodTech & Processing",
    icon: "factory",
    chips: [
      { id: "cold-chain", label: "Cold Storage", icon: "ac_unit" },
      { id: "milling", label: "Milling & Expeller", icon: "factory" },
      { id: "grading", label: "Grain Sorter", icon: "filter_alt" },
      { id: "packaging", label: "FPO Packaging", icon: "inventory_2" },
    ],
    sections: [
      {
        id: "cold-storage",
        title: "Cold Chain & Warehouse Maintenance",
        services: [
          {
            id: "fp-1",
            name: "Cold Storage Ammonia / Freon Chiller Plant Technician",
            icon: "ac_unit",
            rating: 4.93,
            ratingCount: "11k",
            durationMins: 120,
            price: 699,
            originalPrice: 899,
            desc: "Comprehensive compressor pressure, condenser coil, refrigerant level, and defrost thermostat tune-up",
          },
          {
            id: "fp-2",
            name: "Grain Warehouse Aeration & Moisture Testing",
            icon: "warehouse",
            rating: 4.87,
            ratingCount: "7k",
            durationMins: 90,
            price: 449,
            desc: "Moisture meter testing for wheat/paddy stacks, exhaust ventilation audit, and mold prevention protocol",
          },
        ],
      },
      {
        id: "milling-processing",
        title: "Agro-Processing & Value Addition",
        services: [
          {
            id: "fp-3",
            name: "Commercial Flour & Dal Mill Mechanic & Stone Dressing",
            icon: "factory",
            rating: 4.9,
            ratingCount: "9k",
            durationMins: 150,
            price: 549,
            desc: "Emery stone balance redressal, V-belt alignment, sieve mesh replacement for rural processing units",
          },
          {
            id: "fp-4",
            name: "Cold-Pressed Oil Expeller (Kachi Ghani) Setup & Tuning",
            icon: "local_dining",
            rating: 4.92,
            ratingCount: "6k",
            durationMins: 120,
            price: 599,
            desc: "Worm shaft clearance calibration, seed pre-conditioning check for maximum oil recovery yield",
          },
          {
            id: "fp-5",
            name: "Electronic Grain Sorter & Seed Grading Technician",
            icon: "filter_alt",
            rating: 4.95,
            ratingCount: "8k",
            durationMins: 90,
            price: 499,
            desc: "Optical camera sensor cleaning, air ejector calibration, and foreign matter seed separation check",
          },
        ],
      },
    ],
  },

  // ── 3. Rural Infrastructure & Panchayat Services ────────────────────────
  "rural-infrastructure": {
    id: "rural-infrastructure",
    name: "Rural Infrastructure & Community Maintenance",
    tag: "Panchayat & Rural Development Cooperative Workforce",
    rating: 4.89,
    ratingCount: "36K",
    categoryType: "Rural Infrastructure",
    icon: "foundation",
    chips: [
      { id: "sanitation", label: "Panchayat Sanitation", icon: "cleaning_services" },
      { id: "solar-rooftop", label: "Solar Rooftop", icon: "wb_sunny" },
      { id: "water-pipe", label: "Drinking Water Pipe", icon: "plumbing" },
      { id: "biogas", label: "Biogas & Mason", icon: "foundation" },
    ],
    sections: [
      {
        id: "panchayat-water",
        title: "Gram Panchayat Sanitation & Drinking Water",
        services: [
          {
            id: "ri-1",
            name: "Panchayat Community Drain Desilting & Lime Bleaching",
            icon: "cleaning_services",
            rating: 4.91,
            ratingCount: "16k",
            durationMins: 240,
            price: 599,
            desc: "Deep drain sludge clearance, mosquito larva spray, and eco-friendly bleaching powder sanitization",
          },
          {
            id: "ri-2",
            name: "Village Piped Water Supply (Jal Jeevan) Pipe Leak Repair",
            icon: "plumbing",
            rating: 4.88,
            ratingCount: "14k",
            durationMins: 90,
            price: 349,
            desc: "HDPE/GI pipeline underground leak detection, electrofusion coupler jointing, and tap standpost fix",
          },
          {
            id: "ri-3",
            name: "India Mark II Handpump Cylinder & Washer Overhaul",
            icon: "water_drop",
            rating: 4.86,
            ratingCount: "12k",
            durationMins: 120,
            price: 399,
            desc: "Extraction of riser pipe, replacement of leather bucket washer, check valve, and chain repair",
          },
        ],
      },
      {
        id: "rural-energy",
        title: "Rural Energy & Sustainable Masons",
        services: [
          {
            id: "ri-4",
            name: "Village Rooftop Solar Panel Cleaning & Inverter Rewiring",
            icon: "wb_sunny",
            rating: 4.94,
            ratingCount: "19k",
            durationMins: 60,
            price: 299,
            desc: "De-ionized water soft sponge panel de-dusting, MC4 connector tightening, earthing continuity test",
          },
          {
            id: "ri-5",
            name: "Rural Mason & Biogas (Gobar Gas) Dome Plaster & Seal",
            icon: "foundation",
            rating: 4.92,
            ratingCount: "8k",
            durationMins: 180,
            price: 549,
            desc: "Gas leakage crack sealing with waterproof slurry, slurry mixer blade greasing, burner nozzle clean",
          },
        ],
      },
    ],
  },

  // ── 4. Dairy, Livestock & Paravet Services ──────────────────────────────
  "dairy-livestock": {
    id: "dairy-livestock",
    name: "Dairy, Livestock & Paravet Services",
    tag: "Certified Paravet Technicians & Pashu Sakhis",
    rating: 4.95,
    ratingCount: "51K",
    categoryType: "Animal Husbandry",
    icon: "pets",
    chips: [
      { id: "health-check", label: "Paravet Health Check", icon: "pets" },
      { id: "milking-tech", label: "Milking Tech", icon: "water_damage" },
      { id: "poultry-goat", label: "Poultry & Goat", icon: "egg" },
      { id: "fodder", label: "Silage & Feed", icon: "grass" },
    ],
    sections: [
      {
        id: "paravet-health",
        title: "Livestock Health & Paravet Support",
        services: [
          {
            id: "dl-1",
            name: "Cooperative Paravet Cattle Routine Health Checkup",
            icon: "pets",
            rating: 4.96,
            ratingCount: "25k",
            durationMins: 45,
            price: 249,
            originalPrice: 349,
            desc: "Vitals check, deworming dosage administration, ear tag verification, and clinical diet chart",
          },
          {
            id: "dl-2",
            name: "Artificial Insemination (AI) Support & Breed Record",
            icon: "biotech",
            rating: 4.94,
            ratingCount: "18k",
            durationMins: 35,
            price: 299,
            desc: "Liquid nitrogen cryo-straw handling, hygienic high-conception AI service with cooperative dairy log",
          },
          {
            id: "dl-3",
            name: "Mastitis Screening & Udder Hygiene Protocol",
            icon: "medical_services",
            rating: 4.91,
            ratingCount: "11k",
            durationMins: 30,
            price: 199,
            desc: "California Mastitis Test (CMT) strip screening, teat dip antiseptic treatment, and milking hygiene training",
          },
        ],
      },
      {
        id: "dairy-machines",
        title: "Dairy Farm Mechanization & Fodder",
        services: [
          {
            id: "dl-4",
            name: "Pulsator & Milking Machine Servicing & Sanitization",
            icon: "precision_manufacturing",
            rating: 4.93,
            ratingCount: "9k",
            durationMins: 60,
            price: 349,
            desc: "Vacuum regulator calibration, teat cup silicone liner inspection, and food-grade alkaline wash",
          },
          {
            id: "dl-5",
            name: "Chaff Cutter Blade Sharpening & Silage Bunker Packing",
            icon: "grass",
            rating: 4.88,
            ratingCount: "7k",
            durationMins: 90,
            price: 299,
            desc: "Rotary blade edge grinding, inoculation spray, and anaerobic poly-tarpaulin bunker sealing",
          },
        ],
      },
    ],
  },

  // ── 5. Emergency Farm & Rural Breakdown (Tatkal 45 Min) ─────────────────
  "rural-emergency": {
    id: "rural-emergency",
    name: "Emergency Farm & Rural Breakdown",
    tag: "45-Minute Guaranteed Priority Cooperative Dispatch",
    rating: 4.98,
    ratingCount: "19K",
    categoryType: "Emergency / Tatkal",
    icon: "emergency",
    chips: [
      { id: "motor-burn", label: "Tube-Well Motor", icon: "electric_bolt" },
      { id: "pipe-burst", label: "Mainline Burst", icon: "emergency" },
      { id: "vet-sos", label: "Urgent Paravet", icon: "medical_services" },
    ],
    sections: [
      {
        id: "emergency-farm",
        title: "Critical Agricultural Breakdown Response",
        services: [
          {
            id: "re-1",
            name: "Burnt Submersible / Tube-Well Motor Emergency Dispatch",
            icon: "electric_bolt",
            rating: 4.99,
            ratingCount: "12k",
            durationMins: 60,
            price: 599,
            originalPrice: 799,
            desc: "Instant 45-minute on-site technician response for burnt starter coils, phase failure relay, or motor short",
          },
          {
            id: "re-2",
            name: "Farm Irrigation Mainline High-Pressure Burst Clamp",
            icon: "emergency",
            rating: 4.97,
            ratingCount: "8k",
            durationMins: 45,
            price: 499,
            desc: "Immediate water pump shutoff assistance, split collar repair clamp fitting to save flooded standing crops",
          },
          {
            id: "re-3",
            name: "Emergency Paravet Urgent Care Visit (Bloat / Calving)",
            icon: "medical_services",
            rating: 4.98,
            ratingCount: "14k",
            durationMins: 45,
            price: 449,
            desc: "Rapid emergency visit for acute tympany (bloat), dystocia (difficult calving) first-aid with veterinary helpline",
          },
        ],
      },
    ],
  },

  // ── 6. FPO & Institutional Bulk Booking ─────────────────────────────────
  "institutional-bulk": {
    id: "institutional-bulk",
    name: "FPO & Institutional Bulk Booking",
    tag: "Cooperative Workforce Squads for FPOs & Panchayats",
    rating: 4.94,
    ratingCount: "14K",
    categoryType: "Institutional B2B",
    icon: "groups",
    chips: [
      { id: "harvest-crew", label: "Harvest Crew", icon: "groups" },
      { id: "mandi-loading", label: "Mandi Loading", icon: "warehouse" },
      { id: "panchayat-squad", label: "Panchayat Squad", icon: "foundation" },
    ],
    sections: [
      {
        id: "bulk-contracts",
        title: "Cooperative Labor Squads & Contracts",
        services: [
          {
            id: "ib-1",
            name: "FPO Seasonal Harvest Crew (Squad of 5 Skilled Workers / Day)",
            icon: "groups",
            rating: 4.96,
            ratingCount: "7k",
            durationMins: 480,
            price: 2499,
            originalPrice: 2999,
            desc: "Pre-screened cooperative harvester team for cutting, bundle tying, threshing with full insurance coverage",
          },
          {
            id: "ib-2",
            name: "Mandi Grain Bagging, Weighing & Stacking Crew (5 Workers)",
            icon: "warehouse",
            rating: 4.92,
            ratingCount: "9k",
            durationMins: 480,
            price: 2299,
            desc: "Standard 50kg gunny bag filling, stitching, electronic weighment, and truck loading cooperative labor",
          },
          {
            id: "ib-3",
            name: "Gram Panchayat Cleanliness Drive Squad (4 Workers + Equipment)",
            icon: "engineering",
            rating: 4.94,
            ratingCount: "5k",
            durationMins: 480,
            price: 1999,
            desc: "Full day village public sanitation drive including community ponds cleaning, fogging, and waste segregation",
          },
        ],
      },
    ],
  },

  // ── 25 DEDICATED COOPERATIVE AGRICULTURAL & RURAL SERVICES ────────────────
  // ── 1. Agri & Farm Mechanization ──────────────────────────────────────────
  "tractor-operator": {
    id: "tractor-operator",
    name: "Tractor & Harvester Operator",
    tag: "Certified Cooperative Machinery Drivers",
    rating: 4.95,
    ratingCount: "18.5k",
    categoryType: "Agri & Farm Mechanization",
    icon: "agriculture",
    chips: [
      { id: "ploughing", label: "Ploughing & Sowing", icon: "agriculture" },
      { id: "harvester", label: "Combine Harvester", icon: "agriculture" },
      { id: "trolley", label: "Mandi Haulage", icon: "local_shipping" },
      { id: "leveller", label: "Laser Leveller", icon: "construction" },
    ],
    sections: [
      {
        id: "tractor-ops",
        title: "Tractor & Machinery Operations",
        services: [
          {
            id: "to-1",
            name: "Certified Tractor Driver (Rotavator, Disc Plough, Tillage)",
            icon: "agriculture",
            rating: 4.96,
            ratingCount: "12k",
            durationMins: 480,
            price: 799,
            originalPrice: 999,
            desc: "Experienced cooperative tractor driver for rotavator, disc plough, cultivator, and precision seed drill sowing.",
          },
          {
            id: "to-2",
            name: "Combine Harvester Operator (Wheat, Paddy & Mustard)",
            icon: "agriculture",
            rating: 4.93,
            ratingCount: "8k",
            durationMins: 480,
            price: 999,
            originalPrice: 1299,
            desc: "Full-day professional harvester operator for rapid threshing, grain harvesting, and straw chopper maintenance.",
          },
          {
            id: "to-3",
            name: "Precision Seed Drill & Sowing Machine Driver",
            icon: "agriculture",
            rating: 4.91,
            ratingCount: "5k",
            durationMins: 480,
            price: 699,
            originalPrice: 899,
            desc: "Uniform row spacing and seed placement with tractor-attached seed-cum-fertilizer drill.",
          },
          {
            id: "to-4",
            name: "Tractor Trolley Mandi Haulage Driver",
            icon: "local_shipping",
            rating: 4.90,
            ratingCount: "6k",
            durationMins: 360,
            price: 649,
            originalPrice: 849,
            desc: "Safe farm-to-mandi grain haulage, loading assistance, and tractor trolley transport driver.",
          },
          {
            id: "to-5",
            name: "Laser Land Leveller Precision Calibration & Driver",
            icon: "construction",
            rating: 4.89,
            ratingCount: "4k",
            durationMins: 360,
            price: 699,
            originalPrice: 899,
            desc: "Laser guided land levelling to ensure even water distribution, zero puddling, and 30% water savings.",
          },
        ],
      },
    ],
  },

  "solar-pump-repair": {
    id: "solar-pump-repair",
    name: "Solar Pump & Tube-Well Technician",
    tag: "PM-KUSUM & Co-op Certified Solar Pump Mechanics",
    rating: 4.96,
    ratingCount: "22k",
    categoryType: "Solar & Farm Irrigation",
    icon: "solar_power",
    chips: [
      { id: "pump-diagnostic", label: "Solar Pump Diagnostic", icon: "solar_power" },
      { id: "motor-rewind", label: "Motor Rewinding", icon: "electric_bolt" },
      { id: "borewell-flush", label: "Borewell Sand Flush", icon: "water" },
      { id: "panel-clean", label: "Panel Optimization", icon: "wb_sunny" },
    ],
    sections: [
      {
        id: "solar-pump-ops",
        title: "Solar Pump & Tube-Well Technical Services",
        services: [
          {
            id: "sp-1",
            name: "Solar Submersible Pump Diagnostic & Controller Fix",
            icon: "solar_power",
            rating: 4.97,
            ratingCount: "14k",
            durationMins: 90,
            price: 499,
            originalPrice: 699,
            desc: "Comprehensive testing of PM-KUSUM solar PV array, VFD inverter controller, voltage regulation, and motor drive.",
          },
          {
            id: "sp-2",
            name: "Submersible Tube-Well Motor Rewinding & Capacitor Fix",
            icon: "electric_bolt",
            rating: 4.94,
            ratingCount: "9k",
            durationMins: 180,
            price: 699,
            originalPrice: 949,
            desc: "Copper rewinding, bearing replacement, thrust plate adjustment, and waterproof joint heat-shrinking.",
          },
          {
            id: "sp-3",
            name: "Borewell Sand Flush & Air Compressor Flushing",
            icon: "water",
            rating: 4.91,
            ratingCount: "6k",
            durationMins: 240,
            price: 899,
            originalPrice: 1199,
            desc: "High-pressure air compressor flushing to remove sand, silt, and restore optimal gpm tube-well discharge.",
          },
          {
            id: "sp-4",
            name: "Solar Panel Cleaning & Array Power Optimization",
            icon: "wb_sunny",
            rating: 4.88,
            ratingCount: "4k",
            durationMins: 60,
            price: 349,
            originalPrice: 499,
            desc: "Dust, pollen, and scale removal on 2kW–7.5kW arrays to boost solar pumping output by up to 25%.",
          },
          {
            id: "sp-5",
            name: "Auto-Switch & Remote GSM Mobile Starter Setup",
            icon: "settings_remote",
            rating: 4.92,
            ratingCount: "5k",
            durationMins: 60,
            price: 399,
            originalPrice: 549,
            desc: "Install mobile SIM-based starter to remotely switch on/off farm motor via call or SMS with dry-run protection.",
          },
        ],
      },
    ],
  },

  "agri-drone-spray": {
    id: "agri-drone-spray",
    name: "Agri-Drone Sprayer (Nano Urea/Pesticide)",
    tag: "DGCA Certified Cooperative Drone Pilots",
    rating: 4.97,
    ratingCount: "15k",
    categoryType: "Precision Agriculture",
    icon: "flight",
    chips: [
      { id: "nano-urea", label: "Nano Urea Spray", icon: "flight" },
      { id: "pesticide", label: "Pesticide ULV", icon: "agriculture" },
      { id: "crop-scan", label: "Disease Scan", icon: "scanner" },
      { id: "seed-broadcast", label: "Seed Broadcast", icon: "grain" },
    ],
    sections: [
      {
        id: "drone-spray-ops",
        title: "Precision Drone Aerial Spraying",
        services: [
          {
            id: "ds-1",
            name: "Drone Nano-Urea & Micronutrient Spraying (Per Acre)",
            icon: "flight",
            rating: 4.98,
            ratingCount: "11k",
            durationMins: 30,
            price: 249,
            originalPrice: 349,
            desc: "Rapid 10-minute per acre uniform foliar spray saving 50% fertilizer cost with zero soil compaction.",
          },
          {
            id: "ds-2",
            name: "Drone Fungicide & Crop Pest Precision Spraying (Per Acre)",
            icon: "flight",
            rating: 4.95,
            ratingCount: "8k",
            durationMins: 30,
            price: 299,
            originalPrice: 399,
            desc: "Targeted droplet mist for paddy blast, bollworm, or rust with zero operator toxic chemical exposure.",
          },
          {
            id: "ds-3",
            name: "Multi-Spectral Aerial Crop Disease & NDVI Scanning",
            icon: "scanner",
            rating: 4.91,
            ratingCount: "3k",
            durationMins: 60,
            price: 399,
            originalPrice: 599,
            desc: "High-resolution thermal and multispectral mapping to identify water stress, nitrogen deficiency, and pest patches.",
          },
          {
            id: "ds-4",
            name: "Aerial Drone Seed Broadcasting & Pellet Spreading (Per Acre)",
            icon: "grain",
            rating: 4.90,
            ratingCount: "2k",
            durationMins: 45,
            price: 349,
            originalPrice: 499,
            desc: "Rapid aerial broadcasting for cover crops, pulses, and green manure across wet fields.",
          },
        ],
      },
    ],
  },

  "soil-testing-compost": {
    id: "soil-testing-compost",
    name: "Soil Testing & Bio-Compost Helper",
    tag: "ICAR & KVK Trained Soil Health Helpers",
    rating: 4.92,
    ratingCount: "11k",
    categoryType: "Soil & Organic Farming",
    icon: "compost",
    chips: [
      { id: "soil-test", label: "NPK Soil Test", icon: "biotech" },
      { id: "vermicompost", label: "Vermicompost Pit", icon: "compost" },
      { id: "bio-fertilizer", label: "Bio-Fertilizer", icon: "spa" },
    ],
    sections: [
      {
        id: "soil-services",
        title: "Soil Testing & Composting Services",
        services: [
          {
            id: "st-1",
            name: "Doorstep Soil Sample Collection & Rapid NPK Health Card",
            icon: "biotech",
            rating: 4.95,
            ratingCount: "7k",
            durationMins: 60,
            price: 299,
            originalPrice: 449,
            desc: "Scientifically collected 10-point grid soil sample tested for Nitrogen, Phosphorus, Potassium, Organic Carbon and pH.",
          },
          {
            id: "st-2",
            name: "Vermicompost & NADEP Organic Pit Setup Helper",
            icon: "compost",
            rating: 4.93,
            ratingCount: "5k",
            durationMins: 240,
            price: 599,
            originalPrice: 799,
            desc: "Labor and technical assistance to construct a 10x3 ft vermicompost bed, earthworm seeding, and shade thatch setup.",
          },
          {
            id: "st-3",
            name: "Bio-Fertilizer (Trichoderma & Rhizobium) Seed Treatment",
            icon: "spa",
            rating: 4.89,
            ratingCount: "3k",
            durationMins: 90,
            price: 399,
            originalPrice: 549,
            desc: "Pre-sowing biological seed coating to prevent fungal root rot and enhance natural nitrogen fixation.",
          },
        ],
      },
    ],
  },

  "drip-irrigation-fix": {
    id: "drip-irrigation-fix",
    name: "Drip & Micro-Irrigation Technician",
    tag: "Micro-Irrigation Co-op Pipe & Emitter Techs",
    rating: 4.93,
    ratingCount: "13k",
    categoryType: "Farm Water Efficiency",
    icon: "water_drop",
    chips: [
      { id: "dripper-flush", label: "Lateral Flush", icon: "water_drop" },
      { id: "sprinkler", label: "Micro-Sprinkler", icon: "shower" },
      { id: "venturi", label: "Venturi Injector", icon: "tune" },
      { id: "sand-filter", label: "Sand Filter Backwash", icon: "filter_alt" },
    ],
    sections: [
      {
        id: "drip-services",
        title: "Micro-Irrigation Maintenance Services",
        services: [
          {
            id: "di-1",
            name: "Drip Lateral Line Acid Flush & Emitter De-clogging",
            icon: "water_drop",
            rating: 4.95,
            ratingCount: "8k",
            durationMins: 120,
            price: 399,
            originalPrice: 549,
            desc: "Safe diluted acid flush to dissolve carbonate and mineral salt crystals blocking inline drippers.",
          },
          {
            id: "di-2",
            name: "Micro-Sprinkler Nozzle Alignment & Pressure Regulator Fix",
            icon: "shower",
            rating: 4.91,
            ratingCount: "5k",
            durationMins: 90,
            price: 349,
            originalPrice: 499,
            desc: "Replacing cracked swivel heads, unclogging spray orifices, and setting 1.5–2.0 bar line pressure.",
          },
          {
            id: "di-3",
            name: "Venturi Fertilizer Injector Installation & Calibration",
            icon: "tune",
            rating: 4.90,
            ratingCount: "3k",
            durationMins: 90,
            price: 449,
            originalPrice: 599,
            desc: "Setting up suction valve and bypass assembly to automate liquid fertigation directly into root zones.",
          },
          {
            id: "di-4",
            name: "Sand Media & Disc Filter Backwash Servicing",
            icon: "filter_alt",
            rating: 4.88,
            ratingCount: "4k",
            durationMins: 120,
            price: 499,
            originalPrice: 699,
            desc: "Opening filter tank, replacing fouled silica gravel, washing disc rings, and testing delta pressure gauge.",
          },
        ],
      },
    ],
  },

  // ── 2. FoodTech, Agro-Processing & Storage ─────────────────────────────────
  "cold-storage-tech": {
    id: "cold-storage-tech",
    name: "Cold Storage Chiller Technician",
    tag: "Ammonia & Freon Certified Chiller Engineers",
    rating: 4.95,
    ratingCount: "17k",
    categoryType: "Agro-Storage & HVAC",
    icon: "ac_unit",
    chips: [
      { id: "chiller-service", label: "Chiller Overhaul", icon: "ac_unit" },
      { id: "temp-sensor", label: "Temp Calibration", icon: "thermostat" },
      { id: "deicing", label: "Evaporator De-icing", icon: "mode_fan" },
      { id: "gas-leak", label: "Gas Leak Fix", icon: "warning" },
    ],
    sections: [
      {
        id: "cold-storage-ops",
        title: "Cold Storage & Refrigeration Services",
        services: [
          {
            id: "cs-1",
            name: "Cold Storage Compressor & Chiller Routine Servicing",
            icon: "ac_unit",
            rating: 4.96,
            ratingCount: "11k",
            durationMins: 180,
            price: 899,
            originalPrice: 1199,
            desc: "Complete oil level check, valve plate inspection, motor belt tensioning, and cooling circuit optimization.",
          },
          {
            id: "cs-2",
            name: "Cold Room Temperature & Humidity Sensor Calibration",
            icon: "thermostat",
            rating: 4.94,
            ratingCount: "7k",
            durationMins: 90,
            price: 499,
            originalPrice: 699,
            desc: "Precision calibration of RTD sensors and digital data loggers to protect potato, apple, and grain stocks.",
          },
          {
            id: "cs-3",
            name: "Evaporator Coil De-icing & Condenser Fan Servicing",
            icon: "mode_fan",
            rating: 4.91,
            ratingCount: "5k",
            durationMins: 120,
            price: 649,
            originalPrice: 849,
            desc: "Clearing thick ice frost buildup, defrost heating element check, and atmospheric cooling tower descaling.",
          },
          {
            id: "cs-4",
            name: "Urgent Refrigerant Gas Leak Detection & Top-up",
            icon: "warning",
            rating: 4.93,
            ratingCount: "4k",
            durationMins: 150,
            price: 799,
            originalPrice: 1099,
            desc: "Electronic sniffing probe detection of R404A/R22/Ammonia leaks, copper brazing, vacuuming, and gas recharge.",
          },
        ],
      },
    ],
  },

  "flour-oil-mill-op": {
    id: "flour-oil-mill-op",
    name: "Atta, Dal & Oil Mill Operator",
    tag: "Cooperative Agro-Processing Machine Operators",
    rating: 4.93,
    ratingCount: "14k",
    categoryType: "Agro-Processing & Value Addition",
    icon: "factory",
    chips: [
      { id: "atta-chakki", label: "Atta Chakki", icon: "factory" },
      { id: "dal-mill", label: "Dal Mill Roller", icon: "grain" },
      { id: "oil-expeller", label: "Oil Expeller", icon: "water_drop" },
      { id: "pulverizer", label: "Spice Pulverizer", icon: "kitchen" },
    ],
    sections: [
      {
        id: "mill-services",
        title: "Agro Mill Operation & Repair Services",
        services: [
          {
            id: "fo-1",
            name: "Commercial Atta Chakki Stone Chipping & Alignment",
            icon: "factory",
            rating: 4.95,
            ratingCount: "8k",
            durationMins: 180,
            price: 499,
            originalPrice: 699,
            desc: "Manual chisel grooving (tangai) of emery grinding stones to restore uniform whole wheat flour milling.",
          },
          {
            id: "fo-2",
            name: "Mini Dal Mill De-husker Roller & Sieve Adjustment",
            icon: "grain",
            rating: 4.92,
            ratingCount: "5k",
            durationMins: 180,
            price: 549,
            originalPrice: 749,
            desc: "Setting gap on rubber rollers for toor/urad/chana dal to minimize broken grain loss and maximize polished yield.",
          },
          {
            id: "fo-3",
            name: "Cold-Pressed Mustard / Sesame Oil Expeller (Kachi Ghani) Tuning",
            icon: "water_drop",
            rating: 4.94,
            ratingCount: "6k",
            durationMins: 240,
            price: 699,
            originalPrice: 949,
            desc: "Worm shaft clearance adjustment, cone choke calibration, and cake thickness tuning for maximum pure oil extraction.",
          },
          {
            id: "fo-4",
            name: "Heavy Grain Pulverizer Blade Replacement & Balancing",
            icon: "kitchen",
            rating: 4.89,
            ratingCount: "3k",
            durationMins: 120,
            price: 449,
            originalPrice: 599,
            desc: "Balancing high-speed rotating hammers and fitting 0.5mm–2mm perforated sieves for besan and corn flour.",
          },
        ],
      },
    ],
  },

  "grain-sorting-grading": {
    id: "grain-sorting-grading",
    name: "Grain Sorter & Seed Grader",
    tag: "Seed Processing & Grading Cooperative Specialists",
    rating: 4.94,
    ratingCount: "12k",
    categoryType: "Post-Harvest Quality",
    icon: "filter_alt",
    chips: [
      { id: "seed-grader", label: "Seed Grader", icon: "filter_alt" },
      { id: "color-sorter", label: "Color Sorter", icon: "camera" },
      { id: "gravity-sep", label: "Gravity Separator", icon: "tune" },
      { id: "moisture", label: "Moisture Testing", icon: "speed" },
    ],
    sections: [
      {
        id: "sorting-services",
        title: "Grain Sorting & Seed Grading Services",
        services: [
          {
            id: "gs-1",
            name: "Multi-Deck Vibratory Seed Grader Sieve Setup & Cleaning",
            icon: "filter_alt",
            rating: 4.95,
            ratingCount: "7k",
            durationMins: 150,
            price: 499,
            originalPrice: 699,
            desc: "Selecting round/slotted screens, clearing blinding rubber balls, and calibrating eccentric vibration amplitude.",
          },
          {
            id: "gs-2",
            name: "Optical / Color Sorter Optical Sensor & Air Ejector Calibration",
            icon: "camera",
            rating: 4.96,
            ratingCount: "5k",
            durationMins: 180,
            price: 799,
            originalPrice: 1099,
            desc: "CCD high-speed camera background light calibration and micro-air blast timing for discolored grain rejection.",
          },
          {
            id: "gs-3",
            name: "Specific Gravity Separator Deck Mesh & Airflow Tuning",
            icon: "tune",
            rating: 4.91,
            ratingCount: "4k",
            durationMins: 150,
            price: 549,
            originalPrice: 749,
            desc: "Separating immature, insect-damaged, and light seed grains based on weight using precise fluidised air beds.",
          },
          {
            id: "gs-4",
            name: "Digital Moisture Meter Calibration & Lot Sampling",
            icon: "speed",
            rating: 4.90,
            ratingCount: "3k",
            durationMins: 60,
            price: 299,
            originalPrice: 399,
            desc: "Conducting 5-point warehouse grain probe sampling to ensure wheat/paddy stays below 12% safe moisture limit.",
          },
        ],
      },
    ],
  },

  "agro-packaging-labor": {
    id: "agro-packaging-labor",
    name: "FPO Packaging & Quality Inspector",
    tag: "FPO Certified Packaging & Quality Crew",
    rating: 4.92,
    ratingCount: "13k",
    categoryType: "Packaging & Logistics",
    icon: "inventory_2",
    chips: [
      { id: "vacuum-pouch", label: "Vacuum Packaging", icon: "inventory_2" },
      { id: "bag-stitching", label: "Bag Stitching", icon: "line_weight" },
      { id: "fssai-label", label: "FSSAI & Batch Code", icon: "qr_code" },
      { id: "quality-check", label: "Adulteration Test", icon: "verified" },
    ],
    sections: [
      {
        id: "packaging-services",
        title: "Agro-Product Packaging & Inspection",
        services: [
          {
            id: "ap-1",
            name: "Vacuum Nitrogen Flush Pouch Packaging Squad (Daily)",
            icon: "inventory_2",
            rating: 4.94,
            ratingCount: "8k",
            durationMins: 480,
            price: 599,
            originalPrice: 799,
            desc: "Experienced packaging hands for pulses, flour, and spices using chamber vacuum machines for 12-month shelf life.",
          },
          {
            id: "ap-2",
            name: "50kg Gunny / HDPE Bag Automatic Stitching Team",
            icon: "line_weight",
            rating: 4.92,
            ratingCount: "6k",
            durationMins: 480,
            price: 649,
            originalPrice: 849,
            desc: "Portable electric sewing machine operators for tamper-evident double chain stitch closure of grain bags.",
          },
          {
            id: "ap-3",
            name: "FSSAI Batch Coding, Net Weight & Agmark Labelling",
            icon: "qr_code",
            rating: 4.90,
            ratingCount: "4k",
            durationMins: 360,
            price: 449,
            originalPrice: 599,
            desc: "Handheld inkjet batch printing: Mfg date, MRP, FSSAI lic number, barcode, and QR origin trace labels.",
          },
          {
            id: "ap-4",
            name: "Pre-Dispatch Moisture & Foreign Matter Rapid Inspection",
            icon: "verified",
            rating: 4.93,
            ratingCount: "3k",
            durationMins: 120,
            price: 399,
            originalPrice: 499,
            desc: "Quality inspection for seed purity, broken grain ratio, foreign chaff, and issuing FPO lot dispatch clearance.",
          },
        ],
      },
    ],
  },

  "jaggery-spice-proc": {
    id: "jaggery-spice-proc",
    name: "Jaggery & Spice Processing Expert",
    tag: "Traditional Artisan & Cooperative Processing Masters",
    rating: 4.95,
    ratingCount: "11k",
    categoryType: "Artisanal Agri-Processing",
    icon: "local_dining",
    chips: [
      { id: "jaggery-boil", label: "Jaggery Boiling", icon: "local_dining" },
      { id: "spice-grind", label: "Spice Pulverizing", icon: "soup_kitchen" },
      { id: "gur-moulding", label: "Gur Cube Moulding", icon: "grid_view" },
      { id: "cane-clarifier", label: "Juice Clarification", icon: "water_drop" },
    ],
    sections: [
      {
        id: "jaggery-services",
        title: "Traditional Jaggery & Spice Processing",
        services: [
          {
            id: "js-1",
            name: "Master Jaggery / Gur Boiling Artisan (Full Day Batch)",
            icon: "local_dining",
            rating: 4.97,
            ratingCount: "7k",
            durationMins: 480,
            price: 799,
            originalPrice: 1049,
            desc: "Expert master for traditional open pan sugarcane juice boiling, temperature checking, and herbal clarification with deola extract.",
          },
          {
            id: "js-2",
            name: "Turmeric, Chilli & Coriander Multi-Stage Pulverizer Tech",
            icon: "soup_kitchen",
            rating: 4.93,
            ratingCount: "4k",
            durationMins: 240,
            price: 549,
            originalPrice: 749,
            desc: "Low-heat cold grinding of whole dry spices to preserve volatile aromatic oils and natural color.",
          },
          {
            id: "js-3",
            name: "Organic Value-Added Jaggery Moulding & Packaging",
            icon: "grid_view",
            rating: 4.91,
            ratingCount: "3k",
            durationMins: 240,
            price: 499,
            originalPrice: 649,
            desc: "Crafting ginger/clove/black pepper infused jaggery cubes, powder granules, and moisture-barrier vacuum packing.",
          },
          {
            id: "js-4",
            name: "Sugarcane Juice Clarifier & Triple-Filter Pan Setup",
            icon: "water_drop",
            rating: 4.89,
            ratingCount: "2k",
            durationMins: 180,
            price: 449,
            originalPrice: 599,
            desc: "Setting up scum skimmers, bagasse ash separators, and boiling trays to achieve export-grade golden jaggery.",
          },
        ],
      },
    ],
  },

  // ── 3. Rural Infrastructure & Panchayat Services ──────────────────────────
  "panchayat-sanitation": {
    id: "panchayat-sanitation",
    name: "Gram Panchayat Cleanliness Drive",
    tag: "Panchayat Cooperative Sanitation Workforce",
    rating: 4.93,
    ratingCount: "16k",
    categoryType: "Rural Community Sanitation",
    icon: "cleaning_services",
    chips: [
      { id: "village-road", label: "Road Cleanliness", icon: "cleaning_services" },
      { id: "waste-seg", label: "Waste Segregation", icon: "delete_sweep" },
      { id: "anti-larval", label: "Anti-Mosquito Spray", icon: "sanitizer" },
      { id: "school-clean", label: "School & Anganwadi", icon: "school" },
    ],
    sections: [
      {
        id: "sanitation-services",
        title: "Panchayat Cleanliness & Sanitation Services",
        services: [
          {
            id: "ps-1",
            name: "Gram Panchayat Village Main Road & Chowk Cleanliness Drive",
            icon: "cleaning_services",
            rating: 4.95,
            ratingCount: "9k",
            durationMins: 360,
            price: 1499,
            originalPrice: 1999,
            desc: "4-worker cooperative team with wheelbarrows, brooms, and lime powder to clean village public thoroughfares and community hubs.",
          },
          {
            id: "ps-2",
            name: "Community Plastic Waste & Dry Trash Segregation Squad",
            icon: "delete_sweep",
            rating: 4.92,
            ratingCount: "6k",
            durationMins: 360,
            price: 1199,
            originalPrice: 1599,
            desc: "Door-to-door dry/wet waste collection, baling plastic scrap, and transport to the village resource recovery facility (RRF).",
          },
          {
            id: "ps-3",
            name: "Anti-Larval Bleaching & Mosquito Thermal Fogging Squad",
            icon: "sanitizer",
            rating: 4.90,
            ratingCount: "5k",
            durationMins: 180,
            price: 899,
            originalPrice: 1199,
            desc: "Petrol fogger thermal misting in stagnant drains and public lanes with Pyrethrum to curb dengue and malaria vectors.",
          },
          {
            id: "ps-4",
            name: "Village School & Anganwadi Deep Sanitization & Wash",
            icon: "school",
            rating: 4.94,
            ratingCount: "4k",
            durationMins: 180,
            price: 749,
            originalPrice: 999,
            desc: "Pressure jet washing of midday meal kitchen, student toilets, drinking water stations, and boundary premises.",
          },
        ],
      },
    ],
  },

  "rural-solar-rooftop": {
    id: "rural-solar-rooftop",
    name: "Rural Solar Rooftop Installation",
    tag: "PM Suryaghar & Co-op Solar Certified Installers",
    rating: 4.94,
    ratingCount: "15k",
    categoryType: "Renewable Energy",
    icon: "wb_sunny",
    chips: [
      { id: "rooftop-install", label: "Solar Installation", icon: "wb_sunny" },
      { id: "inverter-battery", label: "Inverter Battery", icon: "battery_charging_full" },
      { id: "earthing", label: "Chemical Earthing", icon: "shield" },
      { id: "panel-wash", label: "Panel Deep Wash", icon: "shower" },
    ],
    sections: [
      {
        id: "solar-rooftop-services",
        title: "Rural Solar Power Services",
        services: [
          {
            id: "rs-1",
            name: "2kW–5kW Rural Solar Rooftop Structure & Panel Installation",
            icon: "wb_sunny",
            rating: 4.96,
            ratingCount: "10k",
            durationMins: 360,
            price: 1299,
            originalPrice: 1699,
            desc: "GI mounting structure anchor bolting, monocrystalline panel wiring, MC4 connector crimping, and grid sync.",
          },
          {
            id: "rs-2",
            name: "Solar Hybrid Inverter & Tubular Battery Servicing",
            icon: "battery_charging_full",
            rating: 4.93,
            ratingCount: "7k",
            durationMins: 90,
            price: 399,
            originalPrice: 549,
            desc: "Battery specific gravity check with hydrometer, distilled water top-up, terminal desulfation, and inverter firmware check.",
          },
          {
            id: "rs-3",
            name: "Lightning Arrester & Chemical Compound Earthing Pit",
            icon: "shield",
            rating: 4.91,
            ratingCount: "5k",
            durationMins: 150,
            price: 599,
            originalPrice: 799,
            desc: "Copper-bonded earth rod installation with bentonite conductivity backfill compound to guarantee sub-2 ohm resistance.",
          },
          {
            id: "rs-4",
            name: "Rooftop Solar Panel Deep Cleaning & Angle Realignment",
            icon: "shower",
            rating: 4.89,
            ratingCount: "4k",
            durationMins: 60,
            price: 299,
            originalPrice: 399,
            desc: "De-ionized water wash, bird dropping removal, and tilt angle adjustment for seasonal winter/summer sun trajectory.",
          },
        ],
      },
    ],
  },

  "water-pipeline-repair": {
    id: "water-pipeline-repair",
    name: "Piped Drinking Water & Handpump Fix",
    tag: "Jal Jeevan Mission & Panchayat Co-op Techs",
    rating: 4.93,
    ratingCount: "18k",
    categoryType: "Rural Water Infrastructure",
    icon: "plumbing",
    chips: [
      { id: "hdpe-pipe", label: "Pipeline Leak Weld", icon: "plumbing" },
      { id: "handpump", label: "Handpump Overhaul", icon: "handyman" },
      { id: "tank-sump", label: "Water Tank Cleaning", icon: "water_damage" },
      { id: "standpost", label: "Standpost Tap Fix", icon: "water_drop" },
    ],
    sections: [
      {
        id: "pipeline-services",
        title: "Village Drinking Water & Pipeline Services",
        services: [
          {
            id: "wp-1",
            name: "Jal Jeevan Village HDPE / GI Main Pipeline Leak Weld",
            icon: "plumbing",
            rating: 4.95,
            ratingCount: "11k",
            durationMins: 90,
            price: 499,
            originalPrice: 699,
            desc: "Electrofusion / butt welding for ruptured village supply pipelines, valve replacement, and air-lock removal.",
          },
          {
            id: "wp-2",
            name: "Deep Tube Handpump Cylinder, Washer & Rod Fix",
            icon: "handyman",
            rating: 4.92,
            ratingCount: "8k",
            durationMins: 120,
            price: 449,
            originalPrice: 599,
            desc: "Extraction of riser pipe, leather cup washer replacement, chain/handle pin overhaul, and cylinder priming.",
          },
          {
            id: "wp-3",
            name: "Community Overhead Water Tank Sump Cleaning & Chlorination",
            icon: "water_damage",
            rating: 4.90,
            ratingCount: "5k",
            durationMins: 150,
            price: 699,
            originalPrice: 899,
            desc: "Sludge de-silting, high-pressure jet wash, and safe bleaching powder chlorination for safe drinking water.",
          },
          {
            id: "wp-4",
            name: "Village Public Standpost Tap & Valve Overhaul",
            icon: "water_drop",
            rating: 4.88,
            ratingCount: "4k",
            durationMins: 60,
            price: 349,
            originalPrice: 449,
            desc: "Replacing leaking self-closing push taps, brass bib cocks, and installing wastewater soakage drains.",
          },
        ],
      },
    ],
  },

  "rural-mason-biogas": {
    id: "rural-mason-biogas",
    name: "Rural Mason & Gobar Gas / Bio-digester",
    tag: "Certified Rural Masons & Bio-Energy Artisans",
    rating: 4.94,
    ratingCount: "12k",
    categoryType: "Rural Masonry & Green Energy",
    icon: "foundation",
    chips: [
      { id: "biogas-build", label: "Biogas Construction", icon: "foundation" },
      { id: "biogas-repair", label: "Gas Leak & Valve", icon: "build" },
      { id: "shed-floor", label: "Shed Concrete Floor", icon: "view_in_ar" },
      { id: "grain-silo", label: "Brick Grain Silo", icon: "storage" },
    ],
    sections: [
      {
        id: "mason-biogas-services",
        title: "Rural Masonry & Biogas Plant Services",
        services: [
          {
            id: "rm-1",
            name: "Deenbandhu 2m³–5m³ Gobar Gas / Biogas Digester Masonry",
            icon: "foundation",
            rating: 4.96,
            ratingCount: "7k",
            durationMins: 480,
            price: 1799,
            originalPrice: 2299,
            desc: "Experienced rural brick mason for hemispherical fixed dome construction, slurry inlet mixing tank, and hydraulic chamber plastering.",
          },
          {
            id: "rm-2",
            name: "Biogas Gas Valve, Leak Patch & Moisture Trap Repair",
            icon: "build",
            rating: 4.92,
            ratingCount: "4k",
            durationMins: 120,
            price: 499,
            originalPrice: 699,
            desc: "Repairing dome crack seepage with waterproof cement slurry, replacing main gas gate valve, and draining condensation trap.",
          },
          {
            id: "rm-3",
            name: "Cattle Shed Sloped Concrete Flooring & Slurry Drain",
            icon: "view_in_ar",
            rating: 4.93,
            ratingCount: "5k",
            durationMins: 480,
            price: 1199,
            originalPrice: 1599,
            desc: "Anti-skid broom finish concrete paving with 1:40 slope towards biogas feed channel to eliminate cattle hoof disease.",
          },
          {
            id: "rm-4",
            name: "Low-Cost Brick Grain Storage Silo (Kothi) Construction",
            icon: "storage",
            rating: 4.90,
            ratingCount: "3k",
            durationMins: 480,
            price: 1499,
            originalPrice: 1899,
            desc: "Pusa-bin design moisture-proof and rodent-proof masonry grain store with polyethylene sandwich membrane.",
          },
        ],
      },
    ],
  },

  "rural-electrician": {
    id: "rural-electrician",
    name: "Farm & Village Electrification",
    tag: "Certified Cooperative High-Voltage Electricians",
    rating: 4.94,
    ratingCount: "19k",
    categoryType: "Rural Power & Electricals",
    icon: "bolt",
    chips: [
      { id: "starter-panel", label: "Motor Starter Panel", icon: "bolt" },
      { id: "village-wiring", label: "House Wiring", icon: "electrical_services" },
      { id: "chemical-earth", label: "Earth Grounding", icon: "shield" },
      { id: "phase-switch", label: "Phase Switch", icon: "toggle_on" },
    ],
    sections: [
      {
        id: "rural-elec-services",
        title: "Farm & Village Electrical Services",
        services: [
          {
            id: "re-elec-1",
            name: "3-Phase Farm Feeder Starter Panel & Contactor Fix",
            icon: "bolt",
            rating: 4.96,
            ratingCount: "13k",
            durationMins: 90,
            price: 499,
            originalPrice: 699,
            desc: "Repair of auto-cut relays, single-phasing preventers, magnetic contactor coils, and starter rewire.",
          },
          {
            id: "re-elec-2",
            name: "Village Household Wiring & Distribution Box Fix",
            icon: "electrical_services",
            rating: 4.92,
            ratingCount: "8k",
            durationMins: 60,
            price: 399,
            originalPrice: 549,
            desc: "MCB short-circuit repair, meter bypass troubleshooting, fan/cooler switchboard replacement, and LED fitting.",
          },
          {
            id: "re-elec-3",
            name: "Farm Tube-Well Chemical Earthing & Surge Protection",
            icon: "shield",
            rating: 4.90,
            ratingCount: "5k",
            durationMins: 120,
            price: 599,
            originalPrice: 799,
            desc: "GI pipe / copper chemical compound earthing pit installation to safeguard costly motors from lightning surge.",
          },
          {
            id: "re-elec-4",
            name: "Phase Changer Switch & Heavy Overload Protection Relay",
            icon: "toggle_on",
            rating: 4.91,
            ratingCount: "4k",
            durationMins: 60,
            price: 349,
            originalPrice: 499,
            desc: "Installing heavy manual rotary phase selector switch to tackle village single-phase voltage fluctuations.",
          },
        ],
      },
    ],
  },

  // ── 4. Dairy, Livestock & Paravet ──────────────────────────────────────────
  "paravet-health-check": {
    id: "paravet-health-check",
    name: "Paravet / Pashu Sakhi (Health & AI)",
    tag: "NABARD & Animal Husbandry Certified Paravets",
    rating: 4.96,
    ratingCount: "21k",
    categoryType: "Livestock Healthcare",
    icon: "pets",
    chips: [
      { id: "routine-check", label: "Cattle Health Check", icon: "pets" },
      { id: "ai-insemination", label: "Artificial Insemination", icon: "medication" },
      { id: "mastitis-test", label: "Mastitis Screening", icon: "healing" },
      { id: "pregnancy-diag", label: "Pregnancy Check", icon: "pregnant_woman" },
    ],
    sections: [
      {
        id: "paravet-services",
        title: "Doorstep Paravet & Veterinary Services",
        services: [
          {
            id: "ph-1",
            name: "Doorstep Cattle Routine Health Check & Deworming",
            icon: "pets",
            rating: 4.97,
            ratingCount: "14k",
            durationMins: 45,
            price: 249,
            originalPrice: 349,
            desc: "Temperature measurement, rumen motility check, mucous membrane exam, and broad-spectrum deworming bolus administration.",
          },
          {
            id: "ph-2",
            name: "Artificial Insemination (AI) Doorstep Support (Cattle/Buffalo)",
            icon: "medication",
            rating: 4.95,
            ratingCount: "11k",
            durationMins: 60,
            price: 399,
            originalPrice: 549,
            desc: "Liquid nitrogen cryo-preserved semen straw thawing, rectovaginal cervical catheter passage with sterile AI sheath.",
          },
          {
            id: "ph-3",
            name: "California Mastitis Test (CMT) & Udder Hygiene Protocol",
            icon: "healing",
            rating: 4.93,
            ratingCount: "6k",
            durationMins: 45,
            price: 299,
            originalPrice: 399,
            desc: "4-quarter milk paddle gel reaction screening to detect subclinical mastitis before visible curdling, with teat dip application.",
          },
          {
            id: "ph-4",
            name: "Animal Pregnancy Diagnosis & Nutritional Advisory",
            icon: "pregnant_woman",
            rating: 4.91,
            ratingCount: "5k",
            durationMins: 60,
            price: 349,
            originalPrice: 499,
            desc: "Per-rectal uterine horn palpation at 60–90 days post-AI to confirm pregnancy and prescribe gestation mineral premixes.",
          },
        ],
      },
    ],
  },

  "dairy-farm-helper": {
    id: "dairy-farm-helper",
    name: "Cooperative Dairy Milking & Caretaker",
    tag: "Cooperative Dairy Society Milking Hands",
    rating: 4.93,
    ratingCount: "14k",
    categoryType: "Dairy Operations",
    icon: "water_damage",
    chips: [
      { id: "hand-milking", label: "Hand Milking", icon: "water_damage" },
      { id: "milking-machine", label: "Milking Machine", icon: "tune" },
      { id: "bmc-cooler", label: "Milk Chiller BMC", icon: "ac_unit" },
      { id: "shed-wash", label: "Shed Sanitation", icon: "cleaning_services" },
    ],
    sections: [
      {
        id: "dairy-helper-services",
        title: "Dairy Milking & Shed Maintenance Services",
        services: [
          {
            id: "df-1",
            name: "Daily Cow / Buffalo Hand Milking Assistant (Morning & Evening)",
            icon: "water_damage",
            rating: 4.95,
            ratingCount: "9k",
            durationMins: 240,
            price: 449,
            originalPrice: 599,
            desc: "Gentle knuckling/full hand milking of up to 8 animals, complete udder strip wash, and milk weighing.",
          },
          {
            id: "df-2",
            name: "Automatic Milking Machine Pulsator & Teat Cup Sanitization",
            icon: "tune",
            rating: 4.92,
            ratingCount: "6k",
            durationMins: 90,
            price: 399,
            originalPrice: 549,
            desc: "Food-grade acid & alkali wash of silicone liners, vacuum claw air bleed tuning, and pulsator 60:40 ratio check.",
          },
          {
            id: "df-3",
            name: "Bulk Milk Cooler (BMC) Tank Chiller Agitator Tune-up",
            icon: "ac_unit",
            rating: 4.94,
            ratingCount: "4k",
            durationMins: 120,
            price: 599,
            originalPrice: 799,
            desc: "Testing condensing unit, agitator motor gearbox, and 4°C auto-cutoff thermostat to prevent sour milk curdling.",
          },
          {
            id: "df-4",
            name: "Dairy Shed Deep Lime Disinfection & Slurry Wash",
            icon: "cleaning_services",
            rating: 4.90,
            ratingCount: "5k",
            durationMins: 180,
            price: 499,
            originalPrice: 649,
            desc: "Slurry scraper wash, potassium permanganate foot bath replenishment, and slaked lime dusting across feeding mangers.",
          },
        ],
      },
    ],
  },

  "poultry-goat-assistant": {
    id: "poultry-goat-assistant",
    name: "Poultry & Goat Farm Assistant",
    tag: "Certified Small Livestock Cooperative Workers",
    rating: 4.92,
    ratingCount: "10k",
    categoryType: "Poultry & Small Ruminants",
    icon: "egg",
    chips: [
      { id: "broiler-helper", label: "Broiler Shed Care", icon: "egg" },
      { id: "goat-deworm", label: "Goat Health Aid", icon: "pets" },
      { id: "drinker-flush", label: "Nipple Line Flush", icon: "shower" },
      { id: "brooder-setup", label: "Brooder Setup", icon: "thermostat" },
    ],
    sections: [
      {
        id: "poultry-goat-services",
        title: "Poultry & Goat Farm Services",
        services: [
          {
            id: "pg-1",
            name: "Commercial Broiler / Layer Shed Temperature & Litter Helper",
            icon: "egg",
            rating: 4.94,
            ratingCount: "6k",
            durationMins: 480,
            price: 499,
            originalPrice: 699,
            desc: "Turning rice husk bedding to prevent ammonia burns, curtain vent regulation, and feeder height adjustments.",
          },
          {
            id: "pg-2",
            name: "Goat Deworming, Hoof Trimming & Routine Health Aid",
            icon: "pets",
            rating: 4.92,
            ratingCount: "5k",
            durationMins: 90,
            price: 349,
            originalPrice: 499,
            desc: "Shearing overgrown hooves with professional nippers to prevent foot rot, and oral anthelmintic drenching.",
          },
          {
            id: "pg-3",
            name: "Automated Poultry Nipple Drinker & Feeder Line Flush",
            icon: "shower",
            rating: 4.89,
            ratingCount: "3k",
            durationMins: 90,
            price: 399,
            originalPrice: 549,
            desc: "Chlorine dioxide sanitation wash through overhead bell drinker pipelines to eliminate bacterial biofilm.",
          },
          {
            id: "pg-4",
            name: "Brooder Temperature Setup & Chick Quarantine Aid",
            icon: "thermostat",
            rating: 4.91,
            ratingCount: "3k",
            durationMins: 120,
            price: 449,
            originalPrice: 599,
            desc: "Gas / infrared electric brooder height calibration at 35°C, chick guard circle placing, and probiotic hydration prep.",
          },
        ],
      },
    ],
  },

  "cattle-feed-silage": {
    id: "cattle-feed-silage",
    name: "Silage Making & Fodder Specialist",
    tag: "Fodder & Livestock Nutrition Specialists",
    rating: 4.94,
    ratingCount: "11k",
    categoryType: "Livestock Nutrition",
    icon: "grass",
    chips: [
      { id: "silage-pit", label: "Silage Bunker Packing", icon: "grass" },
      { id: "tmr-mix", label: "TMR Feed Mixing", icon: "grain" },
      { id: "silage-inoculant", label: "Inoculant Spray", icon: "science" },
      { id: "hydroponic", label: "Hydroponic Fodder", icon: "spa" },
    ],
    sections: [
      {
        id: "fodder-services",
        title: "Silage Making & Fodder Management",
        services: [
          {
            id: "cf-1",
            name: "Green Maize / Napier Grass Chaffing & Bunker Silage Packing",
            icon: "grass",
            rating: 4.96,
            ratingCount: "7k",
            durationMins: 480,
            price: 699,
            originalPrice: 899,
            desc: "Heavy chaff cutter chopping to 1.5cm length, trench bunker tractor compaction, and anaerobic hermetic packing.",
          },
          {
            id: "cf-2",
            name: "Total Mixed Ration (TMR) Feed Prep & Mineral Mix",
            icon: "grain",
            rating: 4.92,
            ratingCount: "5k",
            durationMins: 240,
            price: 499,
            originalPrice: 649,
            desc: "Formulating dry wheat straw, green fodder, de-oiled mustard cake, bypass fat, and chelated minerals.",
          },
          {
            id: "cf-3",
            name: "Silage Inoculant Spray & Airtight Polythene Sealing",
            icon: "science",
            rating: 4.91,
            ratingCount: "3k",
            durationMins: 150,
            price: 449,
            originalPrice: 599,
            desc: "Lactic acid bacteria (LAB) inoculant uniform spraying followed by 200-micron UV-stabilized sheet sandbagging.",
          },
          {
            id: "cf-4",
            name: "Hydroponic Maize Fodder Tray Cycle Setup Helper",
            icon: "spa",
            rating: 4.90,
            ratingCount: "2k",
            durationMins: 180,
            price: 599,
            originalPrice: 799,
            desc: "7-day continuous hydroponic green mat production cycle setup: seed steeping, tray stacking, and misting.",
          },
        ],
      },
    ],
  },

  // ── 5. Tatkal Farm Emergency (45-Min) ──────────────────────────────────────
  "emergency-motor-burnout": {
    id: "emergency-motor-burnout",
    name: "Burnt Tube-Well Motor (45-Min Tatkal)",
    tag: "45-Minute Rapid Farm Breakdown Dispatch",
    rating: 4.98,
    ratingCount: "9k",
    categoryType: "Emergency Farm Response",
    icon: "electric_bolt",
    chips: [
      { id: "pull-motor", label: "Tatkal Motor Pull", icon: "electric_bolt" },
      { id: "standby-pump", label: "Standby Pump Rent", icon: "solar_power" },
      { id: "fast-rewind", label: "Fast Rewinding", icon: "build" },
      { id: "starter-bypass", label: "Starter Bypass", icon: "electrical_services" },
    ],
    sections: [
      {
        id: "tatkal-motor-services",
        title: "Emergency Tube-Well Motor Services",
        services: [
          {
            id: "emb-1",
            name: "45-Minute Rapid Submersible Motor Pull-out Squad",
            icon: "electric_bolt",
            rating: 4.98,
            ratingCount: "6k",
            durationMins: 90,
            price: 1299,
            originalPrice: 1699,
            desc: "Emergency 3-worker technician squad arriving within 45 mins with mechanical tripod crane to hoist 150ft pump column.",
          },
          {
            id: "emb-2",
            name: "Standby 5HP/7.5HP Emergency Submersible Pump on Rent",
            icon: "solar_power",
            rating: 4.97,
            ratingCount: "5k",
            durationMins: 60,
            price: 1499,
            originalPrice: 1999,
            desc: "Immediate temporary submersible pump dropped in borewell to protect drying crops while your motor is rewound.",
          },
          {
            id: "emb-3",
            name: "Fast-Track Burnt Motor Copper Rewinding (Same-Day)",
            icon: "build",
            rating: 4.95,
            ratingCount: "4k",
            durationMins: 360,
            price: 1799,
            originalPrice: 2399,
            desc: "Priority winding shop bench turnaround with Class-H heat-resistant copper wire, varnish bake, and underwater seal.",
          },
          {
            id: "emb-4",
            name: "High-Voltage Starter Panel Relay Bypass & Tatkal Power Fix",
            icon: "electrical_services",
            rating: 4.93,
            ratingCount: "3k",
            durationMins: 60,
            price: 649,
            originalPrice: 899,
            desc: "Tatkal emergency repair of burnt contactor points, phase bypass, and heavy fuse replacement.",
          },
        ],
      },
    ],
  },

  "emergency-water-burst": {
    id: "emergency-water-burst",
    name: "Farm Irrigation Mainline Burst",
    tag: "45-Minute Emergency Pipeline Squad",
    rating: 4.97,
    ratingCount: "8k",
    categoryType: "Emergency Irrigation Response",
    icon: "emergency",
    chips: [
      { id: "pipe-clamp", label: "Burst Clamp Patch", icon: "emergency" },
      { id: "dewatering", label: "Diesel De-watering", icon: "water" },
      { id: "coupler-fix", label: "Coupler Replace", icon: "plumbing" },
      { id: "sandbag", label: "Canal Sandbagging", icon: "shield" },
    ],
    sections: [
      {
        id: "tatkal-pipe-services",
        title: "Emergency Irrigation Mainline Services",
        services: [
          {
            id: "ewb-1",
            name: "45-Minute Tatkal HDPE / PVC Farm Mainline Burst Clamp",
            icon: "emergency",
            rating: 4.98,
            ratingCount: "5k",
            durationMins: 90,
            price: 999,
            originalPrice: 1399,
            desc: "Rapid response technician with mechanical saddle clamp and fast-cure epoxy patch to seal pressurized line rupture.",
          },
          {
            id: "ewb-2",
            name: "Emergency Field Waterlogging Diesel De-watering Pump Squad",
            icon: "water",
            rating: 4.96,
            ratingCount: "4k",
            durationMins: 180,
            price: 1199,
            originalPrice: 1599,
            desc: "Portable 5HP diesel centrifugal de-watering pump deployed to drain flooded vegetable fields and save root systems.",
          },
          {
            id: "ewb-3",
            name: "High-Pressure Irrigation Coupler & Joint Replacement",
            icon: "plumbing",
            rating: 4.93,
            ratingCount: "3k",
            durationMins: 90,
            price: 699,
            originalPrice: 949,
            desc: "Cutting cracked section and installing heavy compression union sleeve and vulcanized O-ring gasket.",
          },
          {
            id: "ewb-4",
            name: "Irrigation Canal Sluice Gate Sandbagging & Breach Repair",
            icon: "shield",
            rating: 4.91,
            ratingCount: "2k",
            durationMins: 150,
            price: 899,
            originalPrice: 1199,
            desc: "Cooperative rapid sandbagging team to plug eroded bund breach and prevent massive field topsoil washout.",
          },
        ],
      },
    ],
  },

  "emergency-paravet": {
    id: "emergency-paravet",
    name: "Urgent Livestock Medical Care",
    tag: "Cooperative Emergency Animal Hospital Dispatch",
    rating: 4.98,
    ratingCount: "10k",
    categoryType: "Urgent Veterinary Care",
    icon: "medical_services",
    chips: [
      { id: "bloat-relief", label: "Acute Bloat Relief", icon: "medical_services" },
      { id: "dystocia", label: "Difficult Calving", icon: "healing" },
      { id: "wound-suture", label: "Wound Suture", icon: "medication" },
      { id: "iv-infusion", label: "IV Saline Infusion", icon: "vaccines" },
    ],
    sections: [
      {
        id: "tatkal-paravet-services",
        title: "Emergency Veterinary Medical Services",
        services: [
          {
            id: "ep-1",
            name: "Emergency Paravet Acute Bloat (Tympanites) Relief",
            icon: "medical_services",
            rating: 4.99,
            ratingCount: "6k",
            durationMins: 60,
            price: 599,
            originalPrice: 799,
            desc: "Trocar and cannula left paralumbar puncture / stomach tube passage to release lethal frothy rumen gas pressure.",
          },
          {
            id: "ep-2",
            name: "Difficult Calving (Dystocia) Urgent Paravet Assistance",
            icon: "healing",
            rating: 4.97,
            ratingCount: "4k",
            durationMins: 120,
            price: 799,
            originalPrice: 1099,
            desc: "Manual uterine lubrication, calf leg posture correction, gentle traction delivery, and newborn resuscitation.",
          },
          {
            id: "ep-3",
            name: "Accidental Farm Animal Wound Suture & Antiseptic Bandaging",
            icon: "medication",
            rating: 4.94,
            ratingCount: "3k",
            durationMins: 90,
            price: 649,
            originalPrice: 899,
            desc: "Barbed wire laceration debridement, topical lidocaine anaesthesia, nylon suture closure, and fly repellent spray.",
          },
          {
            id: "ep-4",
            name: "Emergency Dehydration Electrolyte IV Infusion Setup",
            icon: "vaccines",
            rating: 4.93,
            ratingCount: "3k",
            durationMins: 60,
            price: 549,
            originalPrice: 749,
            desc: "Jugular vein cannulation: 4-litre Dextrose Normal Saline (DNS) & Calcium Borogluconate emergency infusion.",
          },
        ],
      },
    ],
  },

  // ── 6. Institutional & Bulk Squads ─────────────────────────────────────────
  "fpo-harvest-team": {
    id: "fpo-harvest-team",
    name: "FPO Seasonal Harvest Crew (5-15 Workers)",
    tag: "Cooperative B2B Contract Harvesting Workforce",
    rating: 4.95,
    ratingCount: "14k",
    categoryType: "Institutional Contract Labour",
    icon: "groups",
    chips: [
      { id: "paddy-squad", label: "10-Worker Paddy Squad", icon: "groups" },
      { id: "sugarcane-gang", label: "15-Worker Cane Gang", icon: "agriculture" },
      { id: "vegetable-grading", label: "Vegetable Grading", icon: "inventory" },
      { id: "potato-sacking", label: "Potato Sacking", icon: "shopping_bag" },
    ],
    sections: [
      {
        id: "harvest-squad-services",
        title: "B2B & Seasonal Farm Harvest Squads",
        services: [
          {
            id: "fht-1",
            name: "10-Member Wheat / Paddy Rapid Harvesting Squad (Full Day)",
            icon: "groups",
            rating: 4.96,
            ratingCount: "8k",
            durationMins: 480,
            price: 4999,
            originalPrice: 6499,
            desc: "Cooperative disciplined 10-worker squad with sickles for rapid reaping, bundle binding, and field stacking.",
          },
          {
            id: "fht-2",
            name: "15-Member Sugarcane Cutting & Bundle Binding Gang",
            icon: "agriculture",
            rating: 4.94,
            ratingCount: "5k",
            durationMins: 480,
            price: 6999,
            originalPrice: 8999,
            desc: "High-output cane cutting gang: detrashed, topped, bundled, and loaded onto mill transport trucks.",
          },
          {
            id: "fht-3",
            name: "8-Member Vegetable & Fruit Grading & Crating Squad",
            icon: "inventory",
            rating: 4.92,
            ratingCount: "4k",
            durationMins: 480,
            price: 3799,
            originalPrice: 4899,
            desc: "Gentle manual picking of tomatoes, chillies, or mangoes, size grading, and packing into 25kg plastic crates.",
          },
          {
            id: "fht-4",
            name: "5-Member Potato / Onion Field Dugout & Sacking Crew",
            icon: "shopping_bag",
            rating: 4.91,
            ratingCount: "4k",
            durationMins: 480,
            price: 2499,
            originalPrice: 3299,
            desc: "Tractor furrow potato pickup, field air drying, mesh bagging, and weighment ready for cold storage.",
          },
        ],
      },
    ],
  },

  "mandi-loading-crew": {
    id: "mandi-loading-crew",
    name: "Mandi Grain Loading & Storage Team",
    tag: "Registered Mathadi & Mandi Cooperative Workers",
    rating: 4.94,
    ratingCount: "13k",
    categoryType: "Logistics & Mandi Handling",
    icon: "warehouse",
    chips: [
      { id: "truck-loading", label: "Truck Loading Gang", icon: "local_shipping" },
      { id: "godown-stacking", label: "Godown Stacking", icon: "warehouse" },
      { id: "weigh-stitching", label: "Bag Stitching", icon: "scale" },
      { id: "fumigation", label: "Godown Fumigation", icon: "sanitizer" },
    ],
    sections: [
      {
        id: "mandi-services",
        title: "Mandi Loading & Warehouse Squads",
        services: [
          {
            id: "mlc-1",
            name: "50kg Bori Truck Loading Gang (Per 10-Ton Truck)",
            icon: "local_shipping",
            rating: 4.96,
            ratingCount: "8k",
            durationMins: 180,
            price: 1999,
            originalPrice: 2599,
            desc: "Experienced 6-porter cooperative squad loading 200 bags (50kg each) with tarp tie-down in under 3 hours.",
          },
          {
            id: "mlc-2",
            name: "Warehouse Godown High-Stacking & Wooden Dinnage Setup",
            icon: "warehouse",
            rating: 4.93,
            ratingCount: "5k",
            durationMins: 240,
            price: 1499,
            originalPrice: 1999,
            desc: "16-bag standard interlocking godown stacks on wooden pallets with 1-meter aeration alleys.",
          },
          {
            id: "mlc-3",
            name: "Grain Bags Weighment, Stitching & Lot Marking Squad",
            icon: "scale",
            rating: 4.92,
            ratingCount: "4k",
            durationMins: 180,
            price: 999,
            originalPrice: 1299,
            desc: "Calibrated electronic scale weighment, machine sewing, and stencil marking of cooperative grade badges.",
          },
          {
            id: "mlc-4",
            name: "Post-Harvest Godown Grain Fumigation & Pest Treatment",
            icon: "sanitizer",
            rating: 4.94,
            ratingCount: "3k",
            durationMins: 180,
            price: 1299,
            originalPrice: 1699,
            desc: "Aluminium phosphide gas tablet placement under airtight gas-proof covers and Malathion residual wall spray.",
          },
        ],
      },
    ],
  },

  "panchayat-drainage-gang": {
    id: "panchayat-drainage-gang",
    name: "Panchayat Desilting & Drainage Squad",
    tag: "Panchayat Public Works Cooperative Gang",
    rating: 4.93,
    ratingCount: "15k",
    categoryType: "Civic & Waterway Works",
    icon: "engineering",
    chips: [
      { id: "drain-500m", label: "500m Drain Desilting", icon: "engineering" },
      { id: "canal-weeding", label: "Canal Mud Weeding", icon: "water" },
      { id: "culvert-clear", label: "Culvert Clearance", icon: "traffic" },
      { id: "trench-digging", label: "Trench Digging", icon: "construction" },
    ],
    sections: [
      {
        id: "drainage-services",
        title: "Panchayat Waterway & Drainage Works",
        services: [
          {
            id: "pdg-1",
            name: "Monsoon Village Open Drain 500m Desilting Squad (8 Workers)",
            icon: "engineering",
            rating: 4.95,
            ratingCount: "9k",
            durationMins: 480,
            price: 3999,
            originalPrice: 4999,
            desc: "Cooperative gang equipped with shovels, drag hooks, and silt buckets to clear blocked monsoon sewage drains.",
          },
          {
            id: "pdg-2",
            name: "Village Irrigation Canal Mud Silt & Weed Clearance Gang",
            icon: "water",
            rating: 4.93,
            ratingCount: "6k",
            durationMins: 480,
            price: 4499,
            originalPrice: 5699,
            desc: "Restoring canal bed water flow cross-section, removing water hyacinth, and reinforcing side banks.",
          },
          {
            id: "pdg-3",
            name: "Choked Siphon & Road Culvert Rapid Clearance Team",
            icon: "traffic",
            rating: 4.92,
            ratingCount: "4k",
            durationMins: 240,
            price: 2199,
            originalPrice: 2899,
            desc: "Under-road culvert rod rodding and hydraulic mud extraction to eliminate road waterlogging.",
          },
          {
            id: "pdg-4",
            name: "Waterlogging Flood Diversion Trench Digging Squad",
            icon: "construction",
            rating: 4.90,
            ratingCount: "4k",
            durationMins: 360,
            price: 2799,
            originalPrice: 3599,
            desc: "Excavating 2ft x 2ft drainage channels to safely divert rainwater runoff into village percolation ponds.",
          },
        ],
      },
    ],
  },

  // ── Existing Urban & Household Services (Retained under Extra Features) ──
  // 1. Women's Salon
  "salon-women": {
    id: "salon-women",
    name: "Salon for Women",
    tag: "Certified Beauticians",
    rating: 4.88,
    ratingCount: "355K",
    categoryType: "Personal Care",
    icon: "self_care",
    chips: [
      { id: "cleanup", label: "Cleanup & Facial", icon: "face_retouching_natural" },
      { id: "waxing", label: "Waxing", icon: "healing" },
      { id: "manicure", label: "Mani-Pedi", icon: "spa" },
      { id: "threading", label: "Threading", icon: "content_cut" },
    ],
    sections: [
      {
        id: "facial-cleanup",
        title: "Facials & Cleanup",
        services: [
          { id: "sw-1", name: "Sara Fruit Glow Facial", icon: "face_retouching_natural", rating: 4.82, ratingCount: "140k", durationMins: 60, price: 199, desc: "Gentle fruit enzyme cleanse for natural skin glow" },
          { id: "sw-2", name: "O3+ Bridal Whitening Facial", icon: "face_retouching_natural", rating: 4.91, ratingCount: "98k", durationMins: 75, price: 299, desc: "Deep oxygen infusion and hyperpigmentation control" },
          { id: "sw-3", name: "Express Glow Cleanup", icon: "face_retouching_natural", rating: 4.76, ratingCount: "210k", durationMins: 35, price: 149, desc: "Quick exfoliation, blackhead removal, and pack" },
        ],
      },
      {
        id: "waxing-threading",
        title: "Waxing & Threading",
        services: [
          { id: "sw-4", name: "Full Arms + Full Legs Rica Wax", icon: "healing", rating: 4.89, ratingCount: "320k", durationMins: 50, price: 249, desc: "Gentle lipo-soluble Italian wax suitable for sensitive skin" },
          { id: "sw-5", name: "Eyebrows & Upper Lip Threading", icon: "content_cut", rating: 4.93, ratingCount: "450k", durationMins: 15, price: 99, desc: "Precision shaping with sanitized organic thread" },
        ],
      },
    ],
  },
  "salon-classic": {
    id: "salon-classic",
    name: "Salon Classic for Women",
    tag: "Certified Beauticians",
    rating: 4.88,
    ratingCount: "355K",
    categoryType: "Personal Care",
    icon: "self_care",
    chips: [
      { id: "cleanup", label: "Cleanup & Facial", icon: "face_retouching_natural" },
      { id: "waxing", label: "Waxing", icon: "healing" },
      { id: "manicure", label: "Mani-Pedi", icon: "spa" },
    ],
    sections: [
      {
        id: "facial-cleanup",
        title: "Facials & Cleanup",
        services: [
          { id: "sw-1", name: "Sara Fruit Glow Facial", icon: "face_retouching_natural", rating: 4.82, ratingCount: "140k", durationMins: 60, price: 199, desc: "Gentle fruit enzyme cleanse for natural skin glow" },
          { id: "sw-2", name: "O3+ Bridal Whitening Facial", icon: "face_retouching_natural", rating: 4.91, ratingCount: "98k", durationMins: 75, price: 299, desc: "Deep oxygen infusion and hyperpigmentation control" },
          { id: "sw-3", name: "Express Glow Cleanup", icon: "face_retouching_natural", rating: 4.76, ratingCount: "210k", durationMins: 35, price: 149, desc: "Quick exfoliation, blackhead removal, and pack" },
        ],
      },
    ],
  },

  // 2. Spa for Women
  "spa-women": {
    id: "spa-women",
    name: "Spa for Women",
    tag: "Luxury Wellness",
    rating: 4.92,
    ratingCount: "82K",
    categoryType: "Wellness",
    icon: "spa",
    chips: [
      { id: "aromatherapy", label: "Aromatherapy", icon: "spa" },
      { id: "deep-tissue", label: "Deep Tissue", icon: "self_improvement" },
      { id: "head-neck", label: "Head & Neck", icon: "spa" },
    ],
    sections: [
      {
        id: "spa-therapies",
        title: "Body Therapies & Massages",
        services: [
          { id: "sp-1", name: "Swedish Full Body Relaxation Spa", icon: "spa", rating: 4.93, ratingCount: "42k", durationMins: 60, price: 249, desc: "Long gliding strokes with warm lavender essential oils" },
          { id: "sp-2", name: "Deep Tissue Muscle Relief Massage", icon: "self_improvement", rating: 4.89, ratingCount: "35k", durationMins: 75, price: 299, desc: "Targeted pressure to relieve chronic back & shoulder knots" },
          { id: "sp-3", name: "Ayurvedic Potli Herbal Compress", icon: "spa", rating: 4.95, ratingCount: "28k", durationMins: 60, price: 199, desc: "Warm herbal poultice massage for total joint rejuvenation" },
        ],
      },
    ],
  },

  // 3. Hair & Skin
  "hair-skin": {
    id: "hair-skin",
    name: "Hair & Skin Care",
    tag: "Dermat Tested",
    rating: 4.85,
    ratingCount: "115K",
    categoryType: "Aesthetics",
    icon: "face_retouching_natural",
    chips: [
      { id: "hair-spa", label: "Hair Spa", icon: "content_cut" },
      { id: "skin-detan", label: "De-Tan Therapy", icon: "brightness_6" },
      { id: "keratin", label: "Keratin Care", icon: "brush" },
    ],
    sections: [
      {
        id: "hair-skin-services",
        title: "Hair & Skin Treatments",
        services: [
          { id: "hs-1", name: "L'Oreal Anti-Hairfall Keratin Spa", icon: "content_cut", rating: 4.88, ratingCount: "68k", durationMins: 50, price: 249, desc: "Intense moisture repair and steam therapy for damaged hair" },
          { id: "hs-2", name: "Full Body Raaga De-Tan Therapy", icon: "brightness_6", rating: 4.86, ratingCount: "45k", durationMins: 60, price: 299, desc: "Kojic acid and milk protein pack for sun-tanned skin" },
          { id: "hs-3", name: "Anti-Dandruff Scalp Detox Session", icon: "face_retouching_natural", rating: 4.81, ratingCount: "32k", durationMins: 45, price: 199, desc: "Tea tree clarifying wash and scalp scrub" },
        ],
      },
    ],
  },

  // 4. Salon for Men
  "salon-men": {
    id: "salon-men",
    name: "Salon for Men",
    tag: "Top Barbers",
    rating: 4.86,
    ratingCount: "195K",
    categoryType: "Grooming",
    icon: "face",
    chips: [
      { id: "haircut", label: "Haircut", icon: "content_cut" },
      { id: "beard", label: "Beard Trim", icon: "face" },
      { id: "face-care", label: "Face Clean", icon: "face_retouching_natural" },
      { id: "color", label: "Hair Color", icon: "palette" },
    ],
    sections: [
      {
        id: "men-haircut-beard",
        title: "Hair & Beard Grooming",
        services: [
          { id: "sm-1", name: "Men's Classic Haircut & Style", icon: "content_cut", rating: 4.89, ratingCount: "120k", durationMins: 30, price: 199, desc: "Precision scissors cut, neck line shave, and hair wash" },
          { id: "sm-2", name: "Beard Shaping & Hot Towel Finish", icon: "face", rating: 4.87, ratingCount: "94k", durationMins: 20, price: 129, desc: "Razor-sharp beard contouring with soothing balm" },
          { id: "sm-3", name: "Haircut + Beard Shaping Combo", icon: "face", rating: 4.94, ratingCount: "165k", durationMins: 45, price: 299, desc: "Complete head & beard grooming makeover" },
        ],
      },
      {
        id: "men-skincare",
        title: "Skin & Scalp Treatments",
        services: [
          { id: "sm-4", name: "Charcoal Face De-Tan & Blackhead Removal", icon: "brightness_6", rating: 4.84, ratingCount: "68k", durationMins: 30, price: 249, desc: "Deep pore suction and activated charcoal scrub" },
          { id: "sm-5", name: "Ayurvedic Anti-Stress Head Massage (20 mins)", icon: "spa", rating: 4.92, ratingCount: "88k", durationMins: 20, price: 179, desc: "Cooling Brahmi oil massage for neck and temples" },
        ],
      },
    ],
  },

  // 5. Manicure & Pedicure (Nail & Foot Spa)
  "manicure-pedicure": {
    id: "manicure-pedicure",
    name: "Manicure & Pedicure",
    tag: "Certified Nail & Foot Specialists",
    rating: 4.92,
    ratingCount: "86K",
    categoryType: "Personal Care",
    icon: "spa",
    chips: [
      { id: "pedicure-chip", label: "Pedicure", icon: "spa" },
      { id: "manicure-chip", label: "Manicure", icon: "pan_tool" },
      { id: "detan-hands-feet", label: "De-Tan Spa", icon: "brightness_6" },
      { id: "nail-care-chip", label: "Nail Care", icon: "brush" },
    ],
    sections: [
      {
        id: "pedicure-care",
        title: "Pedicure & Foot Spa",
        services: [
          { id: "mp-1", name: "Deluxe Herbal Foot Spa & Pedicure", icon: "spa", rating: 4.93, ratingCount: "58k", durationMins: 45, price: 249, desc: "Warm herbal foot soak, cuticle clean, heel scrubbing, and soothing foot massage" },
          { id: "mp-2", name: "Raaga De-Tan Pedicure & Callus Relief", icon: "brightness_6", rating: 4.89, ratingCount: "42k", durationMins: 50, price: 299, desc: "Deep tan-removal pack, exfoliating apricot scrub, and intensive heel hydration" },
          { id: "mp-3", name: "Cracked Heel Healing & Softening Therapy", icon: "healing", rating: 4.91, ratingCount: "31k", durationMins: 40, price: 229, desc: "Specialized deep moisturizing treatment for dry, cracked feet" },
        ],
      },
      {
        id: "manicure-care",
        title: "Manicure & Hand Care",
        services: [
          { id: "mp-4", name: "Classic Rose Manicure & Cuticle Care", icon: "pan_tool", rating: 4.88, ratingCount: "47k", durationMins: 35, price: 199, desc: "Gentle nail shaping, cuticle nourishment, hand scrub, and moisture seal" },
          { id: "mp-5", name: "Luxury Mani + Pedi Rejuvenation Combo", icon: "spa", rating: 4.96, ratingCount: "74k", durationMins: 75, price: 399, desc: "Full complete hands and feet spa package with shine buffing & stress relief" },
        ],
      },
    ],
  },
  "massage-men": {
    id: "manicure-pedicure",
    name: "Manicure & Pedicure",
    tag: "Certified Nail & Foot Specialists",
    rating: 4.92,
    ratingCount: "86K",
    categoryType: "Personal Care",
    icon: "spa",
    chips: [
      { id: "pedicure-chip", label: "Pedicure", icon: "spa" },
      { id: "manicure-chip", label: "Manicure", icon: "pan_tool" },
    ],
    sections: [
      {
        id: "pedicure-care",
        title: "Pedicure & Foot Spa",
        services: [
          { id: "mp-1", name: "Deluxe Herbal Foot Spa & Pedicure", icon: "spa", rating: 4.93, ratingCount: "58k", durationMins: 45, price: 249, desc: "Warm herbal foot soak, cuticle clean, heel scrubbing, and soothing foot massage" },
          { id: "mp-5", name: "Luxury Mani + Pedi Rejuvenation Combo", icon: "spa", rating: 4.96, ratingCount: "74k", durationMins: 75, price: 399, desc: "Full complete hands and feet spa package with shine buffing & stress relief" },
        ],
      },
    ],
  },


  // 6. Electrical & Plumbing
  "electrical-plumbing": {
    id: "electrical-plumbing",
    name: "Electrical & Plumbing",
    tag: "Union Certified",
    rating: 4.87,
    ratingCount: "280K",
    categoryType: "Home Services",
    icon: "plumbing",
    chips: [
      { id: "plumbing-taps", label: "Taps & Leaks", icon: "plumbing" },
      { id: "drain-unblock", label: "Drain Blockage", icon: "cleaning_services" },
      { id: "switches", label: "Switches & MCB", icon: "power" },
      { id: "fan-lights", label: "Fans & Lights", icon: "lightbulb" },
    ],
    sections: [
      {
        id: "plumbing-repairs",
        title: "Plumbing Repairs & Fittings",
        services: [
          { id: "ep-1", name: "Tap / Mixer Repair & Spindle Replace", icon: "plumbing", rating: 4.86, ratingCount: "140k", durationMins: 30, price: 149, desc: "Fix dripping taps, mixer cartridge, and loose washers" },
          { id: "ep-2", name: "Wash Basin Sink Pipe Leakage Fix", icon: "plumbing", rating: 4.82, ratingCount: "98k", durationMins: 35, price: 199, desc: "New waste pipe installation and silicone joint seal" },
          { id: "ep-3", name: "Toilet Jet Spray / Health Faucet Install", icon: "plumbing", rating: 4.9, ratingCount: "185k", durationMins: 25, price: 179, desc: "Replacement of broken jet spray and wall connection" },
          { id: "ep-4", name: "Flush Tank / Siphon Overhaul", icon: "plumbing", rating: 4.84, ratingCount: "76k", durationMins: 45, price: 249, desc: "Fix continuous water leakage in Western/Indian commodes" },
        ],
      },
      {
        id: "drain-blockage",
        title: "Drainage & Blockage Removal",
        services: [
          { id: "ep-5", name: "Kitchen Sink Deep Drain Unclogging", icon: "cleaning_services", rating: 4.89, ratingCount: "112k", durationMins: 45, price: 249, desc: "Rotary snake pipe clearance for stubborn oil & food grease" },
          { id: "ep-6", name: "Bathroom Floor Trap & Pipe De-clog", icon: "cleaning_services", rating: 4.86, ratingCount: "89k", durationMins: 45, price: 299, desc: "Hair and soap scum removal from bathroom outlet" },
        ],
      },
      {
        id: "electrical-repairs",
        title: "Electrical Repairs & Installations",
        services: [
          { id: "ep-7", name: "Switch & Socket Replacement / Repair", icon: "power", rating: 4.88, ratingCount: "220k", durationMins: 30, price: 129, desc: "Replacement of burnt switches, 16A power points, or loose wires" },
          { id: "ep-8", name: "Ceiling Fan Installation & Balancing", icon: "power", rating: 4.87, ratingCount: "175k", durationMins: 40, price: 199, desc: "Mounting, rod connection, canopy fixing, and speed check" },
          { id: "ep-9", name: "MCB / Fuse Tripping Fault Inspection", icon: "bolt", rating: 4.93, ratingCount: "94k", durationMins: 35, price: 249, desc: "Identify electrical short circuits and replace faulty circuit breaker" },
        ],
      },
    ],
  },

  // 7. Cleaning & Pest Control
  "cleaning-pest-1": {
    id: "cleaning-pest-1",
    name: "Home Deep Cleaning & Pest Control",
    tag: "Eco-Friendly",
    rating: 4.89,
    ratingCount: "430K",
    categoryType: "Home Services",
    icon: "cleaning_services",
    chips: [
      { id: "bathroom", label: "Bathroom", icon: "bathroom" },
      { id: "kitchen", label: "Kitchen", icon: "restaurant" },
      { id: "full-home", label: "Full Home", icon: "home" },
      { id: "sofa", label: "Sofa & Carpet", icon: "chair" },
      { id: "pest", label: "Pest Control", icon: "pest_control" },
    ],
    sections: [
      {
        id: "deep-cleaning-home",
        title: "Bathroom & Kitchen Cleaning",
        services: [
          { id: "cp-1", name: "Intense Bathroom Tile Scrub & Descaling", icon: "bathroom", rating: 4.91, ratingCount: "280k", durationMins: 75, price: 249, desc: "Acid-free tile scrubbing, mirror shine, hard water stain removal" },
          { id: "cp-2", name: "Kitchen Modular Degreasing & Slab Polish", icon: "restaurant", rating: 4.88, ratingCount: "195k", durationMins: 90, price: 299, desc: "Removal of oil grease from chimney exterior, cabinets, and tiles" },
          { id: "cp-3", name: "Full Home 2 BHK Deep Cleaning", icon: "home", rating: 4.94, ratingCount: "140k", durationMins: 240, price: 299, desc: "Thorough machine buffing, balcony wash, fan & window polish" },
        ],
      },
      {
        id: "pest-control-section",
        title: "Pest Control Services",
        services: [
          { id: "cp-4", name: "Cockroach & Ant Herbal Gel (1-2 BHK)", icon: "pest_control", rating: 4.89, ratingCount: "160k", durationMins: 30, price: 249, desc: "Odorless herbal dots applied in cabinet hinges and corners" },
          { id: "cp-5", name: "Bed Bug Eradication Double Spray", icon: "pest_control", rating: 4.92, ratingCount: "55k", durationMins: 60, price: 299, desc: "2-step chemical spray with 60 days warranty" },
        ],
      },
    ],
  },

  // 8. Home Repairs & Carpentry
  "home-repairs": {
    id: "home-repairs",
    name: "Home Repairs & Carpentry",
    tag: "Master Carpenters",
    rating: 4.83,
    ratingCount: "135K",
    categoryType: "Home Services",
    icon: "engineering",
    chips: [
      { id: "door-lock", label: "Door Locks", icon: "lock" },
      { id: "wall-mount", label: "Wall Mount", icon: "tv" },
      { id: "furniture", label: "Furniture", icon: "chair" },
      { id: "curtains", label: "Curtains", icon: "window" },
    ],
    sections: [
      {
        id: "carpentry-services",
        title: "Carpentry & Installations",
        services: [
          { id: "hr-1", name: "Main Door / Bedroom Lock Installation", icon: "lock", rating: 4.86, ratingCount: "74k", durationMins: 35, price: 199, desc: "Installation of Godrej / Europa mortise and cylindrical locks" },
          { id: "hr-2", name: "TV Wall Mount (Up to 55 inch)", icon: "tv", rating: 4.9, ratingCount: "120k", durationMins: 40, price: 249, desc: "Heavy-duty bracket installation, leveling, and cable tie" },
          { id: "hr-3", name: "Cupboard / Kitchen Hinge Adjustment & Replace", icon: "handyman", rating: 4.82, ratingCount: "62k", durationMins: 30, price: 149, desc: "Fix sagging cabinet doors and hydraulic soft-close hinges" },
          { id: "hr-4", name: "Curtain Rod & Blind Bracket Setup", icon: "window", rating: 4.84, ratingCount: "58k", durationMins: 30, price: 179, desc: "Solid wall drilling and rod fitting" },
        ],
      },
    ],
  },

  // 9. Home Painting
  "home-painting": {
    id: "home-painting",
    name: "Home Painting & Waterproofing",
    tag: "Asian Paints Pro",
    rating: 4.91,
    ratingCount: "85K",
    categoryType: "Home Services",
    icon: "format_paint",
    chips: [
      { id: "full-painting", label: "Full Home", icon: "format_paint" },
      { id: "touch-up", label: "Touch Up", icon: "brush" },
      { id: "waterproof", label: "Waterproofing", icon: "water_drop" },
    ],
    sections: [
      {
        id: "painting-services",
        title: "Painting & Wall Care",
        services: [
          { id: "hp-1", name: "1 Room Wall Painting (Royale Emulsion)", icon: "format_paint", rating: 4.92, ratingCount: "45k", durationMins: 180, price: 299, desc: "2 coats of washable paint with surface sanding and tape masking" },
          { id: "hp-2", name: "Putty & Wall Crack Patch Repair", icon: "brush", rating: 4.87, ratingCount: "38k", durationMins: 60, price: 249, desc: "Fill holes, hairline cracks, and sand smooth" },
          { id: "hp-3", name: "Wall Dampness & Anti-Fungal Treatment", icon: "water_drop", rating: 4.94, ratingCount: "29k", durationMins: 120, price: 199, desc: "Silicon waterproofing primer coat for peeling plaster" },
        ],
      },
    ],
  },

  // 10. AC & Appliance Repair
  "ac-repair": {
    id: "ac-repair",
    name: "AC & Appliance Repair",
    tag: "90-Day Guarantee",
    rating: 4.87,
    ratingCount: "315K",
    categoryType: "Appliances",
    icon: "ac_unit",
    chips: [
      { id: "ac-jet", label: "AC Jet Service", icon: "ac_unit" },
      { id: "ac-gas", label: "Gas Refill", icon: "gas_meter" },
      { id: "ro-repair", label: "RO Purifier", icon: "water_drop" },
      { id: "washing-mach", label: "Washing Machine", icon: "local_laundry_service" },
    ],
    sections: [
      {
        id: "ac-repair-services",
        title: "AC Servicing & Repairs",
        services: [
          { id: "ac-1", name: "Split AC High-Pressure Jet Foam Service", icon: "ac_unit", rating: 4.9, ratingCount: "240k", durationMins: 45, price: 249, desc: "Indoor and outdoor coil deep pressure wash with anti-bacterial foam" },
          { id: "ac-2", name: "AC Not Cooling / Water Leak Inspection", icon: "build", rating: 4.85, ratingCount: "110k", durationMins: 30, price: 199, desc: "Diagnosis of compressor, capacitor, sensor, or drain pipe clog" },
          { id: "ac-3", name: "Refrigerant Gas Leakage Test & Full Refill", icon: "gas_meter", rating: 4.91, ratingCount: "85k", durationMins: 60, price: 299, desc: "Nitrogen pressure testing, copper brazing, and gas top-up" },
        ],
      },
      {
        id: "appliance-repair-services",
        title: "Appliance Repairs",
        services: [
          { id: "ac-4", name: "RO Water Purifier Membrane & Filter Service", icon: "water_drop", rating: 4.88, ratingCount: "98k", durationMins: 45, price: 249, desc: "Sediment, pre-carbon filter replacement, and TDS testing" },
          { id: "ac-5", name: "Washing Machine Drum & Motor Noise Fix", icon: "local_laundry_service", rating: 4.84, ratingCount: "78k", durationMins: 50, price: 249, desc: "Drain pump check, belt tension, and spin cycle troubleshooting" },
        ],
      },
    ],
  },

  // 11. Bleach & Detan
  "bleach-detan": {
    id: "bleach-detan",
    name: "Bleach & De-Tan Therapy",
    tag: "Instant Glow",
    rating: 4.84,
    ratingCount: "95K",
    categoryType: "Personal Care",
    icon: "brightness_6",
    chips: [
      { id: "face-bleach", label: "Face Bleach", icon: "brightness_6" },
      { id: "detan-pack", label: "De-Tan Pack", icon: "spa" },
      { id: "body-detan", label: "Full Body", icon: "self_care" },
    ],
    sections: [
      {
        id: "bleach-detan-services",
        title: "Bleach & De-Tan Packages",
        services: [
          { id: "bd-1", name: "OxyLife Radiance Face & Neck Bleach", icon: "brightness_6", rating: 4.79, ratingCount: "55k", durationMins: 30, price: 149, desc: "Infuses active oxygen to brighten skin tone instantly" },
          { id: "bd-2", name: "Raaga Professional Tan Removal Pack", icon: "spa", rating: 4.88, ratingCount: "72k", durationMins: 35, price: 199, desc: "Natural eucalyptus and clove oil tan removal" },
          { id: "bd-3", name: "Full Arms + Full Legs Tan Removal Pack", icon: "self_care", rating: 4.85, ratingCount: "40k", durationMins: 45, price: 249, desc: "Gentle de-tanning pack for sun exposed limbs" },
        ],
      },
    ],
  },

  // 12. TV Installing
  "tv-installing": {
    id: "tv-installing",
    name: "TV & Electronics Mounting",
    tag: "Precise Alignment",
    rating: 4.92,
    ratingCount: "68K",
    categoryType: "Home Services",
    icon: "tv",
    chips: [
      { id: "tv-mount", label: "TV Mounting", icon: "tv" },
      { id: "soundbar", label: "Soundbar", icon: "speaker" },
      { id: "unmount", label: "Unmounting", icon: "build" },
    ],
    sections: [
      {
        id: "tv-mounting-services",
        title: "TV & Home Theater Mounting",
        services: [
          { id: "tv-1", name: "LED / OLED TV Wall Mounting (Up to 55\")", icon: "tv", rating: 4.93, ratingCount: "48k", durationMins: 40, price: 249, desc: "Level laser alignment, wall anchor drilling, and cable hiding" },
          { id: "tv-2", name: "Large TV Wall Mount (65\" to 85\")", icon: "tv", rating: 4.91, ratingCount: "25k", durationMins: 50, price: 299, desc: "Heavy-duty double arm swivel bracket mounting" },
          { id: "tv-3", name: "Soundbar & Subwoofer Wall Mounting", icon: "speaker", rating: 4.88, ratingCount: "18k", durationMins: 30, price: 149, desc: "Secure audio bracket setup under TV" },
        ],
      },
    ],
  },

  // 13. Hair Care
  "hair-care": {
    id: "hair-care",
    name: "Hair Care & Spa",
    tag: "Salon Specialists",
    rating: 4.87,
    ratingCount: "110K",
    categoryType: "Personal Care",
    icon: "content_cut",
    chips: [
      { id: "hair-spa", label: "Hair Spa", icon: "content_cut" },
      { id: "haircut", label: "Haircut & Blowdry", icon: "brush" },
      { id: "scalp", label: "Scalp Scrub", icon: "spa" },
    ],
    sections: [
      {
        id: "hair-care-services",
        title: "Hair Nourishment & Styling",
        services: [
          { id: "hc-1", name: "L'Oreal Mythic Oil Deep Nourish Hair Spa", icon: "content_cut", rating: 4.91, ratingCount: "62k", durationMins: 50, price: 249, desc: "Deep conditioning cream massage with warm ozone steam" },
          { id: "hc-2", name: "Women's Layered / Bob Haircut & Blowdry", icon: "brush", rating: 4.88, ratingCount: "85k", durationMins: 45, price: 199, desc: "Consultation, precision styling cut, and serum finish" },
          { id: "hc-3", name: "Anti-Frizz Keratin Booster Therapy", icon: "spa", rating: 4.84, ratingCount: "34k", durationMins: 60, price: 299, desc: "Smooths frizzy and unmanageable split-end hair" },
        ],
      },
    ],
  },

  // 14. Head Massage
  "head-massage": {
    id: "head-massage",
    name: "Head Massage & Stress Relief",
    tag: "Ayurvedic Oils",
    rating: 4.94,
    ratingCount: "135K",
    categoryType: "Wellness",
    icon: "spa",
    chips: [
      { id: "ayurvedic", label: "Ayurvedic Oil", icon: "spa" },
      { id: "dry-head", label: "Dry Accupressure", icon: "self_improvement" },
      { id: "neck-shoulder", label: "Neck & Shoulder", icon: "healing" },
    ],
    sections: [
      {
        id: "head-massage-services",
        title: "Head & Neck Relief Sessions",
        services: [
          { id: "hm-1", name: "Brahmi & Bhringraj Ayurvedic Head Massage (30 mins)", icon: "spa", rating: 4.95, ratingCount: "78k", durationMins: 30, price: 299, desc: "Promotes deep sleep and calms mental fatigue" },
          { id: "hm-2", name: "Head + Neck + Shoulder Tension Relief (45 mins)", icon: "healing", rating: 4.93, ratingCount: "64k", durationMins: 45, price: 449, desc: "Releases upper trapezoid stiffness and headache pressure" },
        ],
      },
    ],
  },

  // 15. CA & Accounting
  "ca-accounting": {
    id: "ca-accounting",
    name: "CA & Accounting Services",
    tag: "ICAI Registered",
    rating: 4.92,
    ratingCount: "42K",
    categoryType: "Professional",
    icon: "account_balance",
    chips: [
      { id: "itr", label: "ITR Filing", icon: "receipt_long" },
      { id: "gst", label: "GST Compliance", icon: "receipt" },
      { id: "audit", label: "Financial Audit", icon: "account_balance" },
    ],
    sections: [
      {
        id: "accounting-services",
        title: "Taxation & Compliance",
        services: [
          { id: "ca-1", name: "Individual Income Tax Return (ITR-1 / ITR-2)", icon: "receipt_long", rating: 4.94, ratingCount: "28k", durationMins: 30, price: 249, desc: "Salary, house property, and capital gains tax filing by expert CA" },
          { id: "ca-2", name: "Business GST Registration & Monthly Filing", icon: "receipt", rating: 4.91, ratingCount: "18k", durationMins: 45, price: 299, desc: "Complete GSTIN setup and GSTR-1/3B filing support" },
          { id: "ca-3", name: "Private Limited / LLP Company Incorporation", icon: "account_balance", rating: 4.95, ratingCount: "12k", durationMins: 60, price: 299, desc: "Name approval, DIN, DSC, and ROC registration" },
        ],
      },
    ],
  },

  // 16. Legal Advisor
  "legal-advisor": {
    id: "legal-advisor",
    name: "Legal Advisory & Documentation",
    tag: "High Court Advocates",
    rating: 4.91,
    ratingCount: "35K",
    categoryType: "Professional",
    icon: "gavel",
    chips: [
      { id: "rental", label: "Rental Agreement", icon: "description" },
      { id: "property", label: "Property Verification", icon: "domain" },
      { id: "affidavit", label: "Affidavit & Notary", icon: "gavel" },
    ],
    sections: [
      {
        id: "legal-services",
        title: "Legal Agreements & Verification",
        services: [
          { id: "la-1", name: "Registered Rent Agreement at Doorstep", icon: "description", rating: 4.93, ratingCount: "22k", durationMins: 45, price: 299, desc: "Biometric verification and govt e-registration at your doorstep" },
          { id: "la-2", name: "Property Title Search & Legal Opinion", icon: "domain", rating: 4.92, ratingCount: "14k", durationMins: 60, price: 299, desc: "30-year deed search, encumbrance check, and advocate report" },
          { id: "la-3", name: "Legal Notice Drafting & Advocate Dispatch", icon: "gavel", rating: 4.88, ratingCount: "9k", durationMins: 45, price: 249, desc: "Recovery, tenant dispute, or consumer complaint legal notice" },
        ],
      },
    ],
  },

  // 17. Tax Consultant
  "tax-consultant": {
    id: "tax-consultant",
    name: "Tax Consultant",
    tag: "Tax Experts",
    rating: 4.9,
    ratingCount: "38K",
    categoryType: "Professional",
    icon: "receipt_long",
    chips: [
      { id: "itr-plan", label: "Tax Planning", icon: "calculate" },
      { id: "tds-refund", label: "TDS Refund", icon: "savings" },
      { id: "notice", label: "Tax Notice Reply", icon: "mail" },
    ],
    sections: [
      {
        id: "tax-consult-services",
        title: "Tax Optimization & Solutions",
        services: [
          { id: "tc-1", name: "Annual Tax Saving & Investment Consultation", icon: "calculate", rating: 4.92, ratingCount: "19k", durationMins: 40, price: 599, desc: "Maximize deductions under 80C, 80D, and new tax regime advice" },
          { id: "tc-2", name: "TDS Refund Tracking & Fast-Track Claim", icon: "savings", rating: 4.89, ratingCount: "15k", durationMins: 30, price: 449, desc: "Rectify mismatch in 26AS/AIS and claim refund" },
        ],
      },
    ],
  },

  // 18. Insurance
  "insurance": {
    id: "insurance",
    name: "Insurance Consultation",
    tag: "IRDAI Licensed",
    rating: 4.89,
    ratingCount: "30K",
    categoryType: "Professional",
    icon: "health_and_safety",
    chips: [
      { id: "health-ins", label: "Health Insurance", icon: "medical_services" },
      { id: "term-life", label: "Term Life Plan", icon: "shield" },
      { id: "motor-ins", label: "Car & Bike", icon: "directions_car" },
    ],
    sections: [
      {
        id: "insurance-services",
        title: "Insurance Advisory",
        services: [
          { id: "ins-1", name: "Family Health Insurance Policy Comparison & Claim Assist", icon: "medical_services", rating: 4.93, ratingCount: "18k", durationMins: 40, price: 299, desc: "No-commission honest comparison of cashless hospital networks" },
          { id: "ins-2", name: "Instant 2-Wheeler / 4-Wheeler Comprehensive Renewal", icon: "directions_car", rating: 4.88, ratingCount: "22k", durationMins: 20, price: 199, desc: "Best quote with zero-depreciation and roadside assistance" },
        ],
      },
    ],
  },

  // 19. Interior Design
  "interior-design": {
    id: "interior-design",
    name: "Interior Design & Space Planning",
    tag: "Expert Architects",
    rating: 4.94,
    ratingCount: "25K",
    categoryType: "Design",
    icon: "design_services",
    chips: [
      { id: "3d-design", label: "3D Visuals", icon: "view_in_ar" },
      { id: "modular", label: "Modular Kitchen", icon: "kitchen" },
      { id: "renovation", label: "Full Home", icon: "home" },
    ],
    sections: [
      {
        id: "interior-services",
        title: "Interior Consultations",
        services: [
          { id: "id-1", name: "Home Interior Consultation & 2D Floor Layout", icon: "design_services", rating: 4.95, ratingCount: "15k", durationMins: 60, price: 999, desc: "Architect visit, space measurements, and customized floor plan" },
          { id: "id-2", name: "Modular Kitchen 3D Render & Material Estimate", icon: "kitchen", rating: 4.93, ratingCount: "12k", durationMins: 60, price: 1499, desc: "Ergonomic cabinet layout, acrylic/laminate finish samples" },
        ],
      },
    ],
  },

  // 20. Physiotherapy
  "physiotherapy": {
    id: "physiotherapy",
    name: "Physiotherapy at Home",
    tag: "Certified Doctors",
    rating: 4.95,
    ratingCount: "62K",
    categoryType: "Healthcare",
    icon: "physical_therapy",
    chips: [
      { id: "back-pain", label: "Back & Spine", icon: "healing" },
      { id: "knee-joint", label: "Knee & Joint", icon: "accessibility_new" },
      { id: "post-op", label: "Post Surgery", icon: "medical_services" },
    ],
    sections: [
      {
        id: "physio-services",
        title: "Physiotherapy Sessions",
        services: [
          { id: "pt-1", name: "Back & Neck Pain Physiotherapy (TENS / Ultrasound)", icon: "healing", rating: 4.96, ratingCount: "38k", durationMins: 45, price: 599, desc: "Electrotherapy machine and targeted spinal mobilization exercises" },
          { id: "pt-2", name: "Knee Arthritis & Joint Mobility Session", icon: "accessibility_new", rating: 4.94, ratingCount: "29k", durationMins: 45, price: 599, desc: "Strengthen quadriceps and reduce knee stiffness" },
          { id: "pt-3", name: "Post-Fracture / Post-Surgery Rehab Session", icon: "medical_services", rating: 4.95, ratingCount: "18k", durationMins: 60, price: 799, desc: "Gait training and functional mobility recovery at home" },
        ],
      },
    ],
  },

  // 21. Nursing Care
  "nursing-care": {
    id: "nursing-care",
    name: "Home Nursing Care",
    tag: "Registered Nurses",
    rating: 4.93,
    ratingCount: "45K",
    categoryType: "Healthcare",
    icon: "medical_services",
    chips: [
      { id: "injection", label: "Injection/Dressing", icon: "vaccines" },
      { id: "iv-drip", label: "IV Infusion", icon: "water_drop" },
      { id: "catheter", label: "Catheter Care", icon: "medical_services" },
    ],
    sections: [
      {
        id: "nursing-services",
        title: "Clinical Nursing Procedures",
        services: [
          { id: "nc-1", name: "Wound Dressing & Suture Removal", icon: "medical_services", rating: 4.94, ratingCount: "26k", durationMins: 30, price: 249, desc: "Sterile antiseptic dressing by certified nurse" },
          { id: "nc-2", name: "IV Drip Infusion / Injection Administration", icon: "vaccines", rating: 4.92, ratingCount: "21k", durationMins: 45, price: 299, desc: "Prescription-verified saline / antibiotic cannula insertion" },
        ],
      },
    ],
  },

  // 22. Elder Care
  "elder-care": {
    id: "elder-care",
    name: "Elder Care & Attendant",
    tag: "Compassionate Care",
    rating: 4.96,
    ratingCount: "38K",
    categoryType: "Healthcare",
    icon: "elderly",
    chips: [
      { id: "day-care", label: "12-Hr Shift", icon: "schedule" },
      { id: "full-time", label: "24-Hr Live-in", icon: "home" },
      { id: "companion", label: "Mobility Assist", icon: "elderly" },
    ],
    sections: [
      {
        id: "elder-care-services",
        title: "Elder Care Attendants",
        services: [
          { id: "ec-1", name: "12-Hour Day / Night Patient Care Attendant", icon: "elderly", rating: 4.96, ratingCount: "22k", durationMins: 720, price: 999, desc: "Assistance with sponge bath, feeding, medication, and mobility" },
          { id: "ec-2", name: "Senior Vital Signs Checkup & Blood Pressure/Sugar Test", icon: "favorite", rating: 4.93, ratingCount: "32k", durationMins: 30, price: 199, desc: "Digital BP, pulse oximeter, and glucometer testing" },
        ],
      },
    ],
  },

  // 23. Lab Tests
  "lab-tests": {
    id: "lab-tests",
    name: "Diagnostic Lab Tests",
    tag: "NABL Accredited",
    rating: 4.9,
    ratingCount: "82K",
    categoryType: "Healthcare",
    icon: "biotech",
    chips: [
      { id: "full-body", label: "Full Body Check", icon: "biotech" },
      { id: "diabetes", label: "Diabetes Profile", icon: "water_drop" },
      { id: "thyroid", label: "Thyroid & Lipid", icon: "science" },
    ],
    sections: [
      {
        id: "lab-tests-services",
        title: "Blood Tests & Profiles",
        services: [
          { id: "lt-1", name: "Comprehensive Full Body Checkup (72 Parameters)", icon: "biotech", rating: 4.93, ratingCount: "54k", durationMins: 20, price: 899, desc: "CBC, Liver (LFT), Kidney (KFT), Lipid profile, Thyroid & Sugar" },
          { id: "lt-2", name: "HbA1c & Fasting Blood Sugar Diabetes Panel", icon: "water_drop", rating: 4.9, ratingCount: "35k", durationMins: 15, price: 349, desc: "3-month average glucose monitoring and fasting sugar" },
        ],
      },
    ],
  },

  // 24. Yoga Trainer
  "yoga-trainer": {
    id: "yoga-trainer",
    name: "Yoga Trainer & Fitness",
    tag: "Certified Gurus",
    rating: 4.94,
    ratingCount: "32K",
    categoryType: "Wellness",
    icon: "self_improvement",
    chips: [
      { id: "weight-loss", label: "Weight Loss", icon: "fitness_center" },
      { id: "pranayama", label: "Meditation", icon: "self_improvement" },
      { id: "personal", label: "1-on-1 Trial", icon: "person" },
    ],
    sections: [
      {
        id: "yoga-services",
        title: "Personal Yoga Sessions",
        services: [
          { id: "yt-1", name: "1-on-1 Personalized Home Yoga Session (60 mins)", icon: "self_improvement", rating: 4.95, ratingCount: "19k", durationMins: 60, price: 499, desc: "Asanas for flexibility, posture alignment, and deep breathing" },
          { id: "yt-2", name: "Monthly Yoga Package (12 In-Person Sessions)", icon: "fitness_center", rating: 4.94, ratingCount: "14k", durationMins: 60, price: 4999, desc: "Dedicated certified yoga instructor 3 days a week at your home" },
        ],
      },
    ],
  },

  // 25. Event Planning
  "event-planning": {
    id: "event-planning",
    name: "Event Planning & Coordination",
    tag: "Celebration Experts",
    rating: 4.91,
    ratingCount: "28K",
    categoryType: "Events",
    icon: "celebration",
    chips: [
      { id: "birthday", label: "Birthday Party", icon: "cake" },
      { id: "anniversary", label: "Anniversary", icon: "favorite" },
      { id: "corporate", label: "Corporate Event", icon: "business" },
    ],
    sections: [
      {
        id: "event-services",
        title: "Party Planning & Setup",
        services: [
          { id: "ep-event-1", name: "Complete Kids Birthday Party Coordinator & Host", icon: "celebration", rating: 4.93, ratingCount: "16k", durationMins: 180, price: 2999, desc: "Tattoo artist, magic show, games anchor, and music control" },
          { id: "ep-event-2", name: "Intimate Anniversary Home Candlelight Setup", icon: "favorite", rating: 4.95, ratingCount: "12k", durationMins: 120, price: 1999, desc: "Fairy lights, floral path, and personalized photo banner" },
        ],
      },
    ],
  },

  // 26. Catering
  "catering": {
    id: "catering",
    name: "Party Catering & Live Counters",
    tag: "FSSAI Certified",
    rating: 4.89,
    ratingCount: "34K",
    categoryType: "Events",
    icon: "restaurant",
    chips: [
      { id: "live-chaat", label: "Live Chaat", icon: "local_dining" },
      { id: "buffet", label: "Buffet Meal", icon: "restaurant" },
      { id: "hi-tea", label: "Hi-Tea Snacks", icon: "coffee" },
    ],
    sections: [
      {
        id: "catering-services",
        title: "Party Food & Live Stalls",
        services: [
          { id: "cat-1", name: "Live Chaat & Pani Puri Counter (Min 25 Persons)", icon: "local_dining", rating: 4.92, ratingCount: "18k", durationMins: 150, price: 3499, desc: "5 types of Pani Puri, Dahi Puri, Sev Puri with live chef" },
          { id: "cat-2", name: "North Indian / Mughlai Mini Buffet Box (Per Head)", icon: "restaurant", rating: 4.88, ratingCount: "22k", durationMins: 30, price: 299, desc: "Paneer butter masala, Dal makhani, Jeera rice, Naan, Gulab jamun" },
        ],
      },
    ],
  },

  // 27. Photography
  "photography": {
    id: "photography",
    name: "Event & Portrait Photography",
    tag: "Pro Photographers",
    rating: 4.93,
    ratingCount: "41K",
    categoryType: "Events",
    icon: "photo_camera",
    chips: [
      { id: "birthday-shoot", label: "Birthday Shoot", icon: "photo_camera" },
      { id: "maternity", label: "Maternity/Baby", icon: "child_care" },
      { id: "drone", label: "Drone Video", icon: "videocam" },
    ],
    sections: [
      {
        id: "photography-services",
        title: "Photography Sessions",
        services: [
          { id: "ph-1", name: "Birthday / Family Event Photographer (3 Hours)", icon: "photo_camera", rating: 4.95, ratingCount: "25k", durationMins: 180, price: 2499, desc: "Unlimited candid clicks, Sony Alpha A7IV, and 50 edited high-res photos" },
          { id: "ph-2", name: "Cinematic 4K Highlight Reel Video Shoot", icon: "videocam", rating: 4.91, ratingCount: "16k", durationMins: 180, price: 3499, desc: "Gimbal stabilized footage with Instagram reel teaser" },
        ],
      },
    ],
  },

  // 28. Decoration
  "decoration": {
    id: "decoration",
    name: "Balloon & Floral Decoration",
    tag: "Creative Artists",
    rating: 4.92,
    ratingCount: "48K",
    categoryType: "Events",
    icon: "window",
    chips: [
      { id: "balloon-arch", label: "Balloon Arch", icon: "celebration" },
      { id: "ring-backdrop", label: "Ring Backdrop", icon: "circle" },
      { id: "flower-decor", label: "Fresh Flowers", icon: "spa" },
    ],
    sections: [
      {
        id: "decoration-services",
        title: "Balloon & Theme Backdrops",
        services: [
          { id: "dec-1", name: "Classic Pastel Balloon Arch & Metallic Curtains", icon: "celebration", rating: 4.94, ratingCount: "32k", durationMins: 90, price: 1299, desc: "150 pastel balloons, foil birthday banner, and star foil accents" },
          { id: "dec-2", name: "Circular Ring Theme Backdrop with Neon Sign", icon: "circle", rating: 4.91, ratingCount: "21k", durationMins: 120, price: 2499, desc: "Golden ring structure, organic balloon garland, and LED Happy Birthday sign" },
        ],
      },
    ],
  },

  // 29. DJ & Music
  "dj-music": {
    id: "dj-music",
    name: "DJ & Sound System Setup",
    tag: "High-Bass Audio",
    rating: 4.9,
    ratingCount: "22K",
    categoryType: "Events",
    icon: "music_note",
    chips: [
      { id: "dj-console", label: "DJ with Console", icon: "music_note" },
      { id: "speakers", label: "JBL Sound System", icon: "speaker" },
      { id: "party-lights", label: "Laser & Lights", icon: "lightbulb" },
    ],
    sections: [
      {
        id: "dj-services",
        title: "Audio & DJ Packages",
        services: [
          { id: "dj-1", name: "Pro DJ + 2000W JBL Sound System (3 Hours)", icon: "music_note", rating: 4.92, ratingCount: "14k", durationMins: 180, price: 3999, desc: "Bollywood, Commercial, EDM live mixing with 2 wireless mics" },
          { id: "dj-2", name: "Party Laser Lights & Fog Smoke Machine Add-on", icon: "lightbulb", rating: 4.88, ratingCount: "9k", durationMins: 180, price: 1499, desc: "Multi-color moving heads, strobe lights, and dense fog" },
        ],
      },
    ],
  },

  // 30. Market & Heavy Bag Shopping Assistant
  "shopping-bag-assistant": {
    id: "shopping-bag-assistant",
    name: "Market & Heavy Bag Assistant",
    tag: "Elder Care & Shopping Companion",
    rating: 4.96,
    ratingCount: "18K",
    categoryType: "Shopping & Market Companion",
    icon: "shopping_bag",
    chips: [
      { id: "market-bags", label: "Bag Carrying", icon: "shopping_bag" },
      { id: "elder-care", label: "Elderly Companion", icon: "elderly" },
      { id: "grocery-bazaar", label: "Bazaar Helper", icon: "storefront" },
    ],
    sections: [
      {
        id: "shopping-packages",
        title: "Assistant Packages",
        services: [
          {
            id: "sba-1",
            name: "1-Hour Quick Market & Bag Carrying Assistant",
            icon: "shopping_bag",
            rating: 4.95,
            ratingCount: "8k",
            durationMins: 60,
            price: 149,
            desc: "Dedicated polite helper to accompany to local bazaar, carry heavy bags (up to 20kg), and help load/unload."
          },
          {
            id: "sba-2",
            name: "2-Hour Complete Grocery & Bazaar Companion (Elder Care)",
            icon: "elderly",
            rating: 4.98,
            ratingCount: "12k",
            durationMins: 120,
            price: 279,
            desc: "Patient, caring assistant for senior citizens or families. Full market walk-along, heavy bag lifting, cart handling, and doorstep drop."
          },
          {
            id: "sba-3",
            name: "Half-Day (4 Hours) Festival & Bulk Shopping Assistant",
            icon: "shopping_cart",
            rating: 4.93,
            ratingCount: "5k",
            durationMins: 240,
            price: 499,
            desc: "Extended companion for bulk shopping, multi-market trips, wedding shopping, or festival preparations."
          },
        ],
      },
    ],
  },

  // 31. New City Shopping Guide & Market Navigator
  "city-shopping-guide": {
    id: "city-shopping-guide",
    name: "New City Shopping Guide",
    tag: "Local Market Navigator & Bargaining Companion",
    rating: 4.94,
    ratingCount: "14K",
    categoryType: "City Guide & Shopping Companion",
    icon: "explore",
    chips: [
      { id: "wholesale-markets", label: "Wholesale Markets", icon: "store" },
      { id: "bargaining", label: "Bargaining & Rates", icon: "handshake" },
      { id: "city-navigation", label: "Market Navigation", icon: "explore" },
    ],
    sections: [
      {
        id: "guide-packages",
        title: "City Shopping Guide Packages",
        services: [
          {
            id: "csg-1",
            name: "2-Hour Local Wholesale & Hidden Market Explorer",
            icon: "explore",
            rating: 4.92,
            ratingCount: "6k",
            durationMins: 120,
            price: 299,
            desc: "Local insider takes you directly to authentic wholesale shops, avoiding tourist traps and high retail markups."
          },
          {
            id: "csg-2",
            name: "4-Hour Half-Day Complete City Shopping & Bargaining Guide",
            icon: "handshake",
            rating: 4.96,
            ratingCount: "11k",
            durationMins: 240,
            price: 549,
            desc: "Accompanied shopping trip across top markets. Guide helps negotiate best prices, overcomes language barriers, and manages local transport."
          },
          {
            id: "csg-3",
            name: "Full-Day (8 Hours) Home Setup & Multi-Market Shopping Companion",
            icon: "home_work",
            rating: 4.94,
            ratingCount: "4k",
            durationMins: 480,
            price: 999,
            desc: "Complete personal guide for newcomers setting up a home: furniture, utensils, clothes, electronics, and daily essentials across the city."
          },
        ],
      },
    ],
  },

  // ── Core Skilled Cooperative Federation Workforce (10 Essential Trades) ──

  "electricians": {
    id: "electricians",
    name: "Electricians",
    tag: "Federation Certified Electricians",
    rating: 4.92,
    ratingCount: "34K",
    categoryType: "Cooperative Skilled Trades",
    icon: "bolt",
    chips: [
      { id: "switches", label: "Switches & Sockets", icon: "power" },
      { id: "fans-lights", label: "Fans & Light Fitting", icon: "lightbulb" },
      { id: "mcb-fuse", label: "MCB & Short Circuit", icon: "bolt" },
      { id: "inverter", label: "Inverter & Earthing", icon: "battery_charging_full" },
    ],
    sections: [
      {
        id: "switches-wiring",
        title: "Switches, Wiring & Outlets",
        services: [
          { id: "elec-1", name: "Switch & Socket Replacement / Repair", icon: "power", rating: 4.91, ratingCount: "28k", durationMins: 30, price: 129, originalPrice: 199, desc: "Burnt switch replacement, 16A AC/Geyser socket installation, loose wiring fix" },
          { id: "elec-2", name: "Complete Switchboard Assembly & Installation", icon: "power", rating: 4.89, ratingCount: "19k", durationMins: 45, price: 249, originalPrice: 349, desc: "New modular switchboard fixing with internal looping and phase testing" },
          { id: "elec-3", name: "Concealed Wiring Short Circuit Fault Finding", icon: "bolt", rating: 4.94, ratingCount: "14k", durationMins: 60, price: 349, originalPrice: 499, desc: "Tracing burnt concealed line, neutral break, and junction box testing" },
        ],
      },
      {
        id: "fans-lighting",
        title: "Fans, Chandeliers & Lighting",
        services: [
          { id: "elec-4", name: "Ceiling Fan Installation & Speed Check", icon: "air", rating: 4.9, ratingCount: "24k", durationMins: 35, price: 199, originalPrice: 279, desc: "Down-rod mounting, capacitor check, safety wire and regulator connection" },
          { id: "elec-5", name: "LED Tube, Spotlights & Wall Sconce Fitting", icon: "lightbulb", rating: 4.88, ratingCount: "16k", durationMins: 30, price: 149, originalPrice: 219, desc: "Drill, plug and mount LED batten, false ceiling lights, and fancy lights" },
          { id: "elec-6", name: "Heavy Chandelier Assembly & Anchor Fitting", icon: "lightbulb", rating: 4.93, ratingCount: "8k", durationMins: 75, price: 449, originalPrice: 699, desc: "Ceiling anchor fastener hook, crystal assembly, and load distribution check" },
        ],
      },
      {
        id: "power-backup",
        title: "Power Backup & Safety Distribution",
        services: [
          { id: "elec-7", name: "MCB / ELCB Tripping Fault Diagnostic & Fix", icon: "bolt", rating: 4.95, ratingCount: "18k", durationMins: 40, price: 249, originalPrice: 349, desc: "Find earth leakage, balance phase load, and replace damaged MCB" },
          { id: "elec-8", name: "Home Inverter & Battery Setup / Wiring", icon: "battery_charging_full", rating: 4.92, ratingCount: "12k", durationMins: 60, price: 399, originalPrice: 599, desc: "Separate inverter line routing, battery water level test, and safety earthing" },
        ],
      },
    ],
  },

  "plumbers": {
    id: "plumbers",
    name: "Plumbers",
    tag: "Licensed Cooperative Plumbers",
    rating: 4.89,
    ratingCount: "31K",
    categoryType: "Cooperative Skilled Trades",
    icon: "plumbing",
    chips: [
      { id: "taps-mixer", label: "Taps & Mixer", icon: "plumbing" },
      { id: "pipe-leakage", label: "Pipe Leakage", icon: "water_damage" },
      { id: "drain-unblock", label: "Drain Blockage", icon: "cleaning_services" },
      { id: "toilet-tank", label: "Toilet & Overhead Tank", icon: "water" },
    ],
    sections: [
      {
        id: "taps-sanitary",
        title: "Taps, Mixers & Sanitary Fittings",
        services: [
          { id: "plumb-1", name: "Tap / Wall Mixer Repair & Spindle Replace", icon: "plumbing", rating: 4.89, ratingCount: "26k", durationMins: 30, price: 149, originalPrice: 229, desc: "Fix dripping taps, ceramic disc cartridges, internal washers, and loose levers" },
          { id: "plumb-2", name: "Health Faucet / Jet Spray Installation & Fix", icon: "plumbing", rating: 4.92, ratingCount: "22k", durationMins: 25, price: 179, originalPrice: 249, desc: "Fitting new bidet spray, stainless steel hose, and angle valve connection" },
          { id: "plumb-3", name: "Wash Basin Sink Pipe Leakage & Trap Fix", icon: "plumbing", rating: 4.87, ratingCount: "19k", durationMins: 35, price: 199, originalPrice: 289, desc: "Install flexible waste pipe, bottle trap, silicone sealing, and drain check" },
        ],
      },
      {
        id: "drain-sewer",
        title: "Drainage, Blockage & Tank",
        services: [
          { id: "plumb-4", name: "Kitchen Sink Deep Drain Unclogging", icon: "cleaning_services", rating: 4.91, ratingCount: "18k", durationMins: 45, price: 249, originalPrice: 349, desc: "Rotary snake spring wire clearance for stubborn grease and food residue" },
          { id: "plumb-5", name: "Toilet Flush Tank Overhaul & Siphon Kit", icon: "water", rating: 4.88, ratingCount: "14k", durationMins: 40, price: 249, originalPrice: 349, desc: "Fix continuous trickle, inlet ball valve replacement, and flush button fix" },
          { id: "plumb-6", name: "Overhead Water Tank Connection & Float Valve", icon: "water", rating: 4.93, ratingCount: "11k", durationMins: 60, price: 399, originalPrice: 599, desc: "Automatic float ball valve fitting, overflow pipe, and bypass connection" },
        ],
      },
    ],
  },

  "carpenters": {
    id: "carpenters",
    name: "Carpenters",
    tag: "Master Cooperative Carpenters",
    rating: 4.9,
    ratingCount: "23K",
    categoryType: "Cooperative Skilled Trades",
    icon: "carpenter",
    chips: [
      { id: "door-locks", label: "Door & Locks", icon: "lock" },
      { id: "furniture-repair", label: "Furniture Repair", icon: "chair" },
      { id: "drill-hang", label: "Drill & Hang", icon: "construction" },
      { id: "wardrobe", label: "Wardrobe & Modular", icon: "door_sliding" },
    ],
    sections: [
      {
        id: "door-security",
        title: "Doors, Locks & Handles",
        services: [
          { id: "carp-1", name: "Main Door / Bedroom Mortise Lock Installation", icon: "lock", rating: 4.92, ratingCount: "17k", durationMins: 40, price: 249, originalPrice: 349, desc: "Precision wood chisel cut, mortise body fitting, handle and keys test" },
          { id: "carp-2", name: "Wooden Door Trimming, Alignment & Stopper", icon: "door_front", rating: 4.87, ratingCount: "13k", durationMins: 35, price: 199, originalPrice: 289, desc: "Planer wood shaving for floor jamming, magnetic door stopper and latch" },
          { id: "carp-3", name: "Door Aldrop, Tower Bolt & Handle Fitting", icon: "lock", rating: 4.89, ratingCount: "11k", durationMins: 30, price: 149, originalPrice: 219, desc: "Secure stainless steel or brass hardware mounting on interior/exterior doors" },
        ],
      },
      {
        id: "furniture-drill",
        title: "Furniture Repair & Wall Drill Mounts",
        services: [
          { id: "carp-4", name: "Bed, Sofa & Dining Table Structure Repair", icon: "chair", rating: 4.91, ratingCount: "15k", durationMins: 50, price: 299, originalPrice: 429, desc: "Loose frame re-tightening, corner brackets, slat replacement, and leveling" },
          { id: "carp-5", name: "Wardrobe Soft-Close Hinge & Channel Fix", icon: "door_sliding", rating: 4.88, ratingCount: "14k", durationMins: 40, price: 199, originalPrice: 289, desc: "Telescopic drawer channel replacement and hydraulic cabinet hinge adjust" },
          { id: "carp-6", name: "Drill & Mount (TV, Curtains, Mirrors, Shelves)", icon: "construction", rating: 4.94, ratingCount: "22k", durationMins: 30, price: 149, originalPrice: 229, desc: "Heavy-duty wall anchors, precision spirit level alignment up to 3 items" },
        ],
      },
    ],
  },

  "painters": {
    id: "painters",
    name: "Painters",
    tag: "Verified Cooperative Painters",
    rating: 4.93,
    ratingCount: "21K",
    categoryType: "Cooperative Skilled Trades",
    icon: "format_paint",
    chips: [
      { id: "full-home", label: "Full Home Painting", icon: "home" },
      { id: "waterproof", label: "Waterproofing", icon: "water_damage" },
      { id: "putty-primer", label: "Putty & Primer", icon: "format_paint" },
      { id: "wood-metal", label: "Wood & Metal Polish", icon: "brush" },
    ],
    sections: [
      {
        id: "home-painting-pkgs",
        title: "Complete Home Painting & Touchups",
        services: [
          { id: "paint-1", name: "1 BHK Complete Interior Painting (Labor)", icon: "home", rating: 4.93, ratingCount: "12k", durationMins: 720, price: 3499, originalPrice: 4499, desc: "Wall sanding, 2 coats premium emulsion paint, ceiling coat, floor masking" },
          { id: "paint-2", name: "2 BHK Complete Interior Painting (Labor)", icon: "home", rating: 4.94, ratingCount: "15k", durationMins: 1440, price: 5999, originalPrice: 7499, desc: "Complete 2 coats roller finish, door/window border touchups, post-clean" },
          { id: "paint-3", name: "Single Room / Accent Feature Wall Paint", icon: "format_paint", rating: 4.9, ratingCount: "9k", durationMins: 180, price: 999, originalPrice: 1399, desc: "Designer stencil or bold color accent wall with crisp border tape finish" },
        ],
      },
      {
        id: "seepage-wood",
        title: "Waterproofing, Seepage & Wood Polishing",
        services: [
          { id: "paint-4", name: "Wall Dampness, Peeling & Seepage Treatment", icon: "water_damage", rating: 4.91, ratingCount: "11k", durationMins: 90, price: 599, originalPrice: 849, desc: "Scraping loose plaster, anti-efflorescence chemical coat, waterproof putty" },
          { id: "paint-5", name: "Balcony & Window Grill Enamel Spray / Paint", icon: "brush", rating: 4.88, ratingCount: "8k", durationMins: 120, price: 499, originalPrice: 699, desc: "Rust wire-brushing, anti-rust red oxide primer, and 2 coats glossy black/silver" },
        ],
      },
    ],
  },

  "domestic-helpers": {
    id: "domestic-helpers",
    name: "Domestic Helpers",
    tag: "Police Verified Cooperative House Help",
    rating: 4.94,
    ratingCount: "42K",
    categoryType: "Cooperative Skilled Trades",
    icon: "home_work",
    chips: [
      { id: "daily-help", label: "Daily House Help", icon: "cleaning_services" },
      { id: "utensils", label: "Utensils Washing", icon: "countertops" },
      { id: "cooking", label: "Cooking Assistant", icon: "restaurant" },
      { id: "full-day", label: "Full Day Helper", icon: "schedule" },
    ],
    sections: [
      {
        id: "daily-chores",
        title: "Daily Chores & Floor Cleaning",
        services: [
          { id: "dh-1", name: "Daily Floor Sweeping & Mopping (Jhadu Pocha)", icon: "cleaning_services", rating: 4.92, ratingCount: "33k", durationMins: 45, price: 199, originalPrice: 299, desc: "Thorough floor broom, disinfectant wet mop, corners and under-furniture sweep" },
          { id: "dh-2", name: "Utensils Cleaning & Kitchen Sink Wash (Bartan)", icon: "countertops", rating: 4.91, ratingCount: "29k", durationMins: 40, price: 179, originalPrice: 249, desc: "Scrubbing pots, pans, plates, cutlery with liquid soap, and countertop wipe" },
          { id: "dh-3", name: "Dusting, Balcony Wash & Trash Disposal", icon: "delete_sweep", rating: 4.89, ratingCount: "17k", durationMins: 45, price: 249, originalPrice: 349, desc: "Table, shelf & TV console microfiber dusting, balcony rinse, trash bags out" },
        ],
      },
      {
        id: "assisted-cooking",
        title: "Cooking & Extended Assistance",
        services: [
          { id: "dh-4", name: "Meal Preparation & Vegetable Chopping Helper", icon: "restaurant", rating: 4.95, ratingCount: "14k", durationMins: 90, price: 299, originalPrice: 429, desc: "Chopping veggies, kneading atta, tadka prep, and kitchen assistance" },
          { id: "dh-5", name: "Full-Day Dedicated Household Helper (8 Hours)", icon: "schedule", rating: 4.96, ratingCount: "8k", durationMins: 480, price: 799, originalPrice: 1099, desc: "Dedicated cooperative verified helper for day-long family chores and organization" },
        ],
      },
    ],
  },

  "caregivers": {
    id: "caregivers",
    name: "Caregivers",
    tag: "Certified Compassionate Caregivers",
    rating: 4.96,
    ratingCount: "25K",
    categoryType: "Cooperative Skilled Trades",
    icon: "elderly",
    chips: [
      { id: "elder-care", label: "Elderly Companion", icon: "elderly" },
      { id: "patient-care", label: "Patient Attendant", icon: "medical_services" },
      { id: "night-shift", label: "12-Hour Shift", icon: "bedtime" },
      { id: "post-surgery", label: "Post-Surgery Recovery", icon: "healing" },
    ],
    sections: [
      {
        id: "elderly-support",
        title: "Elder Companion & Patient Support",
        services: [
          { id: "care-1", name: "Elderly Companion & Walking Assistant (4 Hours)", icon: "elderly", rating: 4.97, ratingCount: "16k", durationMins: 240, price: 399, originalPrice: 549, desc: "Assisted walking, reading, conversation, medication reminders, light support" },
          { id: "care-2", name: "12-Hour Day / Night Patient Nursing Attendant", icon: "medical_services", rating: 4.95, ratingCount: "12k", durationMins: 720, price: 799, originalPrice: 1099, desc: "Vital monitoring (BP/sugar/pulse), sponge bath, diaper change, mobility aid" },
          { id: "care-3", name: "Post-Hospitalization Surgery Recovery Care (8 Hr)", icon: "healing", rating: 4.94, ratingCount: "9k", durationMins: 480, price: 649, originalPrice: 899, desc: "Gentle recovery assistance, wound dressing supervision, feeding, and hygiene" },
        ],
      },
    ],
  },

  "drivers": {
    id: "drivers",
    name: "Drivers",
    tag: "Verified Commercial & Private Drivers",
    rating: 4.91,
    ratingCount: "33K",
    categoryType: "Cooperative Skilled Trades",
    icon: "directions_car",
    chips: [
      { id: "city-hourly", label: "City Hourly", icon: "schedule" },
      { id: "outstation", label: "Outstation Trip", icon: "navigation" },
      { id: "commercial", label: "Commercial Vehicle", icon: "local_shipping" },
      { id: "night-drive", label: "Night Driver", icon: "nightlight" },
    ],
    sections: [
      {
        id: "city-driving",
        title: "Personal City & Outstation Driving",
        services: [
          { id: "drv-1", name: "4-Hour On-Demand City Driver (Your Car)", icon: "directions_car", rating: 4.92, ratingCount: "22k", durationMins: 240, price: 349, originalPrice: 479, desc: "Experienced verified driver for shopping trips, hospital visits, office transit" },
          { id: "drv-2", name: "8-Hour Full-Day City Driver (Your Car)", icon: "schedule", rating: 4.93, ratingCount: "18k", durationMins: 480, price: 599, originalPrice: 799, desc: "Full day chauffeur for intra-city commute, meetings, family functions" },
          { id: "drv-3", name: "24-Hour Outstation Round-Trip Driver", icon: "navigation", rating: 4.91, ratingCount: "11k", durationMins: 1440, price: 1199, originalPrice: 1599, desc: "Highway-expert driver for family weekend trips, pilgrimage, and round tours" },
        ],
      },
      {
        id: "commercial-pickup",
        title: "Commercial & Night Shifts",
        services: [
          { id: "drv-4", name: "Safe Late-Night Return Driver (Party / Travel)", icon: "nightlight", rating: 4.94, ratingCount: "13k", durationMins: 180, price: 399, originalPrice: 549, desc: "Drop you safely home in your own car late at night or early morning flight drop" },
          { id: "drv-5", name: "Commercial Pickup / Tempo Driver (Shift)", icon: "local_shipping", rating: 4.88, ratingCount: "8k", durationMins: 480, price: 799, originalPrice: 1049, desc: "Licensed driver for light commercial vehicles, mandi deliveries, warehouse routes" },
        ],
      },
    ],
  },

  "gardeners": {
    id: "gardeners",
    name: "Gardeners",
    tag: "Skilled Cooperative Gardeners (Mali)",
    rating: 4.88,
    ratingCount: "18K",
    categoryType: "Cooperative Skilled Trades",
    icon: "yard",
    chips: [
      { id: "lawn-mowing", label: "Lawn Mowing & Weeding", icon: "grass" },
      { id: "pruning", label: "Pruning & Trimming", icon: "content_cut" },
      { id: "potting", label: "Potting & Compost", icon: "compost" },
      { id: "terrace-care", label: "Terrace Garden", icon: "deck" },
    ],
    sections: [
      {
        id: "garden-upkeep",
        title: "Lawn & Shrub Maintenance",
        services: [
          { id: "gard-1", name: "Lawn Mowing, Edge Trimming & Weeding", icon: "grass", rating: 4.9, ratingCount: "14k", durationMins: 90, price: 299, originalPrice: 419, desc: "Grass cutting with mower, manual weeding from root, border edging, clean disposal" },
          { id: "gard-2", name: "Shrub Pruning, Hedge Shaping & Deadheading", icon: "content_cut", rating: 4.87, ratingCount: "11k", durationMins: 60, price: 249, originalPrice: 349, desc: "Decorative hedge trimming, clearing dry yellow leaves, and stem stimulation" },
          { id: "gard-3", name: "Organic Vermicompost & Soil Aeration (10 Pots)", icon: "compost", rating: 4.92, ratingCount: "13k", durationMins: 60, price: 299, originalPrice: 399, desc: "Loosening root soil, adding rich worm-castings compost, and pest repellant neem cake" },
        ],
      },
      {
        id: "pot-terrace",
        title: "Repotting & Balcony Plant Revamp",
        services: [
          { id: "gard-4", name: "Plant Repotting & Soil Mix Refresh (Up to 8 Pots)", icon: "potted_plant", rating: 4.89, ratingCount: "9k", durationMins: 60, price: 249, originalPrice: 349, desc: "Moving root-bound plants to bigger pots with fresh cocopeat, sand, and manure" },
          { id: "gard-5", name: "Terrace / Balcony Complete Garden Revival", icon: "deck", rating: 4.93, ratingCount: "7k", durationMins: 120, price: 449, originalPrice: 649, desc: "Pruning, pest spray, fertilizer, floor wash, and aesthetic plant rearrangement" },
        ],
      },
    ],
  },

  "cleaners": {
    id: "cleaners",
    name: "Cleaners",
    tag: "Professional Deep Cleaners",
    rating: 4.93,
    ratingCount: "52K",
    categoryType: "Cooperative Skilled Trades",
    icon: "cleaning_services",
    chips: [
      { id: "full-home", label: "Full Home Deep Clean", icon: "home" },
      { id: "bathroom", label: "Bathroom Scrubbing", icon: "bathroom" },
      { id: "kitchen", label: "Kitchen Degreasing", icon: "kitchen" },
      { id: "sofa-carpet", label: "Sofa & Carpet", icon: "chair" },
    ],
    sections: [
      {
        id: "deep-cleaning-pkgs",
        title: "Full Home Intensive Machine Cleaning",
        services: [
          { id: "cln-1", name: "1 BHK Full Home Machine Deep Cleaning", icon: "home", rating: 4.93, ratingCount: "26k", durationMins: 210, price: 1499, originalPrice: 1999, desc: "Single disc floor scrubbing, balcony wash, window glass polish, fan & cobweb clear" },
          { id: "cln-2", name: "2 BHK Full Home Machine Deep Cleaning", icon: "home", rating: 4.95, ratingCount: "31k", durationMins: 300, price: 2199, originalPrice: 2899, desc: "Complete 2 bedroom, hall, kitchen & 2 bathrooms deep sanitation with industrial machines" },
          { id: "cln-3", name: "3 BHK Full Home Machine Deep Cleaning", icon: "home", rating: 4.96, ratingCount: "19k", durationMins: 390, price: 2799, originalPrice: 3599, desc: "Intensive 3 BHK deep scrubbing, high-pressure machine wash for balconies & tiles" },
        ],
      },
      {
        id: "room-specific-clean",
        title: "Bathroom, Kitchen & Upholstery Deep Clean",
        services: [
          { id: "cln-4", name: "Bathroom Hard Water Stain Scrub & Descaling", icon: "bathroom", rating: 4.91, ratingCount: "24k", durationMins: 60, price: 349, originalPrice: 499, desc: "Acid-free tile grout cleaner, shower tap shine, mirror & commode sanitization" },
          { id: "cln-5", name: "Modular Kitchen Degreasing & Oil Stains Clear", icon: "kitchen", rating: 4.9, ratingCount: "18k", durationMins: 75, price: 499, originalPrice: 699, desc: "Chimney exterior, cabinets inside/out, stovetop & wall tile grease wipe" },
          { id: "cln-6", name: "Sofa Dry Vacuum & Wet Extraction (3 Seater)", icon: "chair", rating: 4.92, ratingCount: "15k", durationMins: 60, price: 449, originalPrice: 599, desc: "Foam shampoo injection, deep extraction vacuum, dust mite and stain removal" },
        ],
      },
    ],
  },

  "technicians": {
    id: "technicians",
    name: "Technicians",
    tag: "Certified Appliance & Equipment Technicians",
    rating: 4.92,
    ratingCount: "39K",
    categoryType: "Cooperative Skilled Trades",
    icon: "build",
    chips: [
      { id: "ac-service", label: "AC Repair & Jet Service", icon: "ac_unit" },
      { id: "washing-machine", label: "Washing Machine", icon: "local_laundry_service" },
      { id: "refrigerator", label: "Refrigerator", icon: "kitchen" },
      { id: "geyser-micro", label: "Geyser & Microwave", icon: "microwave" },
    ],
    sections: [
      {
        id: "air-conditioning",
        title: "AC Servicing & Gas Top-Up",
        services: [
          { id: "tech-1", name: "Split / Window AC Power Jet Foam Cleaning", icon: "ac_unit", rating: 4.94, ratingCount: "32k", durationMins: 45, price: 399, originalPrice: 549, desc: "Deep pressure pump wash, indoor cooling coil wash, filter & tray sanitize" },
          { id: "tech-2", name: "AC Gas Leakage Check & Full Refrigerant Top-Up", icon: "ac_unit", rating: 4.91, ratingCount: "17k", durationMins: 60, price: 1499, originalPrice: 1999, desc: "Nitrogen pressure testing, copper brazing, vacuuming, and R32/R410A gas refill" },
          { id: "tech-3", name: "AC Uninstallation & Reinstallation Setup", icon: "ac_unit", rating: 4.9, ratingCount: "12k", durationMins: 90, price: 699, originalPrice: 999, desc: "Wall bracket mounting, outdoor stand anchor, copper pipe connection & test" },
        ],
      },
      {
        id: "home-appliances-tech",
        title: "Washing Machine, Fridge & Geyser",
        services: [
          { id: "tech-4", name: "Washing Machine Spin, Drain & PCB Diagnostic", icon: "local_laundry_service", rating: 4.89, ratingCount: "19k", durationMins: 45, price: 299, originalPrice: 429, desc: "Check front/top load motor, drain pump, inlet valve, and drum suspension" },
          { id: "tech-5", name: "Refrigerator Cooling Issue & Gas Charging", icon: "kitchen", rating: 4.9, ratingCount: "16k", durationMins: 50, price: 299, originalPrice: 449, desc: "Single/double door cooling coil check, compressor relay, defrost timer repair" },
          { id: "tech-6", name: "Water Geyser Heating Element & Thermostat Fix", icon: "water_heater", rating: 4.92, ratingCount: "14k", durationMins: 40, price: 299, originalPrice: 419, desc: "Replace burnt copper element, reset thermostat, descale internal tank" },
        ],
      },
    ],
  },

};

/**
 * Universal Category Resolver:
 * Maps direct category IDs, human titles, URLs, and search keywords to the right catalog item.
 */
const ALIAS_MAP = {

  // ── 10 Core Skilled Cooperative Workforce Trades ─────────────────────
  "electricians": "electricians",
  "electrician": "electricians",
  "electrical": "electricians",
  "plumbers": "plumbers",
  "plumber": "plumbers",
  "plumbing": "plumbers",
  "carpenters": "carpenters",
  "carpenter": "carpenters",
  "carpentry": "carpenters",
  "painters": "painters",
  "painter": "painters",
  "painting": "painters",
  "domestic-helpers": "domestic-helpers",
  "domestic-helper": "domestic-helpers",
  "domestic helper": "domestic-helpers",
  "domestic-help": "domestic-helpers",
  "house-help": "domestic-helpers",
  "caregivers": "caregivers",
  "caregiver": "caregivers",
  "elderly-care": "caregivers",
  "drivers": "drivers",
  "driver": "drivers",
  "chauffeur": "drivers",
  "gardeners": "gardeners",
  "gardener": "gardeners",
  "mali": "gardeners",
  "gardening": "gardeners",
  "cleaners": "cleaners",
  "cleaner": "cleaners",
  "cleaning": "cleaners",
  "technicians": "technicians",
  "technician": "technicians",

  // ── Agriculture & Farm Mechanization ──────────────────────────────────
  "tractor-operator": "tractor-operator",
  "tractor": "tractor-operator",
  "harvester": "tractor-operator",
  "rotavator": "tractor-operator",
  "solar-pump-repair": "solar-pump-repair",
  "solar-pump": "solar-pump-repair",
  "solar pump": "solar-pump-repair",
  "tube-well": "solar-pump-repair",
  "tubewell": "solar-pump-repair",
  "borewell": "solar-pump-repair",
  "agri-drone-spray": "agri-drone-spray",
  "agri-drone": "agri-drone-spray",
  "drone": "agri-drone-spray",
  "drone-spray": "agri-drone-spray",
  "soil-testing-compost": "soil-testing-compost",
  "soil-testing": "soil-testing-compost",
  "soil-test": "soil-testing-compost",
  "compost": "soil-testing-compost",
  "drip-irrigation-fix": "drip-irrigation-fix",
  "drip-irrigation": "drip-irrigation-fix",
  "micro-irrigation": "drip-irrigation-fix",

  // ── FoodTech, Agro-Processing & Storage ───────────────────────────────
  "cold-storage-tech": "cold-storage-tech",
  "cold-storage": "cold-storage-tech",
  "cold storage": "cold-storage-tech",
  "chiller": "cold-storage-tech",
  "cold room": "cold-storage-tech",
  "flour-oil-mill-op": "flour-oil-mill-op",
  "flour-mill": "flour-oil-mill-op",
  "oil-mill": "flour-oil-mill-op",
  "atta-chakki": "flour-oil-mill-op",
  "grain-sorting-grading": "grain-sorting-grading",
  "grain-sorter": "grain-sorting-grading",
  "seed-grader": "grain-sorting-grading",
  "seed-sorting": "grain-sorting-grading",
  "agro-packaging-labor": "agro-packaging-labor",
  "packaging-labor": "agro-packaging-labor",
  "fpo-packaging": "agro-packaging-labor",
  "jaggery-spice-proc": "jaggery-spice-proc",
  "jaggery": "jaggery-spice-proc",
  "gur": "jaggery-spice-proc",
  "spice-processing": "jaggery-spice-proc",

  // ── Rural Infrastructure & Panchayat Services ─────────────────────────
  "panchayat-sanitation": "panchayat-sanitation",
  "village-cleanliness": "panchayat-sanitation",
  "rural-solar-rooftop": "rural-solar-rooftop",
  "solar-rooftop": "rural-solar-rooftop",
  "rooftop-solar": "rural-solar-rooftop",
  "water-pipeline-repair": "water-pipeline-repair",
  "pipeline-repair": "water-pipeline-repair",
  "handpump-repair": "water-pipeline-repair",
  "handpump": "water-pipeline-repair",
  "jal-jeevan": "water-pipeline-repair",
  "rural-mason-biogas": "rural-mason-biogas",
  "rural-mason": "rural-mason-biogas",
  "biogas": "rural-mason-biogas",
  "gobar-gas": "rural-mason-biogas",
  "rural-electrician": "rural-electrician",
  "farm-electrician": "rural-electrician",

  // ── Dairy, Livestock & Paravet ────────────────────────────────────────
  "paravet-health-check": "paravet-health-check",
  "paravet": "paravet-health-check",
  "pashu-sakhi": "paravet-health-check",
  "dairy-farm-helper": "dairy-farm-helper",
  "dairy-helper": "dairy-farm-helper",
  "cow-milking": "dairy-farm-helper",
  "poultry-goat-assistant": "poultry-goat-assistant",
  "poultry-assistant": "poultry-goat-assistant",
  "goat-farm": "poultry-goat-assistant",
  "cattle-feed-silage": "cattle-feed-silage",
  "silage-making": "cattle-feed-silage",
  "fodder": "cattle-feed-silage",

  // ── Tatkal Farm Emergency ─────────────────────────────────────────────
  "emergency-motor-burnout": "emergency-motor-burnout",
  "motor-burnout": "emergency-motor-burnout",
  "burnt-motor": "emergency-motor-burnout",
  "emergency-water-burst": "emergency-water-burst",
  "pipeline-burst": "emergency-water-burst",
  "emergency-paravet": "emergency-paravet",
  "urgent-livestock": "emergency-paravet",

  // ── FPO & Institutional Bulk Squads ───────────────────────────────────
  "fpo-harvest-team": "fpo-harvest-team",
  "harvest-team": "fpo-harvest-team",
  "harvest-crew": "fpo-harvest-team",
  "mandi-loading-crew": "mandi-loading-crew",
  "mandi-crew": "mandi-loading-crew",
  "panchayat-drainage-gang": "panchayat-drainage-gang",
  "drainage-gang": "panchayat-drainage-gang",

  // ── Direct Companion & Assisted Care ──────────────────────────────────
  "shopping-bag-assistant": "shopping-bag-assistant",
  "shopping assistant": "shopping-bag-assistant",
  "market assistant": "shopping-bag-assistant",
  "bag carrier": "shopping-bag-assistant",
  "city-shopping-guide": "city-shopping-guide",
  "shopping guide": "city-shopping-guide",
  "city guide": "city-shopping-guide",

  // ── Personal & Grooming ───────────────────────────────────────────────
  "salon-women": "salon-women",
  "salon": "salon-women",
  "salon-classic": "salon-classic",
  "salon for women": "salon-women",
  "spa-women": "spa-women",
  "spa for women": "spa-women",
  "spa": "spa-women",
  "hair-skin": "hair-skin",
  "hair & skin": "hair-skin",
  "skin": "hair-skin",
  "salon-men": "salon-men",
  "salon for men": "salon-men",
  "men-salon": "salon-men",
  "barber": "salon-men",
  "manicure-pedicure": "manicure-pedicure",
  "manicure & pedicure": "manicure-pedicure",
  "pedicure": "manicure-pedicure",
  "manicure": "manicure-pedicure",
  "nail": "manicure-pedicure",
  "nail-care": "manicure-pedicure",
  "massage-men": "manicure-pedicure",
  "massage for men": "manicure-pedicure",
  "bleach-detan": "bleach-detan",
  "bleach & detan": "bleach-detan",
  "detan": "bleach-detan",
  "hair-care": "hair-care",
  "hair care": "hair-care",
  "haircut": "hair-care",
  "head-massage": "head-massage",
  "head massage": "head-massage",

  // ── Home Services & Repairs ───────────────────────────────────────────
  "electrical-plumbing": "electrical-plumbing",
  "electrical & plumbing": "electrical-plumbing",
  "plumbing": "electrical-plumbing",
  "electrician": "electrical-plumbing",
  "electrical": "electrical-plumbing",
  "plumber": "electrical-plumbing",
  "pipe": "electrical-plumbing",
  "tap": "electrical-plumbing",
  "cleaning-pest-1": "cleaning-pest-1",
  "cleaning-pest": "cleaning-pest-1",
  "cleaning & pest": "cleaning-pest-1",
  "cleaning": "cleaning-pest-1",
  "pest-control": "cleaning-pest-1",
  "pest": "cleaning-pest-1",
  "deep-cleaning": "cleaning-pest-1",
  "home-repairs": "home-repairs",
  "home repairs": "home-repairs",
  "carpentry": "home-repairs",
  "carpenter": "home-repairs",
  "repairs": "home-repairs",
  "home-painting": "home-painting",
  "home painting": "home-painting",
  "painting": "home-painting",
  "painter": "home-painting",
  "ac-repair": "ac-repair",
  "ac & appliance repair": "ac-repair",
  "ac": "ac-repair",
  "appliance": "ac-repair",
  "tv-installing": "tv-installing",
  "tv installing": "tv-installing",
  "tv-mount": "tv-installing",
  "tv": "tv-installing",

  // ── Professional ──────────────────────────────────────────────────────
  "ca-accounting": "ca-accounting",
  "ca & accounting": "ca-accounting",
  "ca": "ca-accounting",
  "accounting": "ca-accounting",
  "legal-advisor": "legal-advisor",
  "legal advisor": "legal-advisor",
  "legal": "legal-advisor",
  "lawyer": "legal-advisor",
  "tax-consultant": "tax-consultant",
  "tax consultant": "tax-consultant",
  "tax": "tax-consultant",
  "itr": "tax-consultant",
  "insurance": "insurance",
  "interior-design": "interior-design",
  "interior design": "interior-design",
  "interior": "interior-design",

  // ── Healthcare & Wellness ─────────────────────────────────────────────
  "physiotherapy": "physiotherapy",
  "physio": "physiotherapy",
  "nursing-care": "nursing-care",
  "nursing care": "nursing-care",
  "nursing": "nursing-care",
  "nurse": "nursing-care",
  "elder-care": "elder-care",
  "elder care": "elder-care",
  "elder": "elder-care",
  "lab-tests": "lab-tests",
  "lab tests": "lab-tests",
  "blood-test": "lab-tests",
  "lab": "lab-tests",
  "yoga-trainer": "yoga-trainer",
  "yoga trainer": "yoga-trainer",
  "yoga": "yoga-trainer",

  // ── Events ────────────────────────────────────────────────────────────
  "event-planning": "event-planning",
  "event planning": "event-planning",
  "events": "event-planning",
  "catering": "catering",
  "caterer": "catering",
  "photography": "photography",
  "photo": "photography",
  "photographer": "photography",
  "decoration": "decoration",
  "decor": "decoration",
  "dj-music": "dj-music",
  "dj & music": "dj-music",
  "dj": "dj-music",
};

export function getCategoryDetails(categoryId) {
  if (!categoryId) return CATEGORIES["agri-mechanization"] || CATEGORIES["salon-women"];

  const clean = decodeURIComponent(categoryId).toLowerCase().trim().replace(/['"]/g, "");

  // 1. Direct key match in CATEGORIES
  if (CATEGORIES[clean]) return CATEGORIES[clean];

  

  // 0. Core 10 Skilled Cooperative Trades Direct Priority
  if (clean === "electricians" || clean === "electrician") return CATEGORIES["electricians"];
  if (clean === "plumbers" || clean === "plumber") return CATEGORIES["plumbers"];
  if (clean === "carpenters" || clean === "carpenter" || clean === "carpentry") return CATEGORIES["carpenters"];
  if (clean === "painters" || clean === "painter" || clean === "painting") return CATEGORIES["painters"];
  if (clean === "domestic-helpers" || clean === "domestic-helper" || clean.includes("domestic helper") || clean.includes("house help")) return CATEGORIES["domestic-helpers"];
  if (clean === "caregivers" || clean === "caregiver" || clean === "elderly care") return CATEGORIES["caregivers"];
  if (clean === "drivers" || clean === "driver" || clean === "chauffeur") return CATEGORIES["drivers"];
  if (clean === "gardeners" || clean === "gardener" || clean === "mali") return CATEGORIES["gardeners"];
  if (clean === "cleaners" || clean === "cleaner") return CATEGORIES["cleaners"];
  if (clean === "technicians" || clean === "technician") return CATEGORIES["technicians"];

// 2. Exact alias match
  if (ALIAS_MAP[clean] && CATEGORIES[ALIAS_MAP[clean]]) {
    return CATEGORIES[ALIAS_MAP[clean]];
  }

  // 3. Slug normalized match (replace spaces/hyphens)
  const normalized = clean.replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  if (CATEGORIES[normalized]) return CATEGORIES[normalized];
  if (ALIAS_MAP[normalized] && CATEGORIES[ALIAS_MAP[normalized]]) {
    return CATEGORIES[ALIAS_MAP[normalized]];
  }

  // 4. Exact Service Specific Keyword Priority (PREVENTS false fallback into urban AC/plumber)
  if (clean.includes("tractor") || clean.includes("harvester") || clean.includes("rotavator")) {
    return CATEGORIES["tractor-operator"];
  }
  if (clean.includes("solar-pump") || clean.includes("tube-well") || clean.includes("tubewell") || (clean.includes("solar") && clean.includes("pump")) || clean.includes("borewell")) {
    return CATEGORIES["solar-pump-repair"];
  }
  if (clean.includes("drone") || clean.includes("nano urea")) {
    return CATEGORIES["agri-drone-spray"];
  }
  if (clean.includes("soil") || clean.includes("compost") || clean.includes("npk")) {
    return CATEGORIES["soil-testing-compost"];
  }
  if (clean.includes("drip") || clean.includes("micro-irrigation") || clean.includes("sprinkler")) {
    return CATEGORIES["drip-irrigation-fix"];
  }
  if (clean.includes("cold storage") || clean.includes("cold-storage") || clean.includes("chiller") || clean.includes("cold room") || clean.includes("cold-room")) {
    return CATEGORIES["cold-storage-tech"];
  }
  if (clean.includes("flour") || clean.includes("oil mill") || clean.includes("atta chakki") || clean.includes("chakki") || clean.includes("expeller") || clean.includes("dal mill")) {
    return CATEGORIES["flour-oil-mill-op"];
  }
  if (clean.includes("grain-sorting") || clean.includes("grain sorting") || clean.includes("seed grader") || clean.includes("seed-grader") || clean.includes("grain sorter") || clean.includes("seed cleaner")) {
    return CATEGORIES["grain-sorting-grading"];
  }
  if (clean.includes("fpo packaging") || clean.includes("agro packaging") || clean.includes("packaging labor") || clean.includes("packaging-labor")) {
    return CATEGORIES["agro-packaging-labor"];
  }
  if (clean.includes("jaggery") || clean.includes("gur") || clean.includes("spice processing") || clean.includes("spice-proc")) {
    return CATEGORIES["jaggery-spice-proc"];
  }
  if (clean.includes("panchayat-sanitation") || clean.includes("panchayat cleanliness") || (clean.includes("panchayat") && clean.includes("clean"))) {
    return CATEGORIES["panchayat-sanitation"];
  }
  if (clean.includes("rural-solar-rooftop") || clean.includes("solar rooftop") || clean.includes("rooftop solar") || (clean.includes("solar") && clean.includes("roof"))) {
    return CATEGORIES["rural-solar-rooftop"];
  }
  if (clean.includes("water-pipeline") || clean.includes("pipeline-repair") || clean.includes("handpump") || clean.includes("jal jeevan")) {
    return CATEGORIES["water-pipeline-repair"];
  }
  if (clean.includes("biogas") || clean.includes("gobar gas") || clean.includes("gobar-gas") || (clean.includes("mason") && (clean.includes("rural") || clean.includes("biogas")))) {
    return CATEGORIES["rural-mason-biogas"];
  }
  if (clean.includes("rural-electrician") || clean.includes("farm electrician") || (clean.includes("electric") && (clean.includes("rural") || clean.includes("farm") || clean.includes("feeder") || clean.includes("village")))) {
    return CATEGORIES["rural-electrician"];
  }
  if (clean.includes("paravet") || clean.includes("pashu sakhi") || clean.includes("pashu-sakhi") || clean.includes("insemination")) {
    return CATEGORIES["paravet-health-check"];
  }
  if (clean.includes("dairy-farm") || clean.includes("milking") || clean.includes("dairy helper") || clean.includes("cow milking")) {
    return CATEGORIES["dairy-farm-helper"];
  }
  if (clean.includes("poultry") || clean.includes("goat")) {
    return CATEGORIES["poultry-goat-assistant"];
  }
  if (clean.includes("silage") || clean.includes("fodder")) {
    return CATEGORIES["cattle-feed-silage"];
  }
  if (clean.includes("motor-burnout") || clean.includes("burnt motor") || clean.includes("motor burnout") || clean.includes("tatkal motor")) {
    return CATEGORIES["emergency-motor-burnout"];
  }
  if (clean.includes("water-burst") || clean.includes("mainline burst") || clean.includes("pipeline burst")) {
    return CATEGORIES["emergency-water-burst"];
  }
  if (clean.includes("emergency-paravet") || (clean.includes("emergency") && (clean.includes("paravet") || clean.includes("livestock") || clean.includes("cattle") || clean.includes("bloat")))) {
    return CATEGORIES["emergency-paravet"];
  }
  if (clean.includes("harvest-team") || clean.includes("harvest crew") || clean.includes("fpo harvest") || clean.includes("fpo-harvest")) {
    return CATEGORIES["fpo-harvest-team"];
  }
  if (clean.includes("mandi-loading") || clean.includes("mandi crew") || clean.includes("loading crew") || clean.includes("mandi")) {
    return CATEGORIES["mandi-loading-crew"];
  }
  if (clean.includes("drainage-gang") || clean.includes("drain desilting") || clean.includes("panchayat drainage")) {
    return CATEGORIES["panchayat-drainage-gang"];
  }

  // 5. Check if clean string contains any category key
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (clean.includes(key) || key.includes(clean)) return cat;
  }

  // 6. Parent Agriculture & Rural Category Fallbacks
  if (clean.includes("agri") || clean.includes("farm") || clean.includes("kisan") || clean.includes("mechanization")) {
    return CATEGORIES["agri-mechanization"];
  }
  if (clean.includes("foodtech") || clean.includes("processing") || clean.includes("agro-processing")) {
    return CATEGORIES["foodtech-processing"];
  }
  if (clean.includes("rural") || clean.includes("panchayat") || clean.includes("infrastructure")) {
    return CATEGORIES["rural-infrastructure"];
  }
  if (clean.includes("dairy") || clean.includes("livestock") || clean.includes("cow") || clean.includes("cattle")) {
    return CATEGORIES["dairy-livestock"];
  }
  if (clean.includes("emergency") || clean.includes("tatkal") || clean.includes("breakdown")) {
    return CATEGORIES["rural-emergency"];
  }
  if (clean.includes("bulk") || clean.includes("fpo") || clean.includes("institutional")) {
    return CATEGORIES["institutional-bulk"];
  }

  // 7. General Urban & Household Services (Only if strictly not an agri service)
  if (clean.includes("plumb") || clean.includes("pipe") || clean.includes("switch") || clean.includes("fan")) {
    return CATEGORIES["electrical-plumbing"];
  }
  if (clean.includes("clean") || clean.includes("pest") || clean.includes("bath") || clean.includes("kitchen") || clean.includes("sofa")) {
    return CATEGORIES["cleaning-pest-1"];
  }
  if (clean.includes("repair") || clean.includes("carpenter") || clean.includes("door") || clean.includes("lock") || clean.includes("drill")) {
    return CATEGORIES["home-repairs"];
  }
  if (clean.includes("paint") || clean.includes("wall") || clean.includes("color")) {
    return CATEGORIES["home-painting"];
  }
  if (clean.includes("ac") || clean.includes("appliance") || clean.includes("cool") || clean.includes("fridge") || clean.includes("washing") || clean.includes("ro")) {
    return CATEGORIES["ac-repair"];
  }
  if (clean.includes("bleach") || clean.includes("detan") || clean.includes("tan")) {
    return CATEGORIES["bleach-detan"];
  }
  if (clean.includes("tv") || clean.includes("mount") || clean.includes("install")) {
    return CATEGORIES["tv-installing"];
  }
  if (clean.includes("hair") && clean.includes("care")) {
    return CATEGORIES["hair-care"];
  }
  if (clean.includes("mani") || clean.includes("pedi") || clean.includes("nail")) {
    return CATEGORIES["manicure-pedicure"];
  }
  if (clean.includes("head") || clean.includes("massage")) {
    return CATEGORIES["head-massage"];
  }

  if (clean.includes("ca") || clean.includes("account") || clean.includes("gst") || clean.includes("bookkeep")) {
    return CATEGORIES["ca-accounting"];
  }
  if (clean.includes("legal") || clean.includes("law") || clean.includes("advocate") || clean.includes("affidavit")) {
    return CATEGORIES["legal-advisor"];
  }
  if (clean.includes("tax") || clean.includes("itr") || clean.includes("tds")) {
    return CATEGORIES["tax-consultant"];
  }
  if (clean.includes("insur") || clean.includes("policy")) {
    return CATEGORIES["insurance"];
  }
  if (clean.includes("interior") || (clean.includes("decor") && clean.includes("home"))) {
    return CATEGORIES["interior-design"];
  }
  if (clean.includes("physio") || clean.includes("pain") || clean.includes("rehab")) {
    return CATEGORIES["physiotherapy"];
  }
  if (clean.includes("nurse") || clean.includes("dressing") || clean.includes("injection")) {
    return CATEGORIES["nursing-care"];
  }
  if (clean.includes("elder") || clean.includes("senior") || clean.includes("attendant")) {
    return CATEGORIES["elder-care"];
  }
  if (clean.includes("lab") || clean.includes("blood") || clean.includes("test") || clean.includes("checkup")) {
    return CATEGORIES["lab-tests"];
  }
  if (clean.includes("yoga") || clean.includes("fit") || clean.includes("trainer")) {
    return CATEGORIES["yoga-trainer"];
  }
  if (clean.includes("event") || clean.includes("party") || clean.includes("planner")) {
    return CATEGORIES["event-planning"];
  }
  if (clean.includes("cater") || clean.includes("food") || clean.includes("buffet")) {
    return CATEGORIES["catering"];
  }
  if (clean.includes("photo") || clean.includes("video") || clean.includes("shoot")) {
    return CATEGORIES["photography"];
  }
  if (clean.includes("decor") || clean.includes("balloon") || clean.includes("flower")) {
    return CATEGORIES["decoration"];
  }
  if (clean.includes("dj") || clean.includes("music") || clean.includes("sound")) {
    return CATEGORIES["dj-music"];
  }
  if (clean.includes("men") || clean.includes("beard") || clean.includes("boy")) {
    return CATEGORIES["salon-men"];
  }
  if (clean.includes("spa")) {
    return CATEGORIES["spa-women"];
  }

  // Default fallback to agri-mechanization
  return CATEGORIES["agri-mechanization"];
}

export const MANVI_PACKAGE = {
  id: "manvis-package",
  name: "Complete Glow & Rejuvenation Pack",
  icon: "bookmark",
  rating: 4.88,
  ratingCount: "978k",
  durationMins: 90,
  price: 299,
  originalPrice: 299,
  includes: [
    { label: "Express Facial Glow Cleanup", price: 149 },
    { label: "Anti-Stress Head Massage", price: 99 },
    { label: "Pedicure Care", price: 149 },
  ],
};

export const FRUITS_CLEANUP = {
  id: "fruits-cleanup",
  name: "Sara Fruit Glow Cleanup",
  icon: "face_retouching_natural",
  rating: 4.82,
  ratingCount: "978k",
  durationMins: 55,
  price: 299,
};

