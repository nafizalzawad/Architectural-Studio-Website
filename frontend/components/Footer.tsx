'use client';

import React from 'react';
import Link from 'next/link';


export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#08080a] text-neutral-300 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-12">
        {/* Top Section: Architectural Studio Ethos & Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-base sm:text-lg font-light tracking-[0.28em] uppercase text-white block">
              Minale + Mann
            </span>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md">
              A bespoke architectural, interior design, and construction practice based in London.
              We shape distinctive spaces from inception to turn-key completion with uncompromising
              craftsmanship and rigorous architectural precision.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
                Studio
              </h4>
              <ul className="space-y-2.5 text-xs font-light text-neutral-400">
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Studio
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Disciplines */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
                Practices
              </h4>
              <ul className="space-y-2.5 text-xs font-light text-neutral-400">
                <li>
                  <Link href="/services/architectural-design" className="hover:text-white transition-colors">
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/services/interior-design" className="hover:text-white transition-colors">
                    Interior Design
                  </Link>
                </li>
                <li>
                  <Link href="/services/conservation-heritage" className="hover:text-white transition-colors">
                    Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/services/create-construct" className="hover:text-white transition-colors">
                    Construction
                  </Link>
                </li>
              </ul>
            </div>

              {/* Studio Headquarters */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
                London Studio
              </h4>
              <address className="not-italic text-xs font-light text-neutral-400 space-y-1.5 leading-relaxed">
                <p>Archway 69, 324 Queenstown Rd</p>
                <p>Battersea, London SW8 4LT</p>
                <p className="pt-2">
                  <a
                    href="tel:02039586074"
                    className="hover:text-white transition-colors block text-neutral-300"
                  >
                    020 3958 6074
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:generalenquiries@minaleandmann.com"
                    className="hover:text-white transition-colors block text-neutral-300"
                  >
                    generalenquiries@minaleandmann.com
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Privacy Policy, and Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-light text-neutral-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>&copy; {currentYear} Minale + Mann. All rights reserved.</span>
            <div className="flex items-center gap-4 text-neutral-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>&bull;</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Engagement
              </Link>
              <span>&bull;</span>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-neutral-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group p-2 rounded-full border border-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.75] transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group p-2 rounded-full border border-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* Custom Pinterest Icon */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="group p-2 rounded-full border border-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.373-.055.228-.182.277-.42.168-1.57-.73-2.55-3.022-2.55-4.864 0-3.96 2.877-7.599 8.3-7.599 4.357 0 7.744 3.106 7.744 7.257 0 4.33-2.73 7.814-6.518 7.814-1.273 0-2.469-.662-2.879-1.444l-.784 2.986c-.284 1.089-1.053 2.454-1.568 3.291C9.697 23.854 10.829 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
