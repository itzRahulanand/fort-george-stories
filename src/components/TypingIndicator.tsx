const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg gold-gradient">
        🏰
      </div>

      {/* Typing bubble */}
      <div className="chat-bubble-assistant">
        <div className="flex items-center gap-1.5 py-1">
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground animate-typing"
            style={{ animationDelay: "0ms" }}
          />
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground animate-typing"
            style={{ animationDelay: "200ms" }}
          />
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground animate-typing"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
