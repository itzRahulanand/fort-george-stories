import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLatest?: boolean;
}

const ChatMessage = ({ role, content, isLatest }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        scale: { duration: 0.2 }
      }}
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 25 }}
        className={cn(
          "w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg shadow-lg",
          isUser ? "bg-primary/90 backdrop-blur-md text-primary-foreground" : "gold-gradient"
        )}
      >
        {isUser ? "👤" : "🏰"}
      </motion.div>

      {/* Message bubble */}
      <motion.div
        initial={{ opacity: 0, x: isUser ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05, duration: 0.25 }}
        className={cn(
          "max-w-[80%] md:max-w-[70%]",
          isUser ? "chat-bubble-user" : "chat-bubble-assistant"
        )}
      >
        {isUser ? (
          <p className="font-sans text-sm md:text-base whitespace-pre-wrap text-white">{content}</p>
        ) : (
          <div className="prose prose-sm md:prose-base max-w-none prose-invert">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0 font-body text-base leading-relaxed text-white">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-emerald-300">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-white/90">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-3 space-y-1 text-white">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-3 space-y-1 text-white">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="font-body text-white">{children}</li>
                ),
                h1: ({ children }) => (
                  <h1 className="font-heritage text-xl mb-3 text-emerald-300">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-heritage text-lg mb-2 text-emerald-300">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-heritage text-base mb-2 text-emerald-300">{children}</h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-emerald-400 pl-4 italic my-3 text-white/80">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatMessage;
