import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, Users, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import studentsImage from "figma:asset/fbbc440e545306ac074751a85fc7a5532b190f80.png";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [typedText, setTypedText] = useState("");
  const fullText = "Kamu tidak sendiri. Mari pulih bersama.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F7FA] via-white to-[#BEE3F8]/30">
      {/* Floating Bubbles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#A7C7E7]/20 to-[#BEE3F8]/20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6 px-8 py-3 bg-[#C7EBD9]/30 rounded-full"
            >
              <span className="text-[#4689C8] text-xl">Selamat Datang di Sahabat Jiwa 💙</span>
            </motion.div>

            <h1 className="mb-6 bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] bg-clip-text text-transparent">
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>

            <p className="mb-8 text-gray-600 max-w-xl mx-auto lg:mx-0">
              Ruang aman untuk berbagi, belajar, dan mendapatkan bantuan yang
              kamu butuhkan. Kami memahami tekanan kuliah, kecemasan, dan
              overthinking yang kamu alami.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => onNavigate("chatbot")}
                className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-2xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Mulai Chat dengan AI 🤖
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={() => onNavigate("forum")}
                variant="outline"
                className="border-2 border-[#4689C8] text-[#4689C8] hover:bg-[#BEE3F8]/30 rounded-2xl px-8 py-6 transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                Gabung Komunitas 💬
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
                <div className="text-[#4689C8] mb-1">50+</div>
                <div className="text-sm text-gray-600">Psikolog Profesional</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
                <div className="text-[#4689C8] mb-1">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm">
                <div className="text-[#4689C8] mb-1">100%</div>
                <div className="text-sm text-gray-600">Privat</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#A7C7E7]/20 to-[#C7EBD9]/20 p-8">
              <img
                src={studentsImage}
                alt="Students holding hands together"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
