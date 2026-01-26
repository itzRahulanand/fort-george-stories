import { ChevronDown } from "lucide-react";
import fortHero from "@/assets/fort-hero.jpg";

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={fortHero}
          alt="Fort St. George, Chennai"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 heritage-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <span className="inline-block text-heritage-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Est. 1644 • Chennai, India
          </span>
        </div>

        <h1 
          className="font-heritage text-5xl md:text-7xl lg:text-8xl text-heritage-cream mb-6 leading-tight animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Fort St. George
          <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 text-heritage-gold font-normal">
            Museum Explorer
          </span>
        </h1>

        <p 
          className="font-body text-xl md:text-2xl text-heritage-cream/90 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          Step back in time with your personal historical guide. Discover the stories, 
          artifacts, and secrets of India's first English fortress.
        </p>

        <button
          onClick={onStartChat}
          className="group relative inline-flex items-center gap-3 gold-gradient text-heritage-brown font-sans font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="text-lg">Begin Your Journey</span>
          <span className="text-2xl">🏰</span>
        </button>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <ChevronDown className="w-8 h-8 text-heritage-cream/60" />
        </div>
      </div>

      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-heritage-gold/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-heritage-gold/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-heritage-gold/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-heritage-gold/30" />
    </section>
  );
};

export default HeroSection;
