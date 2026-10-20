'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { X, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { submitContactForm } from '@/lib/api';

export const QuickContactDrawer: React.FC = () => {
  const { isQuickContactOpen, closeQuickContact } = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        service_interest: 'Quick Studio Inquiry',
      });
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Submission failed. Please contact us directly by telephone.');
    }
  };

  return (
    <AnimatePresence>
      {isQuickContactOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeQuickContact}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 right-0 bottom-0 w-full sm:w-[500px] lg:w-[580px] bg-[#1b1b1e] text-white shadow-2xl border-l border-white/10 z-10 flex flex-col p-6 sm:p-12 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 block mb-1">
                  M. A. Wakeel Khan & Associates
                </span>
                <h3 className="text-xl sm:text-2xl font-light uppercase tracking-tight text-white">
                  Get in Touch
                </h3>
              </div>

              <button
                type="button"
                onClick={closeQuickContact}
                className="p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                aria-label="Close Inquiry Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Coordinates */}
            <div className="space-y-4 mb-8 text-neutral-300 font-light text-xs sm:text-sm leading-relaxed border-b border-white/10 pb-8">
              <p>
                <strong className="text-white font-normal block mb-1">Dhaka Studio</strong>
                Dhaka, Bangladesh
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 text-xs font-mono tracking-wider">
                <a
                  href="mailto:info@mawk.com.bd"
                  className="hover:text-white underline underline-offset-4 decoration-white/30"
                >
                  info@mawk.com.bd
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-10 h-10 text-white mx-auto stroke-1" />
                <h4 className="text-lg uppercase tracking-wide font-light text-white">
                  Inquiry Received
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
                  A partner from our London studio will review your project parameters and respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 text-xs font-mono uppercase tracking-[0.2em] border border-white/20 hover:border-white transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 flex-1">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="Your Full Name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="+44 20 0000 0000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="client@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    Project Overview
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Briefly describe property location, scope, and timeline..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs py-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 bg-white text-[#1b1b1e] hover:bg-neutral-200 uppercase font-mono text-xs tracking-[0.25em] transition-colors disabled:opacity-50 mt-4 cursor-pointer"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickContactDrawer;
