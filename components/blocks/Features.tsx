"use client";

import { motion } from "framer-motion";
import { Check, Map, Globe, Layout, Users, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Map icon names to components
const iconMap = {
  check: Check,
  map: Map,
  globe: Globe,
  layout: Layout,
  users: Users,
  share: Share2,
};

interface FeatureItem {
  title: string;
  description: string;
  icon?: keyof typeof iconMap;
}

interface FeaturesProps {
  title: string;
  features: FeatureItem[];
  columns?: 2 | 3;
}

export default function Features({ title, features, columns = 3 }: FeaturesProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight text-gray-900"
        >
          {title}
        </motion.h2>

        <div className={cn(
          "grid gap-8 md:gap-12",
          columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        )}>
          {features.map((feature, index) => {
            const Icon = feature.icon ? iconMap[feature.icon] : null;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                {Icon && (
                  <div className="mb-4 p-3 rounded-2xl bg-white shadow-sm border border-gray-100">
                    <Icon className="w-6 h-6 text-gray-900" />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

