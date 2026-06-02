"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { 
  brandInfo, 
  socialLinks, 
  contactInfo 
} from "../data";
import { 
  Phone, 
  MessageCircle, 
  Share2, 
  Check,
  Instagram,
  Facebook
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// Custom official TikTok logo SVG component
const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.19 1.1 1.25 2.66 2.05 4.31 2.25v3.83c-1.39-.07-2.76-.55-3.95-1.3-1.07-.69-1.95-1.67-2.51-2.83-.02 2.25-.01 4.51-.01 6.76 0 1.29-.2 2.58-.69 3.77-1 2.45-3.32 4.15-5.96 4.34-2.83.2-5.61-1.31-6.72-3.92-1.23-2.9-.1-6.43 2.63-8.08 1.34-.81 2.95-1.1 4.49-.82V12.1c-.81-.14-1.66-.02-2.39.37-.87.47-1.46 1.34-1.58 2.33-.2 1.65.88 3.25 2.5 3.52 1.76.3 3.42-.81 3.73-2.54.06-.32.07-.65.07-.97V.02z" />
  </svg>
);

// Ambient background floating particles using secondary highlights (#f8b97e, #ffffff) over the primary green background
const floatingParticles = [
  { size: "w-72 h-72 sm:w-96 sm:h-96", color: "bg-white/12", x: ["-10%", "90%"], y: ["10%", "40%"], duration: 25 },
  { size: "w-80 h-80 sm:w-[450px] sm:h-[450px]", color: "bg-[#f8b97e]/12", x: ["100%", "10%"], y: ["60%", "30%"], duration: 30 },
  { size: "w-64 h-64 sm:w-80 sm:h-80", color: "bg-white/8", x: ["20%", "70%"], y: ["90%", "10%"], duration: 35 },
];

