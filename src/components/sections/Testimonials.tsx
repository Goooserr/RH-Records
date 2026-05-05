'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

const testimonials = [
  {
    name: "Thomas L.",
    role: "Artiste Rap",
    text: "Le meilleur studio de Chambéry. RH a une oreille incroyable pour le mixage, il a transformé ma maquette en un hit radio-ready.",
    rating: 5,
    className: "md:col-span-2",
  },
  {
    name: "Sarah M.",
    role: "Organisatrice d'événements",
    text: "DJ set exceptionnel pour notre gala. Une lecture de la piste parfaite.",
    rating: 5,
    className: "md:col-span-1",
  },
  {
    name: "Kevin D.",
    role: "Beatmaker",
    text: "Les packs de beats sont d'une qualité pro. Les drums coupent parfaitement le mix.",
    rating: 5,
    className: "md:col-span-1",
  },
  {
    name: "Julien R.",
    role: "Producteur",
    text: "Une collaboration fluide et des résultats qui dépassent mes attentes. Je recommande les yeux fermés pour tout projet de production.",
    rating: 5,
    className: "md:col-span-2",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-rh-pink font-mono text-xs tracking-[0.3em] uppercase mb-4">La voix des artistes</p>
          <h2 className="font-syne font-extrabold text-rh-white text-4xl md:text-5xl leading-tight">
            Ce qu'ils disent de <br />
            <span className="text-gradient-purple">RH Records</span>
          </h2>
        </div>

        {/* Bento Grid Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={t.className}
            >
              <GlowCard glow="pink" className="p-8 h-full flex flex-col gap-6 group">
                <div className="flex justify-between items-start">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-rh-pink text-rh-pink" />
                    ))}
                  </div>
                  <Quote size={24} className="text-white/10 group-hover:text-rh-pink/40 transition-colors duration-500" />
                </div>
                
                <p className="text-rh-white/80 text-lg leading-relaxed italic">
                  "{t.text}"
                </p>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <p className="font-bold text-rh-white">{t.name}</p>
                  <p className="text-rh-grey text-sm">{t.role}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
