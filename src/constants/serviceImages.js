/**
 * Service Images mapping.
 * Contains image URLs for all 30+ service categories across SevaSetu AI.
 * Ready for Cloudinary image hosting and local fallback.
 */

import salonWomenImg from "../assets/services/salon-women.jpg";
import electricalPlumbingImg from "../assets/services/electrical-plumbing.jpg";
import cleaningPestImg from "../assets/services/cleaning-pest.jpg";
import spaWomenImg from "../assets/services/spa-women.jpg";
import acRepairImg from "../assets/services/ac-repair.jpg";
import homePaintingImg from "../assets/services/home-painting.jpg";
import djMusicImg from "../assets/services/dj-music.jpg";
import shoppingAssistantImg from "../assets/services/shopping-assistant.jpg";
import cityGuideImg from "../assets/services/city-guide.jpg";
import salonMenImg from "../assets/services/salon-men.jpg";
import agriMechanizationImg from "../assets/services/agri-mechanization.jpg";
import foodtechProcessingImg from "../assets/services/foodtech-processing.jpg";
import ruralInfrastructureImg from "../assets/services/rural-infrastructure.jpg";
import dairyLivestockImg from "../assets/services/dairy-livestock.jpg";
import ruralEmergencyImg from "../assets/services/rural-emergency.jpg";
import institutionalBulkImg from "../assets/services/institutional-bulk.jpg";

