import { motion } from "motion/react";
import { MessageSquare, Heart, Clock, User, Plus, TrendingUp, Filter, Shield, Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";

interface ForumThread {
  id: string;
  title: string;
  content: string;
  category: string;
  replies: Reply[];
  likes: number;
  timestamp: string;
  isLiked: boolean;
}

interface Reply {
  id: string;
  author: string;
  isAnonymous: boolean;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface ForumSectionProps {
  isLoggedIn: boolean;
  userProfile: { name: string; email: string; avatar: string } | null;
}

export function ForumSection({ isLoggedIn, userProfile }: ForumSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [showNewThreadDialog, setShowNewThreadDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [replyAsAnonymous, setReplyAsAnonymous] = useState(false);
  
  const [newThread, setNewThread] = useState({
    title: "",
    content: "",
    category: "overthinking",
  });

  const [replyContent, setReplyContent] = useState("");

  const [threads, setThreads] = useState<ForumThread[]>([
    {
      id: "1",
      title: "Cara menghadapi overthinking di malam hari",
      content:
        "Halo semuanya, aku sering banget overthinking pas mau tidur. Pikiran terus berputar tentang tugas, deadline, dan hal-hal yang belum tentu terjadi. Ada yang punya tips?",
      category: "overthinking",
      replies: [
        {
          id: "r1",
          author: "Dian K.",
          isAnonymous: false,
          content: "Coba teknik breathing 4-7-8. Tarik napas 4 detik, tahan 7 detik, buang 8 detik. Sangat membantu!",
          timestamp: "1 jam lalu",
          likes: 5,
          isLiked: false,
        },
        {
          id: "r2",
          author: "Anonymous",
          isAnonymous: true,
          content: "Aku juga mengalami hal yang sama. Biasanya aku tulis di jurnal sebelum tidur, lumayan ngebantu.",
          timestamp: "30 menit lalu",
          likes: 3,
          isLiked: false,
        },
      ],
      likes: 24,
      timestamp: "2 jam lalu",
      isLiked: false,
    },
    {
      id: "2",
      title: "Burnout setelah ujian tengah semester",
      content:
        "Setelah UTS selesai kok aku malah merasa sangat lelah ya? Bukan fisik, tapi lebih ke mental. Rasanya ga ada motivasi buat ngapa-ngapain. Normal ga sih?",
      category: "burnout",
      replies: [],
      likes: 31,
      timestamp: "5 jam lalu",
      isLiked: false,
    },
    {
      id: "3",
      title: "Tips menjaga kesehatan mental sambil organisasi",
      content:
        "Bagi kalian yang aktif di organisasi kampus, gimana cara kalian balance antara kuliah, organisasi, dan me-time? Aku merasa mulai kewalahan nih...",
      category: "balance",
      replies: [],
      likes: 15,
      timestamp: "1 hari lalu",
      isLiked: false,
    },
    {
      id: "4",
      title: "Susah tidur karena cemas tentang masa depan",
      content:
        "Semester akhir ini, aku sering banget cemas mikirin masa depan setelah lulus. Prospek kerja, karir, dll. Jadi susah tidur dan konsentrasi belajar juga terganggu.",
      category: "sleep",
      replies: [],
      likes: 28,
      timestamp: "1 hari lalu",
      isLiked: false,
    },
    {
      id: "5",
      title: "Sharing: Perjalanan aku keluar dari quarter-life crisis",
      content:
        "Mau share pengalaman aku yang sempat mengalami quarter-life crisis di tahun ke-3 kuliah. Semoga bisa membantu kalian yang sedang mengalami hal serupa...",
      category: "sharing",
      replies: [],
      likes: 45,
      timestamp: "2 hari lalu",
      isLiked: true,
    },
  ]);

  const categories = [
    { id: "all", name: "Semua Topik", color: "bg-gray-100 text-gray-700" },
    { id: "overthinking", name: "Overthinking", color: "bg-purple-100 text-purple-700" },
    { id: "burnout", name: "Burnout Akademik", color: "bg-orange-100 text-orange-700" },
    { id: "sleep", name: "Masalah Tidur", color: "bg-blue-100 text-blue-700" },
    { id: "balance", name: "Work-Life Balance", color: "bg-green-100 text-green-700" },
    { id: "sharing", name: "Sharing Pengalaman", color: "bg-pink-100 text-pink-700" },
  ];

  const handleLike = (id: string) => {
    setThreads(
      threads.map((thread) =>
        thread.id === id
          ? {
              ...thread,
              likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1,
              isLiked: !thread.isLiked,
            }
          : thread
      )
    );
  };

  const handleCreateThread = () => {
    if (!isLoggedIn) {
      toast.error("Silakan login terlebih dahulu untuk membuat thread");
      return;
    }

    if (!newThread.title.trim() || !newThread.content.trim()) {
      toast.error("Judul dan konten harus diisi");
      return;
    }

    const thread: ForumThread = {
      id: Date.now().toString(),
      title: newThread.title,
      content: newThread.content,
      category: newThread.category,
      replies: [],
      likes: 0,
      timestamp: "Baru saja",
      isLiked: false,
    };

    setThreads([thread, ...threads]);
    setNewThread({ title: "", content: "", category: "overthinking" });
    setShowNewThreadDialog(false);
    toast.success("Thread berhasil dibuat! 🎉");
  };

  const handleReply = () => {
    if (!isLoggedIn) {
      toast.error("Silakan login terlebih dahulu untuk membalas");
      return;
    }

    if (!replyContent.trim()) {
      toast.error("Isi balasan tidak boleh kosong");
      return;
    }

    if (!selectedThread) return;

    const reply: Reply = {
      id: Date.now().toString(),
      author: replyAsAnonymous ? "Anonymous" : (userProfile?.name || "User"),
      isAnonymous: replyAsAnonymous,
      content: replyContent,
      timestamp: "Baru saja",
      likes: 0,
      isLiked: false,
    };

    setThreads(
      threads.map((thread) =>
        thread.id === selectedThread.id
          ? { ...thread, replies: [...thread.replies, reply] }
          : thread
      )
    );

    setReplyContent("");
    setReplyAsAnonymous(false);
    setShowReplyDialog(false);
    toast.success("Balasan berhasil dikirim! 💬");
  };

  const filteredThreads = threads.filter(
    (thread) => selectedCategory === "all" || thread.category === selectedCategory
  );

  const getCategoryColor = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.color || "bg-gray-100 text-gray-700";
  };

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
            Komunitas Sahabat Jiwa
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Ruang aman untuk berbagi pengalaman, dukungan, dan tips dengan sesama mahasiswa. Semua curhatan bersifat anonim untuk menjaga privasi Anda.
          </p>
          
          <Dialog open={showNewThreadDialog} onOpenChange={setShowNewThreadDialog}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-2xl px-8 shadow-lg"
                onClick={() => {
                  if (!isLoggedIn) {
                    toast.error("Silakan login terlebih dahulu");
                    setShowNewThreadDialog(false);
                  }
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Bagikan Pikiranmu 🫶
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-[#4689C8]">Buat Thread Baru (Anonim)</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-[#F5F7FA] rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#4689C8] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Identitas kamu akan ditampilkan sebagai <span className="text-[#4689C8]">Anonymous</span> untuk menjaga privasi.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Judul</label>
                  <input
                    type="text"
                    value={newThread.title}
                    onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors"
                    placeholder="Judul thread..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Kategori</label>
                  <select
                    value={newThread.category}
                    onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors"
                  >
                    {categories.filter(c => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Konten</label>
                  <textarea
                    value={newThread.content}
                    onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors resize-none"
                    placeholder="Ceritakan apa yang ingin kamu bagikan..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleCreateThread}
                    className="flex-1 bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-xl"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Kirim (Anonim)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewThreadDialog(false)}
                    className="border-2 border-gray-300 rounded-xl"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="mb-4 text-[#4689C8] flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Kategori
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] text-white shadow-md"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="text-sm">{category.name}</span>
                    {category.id !== "all" && (
                      <span className="ml-2 text-xs opacity-70">
                        ({threads.filter((t) => t.category === category.id).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Community Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm text-gray-600 mb-3">Statistik Komunitas</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Diskusi</span>
                    <span className="text-[#4689C8]">{threads.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Anggota Aktif</span>
                    <span className="text-[#4689C8]">523</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Hari Ini</span>
                    <span className="text-green-600">+12</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content - Threads */}
          <div className="lg:col-span-3 space-y-4">
            {filteredThreads.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Thread Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-[#A7C7E7]">
                      <AvatarFallback className="bg-gradient-to-br from-[#A7C7E7] to-[#4689C8] text-white">
                        <Shield className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[#4689C8] group-hover:text-[#A7C7E7] transition-colors mb-1">
                            {thread.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Anonymous
                            </span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {thread.timestamp}
                            </div>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(thread.category)}>
                          {categories.find((c) => c.id === thread.category)?.name}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Thread Content */}
                  <p className="text-gray-600 mb-4 pl-16">{thread.content}</p>

                  {/* Thread Actions */}
                  <div className="flex items-center gap-6 pl-16">
                    <button
                      onClick={() => handleLike(thread.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        thread.isLiked
                          ? "text-red-500"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={thread.isLiked ? "currentColor" : "none"}
                      />
                      <span className="text-sm">{thread.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#4689C8] transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">{thread.replies.length} balasan</span>
                    </button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedThread(thread);
                        setShowReplyDialog(true);
                        if (!isLoggedIn) {
                          toast.error("Silakan login terlebih dahulu");
                          setShowReplyDialog(false);
                        }
                      }}
                      className="ml-auto text-[#4689C8] hover:bg-[#BEE3F8]/30 rounded-xl text-sm"
                    >
                      Baca & Balas
                    </Button>
                  </div>

                  {/* Show Replies if any */}
                  {thread.replies.length > 0 && (
                    <div className="mt-6 pl-16 space-y-4 border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500">Balasan terbaru:</p>
                      {thread.replies.slice(-2).map((reply) => (
                        <div key={reply.id} className="flex gap-3 p-3 bg-[#F5F7FA] rounded-xl">
                          <Avatar className="w-8 h-8 border-2 border-gray-300">
                            <AvatarFallback className={reply.isAnonymous ? "bg-gray-400 text-white" : "bg-gradient-to-br from-[#F9C6AA] to-[#F9C6AA]/60 text-white"}>
                              {reply.isAnonymous ? <Shield className="w-4 h-4" /> : reply.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                              <span>{reply.author}</span>
                              <span>•</span>
                              <span>{reply.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* No Results */}
            {filteredThreads.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-2xl"
              >
                <p className="text-gray-500">Belum ada diskusi di kategori ini.</p>
              </motion.div>
            )}

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#F9C6AA]/20 to-[#F9C6AA]/10 rounded-2xl p-6"
            >
              <h3 className="mb-4 text-[#4689C8] flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Topik Trending Minggu Ini
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Manajemen waktu",
                  "Teknik relaksasi",
                  "Semester akhir",
                  "Motivasi belajar",
                  "Hubungan sosial",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="px-4 py-2 bg-white rounded-xl text-sm text-gray-700 hover:bg-[#BEE3F8]/30 transition-colors cursor-pointer"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#4689C8]">Balas Thread</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedThread && (
              <div className="p-4 bg-[#F5F7FA] rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Thread asli:</p>
                <p className="text-[#4689C8]">{selectedThread.title}</p>
                <p className="text-sm text-gray-600 mt-2">{selectedThread.content}</p>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600 mb-2">Balasan Kamu</label>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors resize-none"
                placeholder="Tulis balasanmu..."
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#F5F7FA] rounded-xl">
              <Checkbox
                id="anonymous"
                checked={replyAsAnonymous}
                onCheckedChange={(checked) => setReplyAsAnonymous(checked as boolean)}
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700 cursor-pointer">
                Balas sebagai Anonymous (identitas disembunyikan)
              </label>
            </div>

            {!replyAsAnonymous && userProfile && (
              <div className="flex items-center gap-2 text-sm text-gray-600 p-3 bg-blue-50 rounded-xl">
                <User className="w-4 h-4" />
                <span>Akan ditampilkan sebagai: <span className="text-[#4689C8]">{userProfile.name}</span></span>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleReply}
                className="flex-1 bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-xl"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Balasan
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReplyDialog(false);
                  setReplyContent("");
                  setReplyAsAnonymous(false);
                }}
                className="border-2 border-gray-300 rounded-xl"
              >
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
