import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  Droplets, 
  Wrench, 
  ShowerHead, 
  Flame, 
  Home, 
  AlertTriangle,
  CheckCircle,
  Shield,
  Zap,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PHONE_NUMBER = "60137817454";
const WHATSAPP_MESSAGE = encodeURIComponent("Hai, saya ingin bertanya tentang perkhidmatan paip.");

// Services Data
const services = [
  {
    icon: Droplets,
    title: "Pengesanan & Pembaikan Kebocoran",
    description: "Hentikan kerosakan air dengan cepat melalui perkhidmatan pembaikan paip yang pantas dan boleh dipercayai."
  },
  {
    icon: ShowerHead,
    title: "Pembaikan & Pemasangan Tandas",
    description: "Penyelesaian lengkap untuk semua masalah tandas anda - dari pembaikan hingga pemasangan baru."
  },
  {
    icon: Wrench,
    title: "Pembersihan & Pembukaan Saluran",
    description: "Saluran tersumbat? Kami membersihkan dengan peralatan profesional untuk aliran air yang lancar."
  },
  {
    icon: Flame,
    title: "Pemasangan Pemanas Air",
    description: "Pemasangan dan pembaikan pemanas air dengan jaminan kualiti dan keselamatan."
  },
  {
    icon: Home,
    title: "Paip Dapur & Bilik Air",
    description: "Perkhidmatan paip komprehensif untuk dapur dan bilik air rumah anda."
  },
  {
    icon: AlertTriangle,
    title: "Perkhidmatan Kecemasan",
    description: "Tersedia 24 jam untuk masalah paip kecemasan. Respon pantas bila-bila masa anda perlukan."
  }
];

// Testimonials Data
const testimonials = [
  {
    name: "Ahmad Razak",
    text: "Respon sangat cepat dan perkhidmatan profesional. Paip bocor saya dibaiki dalam masa sejam. Sangat disyorkan!",
    rating: 5
  },
  {
    name: "Siti Aminah",
    text: "Tukang paip yang sangat mesra dan teliti. Harga berpatutan dan kerja berkualiti tinggi.",
    rating: 5
  },
  {
    name: "Lee Wei Ming",
    text: "Perkhidmatan kecemasan tengah malam! Mereka sampai dalam 30 minit dan selesaikan masalah dengan cepat.",
    rating: 5
  },
  {
    name: "Farah Hanim",
    text: "Sudah 2 kali guna perkhidmatan Dr Plumber. Memang boleh dipercayai dan harga telus.",
    rating: 5
  }
];

// Gallery Images
const galleryImages = [
  {
    url: "https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Tukang paip profesional"
  },
  {
    url: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Pembaikan paip"
  },
  {
    url: "https://images.pexels.com/photos/6816560/pexels-photo-6816560.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Peralatan paip"
  },
  {
    url: "https://images.unsplash.com/photo-1664227430687-9299c593e3da?crop=entropy&cs=srgb&fm=jpg&w=600",
    alt: "Pemasangan tandas"
  },
  {
    url: "https://images.pexels.com/photos/8486978/pexels-photo-8486978.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Tukang paip mesra"
  },
  {
    url: "https://images.pexels.com/photos/7363099/pexels-photo-7363099.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Van perkhidmatan"
  }
];

