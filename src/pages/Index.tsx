import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import MuseumMap from "@/components/MuseumMap";
import VirtualTimeline from "@/components/VirtualTimeline";

type View = "hero" | "chat" | "map" | "timeline";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("hero");
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const handleAskGuide = (question: string) => {
    setPendingQuestion(question);
    setCurrentView("chat");
  };

  const handleBackToHero = () => {
    setCurrentView("hero");
    setPendingQuestion(null);
  };

  if (currentView === "chat") {
    return (
      <ChatInterface
        onBack={handleBackToHero}
        initialQuestion={pendingQuestion}
      />
    );
  }

  if (currentView === "map") {
    return (
      <MuseumMap
        onBack={handleBackToHero}
        onAskGuide={handleAskGuide}
      />
    );
  }

  if (currentView === "timeline") {
    return (
      <VirtualTimeline
        onBack={handleBackToHero}
        onAskGuide={handleAskGuide}
      />
    );
  }

  return (
    <HeroSection
      onStartChat={() => setCurrentView("chat")}
      onOpenMap={() => setCurrentView("map")}
      onOpenTimeline={() => setCurrentView("timeline")}
    />
  );
};

export default Index;
