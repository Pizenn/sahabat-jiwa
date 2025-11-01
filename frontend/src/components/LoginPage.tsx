import { motion, AnimatePresence } from "motion/react";
import { Heart, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import studentsImage from "figma:asset/fbbc440e545306ac074751a85fc7a5532b190f80.png";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (profile: { name: string; email: string; avatar: string }) => void;
}

interface GoogleAccount {
  name: string;
  email: string;
  avatar: string;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [showAccountChooser, setShowAccountChooser] = useState(false);

  // Mock Google accounts yang tersimpan di browser
  const googleAccounts: GoogleAccount[] = [
    {
      name: "Ahmad Saidi",
      email: "ambamad@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    {
      name: "Aqilah",
      email: "aqilah@gmail.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Bima",
      email: "bima@gmail.com",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
  ];

  const handleGoogleButtonClick = () => {
    setShowAccountChooser(true);
  };

  const handleAccountSelect = (account: GoogleAccount) => {
    setShowAccountChooser(false);
    toast.success(`Berhasil masuk sebagai ${account.name}! 💙`);
    
    setTimeout(() => {
      onLogin(account);
    }, 800);
  };

  const handleUseAnotherAccount = () => {
    setShowAccountChooser(false);
    toast.info("Mengarahkan ke Google Sign-In...");
    
    // Simulate Google OAuth flow with a new random account
    setTimeout(() => {
      const newAccount: GoogleAccount = {
        name: "Pengguna Baru",
        email: "pengguna.baru@gmail.com",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
      };
      toast.success(`Berhasil masuk sebagai ${newAccount.name}! 💙`);
      onLogin(newAccount);
    }, 1500);
  };

  const handleGuestAccess = () => {
    toast.info("Masuk sebagai tamu. Beberapa fitur mungkin terbatas.");
    onNavigate("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#BEE3F8]/30 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#A7C7E7]/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F9C6AA]/30 rounded-full blur-2xl" />

              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
                <img
                  src={studentsImage}
                  alt="Students holding hands together"
                  className="w-full h-auto rounded-2xl mb-6"
                />

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] rounded-2xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" fill="white" />
                    </div>
                    <span className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] bg-clip-text text-transparent">
                      Sahabat Jiwa
                    </span>
                  </div>
                  <h2 className="mb-3 text-[#4689C8]">
                    Ruang Aman untuk Berbagi
                  </h2>
                  <p className="text-gray-600">
                    Bergabunglah dengan komunitas mahasiswa yang peduli kesehatan
                    mental. Kamu tidak sendiri dalam perjalanan ini.
                  </p>

                  {/* Features */}
                  <div className="mt-8 space-y-3 text-left">
                    {[
                      { text: "Chat 24/7 dengan AI Assistant" },
                      { text: "Konsultasi dengan Profesional" },
                      { text: "Komunitas Supportif & Anonim" },
                      { text: "Artikel & Sumber Daya" },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-[#F5F7FA] rounded-xl"
                      >
                        <span className="text-2xl">{feature.icon}</span>
                        <span className="text-gray-700">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] bg-clip-text text-transparent">
                  Sahabat Jiwa
                </span>
              </div>

              <div className="text-center mb-8">
                <h2 className="mb-2 text-[#4689C8]">Selamat Datang</h2>
                <p className="text-gray-600">
                  Masuk untuk mengakses semua fitur Sahabat Jiwa
                </p>
              </div>

              {/* Google Sign-In Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleGoogleButtonClick}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 rounded-xl py-6 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Masuk dengan Google</span>
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">atau</span>
                  </div>
                </div>

                {/* Guest Access */}
                <Button
                  onClick={handleGuestAccess}
                  variant="outline"
                  className="w-full border-2 border-[#BEE3F8] text-[#4689C8] hover:bg-[#BEE3F8]/20 rounded-xl py-6 transition-all"
                >
                  Masuk sebagai Tamu
                </Button>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-gradient-to-br from-[#A7C7E7]/10 to-[#BEE3F8]/10 rounded-2xl border-2 border-[#BEE3F8]/30">
                <p className="text-sm text-gray-600 text-center">
                  <span className="text-[#4689C8]">🔒 Privasi Terjamin</span>
                  <br />
                  Kami hanya menggunakan Google untuk autentikasi. Data kamu aman dan terlindungi.
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-500 text-center mb-3">
                  Dengan masuk, kamu bisa:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2 p-2 bg-[#F5F7FA] rounded-lg">
                    <span className="text-green-500">✓</span>
                    <span>Booking konselor</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#F5F7FA] rounded-lg">
                    <span className="text-green-500">✓</span>
                    <span>Forum diskusi</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#F5F7FA] rounded-lg">
                    <span className="text-green-500">✓</span>
                    <span>Riwayat chat</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#F5F7FA] rounded-lg">
                    <span className="text-green-500">✓</span>
                    <span>Artikel favorit</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-6">
                Dengan masuk, kamu menyetujui{" "}
                <button className="text-[#4689C8] hover:underline">
                  Syarat & Ketentuan
                </button>{" "}
                dan{" "}
                <button className="text-[#4689C8] hover:underline">
                  Kebijakan Privasi
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Google Account Chooser Modal */}
      <AnimatePresence>
        {showAccountChooser && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAccountChooser(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <div>
                        <h3 className="text-gray-800">Pilih akun</h3>
                        <p className="text-sm text-gray-500">untuk melanjutkan ke Sahabat Jiwa</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAccountChooser(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Account List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {googleAccounts.map((account, index) => (
                    <button
                      key={index}
                      onClick={() => handleAccountSelect(account)}
                      className="w-full p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 border-b border-gray-100 group"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-[#4285F4] transition-all">
                        <img
                          src={account.avatar}
                          alt={account.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-gray-800 truncate">{account.name}</p>
                        <p className="text-sm text-gray-500 truncate">{account.email}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4285F4] transition-colors flex-shrink-0" />
                    </button>
                  ))}

                  {/* Use Another Account */}
                  <button
                    onClick={handleUseAnotherAccount}
                    className="w-full p-4 hover:bg-gray-50 transition-colors flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-800">Gunakan akun lain</p>
                    </div>
                  </button>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Untuk melanjutkan, Google akan membagikan nama, alamat email, preferensi bahasa, dan foto profil Anda dengan Sahabat Jiwa.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
