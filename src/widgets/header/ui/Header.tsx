'use client';

import Image from 'next/image';
import { Separator } from '@/shared/ui/separator';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-brand text-white overflow-hidden"
      aria-label="ترويسة الموقع - فستكا"
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.02]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center py-10 sm:py-14 px-4">
        {/* Logo with spring float */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: 0.15,
          }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-5"
        >
          <div className="absolute inset-0 rounded-full bg-accent-orange/20 animate-pulse" />
          <Image
            src="/Asset 1.png"
            alt="شعار فستكا - شوكولاتة دبي الفاخرة"
            fill
            className="object-contain rounded-full ring-4 ring-white/20 shadow-float"
            priority
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 tracking-tight"
        >
          فستكا
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-accent-orange font-semibold mb-4"
        >
          Fastika
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-base sm:text-lg text-white/85 max-w-md mx-auto leading-relaxed"
        >
          صُنعت بحبّ لتجمع بين الفخامة والنكهة الفريدة
        </motion.p>

        {/* Decorative Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-3 mt-7"
        >
          <Separator className="w-16 bg-accent-orange/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent-orange" aria-hidden="true" />
          <Separator className="w-16 bg-accent-orange/40" />
        </motion.div>
      </div>
    </motion.header>
  );
}
