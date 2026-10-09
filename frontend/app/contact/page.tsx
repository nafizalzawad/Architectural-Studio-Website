'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: 'Architectural Design',
    message: '',
    website_hp: '',
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseStatus, setResponseStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide project details (minimum 10 characters).';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setResponseStatus(null);

    try {
      const result = await sendContactMessage(formData);
      setIsSubmitting(false);

      if (result.success) {
        setResponseStatus({
          success: true,
          message: 'Thank you. A studio director will be in touch shortly.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service_interest: 'Architectural Design',
          message: '',
          website_hp: '',
        });
        setFieldErrors({});
      } else {
        setResponseStatus({
          success: false,
          message: result.message || 'Unable to submit inquiry. Please try again.',
        });
      }
    } catch {
      setIsSubmitting(false);
      setResponseStatus({
        success: false,
        message: 'A network error occurred. Please contact studio@minaleandmann.com directly.',
      });
    }
  };

  return (
    <div className="w-full bg-[#0c0d0e] text-white min-h-screen">
      {/* Contact Header */}
      <section className="pt-8 sm:pt-14 pb-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full border-b border-white/10">
        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500 block mb-3">
          Studio Inquiries & Commissions
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight uppercase text-white leading-tight">
          Initiate a Project
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl leading-relaxed mt-4">
          We welcome confidential discussions regarding private residences, conservation projects,
          and commercial architecture in London and internationally.
        </p>
      </section>

      {/* Main Grid: Two-Column Split Layout */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column: Physical Location & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-3">
                London Headquarters
              </span>
              <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wide text-white mb-4">
                Battersea Studio
              </h2>
              <address className="not-italic text-sm font-light text-neutral-300 space-y-2 leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <p>39-41 Battersea Park Road</p>
                    <p>London SW11 4LS</p>
                    <p>United Kingdom</p>
                  </div>
                </div>
              </address>
            </div>

            <div className="space-y-4 text-sm font-light text-neutral-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-500" />
                <a href="tel:+442077386732" className="hover:text-white transition-colors">
                  +44 (0)20 7738 6732
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-500" />
                <a href="mailto:studio@minaleandmann.com" className="hover:text-white transition-colors">
                  studio@minaleandmann.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>Mon &ndash; Fri: 09:00 &ndash; 18:00 GMT (By Appointment)</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 block">
                Direct Project Consultations
              </span>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Consultations are hosted at our Battersea design studio or conducted on-site for registered property owners, family offices, and developers.
              </p>
            </div>
          </div>

          {/* Right Column: Minimalist Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#121316] border border-white/10 p-8 sm:p-12">
            <div className="mb-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Inquiry Registry
              </span>
              <h3 className="text-xl font-light uppercase tracking-wide text-white">
                Client Commission Form
              </h3>
            </div>

            {/* Response Banner */}
            <AnimatePresence>
              {responseStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-8 p-4 border text-xs tracking-wide flex items-start gap-3 ${
                    responseStatus.success
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-red-950/40 border-red-500/40 text-red-200'
                  }`}
                >
                  {responseStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  )}
                  <span>{responseStatus.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                  }}
                  placeholder="e.g. Lord Alexander Harrington"
                  className={`w-full px-4 py-3.5 bg-[#0a0a0c] border text-white text-sm focus:outline-none transition-colors ${
                    fieldErrors.name ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-white'
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-[11px] text-red-400 mt-1 font-mono">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                    }}
                    placeholder="e.g. client@domain.com"
                    className={`w-full px-4 py-3.5 bg-[#0a0a0c] border text-white text-sm focus:outline-none transition-colors ${
                      fieldErrors.email ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-white'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Telephone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +44 20 7738 6732"
                    className="w-full px-4 py-3.5 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Service Interest Dropdown */}
              <div>
                <label htmlFor="service_interest" className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Service / Practice Interest
                </label>
                <select
                  id="service_interest"
                  value={formData.service_interest}
                  onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors"
                >
                  <option value="Architectural Design">Architectural Design</option>
                  <option value="Planning Applications">Planning Applications</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Conservation & Heritage">Conservation & Heritage</option>
                  <option value="Create & Construct">Create & Construct (Turn-key Build)</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Project Scope & Location *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                  }}
                  placeholder="Describe property address, architectural aspirations, approximate timeline..."
                  className={`w-full px-4 py-3.5 bg-[#0a0a0c] border text-white text-sm focus:outline-none transition-colors ${
                    fieldErrors.message ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-white'
                  }`}
                />
                {fieldErrors.message && (
                  <p className="text-[11px] text-red-400 mt-1 font-mono">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-neutral-900 text-xs uppercase tracking-[0.25em] font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
