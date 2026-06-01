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
  Check,
  ChevronLeft
} from "lucide-react";
import { Separator } from "@/shared/ui/separator";

const ease = [0.22, 1, 0.36, 1] as const;

// Ambient background floating particles for a living UI environment
const floatingParticles = [
  { size: "w-40 h-40 sm:w-60 sm:h-60", color: "bg-[#657f66]/10", x: ["-10%", "110%"], y: ["10%", "30%"], duration: 30 },
  { size: "w-48 h-48 sm:w-72 sm:h-72", color: "bg-[#f8b97e]/8", x: ["110%", "-10%"], y: ["70%", "50%"], duration: 35 },
  { size: "w-56 h-56 sm:w-80 sm:h-80", color: "bg-[#657f66]/8", x: ["30%", "60%"], y: ["-10%", "110%"], duration: 40 },
  { size: "w-32 h-32 sm:w-48 sm:h-48", color: "bg-[#f8b97e]/10", x: ["90%", "20%"], y: ["110%", "-10%"], duration: 28 },
];

export default function DigitalCard() {
  const [copied, setCopied] = useState(false);

  // 3D Parallax Tilt Effect for Desktop Hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [8, -8]), { damping: 35, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { damping: 35, stiffness: 220 });

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
  };

  return (
    <div className="bg-gradient-to-b from-[#faf8f5] via-[#f5eedf] to-[#ebe1cd] min-h-screen relative flex flex-col items-center justify-center sm:py-10 overflow-x-hidden">
      
      {/* 1. Ambient Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingParticles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute rounded-full pointer-events-none blur-[90px] ${p.size} ${p.color}`}
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

      {/* 2. Responsive Business Card Container */}
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          perspective: 1000 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease }}
        className="w-full sm:max-w-md z-10 p-[1.5px] bg-gradient-to-tr from-[#657f66]/30 via-[#f8b97e]/60 to-[#657f66]/30 hover:via-[#f8b97e] rounded-none sm:rounded-[28px] transition-all duration-700 shadow-2xl flex flex-col flex-1 sm:flex-initial"
      >
        {/* Inner Card Wrapper */}
        <div 
          className="bg-white/90 backdrop-blur-xl sm:rounded-[26px] overflow-hidden flex flex-col flex-1 sm:flex-initial"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Card Header (Matches the homepage Header.tsx EXACTLY) */}
          <div className="relative brand-gradient text-white pt-10 pb-8 px-6 text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/[0.02]" />
            </div>

            <div className="relative flex flex-col items-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 rounded-full bg-accent-orange/20 animate-pulse" />
                <Image
                  src="/Asset 1.png"
                  alt={brandInfo.nameAr}
                  fill
                  priority
                  className="object-contain rounded-full ring-4 ring-white/20 shadow-float"
                />
              </motion.div>

              {/* Brand Title & Subtitle */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-white drop-shadow-sm">
                {brandInfo.nameAr}
              </h1>
              <p className="text-accent-orange font-semibold text-sm sm:text-base tracking-wide drop-shadow-sm">
                Fastika
              </p>

              {/* Decorative Separator */}
              <div className="flex items-center justify-center gap-3 mt-4" aria-hidden="true">
                <Separator className="w-12 bg-accent-orange/40" />
                <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                <Separator className="w-12 bg-accent-orange/40" />
              </div>

              {/* Description inside header for unified framing */}
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto mt-4 font-medium drop-shadow-sm">
                {brandInfo.description}
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 flex flex-col gap-5" style={{ transform: "translateZ(20px)" }}>
            
            {/* Staggered Actions List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="w-full flex flex-col gap-4"
            >
              {/* PRIMARY CTAS SECTION: Save Contact & WhatsApp side-by-side */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                {/* Save Contact (Green Button) */}
                <button
                  onClick={handleSaveContact}
                  className="relative overflow-hidden bg-gradient-to-r from-[#657f66] to-[#4a634b] hover:opacity-95 text-white font-bold py-4 px-3 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[#657f66]/20 transition-all duration-200 active:scale-[0.98] border-none text-sm cursor-pointer group"
                >
                  <motion.div
                    className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ left: "-100%" }}
                    whileHover={{ left: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <UserPlus className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                  <span>حفظ الاتصال</span>
                </button>

                {/* WhatsApp Chat (WhatsApp Green Button) */}
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-3 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-green-500/10 transition-all duration-200 active:scale-[0.98] text-sm cursor-pointer group text-center"
                >
                  <motion.div
                    className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ left: "-100%" }}
                    whileHover={{ left: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <MessageCircle className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                  <span>مراسلة واتساب</span>
                </a>
              </motion.div>

              {/* SECONDARY CONTACT CHANNELS: Vertical list */}
              <motion.div variants={itemVariants} className="mt-1">
                <h2 className="text-xs font-bold text-[#4a634b]/50 uppercase tracking-widest px-1 text-right mb-2">
                  روابط الاتصال الأخرى
                </h2>
              </motion.div>

              {/* Phone Call Card */}
              <motion.div variants={itemVariants}>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="w-full relative overflow-hidden bg-white border border-[#657f66]/10 hover:border-[#657f66]/30 hover:bg-white/95 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between group transition-all duration-300 active:scale-[0.99] shadow-[var(--shadow-card)] cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-[#657f66]/5 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ left: "-100%" }}
                    whileHover={{ left: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#657f66]/10 flex items-center justify-center transition-colors group-hover:bg-[#657f66]/20">
                      <Phone className="w-4.5 h-4.5 text-[#657f66]" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#4a634b]">اتصال هاتفي مباشر</div>
                      <div className="text-xs text-[#4a634b]/60">{contactInfo.phone}</div>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-[#4a634b]/30 group-hover:text-[#4a634b]/70 transition-colors" />
                </a>
              </motion.div>

              {/* Google Maps Location Card */}
              <motion.div variants={itemVariants}>
                <a
                  href="https://maps.google.com/?q=Ibb+Yemen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative overflow-hidden bg-white border border-[#657f66]/10 hover:border-[#657f66]/30 hover:bg-white/95 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between group transition-all duration-300 active:scale-[0.99] shadow-[var(--shadow-card)] cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-[#f8b97e]/15 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ left: "-100%" }}
                    whileHover={{ left: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#f8b97e]/15 flex items-center justify-center transition-colors group-hover:bg-[#f8b97e]/30">
                      <MapPin className="w-4.5 h-4.5 text-[#e5a56d]" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#4a634b]">موقعنا على الخريطة</div>
                      <div className="text-xs text-[#4a634b]/60">{contactInfo.location}</div>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-[#4a634b]/30 group-hover:text-[#4a634b]/70 transition-colors" />
                </a>
              </motion.div>

              {/* Email Card */}
              <motion.div variants={itemVariants}>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="w-full relative overflow-hidden bg-white border border-[#657f66]/10 hover:border-[#657f66]/30 hover:bg-white/95 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between group transition-all duration-300 active:scale-[0.99] shadow-[var(--shadow-card)] cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-[#657f66]/5 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ left: "-100%" }}
                    whileHover={{ left: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#657f66]/10 flex items-center justify-center transition-colors group-hover:bg-[#657f66]/20">
                      <Mail className="w-4.5 h-4.5 text-[#657f66]" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#4a634b]">راسلنا إلكترونياً</div>
                      <div className="text-xs text-[#4a634b]/60">{contactInfo.email}</div>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-[#4a634b]/30 group-hover:text-[#4a634b]/70 transition-colors" />
                </a>
              </motion.div>

              {/* SOCIAL MEDIA SECTION: 3-column horizontal grid */}
              <motion.div variants={itemVariants} className="mt-2">
                <h2 className="text-xs font-bold text-[#4a634b]/50 uppercase tracking-widest px-1 text-right mb-2">
                  تابعنا على حساباتنا
                </h2>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                className="grid grid-cols-3 gap-2.5"
              >
                {socialLinks
                  .filter(link => link.platform !== "واتساب" && link.platform !== "الموقع الإلكتروني")
                  .map((link) => {
                    const SocialIcon = link.icon;
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-[#657f66]/10 hover:border-[#657f66]/30 hover:bg-white p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 backdrop-blur-sm group transition-all duration-300 active:scale-[0.97] shadow-[var(--shadow-card)] cursor-pointer text-center"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#657f66]/10 flex items-center justify-center group-hover:bg-[#657f66] transition-all">
                          <SocialIcon className="w-4 h-4 text-[#657f66] group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-xs font-bold text-[#4a634b]">{link.platform}</span>
                        <span className="text-[9px] text-[#4a634b]/50 group-hover:text-[#657f66] transition-colors truncate w-full max-w-full">
                          {link.username}
                        </span>
                      </a>
                    );
                  })}
              </motion.div>

              {/* Share Card Button */}
              <motion.div variants={itemVariants} className="mt-3">
                <button
                  onClick={handleShare}
                  className="w-full relative overflow-hidden border border-[#657f66]/20 hover:border-[#657f66]/30 bg-white/40 hover:bg-white/80 text-[#4a634b] py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98] cursor-pointer font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#657f66]/50"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-2 text-green-600 font-semibold"
                      >
                        <Check className="w-4 h-4" />
                        تم نسخ الرابط بنجاح!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="share"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        مشاركة هذه البطاقة الرقمية
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="w-full text-center py-5 border-t border-[#657f66]/5">
            <p className="text-[10px] text-[#4a634b]/40 tracking-wider font-semibold">
              جميع الحقوق محفوظة © فستكا {new Date().getFullYear()}
            </p>
            <p className="text-[9px] text-[#4a634b]/30 mt-0.5 font-semibold">
              صُنع بشغف لتقديم شوكولاتة يمنية فاخرة
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
