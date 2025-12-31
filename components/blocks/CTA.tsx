"use client";

import { motion } from "framer-motion";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTA({ title, description, buttonText, buttonLink }: CTAProps) {
  return (
    <section className="py-32 text-white overflow-hidden relative border-t border-[#333]">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      
      {/* Background Teal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight uppercase"
        >
          {title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a 
            href={buttonLink}
            className="group relative inline-flex h-16 items-center justify-center rounded-full bg-teal-500 px-10 text-lg font-bold tracking-widest text-black shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_10px_40px_rgba(20,184,166,0.5)] hover:bg-teal-200 transition-all duration-300 uppercase transform hover:scale-105 overflow-hidden"
          >
            {/* Button Glisten Effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            <span className="relative">{buttonText}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
