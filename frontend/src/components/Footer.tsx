import { Heart, Instagram, Phone, Mail } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-white to-[#A7C7E7]/20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] rounded-2xl flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] bg-clip-text text-transparent">
                Sahabat Jiwa
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Ruang aman untuk berbagi pikiranmu 💙
            </p>
            <p className="text-sm text-gray-500">
              Platform dukungan kesehatan mental untuk mahasiswa Indonesia.
              Kamu tidak sendiri dalam perjalanan ini.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-[#4689C8]">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="text-gray-600 hover:text-[#4689C8] transition-colors text-sm"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("articles")}
                  className="text-gray-600 hover:text-[#4689C8] transition-colors text-sm"
                >
                  Artikel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("forum")}
                  className="text-gray-600 hover:text-[#4689C8] transition-colors text-sm"
                >
                  Komunitas
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-[#4689C8] transition-colors text-sm">
                  Tentang Kami
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-4 text-[#4689C8]">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#4689C8]" />
                <span>Hotline: 119</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-[#4689C8]" />
                <span>support@sahabatjiwa.id</span>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4689C8] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@sahabatjiwa.id</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Sahabat Jiwa. Data kamu bersifat pribadi dan aman.
            </p>
            <div className="flex gap-6">
              <button className="text-sm text-gray-500 hover:text-[#4689C8] transition-colors">
                Privasi
              </button>
              <button className="text-sm text-gray-500 hover:text-[#4689C8] transition-colors">
                Syarat & Ketentuan
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
