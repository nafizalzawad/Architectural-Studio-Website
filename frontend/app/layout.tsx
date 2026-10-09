import type { Metadata, Viewport } from 'next';
import './globals.css';
import { NavigationProvider } from '@/context/NavigationContext';
import Header from '@/components/Header';
import NavigationDrawer from '@/components/NavigationDrawer';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0c0d0e',
};

export const metadata: Metadata = {
  title: 'Minale + Mann | Bespoke Architecture, Interior Design & Build London',
  description:
    'Award-winning London architectural design studio. Specialising in high-end residential architecture, interior design, planning, conservation, and turn-key construction.',
  keywords: [
    'Minale + Mann',
    'Architects London',
    'Bespoke Architecture',
    'Luxury Interior Design',
    'Heritage Conservation',
    'Battersea Architects',
  ],
  authors: [{ name: 'Minale + Mann' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0c0d0e] text-[#f5f5f7] antialiased selection:bg-neutral-200 selection:text-neutral-900 min-h-screen flex flex-col">
        <NavigationProvider>
          {/* Fixed Transparent Architectural Header */}
          <Header />

          {/* Full-Screen Framer Motion Off-Canvas Drawer */}
          <NavigationDrawer />

          {/* Children wrapped with Smooth Fade-In Transition */}
          <div className="flex-1 flex flex-col">
            <PageTransition>{children}</PageTransition>
          </div>

          {/* Minimalist Architectural Footer */}
          <Footer />
        </NavigationProvider>
      </body>
    </html>
  );
}
