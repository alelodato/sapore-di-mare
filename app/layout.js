import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Sapore Di Mare — Michelin-starred Italian Seafood, Mayfair',
    template: '%s | Sapore Di Mare',
  },
  description:
    'A Michelin-starred Italian seafood restaurant in the heart of Mayfair, London. Crafted from the finest ingredients, led by Chef Mario Rossi.',
  keywords: ['italian restaurant', 'seafood', 'mayfair', 'michelin star', 'london', 'fine dining'],
  openGraph: {
    title: 'Sapore Di Mare',
    description: 'Michelin-starred Italian seafood in Mayfair, London.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-noir-mid text-cream font-body">
        <Navbar />
        <main className="page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
