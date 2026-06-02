"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { 
  brandInfo, 
  socialLinks, 
  contactInfo 
} from "../data";
import { downloadVCard } from "../lib/vcard";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail, 
  UserPlus, 
  Share2, 
  Check
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Ambient background floating particles for a living premium UI environment
const floatingParticles = [
  { size: "w-72 h-72 sm:w-96 sm:h-96", color: "bg-[#657f66]/15", x: ["-10%", "90%"], y: ["10%", "40%"], duration: 25 },
  { size: "w-80 h-80 sm:w-[450px] sm:h-[450px]", color: "bg-[#f8b97e]/12", x: ["100%", "10%"], y: ["60%", "30%"], duration: 30 },
  { size: "w-64 h-64 sm:w-80 sm:h-80", color: "bg-[#657f66]/10", x: ["20%", "70%"], y: ["90%", "10%"], duration: 35 },
];

export default function DigitalCard() {
  const [copied, setCopied] = useState(false);

  // 3D Parallax Tilt Effect for Desktop Hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [6, -6]), { damping: 40, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-6, 6]), { damping: 40, stiffness: 200 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = event.clientX - rect.left - width / 2;
    const y = event.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: brandInfo.nameAr + " — " + brandInfo.taglineAr,
          url: window.location.href,
        });
      } catch {
        /* fallback */
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* fallback */
      }
    }
  };

  const handleSaveContact = () => {
    downloadVCard(
      brandInfo.nameAr + " | " + brandInfo.taglineAr,
      contactInfo.phone,
      contactInfo.email,
      contactInfo.location
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
  };

  const quickActions = [
    {
      id: "phone",
      label: "اتصال",
      icon: Phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
      bg: "bg-[#657f66]/10",
      hoverBorder: "hover:border-[#657f66]/40",
      hoverText: "group-hover:text-[#7a997b]"
    },
    {
      id: "map",
      label: "الموقع",
      icon: MapPin,
      href: "https://maps.google.com/?q=Ibb+Yemen",
      target: "_blank",
      rel: "noopener noreferrer",
      bg: "bg-[#f8b97e]/15",
      hoverBorder: "hover:border-[#f8b97e]/40",
      hoverText: "group-hover:text-[#f8b97e]"
    },
    {
      id: "email",
      label: "البريد",
      icon: Mail,
      href: `mailto:${contactInfo.email}`,
      bg: "bg-[#657f66]/10",
      hoverBorder: "hover:border-[#657f66]/40",
      hoverText: "group-hover:text-[#7a997b]"
    },
    {
      id: "save",
      label: "حفظ",
      icon: UserPlus,
      onClick: handleSaveContact,
      bg: "bg-[#f8b97e]/15",
      hoverBorder: "hover:border-[#f8b97e]/40",
      hoverText: "group-hover:text-[#f8b97e]"
    },
  ];

  const socialGlows: Record<string, { bg: string, border: string, text: string, gradient: string }> = {
    "انستقرام": {
      bg: "group-hover:bg-pink-500/10",
      border: "group-hover:border-pink-500/30",
      text: "group-hover:text-pink-400",
      gradient: "from-pink-500/20 to-orange-500/20"
    },
    "تيك توك": {
      bg: "group-hover:bg-rose-500/10",
      border: "group-hover:border-rose-500/30",
      text: "group-hover:text-rose-400",
      gradient: "from-rose-500/20 to-zinc-800/20"
    },
    "فيسبوك": {
      bg: "group-hover:bg-blue-600/10",
      border: "group-hover:border-blue-600/30",
      text: "group-hover:text-blue-400",
      gradient: "from-blue-600/20 to-blue-800/20"
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0E1510] via-[#0A0E0B] to-[#090503] min-h-screen relative flex flex-col items-center justify-center py-6 px-4 sm:py-12 overflow-x-hidden">
      
      {/* 1. Ambient Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingParticles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute rounded-full pointer-events-none blur-[100px] sm:blur-[130px] ${p.size} ${p.color}`}
            animate={{
              x: p.x,
              y: p.y,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 2. Responsive Glassmorphism Card Container */}
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          perspective: 1000 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="w-full sm:max-w-md z-10 p-[1px] bg-gradient-to-tr from-white/10 via-white/5 to-white/10 hover:via-[#f8b97e]/30 rounded-[32px] transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col flex-1 sm:flex-initial"
      >
        {/* Inner Card Wrapper */}
        <div 
          className="bg-black/40 backdrop-blur-2xl rounded-[31px] overflow-hidden flex flex-col flex-1 sm:flex-initial border border-white/5"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Card Header */}
          <div className="relative pt-12 pb-6 px-6 text-center overflow-hidden">
            {/* Header Radial Aura */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#f8b97e]/5 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center">
              {/* Logo with Golden Orbit Ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="relative w-28 h-28 mb-5 cursor-pointer group"
                whileHover={{ scale: 1.03 }}
              >
                {/* Double Glow Layer */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#f8b97e] to-[#657f66] opacity-30 blur-md group-hover:opacity-60 transition duration-700 animate-pulse" />
                
                {/* Rotating Border Frame */}
                <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-[#657f66] via-[#f8b97e] to-[#657f66] animate-[spin_10s_linear_infinite]" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full bg-black/80 p-1 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/Asset 1.png"
                    alt={brandInfo.nameAr}
                    fill
                    priority
                    className="object-contain p-2 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Brand Title & Subtitle */}
              <h1 className="text-3xl font-black tracking-tight text-white mb-0.5">
                {brandInfo.nameAr}
              </h1>
              <p className="text-[#f8b97e] font-medium text-xs tracking-widest uppercase opacity-95">
                Fastika Chocolate
              </p>

              {/* Custom Elegant Divider */}
              <div className="flex items-center justify-center gap-3 my-4.5" aria-hidden="true">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#f8b97e]/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#f8b97e] shadow-[0_0_8px_#f8b97e] animate-pulse" />
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#f8b97e]/40" />
              </div>

              {/* Description */}
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-light">
                {brandInfo.description}
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-6 pb-8 flex flex-col gap-6" style={{ transform: "translateZ(20px)" }}>
            
            {/* Staggered Actions List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="w-full flex flex-col gap-6"
            >
              {/* PRIMARY CTA: WhatsApp Order (Pulsing, Glowing Orange-Gold Button) */}
              <motion.div variants={itemVariants}>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#f8b97e] to-[#e5a56d] text-black font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_4px_25px_rgba(248,185,126,0.3)] hover:shadow-[0_4px_30px_rgba(248,185,126,0.5)] group text-center"
                >
                  <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 pointer-events-none -left-full group-hover:left-full transition-all duration-1000 ease-in-out" />
                  <MessageCircle className="w-5 h-5 text-black transition-transform group-hover:rotate-12 duration-300" />
                  <span className="text-sm tracking-wide">تواصل معنا واطلب عبر واتساب</span>
                  
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
                  </span>
                </a>
              </motion.div>

              {/* QUICK ACTIONS BAR (Horizontal Row replacing separate contact items) */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <h2 className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 text-center">
                    قنوات الاتصال المباشر
                  </h2>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    const content = (
                      <div className="flex flex-col items-center group cursor-pointer">
                        <div className={`w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 ${action.hoverBorder} flex items-center justify-center text-white/80 ${action.hoverText} transition-all duration-300 shadow-md relative overflow-hidden group-hover:scale-105 active:scale-95`}>
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${action.bg}`} />
                          <Icon className="w-5 h-5 relative z-10 transition-transform group-hover:rotate-12 duration-300" />
                        </div>
                        <span className={`text-[10px] text-white/40 ${action.hoverText} font-medium mt-1.5 transition-colors duration-300`}>
                          {action.label}
                        </span>
                      </div>
                    );

                    if (action.onClick) {
                      return (
                        <button key={action.id} onClick={action.onClick} className="focus:outline-none bg-transparent border-none p-0 m-0 w-full">
                          {content}
                        </button>
                      );
                    }

                    return (
                      <a
                        key={action.id}
                        href={action.href}
                        target={action.target}
                        rel={action.rel}
                        className="no-underline focus:outline-none w-full"
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* SOCIAL MEDIA SECTION (Beautiful high-fidelity tiles) */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-1">
                <div className="flex items-center justify-between px-1">
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <h2 className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 text-center">
                    تابع حساباتنا الرسمية
                  </h2>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {socialLinks
                    .filter(link => link.platform !== "واتساب" && link.platform !== "الموقع الإلكتروني")
                    .map((link) => {
                      const SocialIcon = link.icon;
                      const glows = socialGlows[link.platform] || {
                        bg: "group-hover:bg-white/5",
                        border: "group-hover:border-white/20",
                        text: "group-hover:text-white",
                        gradient: "from-white/10 to-transparent"
                      };
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-white/[0.03] border border-white/5 ${glows.border} ${glows.bg} p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 backdrop-blur-md group transition-all duration-300 active:scale-[0.97] shadow-lg cursor-pointer text-center relative overflow-hidden`}
                        >
                          {/* Inside Glow Mask */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl bg-gradient-to-b ${glows.gradient}`} />
                          
                          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                            <SocialIcon className={`w-4.5 h-4.5 text-white/80 ${glows.text} transition-colors`} />
                          </div>
                          <span className="text-xs font-bold text-white/90 z-10">{link.platform}</span>
                          <span className="text-[9px] text-white/40 group-hover:text-white/60 transition-colors truncate w-full max-w-full z-10 mt-0.5">
                            {link.username}
                          </span>
                        </a>
                      );
                    })}
                </div>
              </motion.div>

              {/* Share Card Button (Clean glass badge) */}
              <motion.div variants={itemVariants} className="mt-2">
                <button
                  onClick={handleShare}
                  className="relative overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25 text-white/60 hover:text-white/90 py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98] cursor-pointer font-medium w-fit mx-auto outline-none focus-visible:ring-2 focus-visible:ring-[#f8b97e]/50"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="flex items-center gap-1.5 text-[#f8b97e] font-semibold"
                      >
                        <Check className="w-3.5 h-3.5" />
                        تم نسخ رابط الصفحة!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="share"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="flex items-center gap-1.5"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        مشاركة البطاقة الرقمية
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="w-full text-center py-5 border-t border-white/5 bg-black/20">
            <p className="text-[9px] text-white/30 tracking-wider">
              جميع الحقوق محفوظة © فستكا {new Date().getFullYear()}
            </p>
            <p className="text-[8px] text-white/20 mt-0.5">
              صُنع بشغف لتقديم شوكولاتة يمنية فاخرة
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}

