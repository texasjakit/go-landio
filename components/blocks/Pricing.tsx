"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlight?: boolean;
}

interface PricingProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Snappy spring for responsive tilt
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Calculate center-relative coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Set raw pixel offset from center
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // 3D Tilt Transforms
  // Map pixel offset to degrees. 
  // When mouse at TOP (mouseY negative), tilt top toward viewer (negative rotateX)
  // When mouse at BOTTOM (mouseY positive), tilt bottom toward viewer (positive rotateX)
  const rotateX = useTransform(mouseY, [-250, 250], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  // Spotlight gradient following mouse (needs to be relative to card top-left for mask)
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  
  function updateSpotlight({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(300px at ${spotlightX}px ${spotlightY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  // Determine if this is the center card (index 1)
  const isCenter = index === 1;

  return (
    // Container with fixed width, no flexing
    <div className="perspective-1000 flex-none w-[320px]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseMove={(e) => {
          onMouseMove(e);
          updateSpotlight(e);
        }}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative p-6 md:p-8 rounded-3xl flex flex-col transition-[border-color,background-color] duration-300 group w-[320px]",
          isCenter ? "h-[540px]" : "h-[480px]",
          plan.highlight 
            ? "bg-[#011] border border-teal-500/30" 
            : "bg-black border border-[#333] hover:border-teal-500/20 bg-gradient-to-b from-[#050505] to-black"
        )}
      >
        {/* Spotlight Effect Layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={style}
        >
          {/* The shine color - Increased opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-500/30" />
        </motion.div>
        
        {/* Grid Pattern overlay for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-20 pointer-events-none rounded-3xl" />

        {/* Content - Lifted on z-axis for depth */}
        <div className="relative z-10 flex flex-col h-full transform-gpu" style={{ transform: "translateZ(30px)" }}>
          <div className="mb-10 text-center">
            <h3 className={cn("text-sm font-bold tracking-[0.2em] uppercase mb-6", plan.highlight ? "text-teal-400" : "text-gray-500")}>
              {plan.name}
            </h3>
            <div className="flex items-baseline justify-center gap-1 mb-4">
              <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
            </div>
            {plan.period && (
              <p className="text-gray-500 uppercase tracking-widest text-xs">
                {plan.period}
              </p>
            )}
             {plan.description && (
              <div className={cn("mt-4 inline-block px-3 py-1 rounded-full text-xs border backdrop-blur-sm", 
                plan.highlight ? "bg-teal-900/20 border-teal-500/30 text-teal-300" : "bg-white/5 border-white/10 text-gray-400"
              )}>
                {plan.description}
              </div>
            )}
          </div>

          <div className="space-y-6 mb-10 flex-1">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-sm text-gray-300 group-hover:text-white transition-colors">
                <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", plan.highlight ? "bg-teal-400" : "bg-gray-600 group-hover:bg-teal-500/50")} />
                <span className="tracking-wide">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <a
              href={plan.ctaLink}
              className={cn(
                "w-full py-4 px-6 rounded-full font-bold text-xs tracking-[0.2em] text-center uppercase transition-all duration-300 relative overflow-hidden flex items-center justify-center",
                plan.highlight
                  ? "bg-teal-500 text-black hover:bg-teal-200 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_10px_40px_rgba(20,184,166,0.5)]"
                  : "bg-transparent border border-white/20 text-white hover:border-teal-500 hover:text-teal-400"
              )}
            >
              {/* Button Shine Effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              <span className="relative">{plan.ctaText}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Pricing({ title, subtitle, plans }: PricingProps) {
  return (
    <section className="py-12 md:py-16 text-white relative">
       {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-wide uppercase"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Mobile: Stack vertically, Desktop: Flex row with bottom alignment */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-6 lg:gap-2 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