export const SERVICE_IMAGES = {
  // ── Agriculture & Farm Mechanization ────────────────────────────────────
  "agri-mechanization": agriMechanizationImg,
  "tractor-operator": agriMechanizationImg,
  "tractor-harvester": agriMechanizationImg,
  "solar-pump-repair": ruralEmergencyImg,
  "solar-pump": ruralEmergencyImg,
  "agri-drone-spray": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80",
  "agri-drone": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80",
  "soil-testing-compost": "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=500&q=80",
  "drip-irrigation-fix": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=500&q=80",

  // ── FoodTech, Agro-Processing & Storage ─────────────────────────────────
  "foodtech-processing": foodtechProcessingImg,
  "cold-storage-tech": foodtechProcessingImg,
  "cold-storage": foodtechProcessingImg,
  "flour-oil-mill-op": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  "grain-sorting-grading": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80",
  "agro-packaging-labor": "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=500&q=80",
  "jaggery-spice-proc": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",

  // ── Rural Infrastructure & Community Maintenance ────────────────────────
  "rural-infrastructure": ruralInfrastructureImg,
  "panchayat-sanitation": ruralInfrastructureImg,
  "rural-solar-rooftop": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80",
  "water-pipeline-repair": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80",
  "rural-mason-biogas": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=500&q=80",
  "rural-electrician": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",

  // ── Dairy, Livestock & Paravet ──────────────────────────────────────────
  "dairy-livestock": dairyLivestockImg,
  "paravet-health-check": dairyLivestockImg,
  "paravet-dairy": dairyLivestockImg,
  "dairy-farm-helper": "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=500&q=80",
  "poultry-goat-assistant": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=500&q=80",
  "cattle-feed-silage": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80",

  // ── Tatkal Farm Emergency (45-Min) ──────────────────────────────────────
  "rural-emergency": ruralEmergencyImg,
  "emergency-motor-burnout": ruralEmergencyImg,
  "emergency-water-burst": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80",
  "emergency-paravet": dairyLivestockImg,

  // ── Institutional & Bulk Squads ─────────────────────────────────────────
  "institutional-bulk": institutionalBulkImg,
  "fpo-harvest-team": institutionalBulkImg,
  "mandi-loading-crew": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
  "panchayat-drainage-gang": ruralInfrastructureImg,

  // 1. Personal & Grooming
  "salon-women": salonWomenImg,
  "salon-classic": salonWomenImg,
  "spa-women": spaWomenImg,
  "salon-men": salonMenImg,
  "men-salon": salonMenImg,
  "barber": salonMenImg,
  "hair-skin": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80",
  "manicure-pedicure": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=500&q=80",
  "massage-men": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=500&q=80",

  "bleach-detan": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80",
  "hair-care": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=500&q=80",
  "head-massage": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=500&q=80",

  // ── Core Skilled Cooperative Federation Workforce (10 Essential Trades) ──
  "electricians": electricalPlumbingImg,
  "electrician": electricalPlumbingImg,
  "plumbers": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80",
  "plumber": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80",
  "carpenters": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80",
  "carpenter": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80",
  "painters": homePaintingImg,
  "painter": homePaintingImg,
  "domestic-helpers": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
  "domestic-helper": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
  "caregivers": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=500&q=80",
  "caregiver": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=500&q=80",
  "drivers": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=500&q=80",
  "driver": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=500&q=80",
  "gardeners": "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=500&q=80",
  "gardener": "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=500&q=80",
  "cleaners": cleaningPestImg,
  "cleaner": cleaningPestImg,
  "technicians": acRepairImg,
  "technician": acRepairImg,

  // 2. Home Services
  "electrical-plumbing": electricalPlumbingImg,
  "cleaning-pest-1": cleaningPestImg,
  "cleaning-pest": cleaningPestImg,
  "home-repairs": "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80",
  "home-painting": homePaintingImg,
  "ac-repair": acRepairImg,
  "tv-installing": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80",

  // 3. Professional Services
  "ca-accounting": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
  "legal-advisor": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80",
  "tax-consultant": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80",
  "insurance": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
  "interior-design": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",

  // 4. Healthcare & Wellness
  "physiotherapy": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80",
  "nursing-care": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
  "elder-care": "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80",
  "lab-tests": "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80",
  "yoga-trainer": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=400&q=80",

  // 5. Events & Parties
  "event-planning": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
  "catering":       "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=80",
  "photography":    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
  "decoration":     "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=500&q=80",
  "dj-music":       djMusicImg,

  // ── Sub-service specific IDs for Agri & Farm Mechanization ─────────────
  "am-1": agriMechanizationImg,
  "am-2": agriMechanizationImg,
  "am-3": ruralEmergencyImg,
  "am-4": ruralEmergencyImg,
  "am-5": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80",
  "am-6": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80",
  "am-7": "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=500&q=80",
  "am-8": "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=500&q=80",

  // ── Sub-service specific IDs for FoodTech & Agro Processing ─────────────
  "fp-1": foodtechProcessingImg,
  "fp-2": foodtechProcessingImg,
  "fp-3": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  "fp-4": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  "fp-5": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80",
  "fp-6": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80",
  "fp-7": "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=500&q=80",
  "fp-8": "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=500&q=80",
  "fp-9": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
  "fp-10": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",

  // ── Sub-service specific IDs for Rural Infrastructure ───────────────────
  "ri-1": ruralInfrastructureImg,
  "ri-2": ruralInfrastructureImg,
  "ri-3": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80",
  "ri-4": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80",
  "ri-5": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80",
  "ri-6": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80",
  "ri-7": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=500&q=80",
  "ri-8": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=500&q=80",
  "ri-9": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",
  "ri-10": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",

  // ── Sub-service specific IDs for Dairy & Livestock ──────────────────────
  "dl-1": dairyLivestockImg,
  "dl-2": dairyLivestockImg,
  "dl-3": "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=500&q=80",
  "dl-4": "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=500&q=80",
  "dl-5": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=500&q=80",
  "dl-6": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=500&q=80",
  "dl-7": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80",
  "dl-8": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80",

  // ── Sub-service specific IDs for Tatkal Emergency ───────────────────────
  "re-1": ruralEmergencyImg,
  "re-2": ruralEmergencyImg,
  "re-3": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80",
  "re-4": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80",
  "re-5": dairyLivestockImg,
  "re-6": dairyLivestockImg,

  // ── Sub-service specific IDs for Institutional Bulk ─────────────────────
  "ib-1": institutionalBulkImg,
  "ib-2": institutionalBulkImg,
  "ib-3": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
  "ib-4": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
  "ib-5": ruralInfrastructureImg,
  "ib-6": ruralInfrastructureImg,

  // ── Companion & Assisted Worker Services ────────────────────────────────
  "shopping-bag-assistant": shoppingAssistantImg,
  "city-shopping-guide":    cityGuideImg,
  "sa-1": shoppingAssistantImg,
  "sa-2": shoppingAssistantImg,
  "sa-3": shoppingAssistantImg,
  "sa-4": shoppingAssistantImg,
  "cg-1": cityGuideImg,
  "cg-2": cityGuideImg,
  "cg-3": cityGuideImg,
  "cg-4": cityGuideImg,
};

