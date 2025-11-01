import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { ChatbotInterface } from "./components/ChatbotInterface";
import { ArticleSection } from "./components/ArticleSection";
import { DoctorConsultation } from "./components/DoctorConsultation";
import { ForumSection } from "./components/ForumSection";
import { LoginPage } from "./components/LoginPage";
import { FloatingChatbot } from "./components/FloatingChatbot";

type Page = "home" | "chatbot" | "articles" | "doctor" | "forum" | "login";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Initial loading animation
    setTimeout(() => setIsLoading(false), 1000);

    // Set favicon
    const setFavicon = () => {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'icon';
      link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23A7C7E7;stop-opacity:1" /><stop offset="100%" style="stop-color:%234689C8;stop-opacity:1" /></linearGradient></defs><rect width="100" height="100" rx="25" fill="url(%23grad)"/><path d="M50 75c-1.5 0-3-0.6-4-1.7C38 65 25 50 25 38c0-8.3 6.7-15 15-15 4.4 0 8.3 1.9 11 5 2.7-3.1 6.6-5 11-5 8.3 0 15 6.7 15 15 0 12-13 27-21 35.3-1 1.1-2.5 1.7-4 1.7z" fill="white"/></svg>';
      document.head.appendChild(link);
      
      // Set page title
      document.title = 'Sahabat Jiwa - Platform Kesehatan Mental Mahasiswa';
    };
    
    setFavicon();
  }, []);

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleLogin = (profile: UserProfile) => {
    setIsLoggedIn(true);
    setUserProfile(profile);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setCurrentPage("home");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#BEE3F8]/30 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          {/* Breathing Circle Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] rounded-full flex items-center justify-center shadow-2xl"
          >
            <span className="text-4xl">💙</span>
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#4689C8]"
          >
            Memuat Sahabat Jiwa...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      
      {/* Navbar - Hidden on login page */}
      {currentPage !== "login" && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          onLogout={handleLogout}
        />
      )}

      {/* Page Content with Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === "home" && <HeroSection onNavigate={handleNavigate} />}
          {currentPage === "chatbot" && <ChatbotInterface />}
          {currentPage === "articles" && <ArticleSection />}
          {currentPage === "doctor" && <DoctorConsultation isLoggedIn={isLoggedIn} userProfile={userProfile} />}
          {currentPage === "forum" && <ForumSection isLoggedIn={isLoggedIn} userProfile={userProfile} />}
          {currentPage === "login" && <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />}
        </motion.div>
      </AnimatePresence>

      {/* Footer - Hidden on login and chatbot pages */}
      {currentPage !== "login" && currentPage !== "chatbot" && <Footer onNavigate={handleNavigate} />}

      {/* Floating Chatbot - Hidden on chatbot and login pages */}
      {currentPage !== "chatbot" && currentPage !== "login" && (
        <FloatingChatbot onNavigate={handleNavigate} />
      )}
    </div>
  );
}
