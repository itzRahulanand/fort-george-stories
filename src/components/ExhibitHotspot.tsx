import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Exhibit {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  position: { x: number; y: number };
  icon: string;
}

interface ExhibitHotspotProps {
  exhibit: Exhibit;
  onAskGuide: (question: string) => void;
}

const ExhibitHotspot = ({ exhibit, onAskGuide }: ExhibitHotspotProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hotspot marker */}
      <motion.button
        className="absolute z-10 group"
        style={{ left: `${exhibit.position.x}%`, top: `${exhibit.position.y}%` }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Pulse ring */}
          <span className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-heritage-gold/30 animate-ping" />
          
          {/* Main marker */}
          <div className="relative w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full gold-gradient flex items-center justify-center text-xl shadow-lg border-2 border-white/50 cursor-pointer transition-shadow group-hover:shadow-heritage-gold/50 group-hover:shadow-xl">
            {exhibit.icon}
          </div>
          
          {/* Label */}
          <div className="absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
            {exhibit.name}
          </div>
        </div>
      </motion.button>

      {/* Detail modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-md bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              {/* Header */}
              <div className="gold-gradient p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{exhibit.icon}</span>
                  <h3 className="font-heritage text-lg text-heritage-brown">{exhibit.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-heritage-brown hover:bg-heritage-brown/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {exhibit.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Highlights:</h4>
                  <ul className="space-y-1">
                    {exhibit.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-heritage-gold mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => {
                    onAskGuide(`Tell me more about ${exhibit.name}`);
                    setIsOpen(false);
                  }}
                  className="w-full gold-gradient text-heritage-brown hover:opacity-90"
                >
                  Ask the Guide About This
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExhibitHotspot;
