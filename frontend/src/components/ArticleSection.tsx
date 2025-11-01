import { motion } from "motion/react";
import { Search, Filter, BookOpen, Brain, Moon, Heart, Coffee, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  icon: any;
}

export function ArticleSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Semua", icon: BookOpen },
    { id: "stress", name: "Manajemen Stres", icon: Brain },
    { id: "self-care", name: "Perawatan Diri", icon: Heart },
    { id: "campus", name: "Kehidupan Kampus", icon: Users },
    { id: "anxiety", name: "Kecemasan", icon: Coffee },
    { id: "sleep", name: "Tidur", icon: Moon },
  ];

  const articles: Article[] = [
    {
      id: "1",
      title: "5 Cara Mengatasi Overthinking di Malam Hari",
      excerpt:
        "Pikiran yang berputar terus saat mau tidur? Coba teknik-teknik sederhana ini untuk menenangkan pikiran dan tidur lebih nyenyak.",
      category: "sleep",
      image: "https://images.unsplash.com/photo-1632830049084-308fd151d8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcmVhZGluZyUyMGJvb2t8ZW58MXx8fHwxNzYxOTEwMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readTime: "5 menit",
      icon: Moon,
    },
    {
      id: "2",
      title: "Burnout Akademik: Tanda dan Cara Mengatasinya",
      excerpt:
        "Merasa lelah mental setelah kuliah? Kenali tanda-tanda burnout dan langkah pemulihan yang bisa kamu lakukan.",
      category: "stress",
      image: "https://images.unsplash.com/photo-1742093162117-7c4e94df7cb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHN0dWRlbnQlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjE5MzA1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readTime: "7 menit",
      icon: Brain,
    },
    {
      id: "3",
      title: "Rutinitas Self-Care untuk Mahasiswa Sibuk",
      excerpt:
        "Tidak perlu waktu lama! Ini adalah rutinitas perawatan diri 10 menit yang bisa kamu lakukan setiap hari.",
      category: "self-care",
      image: "https://images.unsplash.com/photo-1687436874044-2c593fbf0245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MTg0OTYxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readTime: "6 menit",
      icon: Heart,
    },
    {
      id: "4",
      title: "Mengelola Kecemasan Saat Ujian",
      excerpt:
        "Tips praktis untuk tetap tenang dan fokus saat menghadapi ujian besar atau presentasi penting.",
      category: "anxiety",
      image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdXBwb3J0fGVufDF8fHx8MTc2MTkzMDU4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readTime: "8 menit",
      icon: Coffee,
    },
    {
      id: "5",
      title: "Membangun Hubungan Sosial yang Sehat di Kampus",
      excerpt:
        "Cara membangun pertemanan yang supportif dan menjaga batasan yang sehat dengan teman sekelas.",
      category: "campus",
      image: "https://images.unsplash.com/photo-1761250027507-c0be614c0254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwZ3JvdXB8ZW58MXx8fHwxNzYxODA3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readTime: "6 menit",
      icon: Users,
    },
    {
      id: "6",
      title: "Teknik Pernapasan untuk Meredakan Stres Cepat",
      excerpt:
        "Latihan pernapasan sederhana yang bisa kamu lakukan di mana saja, kapan saja untuk meredakan stres.",
      category: "stress",
      image: "https://images.unsplash.com/photo-1687436874044-2c593fbf0245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzfGVufDF8fHx8MTc2MTg0OTYxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      readTime: "4 menit",
      icon: Brain,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#BEE3F8]/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] bg-clip-text text-transparent">
            Artikel & Sumber Daya
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan informasi dan tips untuk mendukung kesehatan mental kamu
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors bg-white"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-[#BEE3F8]/30 border-2 border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#4689C8]" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-[#4689C8] group-hover:text-[#A7C7E7] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      ⏱ {article.readTime}
                    </span>
                    <Button
                      variant="ghost"
                      className="text-[#4689C8] hover:bg-[#BEE3F8]/30 rounded-xl text-sm"
                    >
                      Baca Selengkapnya →
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">
              Tidak ada artikel yang ditemukan. Coba kata kunci lain.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
