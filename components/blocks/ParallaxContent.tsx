"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { contentWidths, typography, borderRadius, effects, spacing, animations } from "@/lib/design-tokens";

interface ParallaxContentProps {
  title: string;
  description: string;
  imageUrl: string;
  orientation?: "left" | "right";
}

export default function ParallaxContent({ 
  title, 
  description, 
  imageUrl, 
  orientation = "left" 
}: ParallaxContentProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <section
      ref={containerRef}
      className={cn("relative min-h-[80vh] flex items-center overflow-hidden", spacing.sectionPaddingNormal)}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y, scale: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </motion.div>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "flex flex-col md:flex-row",
          orientation === "right" ? "md:justify-end" : "md:justify-start"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: animations.slow, ease: "easeOut" }}
            className={cn(
              `w-full md:w-[${contentWidths.contentBox}]`,
              "p-8 md:p-12",
              borderRadius.xl,
              effects.glassmorph,
              "shadow-[0_0_40px_rgba(0,0,0,0.3)]",
              "text-white"
            )}
          >
            <h2 className={cn(typography.headingXL, typography.fontBold, spacing.contentGap, typography.trackingTight, "leading-tight")}>
              {title}
            </h2>
            <div className="w-20 h-1 bg-teal-500 mb-8 rounded-full" />
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

