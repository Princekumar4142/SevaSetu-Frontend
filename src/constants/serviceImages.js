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

export const SERVICE_IMAGES = {
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

  // 6. Personal Companion & Shopping Assistants (Unique)
  "shopping-bag-assistant": shoppingAssistantImg,
  "city-shopping-guide":    cityGuideImg,
};

export function getServiceImage(serviceId) {
  if (!serviceId) return salonWomenImg;
  return SERVICE_IMAGES[serviceId] || SERVICE_IMAGES["electrical-plumbing"];
}
