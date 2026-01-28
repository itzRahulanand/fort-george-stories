import { ArrowLeft, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExhibitHotspot, { Exhibit } from "./ExhibitHotspot";
import ThemeToggle from "./ThemeToggle";

const EXHIBITS: Exhibit[] = [
  {
    id: "st-marys-church",
    name: "St. Mary's Church",
    description: "The oldest Anglican church in India, built in 1680. This sacred space has witnessed countless historic events, including the marriage of Robert Clive and the baptism of Elihu Yale's children.",
    highlights: [
      "Original 17th-century architecture",
      "Historic tombstones and memorials",
      "Marriage register signed by Robert Clive",
      "Beautiful stained glass windows",
    ],
    position: { x: 25, y: 30 },
    icon: "⛪",
  },
  {
    id: "fort-museum",
    name: "Fort Museum",
    description: "The main museum building houses an extraordinary collection of British Raj artifacts, including weapons, uniforms, coins, and documents that tell the story of colonial India.",
    highlights: [
      "Vintage military uniforms and weapons",
      "Rare coins and currency",
      "Letters and manuscripts from colonial era",
      "Paintings of historical figures",
    ],
    position: { x: 60, y: 45 },
    icon: "🏛️",
  },
  {
    id: "flagstaff-house",
    name: "Flagstaff House",
    description: "Once the residence of the Commander-in-Chief, this elegant building showcases the grandeur of British colonial architecture and houses precious artifacts.",
    highlights: [
      "Colonial furniture and décor",
      "Officers' personal belongings",
      "Historical photographs",
      "Panoramic views of the fort",
    ],
    position: { x: 75, y: 25 },
    icon: "🏰",
  },
  {
    id: "secretariat",
    name: "The Secretariat",
    description: "The administrative heart of the Madras Presidency for centuries. This building witnessed crucial decisions that shaped South India's history.",
    highlights: [
      "Original administrative records",
      "Governor's chamber artifacts",
      "Historic maps and surveys",
      "Stamps and seals collection",
    ],
    position: { x: 40, y: 70 },
    icon: "📜",
  },
  {
    id: "clives-corner",
    name: "Clive's Corner",
    description: "A dedicated exhibition celebrating Robert Clive's time at Fort St. George, featuring personal artifacts and accounts of his legendary military campaigns.",
    highlights: [
      "Clive's personal sword and pistol",
      "Battle of Arcot memorabilia",
      "Letters to England",
      "Portrait collection",
    ],
    position: { x: 85, y: 60 },
    icon: "⚔️",
  },
  {
    id: "entrance-gate",
    name: "Sea Gate",
    description: "The historic main entrance to Fort St. George, facing the Bay of Bengal. For centuries, merchants, soldiers, and dignitaries passed through these gates.",
    highlights: [
      "Original 17th-century structure",
      "Cannons and defensive positions",
      "Guard room displays",
      "Architectural details",
    ],
    position: { x: 15, y: 65 },
    icon: "🚪",
  },
];

interface MuseumMapProps {
  onBack: () => void;
  onAskGuide: (question: string) => void;
}

const MuseumMap = ({ onBack, onAskGuide }: MuseumMapProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-heritage-brown/5 via-background to-heritage-gold/5 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-xl sticky top-0 z-20 shadow-lg shadow-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg">
                <Map className="w-5 h-5 text-heritage-brown" />
              </div>
              <div>
                <h1 className="font-heritage text-lg text-foreground">Museum Map</h1>
                <p className="text-xs text-muted-foreground">Tap on exhibits to explore</p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Map area */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Map container */}
          <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-heritage-cream via-heritage-cream/80 to-heritage-gold/20 rounded-2xl shadow-2xl border border-heritage-gold/30 overflow-hidden">
            {/* Fort outline - decorative background */}
            <div className="absolute inset-4 md:inset-8 border-2 border-heritage-brown/20 rounded-xl" />
            <div className="absolute inset-8 md:inset-16 border border-heritage-brown/10 rounded-lg" />
            
            {/* Decorative compass */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-20 md:h-20 opacity-50">
              <svg viewBox="0 0 100 100" className="w-full h-full text-heritage-brown/40">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M50 10 L55 45 L50 50 L45 45 Z" fill="currentColor" />
                <path d="M50 90 L45 55 L50 50 L55 55 Z" fill="currentColor" opacity="0.4" />
                <path d="M10 50 L45 45 L50 50 L45 55 Z" fill="currentColor" opacity="0.4" />
                <path d="M90 50 L55 55 L50 50 L55 45 Z" fill="currentColor" opacity="0.4" />
                <text x="50" y="8" textAnchor="middle" fontSize="8" fill="currentColor">N</text>
              </svg>
            </div>

            {/* Map title */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8">
              <h2 className="font-heritage text-lg md:text-xl text-heritage-brown/70">Fort St. George</h2>
              <p className="text-xs text-heritage-brown/50">Est. 1644</p>
            </div>

            {/* Bay of Bengal indicator */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-xs text-heritage-brown/40 italic">
              ← Bay of Bengal
            </div>

            {/* Hotspots */}
            {EXHIBITS.map((exhibit) => (
              <ExhibitHotspot
                key={exhibit.id}
                exhibit={exhibit}
                onAskGuide={onAskGuide}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl border border-white/20">
            <h3 className="text-sm font-semibold text-foreground mb-3">Exhibits</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EXHIBITS.map((exhibit) => (
                <div key={exhibit.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{exhibit.icon}</span>
                  <span>{exhibit.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumMap;
