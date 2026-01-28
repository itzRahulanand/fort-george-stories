import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import MuseumMap from "@/components/MuseumMap";

type View = "hero" | "chat" | "map";

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

  return (
    <HeroSection
      onStartChat={() => setCurrentView("chat")}
      onOpenMap={() => setCurrentView("map")}
    />
  );
};

export default Index;
