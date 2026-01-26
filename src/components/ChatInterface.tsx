import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatInterfaceProps {
  onBack: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/museum-guide`;

const SUGGESTED_QUESTIONS = [
  "What was daily life like inside the fort?",
  "Tell me about St. Mary's Church",
  "Who was Elihu Yale?",
  "What artifacts can I see in the museum?",
];

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Fort St. George! 🏰 I'm absolutely delighted to be your guide through this magnificent piece of history. Built in 1644, this fort has witnessed centuries of remarkable stories—from daring merchants and British colonial officers to the vibrant pulse of what would become modern Chennai.\n\nWhat would you like to explore today? Perhaps the ancient St. Mary's Church, the fascinating museum collections, or maybe the story of how this fortress shaped an entire city?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const streamChat = async (userMessages: Message[]) => {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limits exceeded. Please wait a moment and try again.");
      }
      if (response.status === 402) {
        throw new Error("Service temporarily unavailable. Please try again later.");
      }
      throw new Error("Failed to connect to the museum guide.");
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: inputValue.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    textareaRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-xl">
              🏰
            </div>
            <div>
              <h1 className="font-heritage text-lg text-foreground">Museum Guide</h1>
              <p className="text-xs text-muted-foreground">Fort St. George, Chennai</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
        <div className="max-w-4xl mx-auto py-6 space-y-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              isLatest={index === messages.length - 1}
            />
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <TypingIndicator />
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="px-4 py-2 text-sm bg-card border border-border rounded-full hover:bg-muted transition-colors text-foreground"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-card/80 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the fort's history, artifacts, or stories..."
            className="min-h-[52px] max-h-32 resize-none bg-background border-border focus-visible:ring-heritage-gold"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="gold-gradient text-heritage-brown hover:opacity-90 px-6 self-end"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
