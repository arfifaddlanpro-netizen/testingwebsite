import { useState, useEffect, useRef } from "react";
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
  X,
  ArrowRight,
  Play,
  Award,
  Users,
  ThumbsUp
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
    description: "Hentikan kerosakan air dengan cepat melalui perkhidmatan pembaikan paip yang pantas.",
    highlight: true
  },
  {
    icon: ShowerHead,
    title: "Pembaikan & Pemasangan Tandas",
    description: "Penyelesaian lengkap untuk semua masalah tandas anda."
  },
  {
    icon: Wrench,
    title: "Pembersihan Saluran",
    description: "Saluran tersumbat? Kami bersihkan dengan peralatan profesional."
  },
  {
    icon: Flame,
    title: "Pemanas Air",
    description: "Pemasangan dan pembaikan pemanas air dengan jaminan kualiti."
  },
  {
    icon: Home,
    title: "Paip Dapur & Bilik Air",
    description: "Perkhidmatan paip komprehensif untuk rumah anda."
  },
  {
    icon: AlertTriangle,
    title: "Kecemasan 24/7",
    description: "Respon pantas bila-bila masa anda perlukan.",
    emergency: true
  }
];

// Testimonials Data
const testimonials = [
  {
    name: "Ahmad Razak",
    location: "Taman Molek",
    text: "Respon sangat cepat dan perkhidmatan profesional. Paip bocor saya dibaiki dalam masa sejam!",
    rating: 5,
    avatar: "AR"
  },
  {
    name: "Siti Aminah",
    location: "Taman Pelangi",
    text: "Tukang paip yang mesra dan teliti. Harga berpatutan dan kerja berkualiti tinggi.",
    rating: 5,
    avatar: "SA"
  },
  {
    name: "Lee Wei Ming",
    location: "Taman Sentosa",
    text: "Perkhidmatan kecemasan tengah malam! Sampai dalam 30 minit dan selesaikan masalah dengan cepat.",
    rating: 5,
    avatar: "LW"
  }
];

