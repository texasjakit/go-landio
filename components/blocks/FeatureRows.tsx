"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Image from "next/image";

interface FeatureRowItem {
  title: string;
  description: string;
  imageAlt?: string;
  imageUrl?: string;
}

interface FeatureRowsProps {
  title?: string;
  features: FeatureRowItem[];
}

function FeatureRow({ feature, index }: { feature: FeatureRowItem; index: number }) {
  const isEven = index % 2 === 0;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col md:flex-row gap-12 md:gap-24 items-center",
        !isEven && "md:flex-row-reverse"
      )}
    >
      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-6 text-center md:text-left z-10"
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight">{feature.title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">{feature.description}</p>
      </motion.div>

      {/* Image Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 w-full"
      >
        <div className="aspect-[4/3] w-full rounded-2xl border border-[#333] bg-[#0a0a0a] relative overflow-hidden group shadow-2xl hover:-translate-y-2 transition-transform duration-500">
          {feature.imageUrl ? (
            <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
               <Image
                src={feature.imageUrl}
                alt={feature.imageAlt || feature.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#111] to-[#0a0a0a] flex items-center justify-center">
              <span className="relative z-10 text-gray-600 font-bold tracking-widest text-center px-4 uppercase">
                {feature.imageAlt || "Placeholder"}
              </span>
            </div>
          )}
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Border Glow */}
          <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 rounded-2xl pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export default function FeatureRows({ title, features }: FeatureRowsProps) {
  return (
    <section className="py-24 md:py-32 text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-24 md:mb-32 tracking-wide uppercase"
          >
            {title}
          </motion.h2>
        )}

        <div className="space-y-16 md:space-y-24">
          {features.map((feature, index) => (
            <FeatureRow key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
