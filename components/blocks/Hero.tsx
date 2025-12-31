"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({ title, subtitle, description, ctaText, ctaLink }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-white px-4 py-20 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000000] to-[#000000] opacity-90" />
      </motion.div>

      <div className="container relative z-10 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1] selection:bg-teal-500/30"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-sm md:text-base font-medium tracking-[0.2em] text-gray-400 mb-8 uppercase"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="mt-8 mb-12 flex justify-center"
        >
           <div className="relative w-80 md:w-[800px] aspect-[800/128]">
             <Image
               src="/LANDIO-Logo.svg"
               alt="LANDIO"
               fill
               className="object-contain invert brightness-0 saturate-100"
               priority
               sizes="(max-width: 768px) 320px, 800px"
             />
           </div>
        </motion.div>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm md:text-base font-medium tracking-[0.2em] text-gray-400 max-w-2xl mx-auto uppercase mb-12"
          >
            {description.split('\n').map((line, i) => (
              <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
            ))}
          </motion.div>
        )}

        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <a 
              href={ctaLink}
              className="group relative inline-flex h-14 items-center justify-center rounded-full bg-teal-500 px-8 text-base font-bold tracking-widest text-black shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_10px_40px_rgba(20,184,166,0.5)] hover:bg-teal-400 transition-all duration-300 uppercase transform hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              <span className="relative">{ctaText}</span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
