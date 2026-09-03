/**
 * Comprehensive Catalog Data for all 30+ service categories across SevaSetu AI.
 * Every service category has its dedicated services, transparent pricing, durations,
 * and instant cart-booking capabilities.
 */

export const PERSONAL_SERVICES = [
  { id: "salon-women", label: "Salon for Women", icon: "self_care" },
  { id: "spa-women", label: "Spa for Women", icon: "spa" },
  { id: "hair-skin", label: "Hair & Skin", icon: "face_retouching_natural", badge: "NEW" },
  { id: "salon-men", label: "Salon for Men", icon: "face" },
  { id: "massage-men", label: "Massage for Men", icon: "self_improvement" },
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
          { id: "sw-1", name: "Sara Fruit Glow Facial", icon: "face_retouching_natural", rating: 4.82, ratingCount: "140k", durationMins: 60, price: 599, desc: "Gentle fruit enzyme cleanse for natural skin glow" },
          { id: "sw-2", name: "O3+ Bridal Whitening Facial", icon: "face_retouching_natural", rating: 4.91, ratingCount: "98k", durationMins: 75, price: 1299, desc: "Deep oxygen infusion and hyperpigmentation control" },
          { id: "sw-3", name: "Express Glow Cleanup", icon: "face_retouching_natural", rating: 4.76, ratingCount: "210k", durationMins: 35, price: 299, desc: "Quick exfoliation, blackhead removal, and pack" },
        ],
      },
      {
        id: "waxing-threading",
        title: "Waxing & Threading",
        services: [
          { id: "sw-4", name: "Full Arms + Full Legs Rica Wax", icon: "healing", rating: 4.89, ratingCount: "320k", durationMins: 50, price: 699, desc: "Gentle lipo-soluble Italian wax suitable for sensitive skin" },
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
          { id: "sw-1", name: "Sara Fruit Glow Facial", icon: "face_retouching_natural", rating: 4.82, ratingCount: "140k", durationMins: 60, price: 599, desc: "Gentle fruit enzyme cleanse for natural skin glow" },
          { id: "sw-2", name: "O3+ Bridal Whitening Facial", icon: "face_retouching_natural", rating: 4.91, ratingCount: "98k", durationMins: 75, price: 1299, desc: "Deep oxygen infusion and hyperpigmentation control" },
          { id: "sw-3", name: "Express Glow Cleanup", icon: "face_retouching_natural", rating: 4.76, ratingCount: "210k", durationMins: 35, price: 299, desc: "Quick exfoliation, blackhead removal, and pack" },
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
          { id: "sp-1", name: "Swedish Full Body Relaxation Spa", icon: "spa", rating: 4.93, ratingCount: "42k", durationMins: 60, price: 1199, desc: "Long gliding strokes with warm lavender essential oils" },
          { id: "sp-2", name: "Deep Tissue Muscle Relief Massage", icon: "self_improvement", rating: 4.89, ratingCount: "35k", durationMins: 75, price: 1499, desc: "Targeted pressure to relieve chronic back & shoulder knots" },
          { id: "sp-3", name: "Ayurvedic Potli Herbal Compress", icon: "spa", rating: 4.95, ratingCount: "28k", durationMins: 60, price: 1399, desc: "Warm herbal poultice massage for total joint rejuvenation" },
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
          { id: "hs-1", name: "L'Oreal Anti-Hairfall Keratin Spa", icon: "content_cut", rating: 4.88, ratingCount: "68k", durationMins: 50, price: 899, desc: "Intense moisture repair and steam therapy for damaged hair" },
          { id: "hs-2", name: "Full Body Raaga De-Tan Therapy", icon: "brightness_6", rating: 4.86, ratingCount: "45k", durationMins: 60, price: 999, desc: "Kojic acid and milk protein pack for sun-tanned skin" },
          { id: "hs-3", name: "Anti-Dandruff Scalp Detox Session", icon: "face_retouching_natural", rating: 4.81, ratingCount: "32k", durationMins: 45, price: 649, desc: "Tea tree clarifying wash and scalp scrub" },
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

  // 5. Massage for Men
  "massage-men": {
    id: "massage-men",
    name: "Massage for Men",
    tag: "Certified Therapists",
    rating: 4.89,
    ratingCount: "74K",
    categoryType: "Wellness",
    icon: "self_improvement",
    chips: [
      { id: "deep-tissue-men", label: "Deep Tissue", icon: "fitness_center" },
      { id: "swedish-men", label: "Swedish Massage", icon: "spa" },
      { id: "pain-relief", label: "Pain Relief", icon: "healing" },
    ],
    sections: [
      {
        id: "men-massages",
        title: "Therapeutic Massages",
        services: [
          { id: "mm-1", name: "Deep Tissue Sports Recovery Massage", icon: "fitness_center", rating: 4.91, ratingCount: "44k", durationMins: 60, price: 1099, desc: "Relieves muscle soreness, stiff neck, and workout fatigue" },
          { id: "mm-2", name: "Full Body Stress Relief Swedish Massage", icon: "spa", rating: 4.88, ratingCount: "38k", durationMins: 60, price: 999, desc: "Smooth relaxation massage with herbal warm oils" },
          { id: "mm-3", name: "Lower Back & Shoulder Pain Focus", icon: "healing", rating: 4.94, ratingCount: "25k", durationMins: 45, price: 799, desc: "Targeted acupressure for posture strain & desk job aches" },
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
          { id: "ep-4", name: "Flush Tank / Siphon Overhaul", icon: "plumbing", rating: 4.84, ratingCount: "76k", durationMins: 45, price: 299, desc: "Fix continuous water leakage in Western/Indian commodes" },
        ],
      },
      {
        id: "drain-blockage",
        title: "Drainage & Blockage Removal",
        services: [
          { id: "ep-5", name: "Kitchen Sink Deep Drain Unclogging", icon: "cleaning_services", rating: 4.89, ratingCount: "112k", durationMins: 45, price: 299, desc: "Rotary snake pipe clearance for stubborn oil & food grease" },
          { id: "ep-6", name: "Bathroom Floor Trap & Pipe De-clog", icon: "cleaning_services", rating: 4.86, ratingCount: "89k", durationMins: 45, price: 349, desc: "Hair and soap scum removal from bathroom outlet" },
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
          { id: "cp-1", name: "Intense Bathroom Tile Scrub & Descaling", icon: "bathroom", rating: 4.91, ratingCount: "280k", durationMins: 75, price: 499, desc: "Acid-free tile scrubbing, mirror shine, hard water stain removal" },
          { id: "cp-2", name: "Kitchen Modular Degreasing & Slab Polish", icon: "restaurant", rating: 4.88, ratingCount: "195k", durationMins: 90, price: 699, desc: "Removal of oil grease from chimney exterior, cabinets, and tiles" },
          { id: "cp-3", name: "Full Home 2 BHK Deep Cleaning", icon: "home", rating: 4.94, ratingCount: "140k", durationMins: 240, price: 2299, desc: "Thorough machine buffing, balcony wash, fan & window polish" },
        ],
      },
      {
        id: "pest-control-section",
        title: "Pest Control Services",
        services: [
          { id: "cp-4", name: "Cockroach & Ant Herbal Gel (1-2 BHK)", icon: "pest_control", rating: 4.89, ratingCount: "160k", durationMins: 30, price: 549, desc: "Odorless herbal dots applied in cabinet hinges and corners" },
          { id: "cp-5", name: "Bed Bug Eradication Double Spray", icon: "pest_control", rating: 4.92, ratingCount: "55k", durationMins: 60, price: 1199, desc: "2-step chemical spray with 60 days warranty" },
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
          { id: "hr-1", name: "Main Door / Bedroom Lock Installation", icon: "lock", rating: 4.86, ratingCount: "74k", durationMins: 35, price: 249, desc: "Installation of Godrej / Europa mortise and cylindrical locks" },
          { id: "hr-2", name: "TV Wall Mount (Up to 55 inch)", icon: "tv", rating: 4.9, ratingCount: "120k", durationMins: 40, price: 299, desc: "Heavy-duty bracket installation, leveling, and cable tie" },
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
          { id: "hp-1", name: "1 Room Wall Painting (Royale Emulsion)", icon: "format_paint", rating: 4.92, ratingCount: "45k", durationMins: 180, price: 2199, desc: "2 coats of washable paint with surface sanding and tape masking" },
          { id: "hp-2", name: "Putty & Wall Crack Patch Repair", icon: "brush", rating: 4.87, ratingCount: "38k", durationMins: 60, price: 499, desc: "Fill holes, hairline cracks, and sand smooth" },
          { id: "hp-3", name: "Wall Dampness & Anti-Fungal Treatment", icon: "water_drop", rating: 4.94, ratingCount: "29k", durationMins: 120, price: 1299, desc: "Silicon waterproofing primer coat for peeling plaster" },
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
          { id: "ac-1", name: "Split AC High-Pressure Jet Foam Service", icon: "ac_unit", rating: 4.9, ratingCount: "240k", durationMins: 45, price: 449, desc: "Indoor and outdoor coil deep pressure wash with anti-bacterial foam" },
          { id: "ac-2", name: "AC Not Cooling / Water Leak Inspection", icon: "build", rating: 4.85, ratingCount: "110k", durationMins: 30, price: 199, desc: "Diagnosis of compressor, capacitor, sensor, or drain pipe clog" },
          { id: "ac-3", name: "Refrigerant Gas Leakage Test & Full Refill", icon: "gas_meter", rating: 4.91, ratingCount: "85k", durationMins: 60, price: 1899, desc: "Nitrogen pressure testing, copper brazing, and gas top-up" },
        ],
      },
      {
        id: "appliance-repair-services",
        title: "Appliance Repairs",
        services: [
          { id: "ac-4", name: "RO Water Purifier Membrane & Filter Service", icon: "water_drop", rating: 4.88, ratingCount: "98k", durationMins: 45, price: 349, desc: "Sediment, pre-carbon filter replacement, and TDS testing" },
          { id: "ac-5", name: "Washing Machine Drum & Motor Noise Fix", icon: "local_laundry_service", rating: 4.84, ratingCount: "78k", durationMins: 50, price: 299, desc: "Drain pump check, belt tension, and spin cycle troubleshooting" },
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
          { id: "bd-1", name: "OxyLife Radiance Face & Neck Bleach", icon: "brightness_6", rating: 4.79, ratingCount: "55k", durationMins: 30, price: 249, desc: "Infuses active oxygen to brighten skin tone instantly" },
          { id: "bd-2", name: "Raaga Professional Tan Removal Pack", icon: "spa", rating: 4.88, ratingCount: "72k", durationMins: 35, price: 349, desc: "Natural eucalyptus and clove oil tan removal" },
          { id: "bd-3", name: "Full Arms + Full Legs Tan Removal Pack", icon: "self_care", rating: 4.85, ratingCount: "40k", durationMins: 45, price: 649, desc: "Gentle de-tanning pack for sun exposed limbs" },
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
          { id: "tv-1", name: "LED / OLED TV Wall Mounting (Up to 55\")", icon: "tv", rating: 4.93, ratingCount: "48k", durationMins: 40, price: 299, desc: "Level laser alignment, wall anchor drilling, and cable hiding" },
          { id: "tv-2", name: "Large TV Wall Mount (65\" to 85\")", icon: "tv", rating: 4.91, ratingCount: "25k", durationMins: 50, price: 449, desc: "Heavy-duty double arm swivel bracket mounting" },
          { id: "tv-3", name: "Soundbar & Subwoofer Wall Mounting", icon: "speaker", rating: 4.88, ratingCount: "18k", durationMins: 30, price: 199, desc: "Secure audio bracket setup under TV" },
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
          { id: "hc-1", name: "L'Oreal Mythic Oil Deep Nourish Hair Spa", icon: "content_cut", rating: 4.91, ratingCount: "62k", durationMins: 50, price: 799, desc: "Deep conditioning cream massage with warm ozone steam" },
          { id: "hc-2", name: "Women's Layered / Bob Haircut & Blowdry", icon: "brush", rating: 4.88, ratingCount: "85k", durationMins: 45, price: 399, desc: "Consultation, precision styling cut, and serum finish" },
          { id: "hc-3", name: "Anti-Frizz Keratin Booster Therapy", icon: "spa", rating: 4.84, ratingCount: "34k", durationMins: 60, price: 999, desc: "Smooths frizzy and unmanageable split-end hair" },
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
          { id: "ca-1", name: "Individual Income Tax Return (ITR-1 / ITR-2)", icon: "receipt_long", rating: 4.94, ratingCount: "28k", durationMins: 30, price: 499, desc: "Salary, house property, and capital gains tax filing by expert CA" },
          { id: "ca-2", name: "Business GST Registration & Monthly Filing", icon: "receipt", rating: 4.91, ratingCount: "18k", durationMins: 45, price: 899, desc: "Complete GSTIN setup and GSTR-1/3B filing support" },
          { id: "ca-3", name: "Private Limited / LLP Company Incorporation", icon: "account_balance", rating: 4.95, ratingCount: "12k", durationMins: 60, price: 2999, desc: "Name approval, DIN, DSC, and ROC registration" },
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
          { id: "la-1", name: "Registered Rent Agreement at Doorstep", icon: "description", rating: 4.93, ratingCount: "22k", durationMins: 45, price: 999, desc: "Biometric verification and govt e-registration at your doorstep" },
          { id: "la-2", name: "Property Title Search & Legal Opinion", icon: "domain", rating: 4.92, ratingCount: "14k", durationMins: 60, price: 2499, desc: "30-year deed search, encumbrance check, and advocate report" },
          { id: "la-3", name: "Legal Notice Drafting & Advocate Dispatch", icon: "gavel", rating: 4.88, ratingCount: "9k", durationMins: 45, price: 1499, desc: "Recovery, tenant dispute, or consumer complaint legal notice" },
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
          { id: "nc-1", name: "Wound Dressing & Suture Removal", icon: "medical_services", rating: 4.94, ratingCount: "26k", durationMins: 30, price: 299, desc: "Sterile antiseptic dressing by certified nurse" },
          { id: "nc-2", name: "IV Drip Infusion / Injection Administration", icon: "vaccines", rating: 4.92, ratingCount: "21k", durationMins: 45, price: 399, desc: "Prescription-verified saline / antibiotic cannula insertion" },
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
};

/**
 * Universal Category Resolver:
 * Maps direct category IDs, human titles, URLs, and search keywords to the right catalog item.
 */
const ALIAS_MAP = {
  // Personal & Grooming
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
  "massage-men": "massage-men",
  "massage for men": "massage-men",
  "bleach-detan": "bleach-detan",
  "bleach & detan": "bleach-detan",
  "detan": "bleach-detan",
  "hair-care": "hair-care",
  "hair care": "hair-care",
  "haircut": "hair-care",
  "head-massage": "head-massage",
  "head massage": "head-massage",

  // Home Services & Repairs
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

  // Professional
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

  // Healthcare & Wellness
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

  // Events
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
  if (!categoryId) return CATEGORIES["salon-women"];

  const clean = decodeURIComponent(categoryId).toLowerCase().trim().replace(/['"]/g, "");

  // 1. Direct key match in CATEGORIES
  if (CATEGORIES[clean]) return CATEGORIES[clean];

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

  // 4. Check if clean string contains any category key
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (clean.includes(key) || key.includes(clean)) return cat;
  }

  // 5. Keyword Matching
  if (clean.includes("plumb") || clean.includes("electric") || clean.includes("pipe") || clean.includes("water") || clean.includes("switch") || clean.includes("fan")) {
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
  if (clean.includes("head") || clean.includes("massage")) {
    return clean.includes("men") ? CATEGORIES["massage-men"] : CATEGORIES["head-massage"];
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
  if (clean.includes("interior") || clean.includes("decor") && clean.includes("home")) {
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

  // Default fallback
  return CATEGORIES["electrical-plumbing"];
}

export const MANVI_PACKAGE = {
  id: "manvis-package",
  name: "Complete Glow & Rejuvenation Pack",
  icon: "bookmark",
  rating: 4.88,
  ratingCount: "978k",
  durationMins: 90,
  price: 799,
  originalPrice: 999,
  includes: [
    { label: "Express Facial Glow Cleanup", price: 299 },
    { label: "Anti-Stress Head Massage", price: 200 },
    { label: "Pedicure Care", price: 300 },
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

