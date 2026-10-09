'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitContactForm } from '@/lib/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ProjectInquiryFormProps {
  projectTitle: string;
}

export const ProjectInquiryForm: React.FC<ProjectInquiryFormProps> = ({
  projectTitle,
}) => {
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
        message: `Project Reference: ${projectTitle}\n\n${formData.message}`,
        service_interest: 'Case Study Direct Inquiry',
      });
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Submission failed. Please call our London studio directly.');
    }
  };

  return (
    <section className="w-full bg-white text-[#1b1b1e] py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-neutral-200">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-5 space-y-5">
          <div className="w-12 h-[2px] bg-[#1b1b1e]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
            Client Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#1b1b1e]">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Read more about our{' '}
            <Link
              href="/services/create-construct"
              className="text-[#1b1b1e] font-normal underline underline-offset-4"
            >
              Create &amp; Construct
            </Link>{' '}
            service, or contact our team to discuss your London property or commission.
          </p>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 bg-[#fafafb] border border-neutral-200 p-8 sm:p-12 shadow-sm">
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-10 h-10 text-[#1b1b1e] mx-auto stroke-1" />
              <h3 className="text-xl uppercase font-light tracking-wide text-[#1b1b1e]">
                Inquiry Received
              </h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed max-w-sm mx-auto">
                Thank you for your interest in {projectTitle}. Our partners will review your requirements and follow up promptly.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 text-xs font-mono uppercase tracking-[0.2em] border border-neutral-300 hover:border-black transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-[#1b1b1e] focus:outline-none focus:border-black transition-colors"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-[#1b1b1e] focus:outline-none focus:border-black transition-colors"
                    placeholder="+44 20 0000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-[#1b1b1e] focus:outline-none focus:border-black transition-colors"
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm text-[#1b1b1e] focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder={`Tell us about your upcoming project or interest in ${projectTitle}...`}
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-600 text-xs py-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-[#1b1b1e] text-white hover:bg-neutral-800 uppercase font-mono text-xs tracking-[0.25em] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectInquiryForm;
