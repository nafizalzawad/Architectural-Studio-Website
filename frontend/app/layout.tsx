import type { Metadata, Viewport } from 'next';
import './globals.css';
import { NavigationProvider } from '@/context/NavigationContext';
import Header from '@/components/Header';
import NavigationDrawer from '@/components/NavigationDrawer';
import QuickContactDrawer from '@/components/QuickContactDrawer';
import Preloader from '@/components/Preloader';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1b1b1e',
};

export const metadata: Metadata = {
  title: 'Architecture and Interior Design Studio London | Minale + Mann',
  description:
    'Minale + Mann is an architecture and interior design studio in London, specialising in bespoke interior design and architectural services.',
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
      <body className="bg-[#1b1b1e] text-[#f5f5f7] antialiased selection:bg-neutral-200 selection:text-neutral-900 min-h-screen flex flex-col">
        <NavigationProvider>
          {/* Split-Screen Animated Vector Logo Preloader */}
          <Preloader />

          {/* Fixed Architectural Header with Vector SVG Logo & Contrast Engine */}
          <Header />

          {/* 3-Tier Horizontal Cascading Off-Canvas Menu */}
          <NavigationDrawer />

          {/* Global Slide-Over Quick Contact Modal (.mm-overlay) */}
          <QuickContactDrawer />

          {/* Main Page Content with PageTransition */}
          <div className="flex-1 flex flex-col">
            <PageTransition>{children}</PageTransition>
          </div>

          {/* Architectural Footer */}
          <Footer />
        </NavigationProvider>
      </body>
    </html>
  );
}