export default function DigitalCard() {
  const [copied, setCopied] = useState(false);

  // 3D Parallax Tilt Effect for Desktop Hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [5, -5]), { damping: 45, stiffness: 180 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-5, 5]), { damping: 45, stiffness: 180 });

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

  const instagramLink = socialLinks.find(link => link.platform === "انستقرام") || {
    url: "https://www.instagram.com/fastika_choco?igsh=ODZwa25teHh2aWZq",
    username: "@fastika_choco"
  };

  const tikTokLink = socialLinks.find(link => link.platform === "تيك توك") || {
    url: "https://www.tiktok.com/@fastika_choco?_r=1&_t=ZS-96t0VR7SD80",
    username: "@fastika_choco"
  };

  const facebookLink = socialLinks.find(link => link.platform === "فيسبوك") || {
    url: "https://www.facebook.com/share/1E5d15HTJu/",
    username: "فستيكا"
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

  return (
    <div className="bg-gradient-to-b from-[#759376] via-[#657f66] to-[#556b56] min-h-screen relative flex flex-col items-center justify-center py-6 px-4 sm:py-12 overflow-x-hidden">
      
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
        className="w-full sm:max-w-md z-10 p-[1px] bg-gradient-to-tr from-white/20 via-[#f8b97e]/35 to-white/20 hover:via-white/50 rounded-[32px] transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col flex-1 sm:flex-initial"
      >
        {/* Inner Card Wrapper */}
        <div 
          className="bg-[#0A120B]/80 backdrop-blur-3xl rounded-[31px] overflow-hidden flex flex-col flex-1 sm:flex-initial border border-white/10"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Card Header */}
          <div className="relative pt-12 pb-6 px-6 text-center overflow-hidden">
            <div className="relative flex flex-col items-center">
              {/* Logo with clean matte gold border */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="relative w-32 h-32 mb-5 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
              >
                {/* Thin gold accent border */}
                <div className="absolute inset-0 rounded-full border border-[#f8b97e]/30 group-hover:border-[#f8b97e]/50 transition duration-300 z-10" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-lg">
                  <Image
                    src="/logo_fastika.png"
                    alt={brandInfo.nameAr}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>

              {/* Brand Title & Subtitle */}
              <h1 className="text-3xl font-black tracking-tight text-white mb-0.5">
                {brandInfo.nameAr}
              </h1>
              <p className="text-[#f8b97e] font-semibold text-xs tracking-widest uppercase opacity-90">
                Fastika Chocolate
              </p>

              {/* Custom Elegant Divider */}
              <div className="flex items-center justify-center gap-3 my-4.5" aria-hidden="true">
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#f8b97e]/35" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#f8b97e] opacity-80" />
                <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#f8b97e]/35" />
              </div>

              {/* Service description tagline */}
              <h2 className="text-[#f8b97e] text-base font-extrabold mb-1 drop-shadow-sm">
                حلاوتها في تفاصيلها ✨
              </h2>
              <p className="text-white/80 text-xs leading-relaxed max-w-xs mx-auto font-light">
                وجهتك الأولى لبوكسات الهدايا الفاخرة وتجهيز المناسبات.
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
              className="w-full flex flex-col gap-5.5"
            >
              {/* PRIMARY CTAS (Harmonized White & Gold stacked buttons with matching text colors) */}
              <div className="flex flex-col gap-3.5">
                {/* WhatsApp Button (Solid White #ffffff) */}
                <motion.div variants={itemVariants}>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full relative overflow-hidden bg-white hover:bg-white/90 text-[#182619] font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.1)] group text-center"
                  >
                    <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-black/[0.02] to-transparent -skew-x-12 pointer-events-none -left-full group-hover:left-full transition-all duration-1000 ease-in-out" />
                    <MessageCircle className="w-5 h-5 text-[#182619] transition-transform group-hover:rotate-12 duration-300" />
                    <span className="text-sm tracking-wide">الطلب والاستفسار (واتساب)</span>
                    
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#657f66] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#657f66]"></span>
                    </span>
                  </a>
                </motion.div>

                {/* Instagram Button (Solid Gold #f8b97e) */}
                <motion.div variants={itemVariants}>
                  <a
                    href={instagramLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full relative overflow-hidden bg-[#f8b97e] hover:bg-[#e5a56d] text-[#182619] font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-[0_4px_15px_rgba(248,185,126,0.15)] group text-center"
                  >
                    <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none -left-full group-hover:left-full transition-all duration-1000 ease-in-out" />
                    <Instagram className="w-5 h-5 text-[#182619] transition-transform group-hover:scale-110 duration-300" />
                    <span className="text-sm tracking-wide">حسابنا على إنستغرام</span>
                    
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#182619] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#182619]"></span>
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* SECONDARY ACTIONS: TikTok, Facebook, Phone Call in a 3-column row */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <h2 className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 text-center">
                    قنوات التواصل والاتصال
                  </h2>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {/* Phone Call Card */}
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="bg-white/[0.03] border border-white/5 hover:border-[#657f66]/30 hover:bg-[#657f66]/10 p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 backdrop-blur-md group transition-all duration-300 active:scale-[0.97] shadow-lg cursor-pointer text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl bg-[#657f66]/10" />
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                      <Phone className="w-4.5 h-4.5 text-white/80 group-hover:text-[#7a997b] transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white/95 z-10">اتصل بنا</span>
                    <span className="text-[8px] text-white/40 group-hover:text-white/60 transition-colors truncate w-full max-w-full z-10 mt-0.5">
                      {contactInfo.phone}
                    </span>
                  </a>

                  {/* TikTok Card */}
                  <a
                    href={tikTokLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/[0.03] border border-white/5 hover:border-rose-500/30 hover:bg-rose-500/10 p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 backdrop-blur-md group transition-all duration-300 active:scale-[0.97] shadow-lg cursor-pointer text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl bg-rose-500/10" />
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                      <TiktokIcon className="w-4.5 h-4.5 text-white/80 group-hover:text-rose-400 transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white/95 z-10">تيك توك</span>
                    <span className="text-[8px] text-white/40 group-hover:text-white/60 transition-colors truncate w-full max-w-full z-10 mt-0.5">
                      {tikTokLink.username}
                    </span>
                  </a>

                  {/* Facebook Card */}
                  <a
                    href={facebookLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/[0.03] border border-white/5 hover:border-blue-600/30 hover:bg-blue-600/10 p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 backdrop-blur-md group transition-all duration-300 active:scale-[0.97] shadow-lg cursor-pointer text-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl bg-blue-600/10" />
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                      <Facebook className="w-4.5 h-4.5 text-white/80 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white/95 z-10">فيسبوك</span>
                    <span className="text-[8px] text-white/40 group-hover:text-white/60 transition-colors truncate w-full max-w-full z-10 mt-0.5">
                      {facebookLink.username}
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* Share Card Button (Clean glass badge) */}
              <motion.div variants={itemVariants} className="mt-1">
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
              جميع الحقوق محفوظة © فستيكا {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
