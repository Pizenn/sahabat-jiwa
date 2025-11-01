import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hai 👋 Apa kabar hari ini? Aku AI Assistant dari Sahabat Jiwa, teman yang siap mendengarkanmu kapan saja.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

    const handleSendMessage = async () => {
    const userMessageText = inputValue.trim();
    if (!userMessageText) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

try {
      // VITE_API_URL akan kita atur di Railway
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`https://thoric-exoterically-brittaney.ngrok-free.dev/chat`, { 
// ...
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessageText }), // Kirim pesan pengguna
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan balasan dari server.");
      }

      const data = await response.json(); // Harusnya berisi { reply: "..." }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply, // Ambil balasan dari API
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      console.error("Error:", error);
      // Tampilkan pesan error di chat jika API gagal
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Maaf, terjadi kesalahan saat menghubungi server. Coba lagi nanti.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      // Pastikan 'isTyping' selalu false setelah selesai, baik sukses maupun gagal
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#BEE3F8]/20">
      {/* Header - Simple and Clean */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-800">AI Assistant</p>
              <p className="text-xs text-gray-500">Teman yang Selalu Mendengarkanmu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    message.sender === "bot"
                      ? "bg-gradient-to-br from-[#A7C7E7] to-[#4689C8]"
                      : "bg-gradient-to-br from-[#F9C6AA] to-[#F9C6AA]/60"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.sender === "bot"
                      ? "bg-white border-2 border-[#BEE3F8]"
                      : "bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] text-white"
                  }`}
                >
                  <p className={`${message.sender === "bot" ? "text-base leading-relaxed" : "text-sm"}`}>
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "bot"
                        ? "text-gray-400"
                        : "text-white/70"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border-2 border-[#BEE3F8] p-4 rounded-2xl">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="w-2 h-2 bg-[#4689C8] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-[#4689C8] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-[#4689C8] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions - Above Input (Hidden after first use) */}
      {showQuickActions && (
        <div className="flex-shrink-0 px-4 sm:px-6 py-2">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Aku merasa cemas",
                "Susah tidur",
                "Overthinking terus",
                "Burnout kuliah",
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleSendMessage(topic)}
                  className="px-3 py-1.5 bg-white hover:bg-[#BEE3F8]/30 border border-[#BEE3F8] rounded-xl text-xs text-[#4689C8] transition-all hover:shadow-sm"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area - Fixed at Bottom */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ketik pesanmu di sini..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-xl px-6"
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
