import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLatest?: boolean;
}

const ChatMessage = ({ role, content, isLatest }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg",
          isUser ? "bg-primary text-primary-foreground" : "gold-gradient"
        )}
      >
        {isUser ? "👤" : "🏰"}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%]",
          isUser ? "chat-bubble-user" : "chat-bubble-assistant"
        )}
      >
        {isUser ? (
          <p className="font-sans text-sm md:text-base whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm md:prose-base prose-stone dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0 font-body text-base leading-relaxed">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-heritage-burgundy dark:text-heritage-gold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="font-body">{children}</li>
                ),
                h1: ({ children }) => (
                  <h1 className="font-heritage text-xl mb-3 text-heritage-burgundy dark:text-heritage-gold">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-heritage text-lg mb-2 text-heritage-burgundy dark:text-heritage-gold">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-heritage text-base mb-2 text-heritage-burgundy dark:text-heritage-gold">{children}</h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-heritage-gold pl-4 italic my-3 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
