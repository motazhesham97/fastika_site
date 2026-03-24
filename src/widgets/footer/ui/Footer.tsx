'use client';

import Image from 'next/image';
import { Separator } from '@/shared/ui/separator';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative bg-brand text-white py-10 px-4 mt-auto overflow-hidden"
      role="contentinfo"
      aria-label="تذييل الموقع - فستكا"
    >
      {/* Decorative top gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-accent-orange/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Logo */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3">
          <Image
            src="/Asset 1.png"
            alt="فستكا - Fastika"
            fill
            className="object-contain rounded-full"
          />
        </div>

        <h3 className="text-lg font-bold mb-1">
          فستكا | Fastika
        </h3>

        <Separator className="w-20 mx-auto my-4 bg-accent-orange/25" />

        {/* Tagline */}
        <p className="text-sm text-accent-orange font-medium mb-5">
          شوكولاتة دبي الفاخرة
        </p>

        {/* Copyright */}
        <p className="text-sm text-white/60">
          جميع الحقوق محفوظة © {currentYear} فستكا
        </p>
      </div>
    </motion.footer>
  );
}
