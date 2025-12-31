"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { typography, spacing, animations, borderRadius, effects, contentWidths } from "@/lib/design-tokens";

interface ContentSectionProps {
  variant: "parallax" | "featured";
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  orientation?: "left" | "right";
  imageBleed?: number; // Percentage to bleed (e.g., 10 for 10%)
  imagePositionY?: string; // Vertical position (e.g., "center", "top", "bottom", "30%", "-10%")
  imageBrightness?: number; // Brightness 0-100 (100 = full bright, 0 = dark)
}

export default function ContentSection({
  variant,
  title,
  description,
  imageUrl,
  imageAlt,
  orientation = "left",
  imageBleed = 0,
  imagePositionY = "center",
  imageBrightness = 80,
}: ContentSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const featuredY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Calculate scale based on imageBleed (default 5% bleed for parallax if not specified)
  const parallaxBleed = imageBleed > 0 ? imageBleed : 0;
  const parallaxScale = 1 + (parallaxBleed / 100) * 2;

  if (variant === "parallax") {
    return (
      <section
        ref={containerRef}
        className={cn("relative min-h-[80vh] flex items-center overflow-hidden", spacing.sectionPaddingNormal)}
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ y: parallaxY, scale: parallaxScale }}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: `center ${imagePositionY}`
              }}
            />
          </motion.div>
          {/* Overlay to ensure text readability */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: (100 - imageBrightness) / 100 }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className={cn(
            "flex flex-col lg:flex-row",
            orientation === "right" ? "lg:justify-end lg:pr-24" : "lg:justify-start lg:pl-24"
          )}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: animations.slow, ease: "easeOut" }}
              style={{
                maxWidth: contentWidths.contentBoxLarge,
              }}
              className={cn(
                "w-full",
                "p-8 lg:p-12",
                borderRadius.xl,
                effects.glassmorph,
                "shadow-[0_0_40px_rgba(0,0,0,0.3)]",
                "text-white"
              )}
            >
              <h2 className={cn(
                typography.headingXL,
                typography.fontBold,
                spacing.contentGap,
                typography.trackingTight,
                "leading-tight"
              )}>
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

  // Featured variant
  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={cn(
          "flex flex-col lg:flex-row gap-12 lg:gap-24 items-center relative",
          orientation === "right" ? "lg:flex-row-reverse lg:pr-24" : "lg:pl-24"
        )}>
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: animations.slow, ease: "easeOut" }}
            style={{
              maxWidth: contentWidths.contentBoxLarge,
            }}
            className="w-full space-y-6 z-10"
          >
            <h3 className={cn(
              typography.headingXL,
              typography.fontBold,
              "uppercase",
              typography.trackingTight,
              "leading-tight"
            )}>
              {title}
            </h3>
            <div className="w-20 h-1 bg-teal-500 rounded-full" />
            <p className="text-gray-400 text-lg leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: animations.slow, delay: 0.2 }}
            className="flex-1 w-full max-w-2xl mx-auto lg:max-w-none"
          >
            <div className="aspect-[4/3] w-full rounded-2xl border border-[#333] bg-[#0a0a0a] relative overflow-hidden group shadow-2xl hover:-translate-y-2 transition-transform duration-500">
              <div
                className="absolute"
                style={
                  imageBleed > 0
                    ? {
                        inset: `-${imageBleed}%`,
                        width: `${100 + imageBleed * 2}%`,
                        height: `${100 + imageBleed * 2}%`,
                      }
                    : { inset: 0 }
                }
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt || title}
                  fill
                  className="object-cover transition-opacity duration-700"
                  style={{
                    objectPosition: `center ${imagePositionY}`,
                    opacity: imageBrightness / 100
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Border Glow */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
