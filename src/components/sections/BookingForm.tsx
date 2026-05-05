'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Music2, User, Mail, Phone, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

const serviceOptions = [
  'DJ Set / Événement',
  'Session studio (enregistrement)',
  'Mixage & Mastering',
  'Beatmaking (beat exclusif)',
  'Production musicale complète',
  'Coaching artistique',
  'Autre',
];

const durationOptions = ['1 heure', '2 heures', 'Demi-journée (4h)', 'Journée complète (8h)', 'À définir'];

interface FormData {
  name:     string;
  email:    string;
  phone:    string;
  service:  string;
  date:     string;
  duration: string;
  message:  string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

const initialForm: FormData = {
  name: '', email: '', phone: '', service: '', date: '', duration: '', message: '',
};

function InputField({
  label, icon: Icon, id, error, ...props
}: { label: string; icon: any; id: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-rh-grey text-sm font-medium flex items-center gap-1.5">
        <Icon size={13} className="text-rh-purple" />
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'w-full glass-dark border rounded-xl px-4 py-3 text-rh-white text-sm placeholder:text-rh-grey/50',
          'transition-all duration-200 outline-none focus:border-rh-purple focus:glow-purple',
          'bg-transparent font-inter',
          error ? 'border-rh-pink' : 'border-rh-border'
        )}
        {...props}
      />
      {error && <p className="text-rh-pink text-xs">{error}</p>}
    </div>
  );
}

export default function BookingForm() {
  const [form,  setForm]  = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())  e.name  = 'Le nom est requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Email invalide';
    if (!form.service) e.service = 'Choisissez un service';
    if (!form.date)    e.date    = 'La date est requise';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState('loading');
    // Simuler un envoi — remplacer par un vrai appel API / Resend / Formspree
    await new Promise((r) => setTimeout(r, 1800));
    setState('success');
  };

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark border border-rh-purple/30 rounded-3xl p-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center mx-auto mb-5 glow-purple">
          <CheckCircle size={28} className="text-white" />
        </div>
        <h3 className="font-syne font-bold text-rh-white text-xl mb-2">Demande envoyée !</h3>
        <p className="text-rh-grey">Je vous réponds dans les 24h pour confirmer votre session.</p>
        <button
          onClick={() => { setState('idle'); setForm(initialForm); }}
          className="mt-6 text-rh-purple text-sm underline underline-offset-4 cursor-pointer"
        >
          Nouvelle demande
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass-dark border border-rh-border rounded-3xl p-6 md:p-8 space-y-5"
      aria-label="Formulaire de réservation"
      noValidate
    >
      <motion.h2 variants={fadeUp} className="font-syne font-bold text-rh-white text-xl mb-2">
        Réserver une session
      </motion.h2>

      {/* Nom + Email */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Nom / Artiste *"
          icon={User}
          id="booking-name"
          type="text"
          placeholder="Votre nom"
          value={form.name}
          onChange={update('name')}
          error={errors.name}
          required
          autoComplete="name"
        />
        <InputField
          label="Email *"
          icon={Mail}
          id="booking-email"
          type="email"
          placeholder="votre@email.com"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
          required
          autoComplete="email"
        />
      </motion.div>

      {/* Téléphone */}
      <motion.div variants={fadeUp}>
        <InputField
          label="Téléphone"
          icon={Phone}
          id="booking-phone"
          type="tel"
          placeholder="+33 6 00 00 00 00"
          value={form.phone}
          onChange={update('phone')}
          autoComplete="tel"
        />
      </motion.div>

      {/* Service */}
      <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
        <label htmlFor="booking-service" className="text-rh-grey text-sm font-medium flex items-center gap-1.5">
          <Music2 size={13} className="text-rh-purple" />
          Service souhaité *
        </label>
        <select
          id="booking-service"
          value={form.service}
          onChange={update('service')}
          required
          className={cn(
            'w-full glass-dark border rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none',
            'focus:border-rh-purple bg-rh-dark font-inter',
            form.service ? 'text-rh-white' : 'text-rh-grey/50',
            errors.service ? 'border-rh-pink' : 'border-rh-border'
          )}
        >
          <option value="" disabled className="bg-rh-dark">-- Choisir un service --</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s} className="bg-rh-dark text-rh-white">{s}</option>
          ))}
        </select>
        {errors.service && <p className="text-rh-pink text-xs">{errors.service}</p>}
      </motion.div>

      {/* Date + Durée */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Date souhaitée *"
          icon={Calendar}
          id="booking-date"
          type="date"
          value={form.date}
          onChange={update('date')}
          error={errors.date}
          required
          min={new Date().toISOString().split('T')[0]}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="booking-duration" className="text-rh-grey text-sm font-medium flex items-center gap-1.5">
            <Clock size={13} className="text-rh-purple" />
            Durée
          </label>
          <select
            id="booking-duration"
            value={form.duration}
            onChange={update('duration')}
            className="w-full glass-dark border border-rh-border rounded-xl px-4 py-3 text-rh-white text-sm outline-none focus:border-rh-purple bg-rh-dark font-inter"
          >
            <option value="" className="bg-rh-dark">-- Durée --</option>
            {durationOptions.map((d) => (
              <option key={d} value={d} className="bg-rh-dark">{d}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Message */}
      <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
        <label htmlFor="booking-message" className="text-rh-grey text-sm font-medium flex items-center gap-1.5">
          <MessageSquare size={13} className="text-rh-purple" />
          Message / Détails du projet
        </label>
        <textarea
          id="booking-message"
          rows={4}
          placeholder="Décrivez votre projet, vos influences, vos attentes..."
          value={form.message}
          onChange={update('message')}
          className="w-full glass-dark border border-rh-border rounded-xl px-4 py-3 text-rh-white text-sm placeholder:text-rh-grey/50 resize-none outline-none focus:border-rh-purple transition-all duration-200 bg-transparent font-inter"
        />
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp}>
        <NeonButton
          type="submit"
          size="lg"
          disabled={state === 'loading'}
          className="w-full justify-center"
          ariaLabel="Envoyer la demande de réservation"
        >
          {state === 'loading' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Calendar size={18} />
              Envoyer ma demande
            </>
          )}
        </NeonButton>
      </motion.div>
    </motion.form>
  );
}
