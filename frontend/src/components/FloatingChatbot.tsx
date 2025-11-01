import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

interface FloatingChatbotProps {
  onNavigate: (page: string) => void;
}

export function FloatingChatbot({ onNavigate }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#4689C8] animate-ping opacity-20" />
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-24 right-6 z-40 bg-white px-4 py-2 rounded-xl shadow-lg text-sm text-gray-700 whitespace-nowrap pointer-events-none"
          >
            Butuh bantuan? Chat dengan AI! 💙
            <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-28 right-6 z-40 bg-white rounded-2xl shadow-2xl p-4 w-64"
          >
            <h4 className="mb-3 text-[#4689C8]">Apa yang bisa kami bantu?</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate("chatbot");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] text-white hover:opacity-90 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <div className="text-sm">Chat dengan AI</div>
                    <div className="text-xs opacity-80">AI 24/7</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  onNavigate("doctor");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-[#F5F7FA] hover:bg-[#BEE3F8]/30 transition-all text-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👨‍⚕️</span>
                  <div>
                    <div className="text-sm">Konsultasi Dokter</div>
                    <div className="text-xs text-gray-500">Profesional</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  onNavigate("forum");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-[#F5F7FA] hover:bg-[#BEE3F8]/30 transition-all text-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="text-sm">Gabung Forum</div>
                    <div className="text-xs text-gray-500">Komunitas</div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Darurat? Hubungi <span className="text-[#4689C8]">119</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