export function getServiceImage(serviceId, serviceName = "", categoryId = "") {
  if (serviceId && SERVICE_IMAGES[serviceId]) {
    return SERVICE_IMAGES[serviceId];
  }
  if (categoryId && SERVICE_IMAGES[categoryId]) {
    return SERVICE_IMAGES[categoryId];
  }

  const query = `${serviceId || ""} ${serviceName || ""} ${categoryId || ""}`.toLowerCase();

  if (query.includes("tractor") || query.includes("harvest") || query.includes("rotavator") || query.startsWith("am-")) {
    return SERVICE_IMAGES["tractor-operator"];
  }
  if (query.includes("solar") || query.includes("pump") || query.includes("tube") || query.includes("borewell") || query.includes("motor") || query.startsWith("re-1") || query.startsWith("re-2")) {
    return SERVICE_IMAGES["solar-pump-repair"];
  }
  if (query.includes("drone") || query.includes("spray") || query.includes("nano urea")) {
    return SERVICE_IMAGES["agri-drone-spray"];
  }
  if (query.includes("soil") || query.includes("compost") || query.includes("npk")) {
    return SERVICE_IMAGES["soil-testing-compost"];
  }
  if (query.includes("drip") || query.includes("irrigation") || query.includes("micro-irrigation")) {
    return SERVICE_IMAGES["drip-irrigation-fix"];
  }
  if (query.includes("cold") || query.includes("chiller") || query.includes("compressor") || query.startsWith("fp-1") || query.startsWith("fp-2")) {
    return SERVICE_IMAGES["cold-storage-tech"];
  }
  if (query.includes("mill") || query.includes("flour") || query.includes("atta") || query.includes("oil") || query.startsWith("fp-3") || query.startsWith("fp-4")) {
    return SERVICE_IMAGES["flour-oil-mill-op"];
  }
  if (query.includes("grain") || query.includes("sort") || query.includes("seed") || query.startsWith("fp-5") || query.startsWith("fp-6")) {
    return SERVICE_IMAGES["grain-sorting-grading"];
  }
  if (query.includes("pack") || query.includes("fpo") || query.includes("sealing") || query.startsWith("fp-7") || query.startsWith("fp-8")) {
    return SERVICE_IMAGES["agro-packaging-labor"];
  }
  if (query.includes("jaggery") || query.includes("spice") || query.includes("gur") || query.startsWith("fp-9") || query.startsWith("fp-10")) {
    return SERVICE_IMAGES["jaggery-spice-proc"];
  }
  if (query.includes("panchayat") || query.includes("clean") || query.includes("sanitation") || query.startsWith("ri-1") || query.startsWith("ri-2")) {
    return SERVICE_IMAGES["panchayat-sanitation"];
  }
  if (query.includes("rooftop") || query.includes("solar panel") || query.startsWith("ri-3") || query.startsWith("ri-4")) {
    return SERVICE_IMAGES["rural-solar-rooftop"];
  }
  if (query.includes("pipeline") || query.includes("water") || query.includes("handpump") || query.startsWith("ri-5") || query.startsWith("ri-6")) {
    return SERVICE_IMAGES["water-pipeline-repair"];
  }
  if (query.includes("biogas") || query.includes("mason") || query.includes("gobar") || query.startsWith("ri-7") || query.startsWith("ri-8")) {
    return SERVICE_IMAGES["rural-mason-biogas"];
  }
  if (query.includes("electric") || query.includes("power") || query.includes("wire") || query.startsWith("ri-9") || query.startsWith("ri-10")) {
    return SERVICE_IMAGES["rural-electrician"];
  }
  if (query.includes("paravet") || query.includes("vet") || query.includes("pashu") || query.includes("cattle") || query.includes("calving") || query.startsWith("dl-1") || query.startsWith("dl-2")) {
    return SERVICE_IMAGES["paravet-health-check"];
  }
  if (query.includes("dairy") || query.includes("milk") || query.startsWith("dl-3") || query.startsWith("dl-4")) {
    return SERVICE_IMAGES["dairy-farm-helper"];
  }
  if (query.includes("poultry") || query.includes("goat") || query.startsWith("dl-5") || query.startsWith("dl-6")) {
    return SERVICE_IMAGES["poultry-goat-assistant"];
  }
  if (query.includes("silage") || query.includes("fodder") || query.includes("feed") || query.startsWith("dl-7") || query.startsWith("dl-8")) {
    return SERVICE_IMAGES["cattle-feed-silage"];
  }
  if (query.includes("burst") || query.includes("rupture") || query.startsWith("re-3") || query.startsWith("re-4")) {
    return SERVICE_IMAGES["emergency-water-burst"];
  }
  if (query.includes("harvest") || query.includes("pluck") || query.startsWith("ib-1") || query.startsWith("ib-2")) {
    return SERVICE_IMAGES["institutional-bulk"];
  }
  if (query.includes("mandi") || query.includes("godown") || query.startsWith("ib-3") || query.startsWith("ib-4")) {
    return SERVICE_IMAGES["mandi-loading-crew"];
  }
  if (query.includes("drainage") || query.includes("canal") || query.startsWith("ib-5") || query.startsWith("ib-6")) {
    return SERVICE_IMAGES["panchayat-drainage-gang"];
  }
  if (query.includes("shopping") || query.includes("elder") || query.startsWith("sa-")) {
    return SERVICE_IMAGES["shopping-bag-assistant"];
  }
  if (query.includes("guide") || query.includes("market") || query.includes("bazaar") || query.startsWith("cg-")) {
    return SERVICE_IMAGES["city-shopping-guide"];
  }

  // ── Core 10 Skilled Cooperative Workforce Fallbacks ──
  if (query.includes("electric") || query.startsWith("elec-")) return SERVICE_IMAGES["electricians"];
  if (query.includes("plumb") || query.startsWith("plumb-")) return SERVICE_IMAGES["plumbers"];
  if (query.includes("carpenter") || query.includes("carpentry") || query.startsWith("carp-")) return SERVICE_IMAGES["carpenters"];
  if (query.includes("paint") || query.startsWith("paint-")) return SERVICE_IMAGES["painters"];
  if (query.includes("domestic") || query.includes("jhadu") || query.includes("bartan") || query.startsWith("dh-")) return SERVICE_IMAGES["domestic-helpers"];
  if (query.includes("caregiver") || query.includes("elderly") || query.includes("patient") || query.startsWith("care-")) return SERVICE_IMAGES["caregivers"];
  if (query.includes("driver") || query.includes("chauffeur") || query.startsWith("drv-")) return SERVICE_IMAGES["drivers"];
  if (query.includes("garden") || query.includes("mali") || query.includes("lawn") || query.startsWith("gard-")) return SERVICE_IMAGES["gardeners"];
  if (query.includes("clean") || query.startsWith("cln-")) return SERVICE_IMAGES["cleaners"];
  if (query.includes("tech") || query.includes("appliance") || query.startsWith("tech-")) return SERVICE_IMAGES["technicians"];

  // Fallbacks for Urban Services
  if (query.includes("salon") && query.includes("men")) return SERVICE_IMAGES["salon-men"];
  if (query.includes("salon") || query.includes("facial") || query.includes("beauty")) return SERVICE_IMAGES["salon-women"];
  if (query.includes("spa") || query.includes("massage")) return SERVICE_IMAGES["spa-women"];
  if (query.includes("ca") || query.includes("account") || query.includes("tax") || query.includes("audit")) return SERVICE_IMAGES["ca-accounting"];
  if (query.includes("legal") || query.includes("law") || query.includes("court")) return SERVICE_IMAGES["legal-advisor"];
  if (query.includes("event") || query.includes("cater") || query.includes("dj")) return SERVICE_IMAGES["dj-music"];

  return SERVICE_IMAGES["agri-mechanization"];
}
