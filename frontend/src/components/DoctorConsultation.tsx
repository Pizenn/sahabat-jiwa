import { motion } from "motion/react";
import { Calendar, Clock, FileText, Shield, CheckCircle2, Star, Award, ArrowLeft, MapPin, Briefcase, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  education: string;
  location: string;
  price: string;
  description: string;
  expertise: string[];
}

interface DoctorConsultationProps {
  isLoggedIn: boolean;
  userProfile: { name: string; email: string; avatar: string } | null;
}

export function DoctorConsultation({ isLoggedIn, userProfile }: DoctorConsultationProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    issue: "",
    notes: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Wijaya, M.Psi., Psikolog",
      title: "Psikolog Klinis",
      specialty: "Kecemasan & Depresi",
      experience: "8 tahun",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1587152976086-7623e3c88724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4NjIyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      education: "S2 Psikologi Klinis, Universitas Indonesia",
      location: "Jakarta Selatan",
      price: "Rp 250.000/sesi",
      description: "Berpengalaman dalam menangani kecemasan, depresi, dan gangguan mood pada remaja dan dewasa muda. Menggunakan pendekatan Cognitive Behavioral Therapy (CBT).",
      expertise: ["Kecemasan", "Depresi", "Stres Akademik", "CBT"],
    },
    {
      id: "2",
      name: "Dr. Ahmad Fauzi, Sp.KJ",
      title: "Psikiater",
      specialty: "Gangguan Mental & Terapi",
      experience: "12 tahun",
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1606619788433-2ba22e49d498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjE4MDg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      education: "Spesialis Kedokteran Jiwa, Universitas Airlangga",
      location: "Jakarta Pusat",
      price: "Rp 400.000/sesi",
      description: "Spesialis dalam menangani gangguan mental serius dan memberikan terapi medis. Berpengalaman dengan mahasiswa yang mengalami burnout akademik.",
      expertise: ["Burnout", "Gangguan Tidur", "ADHD", "Terapi Medis"],
    },
    {
      id: "3",
      name: "Rina Kusuma, M.Psi., Psikolog",
      title: "Psikolog Konseling",
      specialty: "Konseling Karir & Akademik",
      experience: "6 tahun",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1620302044935-444961a5d028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaG9sb2dpc3QlMjBjb3Vuc2Vsb3J8ZW58MXx8fHwxNzYxOTMxNjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      education: "S2 Psikologi Pendidikan, Universitas Gadjah Mada",
      location: "Yogyakarta",
      price: "Rp 200.000/sesi",
      description: "Fokus pada konseling akademik, karir, dan pengembangan diri mahasiswa. Membantu mahasiswa menemukan motivasi dan tujuan hidup.",
      expertise: ["Motivasi", "Karir", "Self-Development", "Procrastination"],
    },
    {
      id: "4",
      name: "Dr. Linda Pratiwi, M.Psi., Psikolog",
      title: "Psikolog Klinis",
      specialty: "Trauma & Hubungan",
      experience: "10 tahun",
      rating: 5.0,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1587152976086-7623e3c88724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4NjIyMzdkMA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      education: "S2 Psikologi Klinis, Universitas Padjajaran",
      location: "Bandung",
      price: "Rp 300.000/sesi",
      description: "Ahli dalam menangani trauma, hubungan interpersonal, dan masalah keluarga. Menggunakan pendekatan person-centered therapy.",
      expertise: ["Trauma", "Hubungan Sosial", "Self-Esteem", "Family Issues"],
    },
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
  ];

  const issueTypes = [
    "Kecemasan",
    "Depresi",
    "Stres Akademik",
    "Masalah Tidur",
    "Hubungan Sosial",
    "Burnout",
    "Lainnya",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("Silakan login terlebih dahulu untuk booking konsultasi");
      return;
    }

    if (!formData.issue || !selectedTime) {
      toast.error("Mohon pilih tanggal, waktu, dan jenis masalah");
      return;
    }

    setIsSubmitted(true);
    toast.success("Sesi konsultasi berhasil dijadwalkan!");
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    if (!isLoggedIn) {
      toast.error("Silakan login terlebih dahulu untuk booking konsultasi");
      return;
    }
    setSelectedDoctor(doctor);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToSelection = () => {
    setSelectedDoctor(null);
    setFormData({
      issue: "",
      notes: "",
    });
    setSelectedTime("");
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#BEE3F8]/20 pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#C7EBD9] to-[#C7EBD9]/60 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="mb-4 text-[#4689C8]">Konsultasi Terjadwal! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Terima kasih, {userProfile?.name}! Sesi konsultasi kamu dengan <span className="text-[#4689C8]">{selectedDoctor?.name}</span> telah berhasil dijadwalkan.
            </p>
            <div className="bg-[#F5F7FA] rounded-2xl p-6 mb-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#4689C8]" />
                  <span className="text-gray-700">
                    {selectedDate?.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#4689C8]" />
                  <span className="text-gray-700">{selectedTime} WIB</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#4689C8]" />
                  <span className="text-gray-700">{formData.issue}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Kami akan mengirimkan konfirmasi dan link konsultasi ke email kamu di{" "}
              <span className="text-[#4689C8]">{userProfile?.email}</span>
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                handleBackToSelection();
              }}
              className="bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-2xl px-8"
            >
              Kembali ke Pilihan Dokter
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Booking Form (when doctor is selected)
  if (selectedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-white to-[#BEE3F8]/20 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBackToSelection}
            className="flex items-center gap-2 text-[#4689C8] hover:text-[#A7C7E7] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Pilihan Dokter</span>
          </motion.button>

          {/* Selected Doctor Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-[#4689C8] mb-1">{selectedDoctor.name}</h2>
                    <p className="text-gray-600">{selectedDoctor.title}</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#F9C6AA] to-[#F9C6AA]/60 text-gray-700">
                    {selectedDoctor.specialty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{selectedDoctor.rating}</span>
                    <span className="text-gray-400">({selectedDoctor.reviews} ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{selectedDoctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedDoctor.location}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{selectedDoctor.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar and Time Selection - LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Calendar */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="mb-4 text-[#4689C8]">Pilih Tanggal</h3>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl border-2 border-gray-200"
                  disabled={(date) => date < new Date()}
                />
              </div>

              {/* Time Slots */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="mb-4 text-[#4689C8]">Pilih Waktu</h3>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl border-2 transition-all text-center ${
                        selectedTime === time
                          ? "bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] text-white border-transparent shadow-lg"
                          : "border-gray-200 hover:border-[#4689C8] hover:bg-[#BEE3F8]/20"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Semua waktu dalam WIB (Waktu Indonesia Barat)
                </p>
              </div>

              {/* Info Cards */}
              <div className="bg-gradient-to-br from-[#A7C7E7]/20 to-[#BEE3F8]/20 rounded-2xl p-6">
                <h4 className="mb-4 text-[#4689C8]">Yang Perlu Kamu Ketahui</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4689C8]">✓</span>
                    <span>Durasi sesi: 50-60 menit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4689C8]">✓</span>
                    <span>Konsultasi via video call (link dikirim via email)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4689C8]">✓</span>
                    <span>Biaya: {selectedDoctor.price}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4689C8]">✓</span>
                    <span>Bisa reschedule max 24 jam sebelumnya</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Form Section - RIGHT SIDE (No Identity Fields) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="mb-6 text-[#4689C8]">Detail Konsultasi</h3>

                {/* User Info Display */}
                {userProfile && (
                  <div className="mb-6 p-4 bg-gradient-to-br from-[#A7C7E7]/10 to-[#BEE3F8]/10 rounded-xl border-2 border-[#BEE3F8]/30">
                    <p className="text-sm text-gray-600 mb-1">Booking untuk:</p>
                    <p className="text-[#4689C8]">{userProfile.name}</p>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Jenis Masalah *
                    </label>
                    <select
                      value={formData.issue}
                      onChange={(e) =>
                        setFormData({ ...formData, issue: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Pilih jenis masalah</option>
                      {issueTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#4689C8] focus:outline-none transition-colors resize-none"
                      placeholder="Ceritakan sedikit tentang apa yang ingin kamu diskusikan..."
                    />
                  </div>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#4689C8] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    <span className="text-[#4689C8]">Data kamu bersifat pribadi dan aman.</span>{" "}
                    Semua informasi akan dijaga kerahasiaannya sesuai kode etik konseling.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-2xl py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  Ajukan Sesi Konsultasi
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Doctor Selection Screen (Default View)
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
            Pilih Konselor Profesional
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Semua konselor kami bersertifikat dan berpengalaman dalam menangani kesehatan mental mahasiswa
          </p>

          {/* Login Notice for Guest Users */}
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl mx-auto p-4 bg-gradient-to-r from-[#F9C6AA]/20 to-[#F9C6AA]/10 border-2 border-[#F9C6AA]/30 rounded-2xl"
            >
              <div className="flex items-center gap-3 justify-center">
                <LogIn className="w-5 h-5 text-[#4689C8]" />
                <p className="text-sm text-gray-700">
                  <span className="text-[#4689C8]">Login diperlukan</span> untuk booking konsultasi
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex gap-4 mb-4">
                  {/* Doctor Image */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 ring-4 ring-[#A7C7E7]/30 group-hover:ring-[#4689C8]/50 transition-all">
                    <ImageWithFallback
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#4689C8] mb-1 truncate">{doctor.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{doctor.title}</p>
                    <Badge className="bg-gradient-to-r from-[#F9C6AA] to-[#F9C6AA]/60 text-gray-700 mb-2">
                      {doctor.specialty}
                    </Badge>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{doctor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        <span>{doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {doctor.description}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.expertise.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#BEE3F8]/30 text-[#4689C8] rounded-xl text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs">{doctor.education}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div>
                  <Button
                    onClick={() => handleDoctorSelect(doctor)}
                    className="w-full bg-gradient-to-r from-[#4689C8] to-[#A7C7E7] hover:opacity-90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Pilih & Booking
                  </Button>
                </div>
              </div>

              {/* Availability Indicator */}
              <div className="bg-gradient-to-r from-[#C7EBD9]/30 to-[#C7EBD9]/20 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-600">Tersedia hari ini</span>
                </div>
                <span className="text-sm text-[#4689C8]">{doctor.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-[#A7C7E7]/20 to-[#BEE3F8]/20 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-[#4689C8]" />
              </div>
              <h4 className="mb-2 text-[#4689C8]">100% Konfidensial</h4>
              <p className="text-sm text-gray-600">
                Semua sesi dijaga kerahasiaannya sesuai kode etik
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-[#4689C8]" />
              </div>
              <h4 className="mb-2 text-[#4689C8]">Bersertifikat</h4>
              <p className="text-sm text-gray-600">
                Semua konselor memiliki sertifikasi resmi
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-[#4689C8]" />
              </div>
              <h4 className="mb-2 text-[#4689C8]">Fleksibel</h4>
              <p className="text-sm text-gray-600">
                Jadwal yang bisa disesuaikan dengan waktu kamu
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
