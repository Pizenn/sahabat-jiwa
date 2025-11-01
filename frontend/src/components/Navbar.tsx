import { useState, useEffect } from "react";
import { Menu, X, Heart, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userProfile: { name: string; email: string; avatar: string } | null;
  onLogout: () => void;
}

export function Navbar({ currentPage, onNavigate, isLoggedIn, userProfile, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", page: "home" },
    { name: "Artikel", page: "articles" },
    { name: "AI Chat", page: "chatbot" },
    { name: "Konsultasi", page: "doctor" },
    { name: "Forum", page: "forum" },
  ];

  const handleLogoutClick = () => {
    onLogout();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] rounded-2xl flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] bg-clip-text text-transparent">
              Sahabat Jiwa
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`transition-all duration-200 ${
                  currentPage === link.page
                    ? "text-[#4689C8]"
                    : "text-gray-600 hover:text-[#4689C8]"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* User Section - Desktop */}
          <div className="hidden md:block">
            {isLoggedIn && userProfile ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-[#BEE3F8]/20 transition-all"
                >
                  <Avatar className="w-9 h-9 border-2 border-[#A7C7E7]">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] text-white">
                      {userProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700">{userProfile.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                    <div className="p-4 bg-gradient-to-br from-[#A7C7E7]/10 to-[#BEE3F8]/10 border-b border-gray-100">
                      <p className="text-sm text-gray-600">Masuk sebagai</p>
                      <p className="text-[#4689C8] truncate">{userProfile.email}</p>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => onNavigate("login")}
                className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-2xl transition-all duration-300 hover:shadow-lg"
              >
                Masuk / Daftar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-xl transition-all ${
                    currentPage === link.page
                      ? "bg-[#BEE3F8] text-[#4689C8]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile User Section */}
              {isLoggedIn && userProfile ? (
                <div className="mx-4 mt-2 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-3 px-4 py-2 bg-[#F5F7FA] rounded-xl">
                    <Avatar className="w-10 h-10 border-2 border-[#A7C7E7]">
                      <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] text-white">
                        {userProfile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{userProfile.name}</p>
                      <p className="text-xs text-gray-500 truncate">{userProfile.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogoutClick}
                    variant="outline"
                    className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    onNavigate("login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-2xl mx-4"
                >
                  Masuk / Daftar
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