// Gallery Images
const galleryImages = [
  { url: "https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Tukang paip profesional", size: "large" },
  { url: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Pembaikan paip" },
  { url: "https://images.pexels.com/photos/6816560/pexels-photo-6816560.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Peralatan paip" },
  { url: "https://images.pexels.com/photos/8486978/pexels-photo-8486978.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Tukang paip mesra" },
  { url: "https://images.pexels.com/photos/7363099/pexels-photo-7363099.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Van perkhidmatan", size: "wide" }
];

// Stats
const stats = [
  { number: "500+", label: "Projek Selesai", icon: CheckCircle },
  { number: "10+", label: "Tahun Pengalaman", icon: Award },
  { number: "4.8", label: "Rating Google", icon: Star },
  { number: "24/7", label: "Sentiasa Sedia", icon: Clock }
];

// Header Component
const Header = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const navLinks = [
    { href: "#perkhidmatan", label: "Perkhidmatan" },
    { href: "#tentang", label: "Tentang" },
    { href: "#testimoni", label: "Testimoni" },
    { href: "#hubungi", label: "Hubungi" }
  ];

  return (
    <header 
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" data-testid="logo">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#00FF94] rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Droplets className="w-6 h-6 text-[#0A1628]" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5E3A] rounded-full flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">24h</span>
              </div>
            </div>
            <div>
              <h1 className={`font-heading font-bold text-xl leading-tight transition-colors ${isScrolled ? 'text-[#0A1628]' : 'text-white'}`}>
                Dr Plumber
              </h1>
              <p className={`text-xs font-medium ${isScrolled ? 'text-[#00D4FF]' : 'text-[#00D4FF]'}`}>Johor Bahru</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all hover:bg-white/10 ${
                  isScrolled ? 'text-[#0A1628] hover:bg-[#0A1628]/5' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href={`tel:+${PHONE_NUMBER}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                isScrolled 
                  ? 'border-[#0A1628]/10 text-[#0A1628] hover:border-[#0A1628]' 
                  : 'border-white/20 text-white hover:border-white/50'
              }`}
              data-testid="header-phone"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold text-sm">013-781 7454</span>
            </a>
            <Button 
              className="bg-gradient-to-r from-[#FF5E3A] to-[#FF9F43] hover:from-[#FF4520] hover:to-[#FF8F33] text-white font-bold px-6 py-2 rounded-full shadow-lg shadow-orange-500/25 btn-shine"
              onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
              data-testid="header-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-xl transition-colors ${isScrolled ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-[#0A1628]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#0A1628]' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 glass rounded-2xl p-4" data-testid="mobile-menu">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl font-medium text-[#0A1628] hover:bg-[#0A1628]/5 transition-colors"
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

// Hero Section - Creative Split Layout
const HeroSection = () => (
  <section className="hero-creative min-h-screen flex items-center relative" data-testid="hero-section">
    {/* Geometric decorations */}
    <div className="geo-circle geo-circle-1"></div>
    <div className="geo-circle geo-circle-2"></div>
    
    {/* Floating elements */}
    <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-[#00D4FF]/10 rounded-full blur-xl animate-float"></div>
    <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-[#FF5E3A]/10 rounded-full blur-xl animate-float-delayed"></div>

    <div className="max-w-7xl mx-auto px-6 py-32 w-full relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Emergency Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF5E3A] to-[#FF9F43] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/30 emergency-pulse" data-testid="emergency-badge">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            24 Jam Perkhidmatan Kecemasan
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]" data-testid="hero-title">
            Pakar Paip
            <span className="block text-gradient-cyan">Johor Bahru</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed" data-testid="hero-subtitle">
            Penyelesaian paip yang pantas dan boleh dipercayai. Kami sedia membantu 
            <span className="text-[#00D4FF] font-semibold"> bila-bila masa</span> anda perlukan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-gradient-to-r from-[#FF5E3A] to-[#FF9F43] hover:from-[#FF4520] hover:to-[#FF8F33] text-white text-lg font-bold px-8 py-6 rounded-2xl shadow-xl shadow-orange-500/30 group btn-shine"
              onClick={() => window.location.href = `tel:+${PHONE_NUMBER}`}
              data-testid="hero-call-btn"
            >
              <Phone className="w-5 h-5 mr-3" />
              Hubungi Sekarang
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white text-lg font-bold px-8 py-6 rounded-2xl shadow-xl shadow-green-500/30"
              onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
              data-testid="hero-whatsapp-btn"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              WhatsApp
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-[#0A1628] flex items-center justify-center">
                    <Users className="w-4 h-4 text-slate-600" />
                  </div>
                ))}
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-bold text-white">500+</span> pelanggan berpuas hati
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.8 Rating</span>
            </div>
          </div>
        </div>

        {/* Right Content - Floating Card */}
        <div className="relative hidden lg:block">
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/8486978/pexels-photo-8486978.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Tukang paip profesional"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 glass-dark p-6 rounded-2xl shadow-2xl animate-float" data-testid="floating-stats">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00D4FF] to-[#00FF94] rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[#0A1628]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">30 min</p>
                  <p className="text-white/60 text-sm">Masa Respon</p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FF5E3A]/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#FF5E3A]" />
                </div>
                <div>
                  <p className="font-bold text-[#0A1628]">Bergaransi</p>
                  <p className="text-xs text-slate-500">Kerja Berkualiti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
      <div className="scroll-indicator"></div>
    </div>
  </section>
);

// Stats Marquee Section
const StatsMarquee = () => (
  <section className="bg-[#0A1628] py-6 overflow-hidden relative">
    <div className="marquee-container">
      <div className="flex animate-marquee">
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center gap-16 px-8">
            {stats.map((stat, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center gap-4 text-white whitespace-nowrap">
                <stat.icon className="w-6 h-6 text-[#00D4FF]" />
                <span className="text-2xl font-bold">{stat.number}</span>
                <span className="text-white/60">{stat.label}</span>
                <span className="text-[#00D4FF] mx-4">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// About Section - Asymmetric Layout
const AboutSection = () => (
  <section id="tentang" className="py-24 bg-[#F0F4F8] relative overflow-hidden" data-testid="about-section">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00D4FF]/5 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left - Image Stack */}
        <div className="lg:col-span-5 relative">
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kerja paip profesional"
                className="w-full aspect-square object-cover"
                loading="lazy"
                data-testid="about-image"
              />
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-[#00D4FF] rounded-3xl -z-0"></div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -left-6 stat-box text-center z-20">
              <p className="text-4xl font-bold text-gradient-cyan font-heading">10+</p>
              <p className="text-white/70 text-sm">Tahun Pengalaman</p>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="lg:col-span-7 lg:pl-8">
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#00D4FF]/10 text-[#00D4FF] font-bold text-sm rounded-full mb-4">
                TENTANG KAMI
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#0A1628] leading-tight" data-testid="about-title">
                Pakar Paip Tempatan
                <span className="text-gradient-cyan"> Dipercayai</span>
              </h2>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed" data-testid="about-text">
              Di Dr Plumber JB, kami faham betapa stresnya masalah paip. Dengan pengalaman lebih 10 tahun, 
              kami menyediakan penyelesaian yang pantas dan boleh dipercayai untuk memastikan rumah atau 
              perniagaan anda berjalan dengan lancar.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Zap, title: "Respon Pantas", desc: "Sampai dalam 30 minit" },
                { icon: Shield, title: "Bergaransi", desc: "Jaminan kerja berkualiti" },
                { icon: Clock, title: "24/7 Sedia", desc: "Bila-bila masa diperlukan" },
                { icon: ThumbsUp, title: "Harga Telus", desc: "Tiada caj tersembunyi" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow" data-testid={`about-feature-${i}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF]/20 to-[#00FF94]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#00D4FF]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1628]">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Services Section - Bento Grid
const ServicesSection = () => (
  <section id="perkhidmatan" className="py-24 bg-white relative overflow-hidden" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block px-4 py-1.5 bg-[#FF5E3A]/10 text-[#FF5E3A] font-bold text-sm rounded-full mb-4">
          PERKHIDMATAN KAMI
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#0A1628] mb-4" data-testid="services-title">
          Penyelesaian Paip
          <span className="text-gradient-orange"> Profesional</span>
        </h2>
        <p className="text-lg text-slate-600">
          Kami menawarkan pelbagai perkhidmatan untuk memenuhi semua keperluan paip anda.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`service-card-creative ${service.highlight ? 'bento-large' : ''} ${service.emergency ? 'bg-gradient-to-br from-[#0A1628] to-[#162033] text-white' : ''}`}
            data-testid={`service-card-${index}`}
          >
            <div className={`card-content ${service.emergency ? '' : ''}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                service.emergency 
                  ? 'bg-gradient-to-br from-[#FF5E3A] to-[#FF9F43]' 
                  : 'bg-gradient-to-br from-[#00D4FF]/20 to-[#00FF94]/20'
              }`}>
                <service.icon className={`w-8 h-8 ${service.emergency ? 'text-white' : 'text-[#00D4FF]'}`} />
              </div>
              <h3 className={`font-heading text-xl font-bold mb-3 ${service.emergency ? 'text-white' : 'text-[#0A1628]'}`}>
                {service.title}
              </h3>
              <p className={`leading-relaxed ${service.emergency ? 'text-white/70' : 'text-slate-600'}`}>
                {service.description}
              </p>
              {service.highlight && (
                <Button 
                  className="mt-6 bg-[#0A1628] hover:bg-[#162033] text-white rounded-full"
                  onClick={() => window.location.href = `tel:+${PHONE_NUMBER}`}
                >
                  Hubungi Kami
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Testimonials Section - Creative Cards
const TestimonialsSection = () => (
  <section id="testimoni" className="py-24 bg-[#F0F4F8] relative overflow-hidden" data-testid="testimonials-section">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-gradient-mesh"></div>
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <span className="inline-block px-4 py-1.5 bg-[#00D4FF]/10 text-[#00D4FF] font-bold text-sm rounded-full mb-4">
            TESTIMONI
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#0A1628]" data-testid="testimonials-title">
            Apa Kata
            <span className="text-gradient-cyan"> Pelanggan</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg">
          <div className="text-4xl font-bold text-[#0A1628] font-heading">4.8</div>
          <div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-slate-500">37 Ulasan Google</p>
          </div>
        </div>
      </div>

      {/* Testimonials Grid - Staggered */}
      <div className="grid md:grid-cols-3 gap-6 staggered-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-creative" data-testid={`testimonial-card-${index}`}>
            {/* Stars */}
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            
            {/* Quote */}
            <p className="text-slate-600 mb-6 leading-relaxed relative z-10">
              "{testimonial.text}"
            </p>
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#00FF94] rounded-full flex items-center justify-center text-[#0A1628] font-bold">
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-bold text-[#0A1628]">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Gallery Section - Modern Masonry
const GallerySection = () => (
  <section className="py-24 bg-white" data-testid="gallery-section">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block px-4 py-1.5 bg-[#0A1628]/10 text-[#0A1628] font-bold text-sm rounded-full mb-4">
          GALERI
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#0A1628] mb-4" data-testid="gallery-title">
          Kerja-Kerja <span className="text-gradient-cyan">Kami</span>
        </h2>
      </div>

      {/* Masonry Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div 
            key={index}
            className={`gallery-item-creative ${image.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''} ${image.size === 'wide' ? 'col-span-2' : ''}`}
            data-testid={`gallery-item-${index}`}
          >
            <img 
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover aspect-square"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// CTA Section - Bold & Dramatic
const CTASection = () => (
  <section className="py-24 bg-[#0A1628] relative overflow-hidden" data-testid="cta-section">
    {/* Animated Background */}
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#00D4FF]/20 to-[#FF5E3A]/20 rounded-full blur-3xl animate-pulse"></div>
    </div>
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div className="inline-flex items-center gap-3 bg-[#FF5E3A] text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8 emergency-pulse">
        <AlertTriangle className="w-4 h-4" />
        Perkhidmatan Kecemasan 24/7
      </div>
      
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="cta-title">
        Perlukan Tukang Paip
        <span className="block text-gradient-cyan">Sekarang?</span>
      </h2>
      
      <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
        Pasukan kami sedia 24 jam untuk menyelesaikan masalah paip anda dengan pantas dan profesional.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          className="bg-gradient-to-r from-[#FF5E3A] to-[#FF9F43] hover:from-[#FF4520] hover:to-[#FF8F33] text-white text-lg font-bold px-10 py-6 rounded-2xl shadow-xl shadow-orange-500/30 animate-pulse-glow btn-shine"
          onClick={() => window.location.href = `tel:+${PHONE_NUMBER}`}
          data-testid="cta-call-btn"
        >
          <Phone className="w-5 h-5 mr-3" />
          Hubungi 013-781 7454
        </Button>
        <Button 
          className="bg-[#25D366] hover:bg-[#20BD5A] text-white text-lg font-bold px-10 py-6 rounded-2xl shadow-xl"
          onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
          data-testid="cta-whatsapp-btn"
        >
          <MessageCircle className="w-5 h-5 mr-3" />
          WhatsApp Sekarang
        </Button>
      </div>
    </div>
  </section>
);

// Contact Section - Glassmorphism Form
const ContactSection = () => {
  const [formData, setFormData] = useState({ nama: '', telefon: '', mesej: '' });
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
    <section id="hubungi" className="py-24 bg-[#F0F4F8] relative overflow-hidden" data-testid="contact-section">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#00D4FF]/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#FF5E3A]/10 text-[#FF5E3A] font-bold text-sm rounded-full mb-4">
            HUBUNGI KAMI
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#0A1628] mb-4" data-testid="contact-title">
            Jom <span className="text-gradient-orange">Berbincang</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid gap-4">
              {[
                { icon: MapPin, title: "Alamat", content: "No 4, 9, Jalan Laman Indah, Taman Laman Indah, 81300 Johor Bahru, Johor" },
                { icon: Phone, title: "Telefon", content: "013-781 7454", link: `tel:+${PHONE_NUMBER}` },
                { icon: Clock, title: "Waktu Operasi", content: "Buka 24 Jam - Perkhidmatan Kecemasan" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm" data-testid={`contact-${item.title.toLowerCase()}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF]/20 to-[#00FF94]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#00D4FF]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1628] mb-1">{item.title}</h4>
                    {item.link ? (
                      <a href={item.link} className="text-[#00D4FF] font-semibold hover:underline">{item.content}</a>
                    ) : (
                      <p className="text-slate-600 text-sm">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map */}
            <div className="map-creative" data-testid="google-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5116024543797!2d103.61877231475417!3d1.5111099989855513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6e8bd8a1d00f%3A0x5e8c7f7c9f5b1234!2sTaman%20Laman%20Indah%2C%2081300%20Johor%20Bahru%2C%20Johor!5e0!3m2!1sen!2smy!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr Plumber JB Location"
              ></iframe>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="contact-glass p-8">
            <h3 className="font-heading text-2xl font-bold text-[#0A1628] mb-6">
              Hantar Mesej
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-2">Nama</label>
                <Input
                  type="text"
                  placeholder="Nama penuh anda"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                  className="bg-white/50 border-slate-200 focus:border-[#00D4FF] focus:ring-[#00D4FF]/20 rounded-xl py-3"
                  data-testid="contact-nama-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-2">No. Telefon</label>
                <Input
                  type="tel"
                  placeholder="01X-XXX XXXX"
                  value={formData.telefon}
                  onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  required
                  className="bg-white/50 border-slate-200 focus:border-[#00D4FF] focus:ring-[#00D4FF]/20 rounded-xl py-3"
                  data-testid="contact-telefon-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-2">Mesej</label>
                <Textarea
                  placeholder="Terangkan masalah paip anda..."
                  value={formData.mesej}
                  onChange={(e) => setFormData({ ...formData, mesej: e.target.value })}
                  required
                  rows={4}
                  className="bg-white/50 border-slate-200 focus:border-[#00D4FF] focus:ring-[#00D4FF]/20 rounded-xl resize-none"
                  data-testid="contact-mesej-input"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#FF5E3A] to-[#FF9F43] hover:from-[#FF4520] hover:to-[#FF8F33] text-white font-bold py-4 rounded-xl shadow-lg btn-shine"
                disabled={isSubmitting}
                data-testid="contact-submit-btn"
              >
                {isSubmitting ? 'Menghantar...' : 'Hantar Mesej'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-500 mb-3">Atau hubungi terus melalui WhatsApp</p>
              <Button 
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-xl"
                onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')}
                data-testid="contact-whatsapp-btn"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer - Modern Dark
const Footer = () => (
  <footer className="bg-[#0A1628] text-white pt-16 pb-8 relative" data-testid="footer">
    {/* Wave SVG */}
    <div className="footer-wave">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="#F0F4F8">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
      </svg>
    </div>

    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        {/* Logo & About */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#00FF94] rounded-2xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-[#0A1628]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl">Dr Plumber</h3>
              <p className="text-[#00D4FF] text-sm">Johor Bahru</p>
            </div>
          </div>
          <p className="text-white/60 leading-relaxed max-w-md">
            Pakar paip profesional di Johor Bahru. Perkhidmatan 24 jam untuk semua keperluan paip anda dengan jaminan kualiti dan harga berpatutan.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-lg mb-6">Pautan Pantas</h4>
          <nav className="space-y-3">
            {['Perkhidmatan', 'Tentang Kami', 'Testimoni', 'Hubungi'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="block text-white/60 hover:text-[#00D4FF] transition-colors">
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-bold text-lg mb-6">Hubungi</h4>
          <div className="space-y-4">
            <p className="flex items-center gap-3 text-white/60">
              <MapPin className="w-5 h-5 text-[#00D4FF]" />
              <span>Taman Laman Indah, 81300 JB</span>
            </p>
            <p className="flex items-center gap-3 text-white/60">
              <Phone className="w-5 h-5 text-[#00D4FF]" />
              <span>013-781 7454</span>
            </p>
            <p className="flex items-center gap-3 text-white/60">
              <Clock className="w-5 h-5 text-[#00D4FF]" />
              <span>24 Jam / 7 Hari</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-center">
        <p className="text-white/40 text-sm">
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
      className="bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:scale-110 transition-all animate-bounce-subtle"
      aria-label="WhatsApp"
      data-testid="whatsapp-float-btn"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  </div>
);

// Mobile CTA Bar
const MobileCTABar = () => (
  <div className="mobile-cta-bar md:hidden" data-testid="mobile-cta-bar">
    <Button 
      className="flex-1 bg-gradient-to-r from-[#FF5E3A] to-[#FF9F43] text-white font-bold py-4 rounded-xl"
      onClick={() => window.location.href = `tel:+${PHONE_NUMBER}`}
      data-testid="mobile-call-btn"
    >
      <Phone className="w-5 h-5 mr-2" />
      Hubungi
    </Button>
    <Button 
      className="flex-1 bg-[#25D366] text-white font-bold py-4 rounded-xl"
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
        <StatsMarquee />
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
