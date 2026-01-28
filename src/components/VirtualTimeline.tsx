import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

interface VirtualTimelineProps {
  onBack: () => void;
  onAskGuide: (question: string) => void;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "founding" | "conflict" | "cultural" | "administrative" | "modern";
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1644",
    title: "Foundation of Fort St. George",
    description: "Francis Day and Andrew Cogan of the East India Company establish a fortified trading post, acquiring land from the local Nayak ruler.",
    category: "founding",
  },
  {
    year: "1653",
    title: "Fort Becomes Presidency Headquarters",
    description: "Fort St. George is elevated to the headquarters of the Coromandel Coast, marking the beginning of British administrative presence.",
    category: "administrative",
  },
  {
    year: "1678",
    title: "St. Mary's Church Consecrated",
    description: "The oldest Anglican church in India is consecrated within the fort walls, becoming a spiritual center for the British community.",
    category: "cultural",
  },
  {
    year: "1687",
    title: "Madras Becomes a Presidency",
    description: "Fort St. George becomes the capital of the Madras Presidency, one of the three major administrative units of British India.",
    category: "administrative",
  },
  {
    year: "1702",
    title: "Elihu Yale Departs",
    description: "Former Governor Elihu Yale leaves India, later donating his wealth to establish Yale University in America.",
    category: "cultural",
  },
  {
    year: "1746",
    title: "French Capture the Fort",
    description: "During the Carnatic Wars, French forces under La Bourdonnais capture Fort St. George, holding it for three years.",
    category: "conflict",
  },
  {
    year: "1749",
    title: "Fort Returned to British",
    description: "The Treaty of Aix-la-Chapelle returns Fort St. George to British control, leading to extensive fortification upgrades.",
    category: "conflict",
  },
  {
    year: "1758-1759",
    title: "Great Siege of Madras",
    description: "French forces under Lally attempt to capture the fort but fail after a prolonged siege, securing British dominance.",
    category: "conflict",
  },
  {
    year: "1783",
    title: "Clive's Corner Established",
    description: "The corner of the fort associated with Robert Clive becomes a notable landmark, commemorating his role in British India.",
    category: "cultural",
  },
  {
    year: "1857",
    title: "Sepoy Mutiny Impact",
    description: "Though the Great Rebellion doesn't directly affect Madras, the fort's strategic importance is reinforced with additional troops.",
    category: "conflict",
  },
  {
    year: "1947",
    title: "Indian Independence",
    description: "India gains independence. Fort St. George becomes the seat of the Tamil Nadu Legislative Assembly.",
    category: "modern",
  },
  {
    year: "1948",
    title: "Fort Museum Established",
    description: "The Fort Museum opens to the public, preserving colonial-era artifacts, weapons, coins, and historical documents.",
    category: "modern",
  },
  {
    year: "2024",
    title: "380th Anniversary",
    description: "Fort St. George celebrates 380 years of history, continuing to serve as the seat of Tamil Nadu government.",
    category: "modern",
  },
];

const categoryColors: Record<TimelineEvent["category"], string> = {
  founding: "bg-amber-500",
  conflict: "bg-red-500",
  cultural: "bg-purple-500",
  administrative: "bg-blue-500",
  modern: "bg-emerald-500",
};

const VirtualTimeline = ({ onBack, onAskGuide }: VirtualTimelineProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-heritage-brown/5 via-background to-heritage-gold/5 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-xl sticky top-0 z-10 shadow-lg shadow-black/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
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
                <Clock className="w-5 h-5 text-heritage-brown" />
              </div>
              <div>
                <h1 className="font-heritage text-lg text-foreground">Virtual Timeline</h1>
                <p className="text-xs text-muted-foreground">1644 - Present</p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Legend */}
      <div className="px-4 py-4 border-b border-white/10 bg-white/5 dark:bg-black/10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-center">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-xs text-white/80 capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-heritage-gold via-heritage-gold/50 to-heritage-gold transform md:-translate-x-1/2" />

            {/* Events */}
            <div className="space-y-8">
              {TIMELINE_EVENTS.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year marker */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 transform -translate-x-1/2 md:-translate-x-1/2 mt-2">
                    <div className={`w-4 h-4 rounded-full ${categoryColors[event.category]} ring-4 ring-background shadow-lg`} />
                  </div>

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-heritage-gold bg-heritage-gold/20 rounded-full mb-2">
                        {event.year}
                      </span>
                      <h3 className="font-heritage text-lg text-white mb-2">{event.title}</h3>
                      <p className="font-body text-sm text-white/80 mb-3">{event.description}</p>
                      <button
                        onClick={() => onAskGuide(`Tell me more about ${event.title} in ${event.year}`)}
                        className="text-xs text-heritage-gold hover:text-heritage-gold/80 transition-colors font-medium"
                      >
                        Ask the Guide →
                      </button>
                    </div>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default VirtualTimeline;