// Header Component
const Header = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const navLinks = [
    { href: "#perkhidmatan", label: "Perkhidmatan" },
    { href: "#tentang", label: "Tentang Kami" },
    { href: "#testimoni", label: "Testimoni" },
    { href: "#hubungi", label: "Hubungi" }
  ];

  return (
    <header 
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-header shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" data-testid="logo">
            <div className="w-10 h-10 bg-[#1E88E5] rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`font-heading font-bold text-lg leading-tight ${isScrolled ? 'text-[#0F2A44]' : 'text-white'}`}>
                Dr Plumber
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}>Tukang Paip JB</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-[#1E88E5] ${
                  isScrolled ? 'text-slate-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:+${PHONE_NUMBER}`}
              className="flex items-center gap-2 text-sm font-semibold"
              data-testid="header-phone"
            >
              <Phone className={`w-4 h-4 ${isScrolled ? 'text-[#FF6B35]' : 'text-[#FF6B35]'}`} />
              <span className={isScrolled ? 'text-[#0F2A44]' : 'text-white'}>013-781 7454</span>
            </a>
            <Button 
              className="btn-primary text-sm"
              onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
              data-testid="header-whatsapp-btn"
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-[#0F2A44]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#0F2A44]' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10" data-testid="mobile-menu">
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium ${isScrolled ? 'text-slate-600' : 'text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => (
  <section 
    className="hero-bg min-h-screen flex items-center relative"
    data-testid="hero-section"
  >
    <div className="max-w-7xl mx-auto px-6 py-32 md:py-0">
      <div className="max-w-2xl">
        {/* Emergency Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 emergency-badge" data-testid="emergency-badge">
          <Clock className="w-4 h-4" />
          24 Jam Perkhidmatan Kecemasan
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-testid="hero-title">
          Pakar Paip Johor Bahru yang Dipercayai
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed" data-testid="hero-subtitle">
          Penyelesaian paip yang pantas dan boleh dipercayai untuk rumah dan perniagaan anda. Tersedia bila-bila masa, siang atau malam.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="trust-badge" data-testid="trust-badge-rating">
            <Star className="w-4 h-4 text-yellow-500" />
            4.8★ (37 Ulasan)
          </span>
          <span className="trust-badge" data-testid="trust-badge-response">
            <Zap className="w-4 h-4 text-[#1E88E5]" />
            Respon Pantas
          </span>
          <span className="trust-badge" data-testid="trust-badge-local">
            <MapPin className="w-4 h-4 text-[#1E88E5]" />
            Pakar Tempatan JB
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="btn-primary text-lg px-10 py-4"
            onClick={() => window.location.href = `tel:+${PHONE_NUMBER}`}
            data-testid="hero-call-btn"
          >
            <Phone className="w-5 h-5 mr-2" />
            Hubungi Sekarang
          </Button>
          <Button 
            className="btn-whatsapp text-lg px-10 py-4 rounded-full"
            onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
            data-testid="hero-whatsapp-btn"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Tukang Paip
          </Button>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
      <ChevronDown className="w-8 h-8 text-white/50" />
    </div>
  </section>
);

// About Section
const AboutSection = () => (
  <section id="tentang" className="section-padding bg-white relative" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/8486978/pexels-photo-8486978.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Tukang paip profesional"
            className="rounded-2xl shadow-lift w-full object-cover aspect-[4/3]"
            loading="lazy"
            data-testid="about-image"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#1E88E5] text-white p-6 rounded-2xl shadow-lg hidden md:block">
            <p className="text-3xl font-bold font-heading">10+</p>
            <p className="text-sm">Tahun Pengalaman</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm text-[#1E88E5] font-semibold uppercase tracking-widest mb-4">Tentang Kami</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0F2A44] mb-6" data-testid="about-title">
            Pakar Paip Tempatan Anda di Johor Bahru
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6" data-testid="about-text">
            Di Dr Plumber JB, kami faham betapa stresnya masalah paip. Dari paip bocor hingga saluran tersumbat, tukang paip berpengalaman kami menyediakan penyelesaian yang pantas dan boleh dipercayai untuk memastikan rumah atau perniagaan anda berjalan dengan lancar.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Dengan perkhidmatan kecemasan 24 jam dan reputasi yang kukuh di Johor Bahru, kami adalah pasukan yang boleh anda percayai apabila masalah paip melanda.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, text: "Waranti Perkhidmatan" },
              { icon: Clock, text: "24/7 Kecemasan" },
              { icon: CheckCircle, text: "Harga Telus" },
              { icon: Zap, text: "Respon Pantas" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3" data-testid={`about-feature-${i}`}>
                <div className="w-10 h-10 bg-[#1E88E5]/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#1E88E5]" />
                </div>
                <span className="font-medium text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Services Section
const ServicesSection = () => (
  <section id="perkhidmatan" className="section-padding bg-[#F8FAFC]" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm text-[#1E88E5] font-semibold uppercase tracking-widest mb-4">Perkhidmatan Kami</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0F2A44] mb-4" data-testid="services-title">
          Penyelesaian Paip Profesional
        </h2>
        <p className="text-slate-600">
          Kami menawarkan pelbagai perkhidmatan paip untuk memenuhi semua keperluan anda.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="card-service" data-testid={`service-card-${index}`}>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-[#1E88E5]/10 rounded-2xl flex items-center justify-center mb-6 service-icon">
                <service.icon className="w-7 h-7 text-[#1E88E5]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#0F2A44] mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// Testimonials Section
const TestimonialsSection = () => (
  <section id="testimoni" className="section-padding bg-white" data-testid="testimonials-section">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm text-[#1E88E5] font-semibold uppercase tracking-widest mb-4">Testimoni</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0F2A44] mb-4" data-testid="testimonials-title">
          Apa Kata Pelanggan Kami
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-slate-600 font-medium">4.8 dari 37 ulasan</span>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="card-testimonial" data-testid={`testimonial-card-${index}`}>
            <CardContent className="p-6">
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-slate-600 mb-4 leading-relaxed">"{testimonial.text}"</p>
              {/* Author */}
              <p className="font-semibold text-[#0F2A44]">{testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// Gallery Section
const GallerySection = () => (
  <section className="section-padding bg-[#F8FAFC]" data-testid="gallery-section">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm text-[#1E88E5] font-semibold uppercase tracking-widest mb-4">Galeri</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0F2A44] mb-4" data-testid="gallery-title">
          Kerja-Kerja Kami
        </h2>
        <p className="text-slate-600">
          Lihat contoh kerja paip profesional yang kami telah lakukan.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-masonry">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item overflow-hidden rounded-xl shadow-soft hover:shadow-lift transition-all duration-300"
            data-testid={`gallery-item-${index}`}
          >
            <img 
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// CTA Section
const CTASection = () => (
  <section className="py-20 bg-[#0F2A44] relative overflow-hidden" data-testid="cta-section">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#1E88E5] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl"></div>
    </div>

    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
        <AlertTriangle className="w-4 h-4" />
        Perkhidmatan Kecemasan 24/7
      </div>
      
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" data-testid="cta-title">
        Perlukan Tukang Paip Sekarang?
      </h2>
      
      <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
        Pasukan kami sedia 24 jam untuk menyelesaikan masalah paip anda dengan pantas dan profesional.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="btn-primary text-lg px-12 py-5"
          onClick={() => window.location.href = `tel:+${PHONE_NUMBER}`}
          data-testid="cta-call-btn"
        >
          <Phone className="w-5 h-5 mr-2" />
          Hubungi 013-781 7454
        </Button>
        <Button 
          className="btn-whatsapp text-lg px-12 py-5 rounded-full"
          onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
          data-testid="cta-whatsapp-btn"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          WhatsApp Sekarang
        </Button>
      </div>
    </div>
  </section>
);

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    nama: '',
    telefon: '',
    mesej: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ nama: '', telefon: '', mesej: '' });
      }
    } catch (error) {
      toast.error('Gagal menghantar mesej. Sila cuba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hubungi" className="section-padding bg-white" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm text-[#1E88E5] font-semibold uppercase tracking-widest mb-4">Hubungi Kami</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0F2A44] mb-4" data-testid="contact-title">
            Jom Berbincang
          </h2>
          <p className="text-slate-600">
            Hubungi kami untuk sebarang pertanyaan atau tempah perkhidmatan paip anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div>
            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4" data-testid="contact-address">
                <div className="w-12 h-12 bg-[#1E88E5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1E88E5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F2A44] mb-1">Alamat</h3>
                  <p className="text-slate-600">
                    No 4, 9, Jalan Laman Indah,<br />
                    Taman Laman Indah,<br />
                    81300 Johor Bahru, Johor
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4" data-testid="contact-phone">
                <div className="w-12 h-12 bg-[#1E88E5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#1E88E5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F2A44] mb-1">Telefon</h3>
                  <a href={`tel:+${PHONE_NUMBER}`} className="text-[#1E88E5] font-semibold hover:underline">
                    013-781 7454
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4" data-testid="contact-hours">
                <div className="w-12 h-12 bg-[#1E88E5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#1E88E5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F2A44] mb-1">Waktu Operasi</h3>
                  <p className="text-slate-600">Buka 24 Jam - Perkhidmatan Kecemasan</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="map-container" data-testid="google-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5116024543797!2d103.61877231475417!3d1.5111099989855513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6e8bd8a1d00f%3A0x5e8c7f7c9f5b1234!2sTaman%20Laman%20Indah%2C%2081300%20Johor%20Bahru%2C%20Johor!5e0!3m2!1sen!2smy!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr Plumber JB Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="shadow-lift border-0">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold text-[#0F2A44] mb-6">
                  Hantar Mesej
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nama
                    </label>
                    <Input
                      type="text"
                      placeholder="Nama penuh anda"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      required
                      className="contact-input"
                      data-testid="contact-nama-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      No. Telefon
                    </label>
                    <Input
                      type="tel"
                      placeholder="01X-XXX XXXX"
                      value={formData.telefon}
                      onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                      required
                      className="contact-input"
                      data-testid="contact-telefon-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mesej
                    </label>
                    <Textarea
                      placeholder="Terangkan masalah paip anda..."
                      value={formData.mesej}
                      onChange={(e) => setFormData({ ...formData, mesej: e.target.value })}
                      required
                      rows={4}
                      className="contact-input resize-none"
                      data-testid="contact-mesej-input"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                    data-testid="contact-submit-btn"
                  >
                    {isSubmitting ? 'Menghantar...' : 'Hantar Mesej'}
                  </Button>
                </form>

                {/* Alternative Contact */}
                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500 mb-3">Atau hubungi terus melalui WhatsApp</p>
                  <Button 
                    className="btn-whatsapp w-full justify-center"
                    onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
                    data-testid="contact-whatsapp-btn"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Kami
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => (
  <footer className="bg-[#0F2A44] text-white py-12" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#1E88E5] rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">Dr Plumber</h3>
              <p className="text-xs text-white/60">Tukang Paip JB</p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Pakar paip profesional di Johor Bahru. Perkhidmatan 24 jam untuk semua keperluan paip anda.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold mb-4">Pautan Pantas</h4>
          <nav className="space-y-2">
            <a href="#perkhidmatan" className="block text-white/70 hover:text-white transition-colors text-sm">Perkhidmatan</a>
            <a href="#tentang" className="block text-white/70 hover:text-white transition-colors text-sm">Tentang Kami</a>
            <a href="#testimoni" className="block text-white/70 hover:text-white transition-colors text-sm">Testimoni</a>
            <a href="#hubungi" className="block text-white/70 hover:text-white transition-colors text-sm">Hubungi</a>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold mb-4">Hubungi</h4>
          <div className="space-y-3 text-sm">
            <p className="text-white/70">
              <MapPin className="w-4 h-4 inline mr-2" />
              Taman Laman Indah, 81300 JB
            </p>
            <p className="text-white/70">
              <Phone className="w-4 h-4 inline mr-2" />
              013-781 7454
            </p>
            <p className="text-white/70">
              <Clock className="w-4 h-4 inline mr-2" />
              24 Jam / 7 Hari
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-center">
        <p className="text-white/50 text-sm">
          © 2024 Dr Plumber JB. Hak Cipta Terpelihara.
        </p>
      </div>
    </div>
  </footer>
);

// Floating WhatsApp Button
const WhatsAppFloat = () => (
  <div className="whatsapp-float" data-testid="whatsapp-float">
    <button
      onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
      className="btn-whatsapp animate-bounce-slow"
      aria-label="WhatsApp"
      data-testid="whatsapp-float-btn"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  </div>
);

// Mobile CTA Bar
const MobileCTABar = () => (
  <div className="mobile-cta-bar md:hidden" data-testid="mobile-cta-bar">
    <Button 
      className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold py-3 rounded-full"
      onClick={() => window.location.href = `tel:+${PHONE_NUMBER}`}
      data-testid="mobile-call-btn"
    >
      <Phone className="w-5 h-5 mr-2" />
      Hubungi
    </Button>
    <Button 
      className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold py-3 rounded-full"
      onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
      data-testid="mobile-whatsapp-btn"
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      WhatsApp
    </Button>
  </div>
);

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App" data-testid="app">
      <Toaster position="top-center" richColors />
      
      <Header 
        isScrolled={isScrolled} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <GallerySection />
        <CTASection />
        <ContactSection />
      </main>
      
      <Footer />
      
      <WhatsAppFloat />
      <MobileCTABar />
    </div>
  );
}

export default App;
