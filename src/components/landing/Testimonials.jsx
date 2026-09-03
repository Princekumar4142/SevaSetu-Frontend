import { useState, useEffect } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    avatar: "P",
    color: "bg-pink-500",
    rating: 5,
    text: "SevaSetu changed the way I book services! The AC technician was so professional and on time. I've been using it for 6 months now and never had a bad experience.",
    service: "AC Repair & Service",
  },
  {
    name: "Rajesh Kumar",
    location: "Pune, Maharashtra",
    avatar: "R",
    color: "bg-blue-500",
    rating: 5,
    text: "Finally a platform where workers are treated fairly. As a customer, I know my money goes directly to skilled professionals. The quality of service is consistently excellent.",
    service: "Home Deep Cleaning",
  },
  {
    name: "Anita Desai",
    location: "Bangalore, Karnataka",
    avatar: "A",
    color: "bg-brand-purple",
    rating: 5,
    text: "I booked a salon service for my wedding prep and the beautician was amazing! The cooperative model means workers are more motivated and invested in quality.",
    service: "Bridal Salon Package",
  },
  {
    name: "Suresh Patil",
    location: "Nagpur, Maharashtra",
    avatar: "S",
    color: "bg-brand-success",
    rating: 4,
    text: "Used SevaSetu for plumbing repairs — the worker arrived within 30 minutes and fixed everything perfectly. Great pricing compared to local options.",
    service: "Plumbing Repair",
  },
  {
    name: "Meera Joshi",
    location: "Delhi, NCR",
    avatar: "M",
    color: "bg-brand-orange",
    rating: 5,
    text: "The yoga trainer I booked through SevaSetu is exceptional. Verified background, professional attitude. The app makes scheduling effortless!",
    service: "Yoga & Wellness",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur, Rajasthan",
    avatar: "V",
    color: "bg-cyan-500",
    rating: 5,
    text: "I've tried multiple service platforms but SevaSetu stands out with their worker verification process. You can actually trust the professionals they send.",
    service: "Electrical Work",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-[16px] fill ${
            i < count ? "text-brand-orange" : "text-outline-variant"
          }`}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, isRevealed } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-surface relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-purple/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />

      <div ref={ref} className="max-w-screen-xl mx-auto px-[16px] md:px-[64px] relative">
        {/* Section header */}
        <div className={`text-center mb-16 ${isRevealed ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
            What Our Customers <span className="text-gradient">Say</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
            Trusted by thousands of families across India.
          </p>
        </div>

        {/* Carousel */}
        <div className={`${isRevealed ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {/* Desktop: show 3 at a time */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const idx = (activeIndex + offset) % TESTIMONIALS.length;
              const t = TESTIMONIALS[idx];
              return (
                <div
                  key={`${t.name}-${idx}`}
                  className="card-hover bg-white rounded-3xl p-8 border border-outline-variant/50 flex flex-col transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {t.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-on-surface text-sm">{t.name}</p>
                      <p className="text-xs text-on-surface-variant">{t.location}</p>
                    </div>
                  </div>
                  <StarRating count={t.rating} />
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-4 flex-1">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t border-outline-variant/50">
                    <span className="text-xs font-semibold text-brand-purple">{t.service}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: show 1 at a time */}
          <div className="md:hidden">
            {(() => {
              const t = TESTIMONIALS[activeIndex];
              return (
                <div className="bg-white rounded-3xl p-6 border border-outline-variant/50 shadow-lg transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {t.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-on-surface text-sm">{t.name}</p>
                      <p className="text-xs text-on-surface-variant">{t.location}</p>
                    </div>
                  </div>
                  <StarRating count={t.rating} />
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-4">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t border-outline-variant/50">
                    <span className="text-xs font-semibold text-brand-purple">{t.service}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-brand-purple w-8"
                    : "bg-outline-variant hover:bg-on-surface-variant"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
